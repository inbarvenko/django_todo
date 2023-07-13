import axios from "axios";
import { LocalStorageTools } from "../localStorage";
import IUser from "../types";
import authHeader from "./headers";
const URL_LOCAL = 'http://127.0.0.1:8000/'

class AuthService {
    login(email: string, password: string) {
      return axios
        .post(URL_LOCAL + "login/", {
          email,
          password
        })
        .then(response => {
          console.log("Login")
          if (response.data.tokens) {
            LocalStorageTools.setItemToLocalStorage("user", response.data);
          }
  
          return response.data;
        });
    }
  
    logout(refreshToken:string | undefined) {
      console.log("Logout")
      const auth = authHeader();
      LocalStorageTools.removeFromLocalStorage('user');
      return axios
        .post(URL_LOCAL + "logout/", {
          headers: auth,
          data: {
            refresh: refreshToken,
          }
        })
    }
  
    register(username: string, email: string, password: string) {
      return axios.post(URL_LOCAL + "register/", {
        username,
        email,
        password
      });
    }
  
    getCurrentUser() {
      const userStr = LocalStorageTools.getItemFromLocalStorage<IUser>('user');
  
      return userStr;
    }
  }
  
  const auth = new AuthService();
  
  export default auth;