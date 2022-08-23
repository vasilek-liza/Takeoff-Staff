import { BaseAPI } from "./BaseAPI";
import { IUserData } from "../interfaces/IUserData";
import { AxiosResponse } from "axios";
import { IAccessToken } from "../interfaces/IAceessToken";

class AuthAPI extends BaseAPI {
    static token =  "";

    getToken = (data: IUserData) => {
        return this.postMethod<IUserData, IAccessToken>("api/auth/login", data);
    }
}

export const authAPI = new AuthAPI();