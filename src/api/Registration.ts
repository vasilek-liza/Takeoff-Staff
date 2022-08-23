import { BaseAPI } from "./BaseAPI";
import { IUserData } from '../interfaces/IUserData';
import { IUser } from "../interfaces/IUser";
import { IHeaderDefaults } from "../interfaces/IHeaderDefaults";
import { IAccessToken } from "../interfaces/IAceessToken";



class RegistrationAPI extends BaseAPI {

    setToken = (token: string) => {
        (this.instance.defaults.headers as IHeaderDefaults).Authorization = "Bearer " + token;
    }

    registration = (data: IUser) => {
        return this.postMethod<IUser, IAccessToken>("/api/auth/register", data);
    }
}

export const registrationAPI = new RegistrationAPI();