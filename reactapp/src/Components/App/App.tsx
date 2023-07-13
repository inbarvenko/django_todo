import { Component } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import AuthService from "../../api/userApi";
import IUser from "../../types";

import Login from "../Login/Login";
import Register from "../Register/Register";
import User from "../User/User";
import Todos from "../Todos/Todos";
import Navbar from "../Navbar/Navbar";

import EventBus from "../../eventBus";

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Navbar/>
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
