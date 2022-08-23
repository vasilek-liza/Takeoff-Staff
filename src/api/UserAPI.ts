import { BaseAPI } from "./BaseAPI";
import { IUser } from "../interfaces/IUser";
import { IHeaderDefaults } from "../interfaces/IHeaderDefaults";

class UserAPI extends BaseAPI {

    setToken = (token: string) => {
        (this.instance.defaults.headers as IHeaderDefaults).Authorization = "Bearer " + token;
    }

    getUsers = () => {
        return this.getMethod("/users");
    }

    updateUser = (id: string, data: IUser) => {
        return this.putMethod<IUser>("/users/" + id + "/", data);
    }

    deleteUser = (id: string) => {
        return this.deleteMethod<void>("/users/" + id);
    }
}

export const userAPI = new UserAPI();