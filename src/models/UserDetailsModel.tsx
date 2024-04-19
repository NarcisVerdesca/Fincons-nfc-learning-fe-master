
interface UserDetailModels {
    firstName?: string,
    lastName?: string,
    email?:string,
    birthDate?: Date,
    password?: string;
    id?: number;
    role?: Roles;
    

}
interface Roles{
    id?: number;
    name? : string;
}


export default UserDetailModels;