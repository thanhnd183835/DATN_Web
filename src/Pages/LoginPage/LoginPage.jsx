import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import icon_google from "../../Assets/Images/icons/google.svg";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  signIn,
  signInFacebook,
  signInGoogle,
} from "../../Redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { showModalMessage } from "../../Redux/message/message.slice";
import FacebookLogin from "react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import Footer from "../../Component/Footer/Footer";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: {},
  });

  const handleLogin = async (body) => {
    localStorage.clear();
    const res = await dispatch(signIn(body));
    if (res?.payload?.data?.code === 0) {
      await localStorage.setItem("token", res?.payload?.data?.token);
      navigate("/");
    } else if (res.error.message === "Request failed with status code 404") {
      dispatch(
        showModalMessage({
          type: "ERROR",
          msg: "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại",
        })
      );
    }
  };
  const responseFacebook = async (response) => {
    localStorage.clear();
    const res = await dispatch(
      signInFacebook({
        access_token: response.accessToken,
      })
    );

    if (res.payload.status === 200) {
      await localStorage.setItem("token", res?.payload?.data?.token);
      navigate("/");
    }
  };

  const loginGoogle = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const res = await dispatch(
        signInGoogle({
          access_token: codeResponse.access_token,
        })
      );
      console.log(res);
      if (res) {
        navigate("/");
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <div
        className="d-flex flex-column flex-grow-1 flex w-100"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dzjtdpc4h/image/upload/v1684258183/DATN/agrsdnhdaxfjnawqtxga.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "91vh",
        }}
      >
        <div className="d-flex flex-row h-100 w-100">
          <div className="d-flex d-lg-flex flex-lg-column flex-wrap w-100">
            <div className="d-flex flex-column justify-content-center pb-0 pb-lg-5 p-5 w-100">
              <img
                className="mx-auto mw-100 w-150px w-lg-300px mb-5 mb-lg-5"
                src="https://res.cloudinary.com/dzjtdpc4h/image/upload/v1684258216/DATN/jxsgkbhlugpg21kfnzqc.png"
                alt=""
                style={{
                  width: "300px",
                  height: "328px",
                }}
              />
              <p
                className="h1 me-5 ms-3 text-center"
                style={{
                  fontFamily: "Algerian",
                  fontStyle: "italic",
                  color: "red",
                }}
              >
                <span
                  style={{
                    color: "#5d85c7",
                  }}
                >
                  TH
                </span>
                <br />
                <span className="text-center ms-3">market</span>
              </p>
            </div>
          </div>
          <div className="d-flex flex-lg-row justify-content-lg-end pt-4 ps-5 pe-5 pb-1 w-100">
            <div
              className="bg-body d-flex justify-content-center rounded-4  pt-4 ps-5 pe-5 pb-1 border shadow p-3"
              style={{ height: "550px" }}
            >
              <div className="">
                <form
                  className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="text-center mb-2">
                    <h3 className="text-dark fw-bolder mb-3">Đăng Nhập</h3>
                    <div className="text-gray-500 fw-semibold fs-6 mb-3">
                      Đăng Nhập Bằng
                    </div>
                    <div className="d-xxl-flex d-xl-inline-flex d-lg-flex gap-2 ">
                      <div className="d-xxl-flex d-xl-inline-flex d-lg-flex mb-xxl-0 mb-xl-0 mb-lg-0 mb-sm-2">
                        <Button
                          onClick={() => loginGoogle()}
                          style={{
                            borderColor: "#074db5",
                            borderRadius: "30px",
                            color: "#000000",
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                          variant="outlined"
                        >
                          <img
                            src={icon_google}
                            alt="logo_google"
                            style={{
                              width: "18px",
                              height: "18px",
                              textAlign: "center",
                              marginRight: "10px",
                            }}
                          />
                          Đăng nhập bằng Google
                        </Button>
                      </div>
                      <div className="">
                        <FacebookLogin
                          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                          autoLoad={false}
                          fields="name,email,picture"
                          scope="public_profile"
                          callback={responseFacebook}
                          icon="fa-facebook text-primary"
                          size="small"
                          textButton="Đăng nhập bằng Facebook"
                          buttonStyle={{
                            fontSize: "14px",
                            background: "#fff",
                            borderRadius: "30px",
                            color: "#000",
                            fontWeight: "500",
                            textTransform: "none",
                            display: "inline",
                          }}
                        />
                      </div>
                    </div>
                    <div className="separator separator-content my-3 d-flex justify-content-center">
                      <hr className="w-25" />
                      <span className="text-gray-500 fw-semibold fs-7">
                        Hoặc với email
                      </span>
                      <hr className="w-25" />
                    </div>
                    <div className="fv-row mb-4 fv-plugins-icon-container">
                      <Controller
                        name="email"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="email"
                            label="Email"
                            variant="outlined"
                            size="small"
                            className="form-control bg-transparent"
                            type="email"
                          />
                        )}
                        control={control}
                      />
                    </div>
                    <div className="fv-row mb-4 fv-plugins-icon-container">
                      <Controller
                        name="password"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="password"
                            label="Password"
                            variant="outlined"
                            size="small"
                            className="form-control bg-transparent"
                            type="password"
                          />
                        )}
                        control={control}
                      />
                    </div>
                    <div className="d-flex flex-row-reverse flex-wrap fs-base fw-semibold mb-3">
                      {/*<div></div>*/}
                      <a href="" className="link-primary float-end">
                        Quên Mật Khẩu ?
                      </a>
                    </div>
                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btn-warning"
                      >
                        <span className="indicator-label">ĐĂNG NHẬP</span>
                      </button>
                    </div>
                    <div className="text-gray-500 text-center fw-semibold fs-6">
                      Chưa có tài khoản? {""}
                      <a href="/register" className="link-primary">
                        Đăng Ký
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default LoginPage;
