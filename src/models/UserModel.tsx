import Ability from "./AbilityModel";

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: Date,
    confirmPassword: string,
    abilities?: Ability[]
}

export default User;