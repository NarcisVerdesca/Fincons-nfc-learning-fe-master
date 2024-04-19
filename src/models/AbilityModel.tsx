import User from "./UserModel";

interface Ability {
    id?: number,
    name: string,
    user: User
}

export default Ability;