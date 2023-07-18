import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {login} from "../../api/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

type State = {
  redirect: string | null,
  email: string,
  password: string,
  loading: boolean,
  message: string
};


const Login: React.FC = () => {

  const state: State = {
    redirect: null,
    email: "",
    password: "",
    loading: false,
    message: ""
  }

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userData.username);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(user) {
      navigate('/user')
    }
  }, [user])

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    state.message = "";
    state.loading = true;

    login(email, password, dispatch)
      .then(
        () => {
          navigate('/user')
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            state.loading = false;
            state.message = resMessage;
          });
  }

    const { loading, message } = state;

    const initialValues = {
      email: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <Field name="email" type="text" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }

  export default Login;