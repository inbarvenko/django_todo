import { LocalStorageTools } from "../localStorage";
import IUser from "../types";

export default function authHeader() {
    const user = LocalStorageTools.getItemFromLocalStorage<IUser>('user');
  
    if (user && user.tokens) {
      return { Authorization: 'Bearer ' + user.tokens.access };
    } else {
      return { Authorization: '' };
    }
  }