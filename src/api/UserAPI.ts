import { BaseAPI } from "./BaseAPI";
import { IUserData } from '../interfaces/IUserData';
import { IUser } from "../interfaces/IUser";

class UserAPI extends BaseAPI {

    setToken = (token: string) => {
        (this.instance.defaults.headers as any)["Authorization"] = "Bearer " + token;
    }

    getUsers = () => {
        return this.getMethod("/users");
    }

    getUser = (id: string) => {
        return this.getMethod("/api/users/" + id);
    }

    updateUser = (id: string, data: IUser) => {
        return this.putMethod("/api/users/" + id + "/", data);
    }

    deleteUser = (id: string) => {
        return this.deleteMethod("/api/users/" + id);
    }
}

export const userAPI = new UserAPI();