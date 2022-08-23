import { HeadersDefaults } from "axios";

export interface IHeaderDefaults extends HeadersDefaults { 
    Authorization: string;
}
