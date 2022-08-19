import { BaseAPI } from "./BaseAPI";
import { IUserData } from "../interfaces/IUserData";

class AuthAPI extends BaseAPI {
    static token =  "";

    getToken = (data: IUserData) => {
        return this.postMethod("api/auth/login", data);
    }
}

export const authAPI = new AuthAPI();