export interface user {
    uid?: string;
    name: string;
    email: string;
    password: string;
    rol:'admin'|'user';
}
