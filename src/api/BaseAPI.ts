import Axios, { AxiosInstance, AxiosPromise } from "axios";

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

    postMethod = <T, K>(url: string, data: T) => {
        return this.instance.post<T, AxiosPromise<K>>(url, data);
    };

    putMethod = <T>(url: string, data: T) => {
        return this.instance.put<string, AxiosPromise<T>>(url, data);
    }

    putchMethod = <T>(url: string, data: T) => {
        return this.instance.patch(url, data);
    }

    deleteMethod = <T>(id: string) => {
        return this.instance.delete<string, AxiosPromise<T>>(id)
    }
}
