import { Link } from "react-router-dom";

import {logout} from "../../api/userApi";
import { Token } from '../../types';

import { LocalStorageTools } from "../../localStorage";
import { useAppSelector } from "../../redux/hooks";

const Navbar: React.FC = () => {
  const logOut = () => {
    const tokens: Token = LocalStorageTools.getItemFromLocalStorage('tokens');
    console.log(tokens.refresh)
    logout(tokens.refresh);
  }

  const currentUsername= useAppSelector((state) => state.userData.username);
  const page = useAppSelector((state) => state.todoData.currentPage)
  const filter = useAppSelector((state) => state.todoData.filter)

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={`/todos/${filter}/${page}`} className="nav-link">
                Todos
              </Link>
            </li>
          </div>

          {currentUsername ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  {currentUsername}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li> 
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
    );
  }


export default Navbar;