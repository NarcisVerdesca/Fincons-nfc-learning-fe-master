import Ability from "./AbilityModel";
import User from "./UserModel";

interface AbilityUser {
  name: string;
  id?: number;
  ability?: Ability[];
  user?: User[];
}

export default AbilityUser;
