import { IsNull, getConnection } from "typeorm";
import { AlphaHostingRecordRepository } from "../repository/alphaHostingRecord.repository";
import axios from "axios";
const https = require("https");

export class AlphaHostingService {
  token: string;
  apiUrl: string;
  axiosConfig: any;
  private hostingRecordRepo: AlphaHostingRecordRepository;

  constructor() {
    this.token = process.env.ALPHA_PANEL_API_TOKEN!;
    this.apiUrl = process.env.ALPHA_PANEL_URL!;
    this.hostingRecordRepo = getConnection("schedule").getCustomRepository(
      AlphaHostingRecordRepository
    );
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
  }

  public listAccounts = async () => {
    const url = this.apiUrl + "/api/admin/users";
    const response = await axios.get(url, this.axiosConfig);
    const { data: accounts } = response.data;
    return accounts;
  };

  public async createAccount(payload: {
    email: string;
    password: string;
    planId: number;
  }) {
    const url = this.apiUrl + "/api/admin/users";

    const response = await axios.post(
      url,
      {
        email: payload.email,
        password: payload.password,
      },
      this.axiosConfig
    );

    const { data: user } = response.data;

    const userServiceUrl = this.apiUrl + `/api/admin/users/${user.id}/services`;

    await axios.post(
      userServiceUrl,
      {
        plan_id: payload.planId,
      },
      this.axiosConfig
    );

    await this.hostingRecordRepo.save(
      this.hostingRecordRepo.create({
        username: user.email,
        uid: user.id,
      })
    );

    return user;
  }

  public suspendAccount = async (uid: number) => {
    const userServicesUrl = this.apiUrl + `/api/admin/users/${uid}/services`;
    const response = await axios.get(userServicesUrl, this.axiosConfig);
    const { data: services } = response.data;
    const promises = [];
    for (const service of services) {
      const suspendUrl =
        this.apiUrl + `/api/admin/users/${uid}/services/${service.id}/suspend`;

      promises.push(axios.put(suspendUrl, {}, this.axiosConfig));
    }
    await Promise.all(promises);
    return true;
  };

  public unsuspendAccount = async (uid: number) => {
    const userServicesUrl = this.apiUrl + `/api/admin/users/${uid}/services`;
    const response = await axios.get(userServicesUrl, this.axiosConfig);
    const { data: services } = response.data;
    const promises = [];
    for (const service of services) {
      const suspendUrl =
        this.apiUrl +
        `/api/admin/users/${uid}/services/${service.id}/unsuspend`;
      promises.push(axios.put(suspendUrl, {}, this.axiosConfig));
    }
    await Promise.all(promises);
    return true;
  };

  public deleteAccount = async (uid: number) => {
    const deleteUrl = this.apiUrl + `/api/admin/users/${uid}`;
    const response = await axios.delete(deleteUrl, this.axiosConfig);

    const { data } = response;
    return data.success;
  };

  public listHostingRecords = async (skipAssigned: boolean = false) => {
    if (skipAssigned) {
      return await this.hostingRecordRepo.find({
        projectId: IsNull(),
      });
    }

    return await this.hostingRecordRepo.find({});
  };

  public assignToProject = async (projectId: number, uid: number) => {
    const hostingRecord = await this.hostingRecordRepo.update(
      {
        uid: uid,
      },
      {
        projectId: projectId,
      }
    );

    return hostingRecord;
  };

  public createUserSession = async (uid: number) => {
    const url = this.apiUrl + `/api/admin/users/${uid}/login-as-user-sso-token`;

    const response = await axios.post(url, {}, this.axiosConfig);
    const { data } = response.data;

    return data;
  };

  public createUserSessionFromWeb = async (projectId: number) => {
    const hostingRecord = await this.hostingRecordRepo.findOne({
      projectId: projectId
    });

    if (!hostingRecord) {
      throw Error('Project does not support Panel Alpha Hosting');
    };

    const url = this.apiUrl + `/api/admin/users/${hostingRecord.uid}/sso-token`;
    const response = await axios.post(url, {}, this.axiosConfig);

    const { data } = response.data;
    return data;
  }

  public getPlans = async () => {
    const url = this.apiUrl + '/api/admin/plans';
    const response = await axios.get(url, this.axiosConfig);
    const { data } = response.data;

    return data;
  }

  public getUserServices = async (uid: number) => {
    const url = this.apiUrl + `/api/admin/users/${uid}/services`;
    const response = await axios.get(url, this.axiosConfig);
    const { data } = response.data;

    return data;
  }
}
