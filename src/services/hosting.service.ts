import {
  Argument,
  WhmApiRequest,
  WhmApiTokenHeader,
  WhmApiType,
} from "@cpanel/api";
import axios from "axios";
import { HostingRecordRepository } from "../repository/hostingRecord.repository";
import { getConnection, IsNull } from "typeorm";
const https = require('https');

export class HostingService {
  token: string;
  private hostingRecordRepo: HostingRecordRepository;

  constructor() {
    this.token = process.env.WHM_TOKEN!;
    this.hostingRecordRepo = getConnection("schedule").getCustomRepository(HostingRecordRepository);
  }

  public listAccounts = async () => {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "listaccts",
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/listaccts',
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );

    const { data } = whmResponse;

    const accounts = data.acct;

    for (const account of accounts) {
      const hostingRecord = await this.hostingRecordRepo.findOne({
        cpanelUsername: account.user
      });
      account.internalData = hostingRecord;
    }

    return accounts;
  }

  public listHostingRecords = async (skipAssigned: boolean = false) => {
    if (skipAssigned) {
      return await this.hostingRecordRepo.find({
        projectId: IsNull()
      })
    };

    return await this.hostingRecordRepo.find({});
  }

  public async createAccount(payload: {
    domain: string,
    username: string,
    password: string,
    pkgname: string
  }) {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "createacct",
      arguments: [
        new Argument("domain", payload.domain),
        new Argument("username", payload.username),
        new Argument("password", payload.password),
        new Argument("pkgname", payload.pkgname),
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/createacct?' + request.body,
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );

    const { data } = whmResponse;

    if (!data?.data) {
      throw Error(data?.metadata?.reason || 'Something went wrong')
    }

    const accountData = data.data;

    await this.hostingRecordRepo.save(
      this.hostingRecordRepo.create({
        cpanelUsername: payload.username
      })
    );

    return accountData;
  }

  public suspendAccount = async (username: string) => {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "suspendacct",
      arguments: [
        new Argument("user", username),
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/suspendacct?' + request.body,
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );
    const { data } = whmResponse;

    if (!data?.metadata?.result) {
      throw Error(data?.metadata?.reason || 'Something went wrong')
    }

    return data.metadata;
  }

  public unsuspendAccount = async (username: string) => {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "unsuspendacct",
      arguments: [
        new Argument("user", username),
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/unsuspendacct?' + request.body,
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );
    const { data } = whmResponse;

    if (!data?.metadata?.result) {
      throw Error(data?.metadata?.reason || 'Something went wrong')
    }

    return data.metadata;
  }

  public deleteAccount = async (username: string) => {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "removeacct",
      arguments: [
        new Argument("user", username),
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/removeacct?' + request.body,
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );
    const { data } = whmResponse;

    if (!data?.metadata?.result) {
      throw Error(data?.metadata?.reason || 'Something went wrong')
    }

    return data.metadata;
  }

  public createUserSession = async (username: string) => {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "create_user_session",
      arguments: [
        new Argument("user", username),
        new Argument("service", "cpaneld")
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/create_user_session?' + request.body,
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );
    const { data } = whmResponse;

    if (!data?.metadata?.result) {
      throw Error(data?.metadata?.reason || 'Something went wrong')
    }

    return data.data;
  }

  public createUserSessionFromWeb = async (projectId: number) => {
    const hostingRecord = await this.hostingRecordRepo.findOne({
      projectId: projectId
    });

    if (!hostingRecord) {
      throw Error('Project does not support Hosting');
    }

    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "create_user_session",
      arguments: [
        new Argument("user", hostingRecord?.cpanelUsername),
        new Argument("service", "cpaneld")
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    const whmResponse = await axios.get(
      process.env.CPANEL_URL + '/create_user_session?' + request.body,
      {
        headers: request.headers.toObject(),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    );
    const { data } = whmResponse;

    if (!data?.metadata?.result) {
      throw Error(data?.metadata?.reason || 'Something went wrong')
    }

    return data.data;
  }

  public assignToProject = async (projectId: number, cpanelUsername: string) => {
    const hostingRecord = await this.hostingRecordRepo.update({
      cpanelUsername: cpanelUsername
    }, {
      projectId: projectId
    });

    return hostingRecord;
  }
}
