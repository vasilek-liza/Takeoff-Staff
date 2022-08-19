export interface IUser {
    id?: string | null;
    password: string | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    is_active: boolean | null;
}