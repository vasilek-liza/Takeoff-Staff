import { BaseAPI } from "./BaseAPI";
import { IUserData } from '../interfaces/IUserData';
import { IUser } from "../interfaces/IUser";

class RegistrationAPI extends BaseAPI {

    setToken = (token: string) => {
        (this.instance.defaults.headers as any)["Authorization"] = "Bearer " + token;
    }

    registration = (data: IUser) => {
        return this.postMethod("/api/auth/register", data);
    }
}

export const registrationAPI = new RegistrationAPI();