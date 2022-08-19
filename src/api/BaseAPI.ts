import Axios, { AxiosInstance } from "axios";

export class BaseAPI {
    static baseURL = "http://localhost:3000/";
    instance: AxiosInstance;
    
    constructor() {
        this.instance = Axios.create({
            baseURL: BaseAPI.baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    getMethod = (url: string) => {
        return this.instance.get(url);
    };

    postMethod = <T>(url: string, data: T) => {
        return this.instance.post(url, data);
    };

    putMethod = <T>(url: string, data: T) => {
        return this.instance.put(url, data);
    }

    putchMethod = <T>(url: string, data: T) => {
        return this.instance.patch(url, data);
    }

    deleteMethod = (id: string) => {
        return this.instance.delete(id)
    }
}
