import {
  Argument,
  WhmApiRequest,
  WhmApiResponse,
  WhmApiTokenHeader,
  WhmApiType,
} from "@cpanel/api";
import axios from "axios";
import fetch from 'node-fetch';

export class HostingService {
  token: string;

  constructor() {
    this.token = process.env.WHM_TOKEN!;
  }

  public async createAccount() {
    const request = new WhmApiRequest(WhmApiType.JsonApi, {
      method: "createacct",
      arguments: [
        new Argument("domain", "example.com"),
        new Argument("username", "cusername"),
        new Argument("password", "Test123123!"),
        new Argument("pkgname", "Start"),
      ],
      headers: [new WhmApiTokenHeader(this.token, "root")],
    }).generate();

    fetch('https://34.65.176.137:2087', {
      method: 'POST',
      headers: request.headers.toObject(),
      body: request.body
  })
    .then((response: any) => response.json())
    .then((response: any) => {
        response.data = new WhmApiResponse(response.data);
        if(!response.data.status) {
          throw new Error(response.data.errors[0].message);
        }
        return response;
    })
    .then((data: any) => console.log(data));

    // const whmResponse = await axios.get(
    //   process.env.CPANEL_URL!,
    //   {
    //     headers: request.headers.toObject(),
    //     httpsAgent: new https.Agent({
    //       rejectUnauthorized: false
    //     })
    //   }
    //   // request.body,

    // );

    // console.log('>>>>>>>>>>>>>', whmResponse)

    return true;
  }
}
