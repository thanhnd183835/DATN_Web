import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Component/LoginPage/LoginPage";
import RegisterPage from "./Component/RegisterPage/RegisterPage";
import ProtectedRoute from "./Component/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./Component/HomePage/HomePage";

// import ProtectedRoute from "./Component/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(hideModalMessage());
  // }, []);
  const infoUser = useSelector((state) =>
    console.log(state.auth.user.data.data)
  );

  // const isAuthenticated = localStorage.getItem("token");
  // console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/homePage" component={HomePage} />
        </GoogleOAuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
