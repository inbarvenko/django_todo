import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../api/userApi";
import IUser, { Token } from "../../types";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser
}
export default class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { tokens: {
        access: '',
        refresh: ''
      } }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log("2", currentUser)
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.tokens.access} ...{" "}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
          </div> : null}
      </div>
    );
  }
}