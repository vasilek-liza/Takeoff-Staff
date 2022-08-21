import { BaseAPI } from "./BaseAPI";
import { IUser } from "../interfaces/IUser";

class UserAPI extends BaseAPI {

    setToken = (token: string) => {
        (this.instance.defaults.headers as any)["Authorization"] = "Bearer " + token;
    }

    getUsers = () => {
        return this.getMethod("/users");
    }

    updateUser = (id: string, data: IUser) => {
        console.log(data)
        return this.putMethod("/users/" + id + "/", data);
    }

    deleteUser = (id: string) => {
        return this.deleteMethod("/users/" + id);
    }
}

export const userAPI = new UserAPI();