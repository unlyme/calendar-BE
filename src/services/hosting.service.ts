import {
  Argument,
  WhmApiRequest,
  WhmApiTokenHeader,
  WhmApiType,
} from "@cpanel/api";
import axios from "axios";
const https = require('https');

export class HostingService {
  token: string;

  constructor() {
    this.token = process.env.WHM_TOKEN!;
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
    return data.data.acct;
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

    return data.data;
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
}
