import React from "react";
import icon_google from "../../assets/images/icons/google.svg";
import icon_facebook from "../../assets/images/icons/facebook.svg";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FacebookLogin from "react-facebook-login";
import { signInFacebook, signInGoogle } from "../../redux/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const SubdivisionOptions = [
  {
    label: "Phân khu A",
    value: "A",
  },
  {
    label: "Phân khu B",
    value: "B",
  },
];

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: {},
  });
  const responseFacebook = async (response) => {
    console.log(response);
    const res = await dispatch(
      signInFacebook({
        access_token: response.accessToken,
      })
    );
    if (res.payload.status === 200) {
      history.push("/register");
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
      if (res) {
        history.push("/register");
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const handleRegister = (dataRegister) => {
    console.log(dataRegister);
  };
  return (
    <div
      className="d-flex flex-column flex-grow-1 flex w-100"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dzjtdpc4h/image/upload/v1684258183/DATN/agrsdnhdaxfjnawqtxga.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
            <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-5">
              Fast, Efficient and Productive
            </h1>
            <div className="text-gray-600 fs-base text-center fw-semibold">
              <a href="#" className="opacity-75-hover text-primary me-1">
                the blogger
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex flex-lg-row justify-content-lg-end p-5 w-100">
          <div className="bg-body d-flex justify-content-center rounded-4 w-md-600px p-5">
            <div className="w-md-400px">
              <form
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit(handleRegister)}
              >
                <div className="text-center mb-5">
                  <h1 className="text-dark fw-bolder mb-3">Đăng Ký</h1>
                  <div className="text-gray-500 fw-semibold fs-6 mb-3">
                    Đăng Nhập Bằng
                  </div>
                  <div className="d-xxl-flex d-xl-inline-flex d-lg-flex gap-2 ">
                    <div className="d-xxl-flex d-xl-inline-flex d-lg-flex mb-xxl-0 mb-xl-0 mb-lg-0 mb-sm-2">
                      <button
                        onClick={() => loginGoogle()}
                        style={{
                          borderColor: "#2c79e8",
                          borderRadius: "30px",
                          color: "#000000",
                          textAlign: "center",
                        }}
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
                      </button>
                    </div>
                    <div className="">
                      <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        icon="fa-facebook"
                        size="small"
                        textButton="Đăng nhập bằng Facebook"
                        buttonStyle={{
                          fontSize: "14px",
                          background: "#2c79e8",
                          border: "none",
                          borderRadius: "30px",
                          color: "#ffffff",
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
                          label="Mật khẩu"
                          variant="outlined"
                          size="small"
                          className="form-control bg-transparent"
                          type="password"
                        />
                      )}
                      control={control}
                    />
                  </div>
                  <div className="fv-row mb-4 fv-plugins-icon-container">
                    <Controller
                      name="lastName"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="lastName"
                          label="Họ"
                          variant="outlined"
                          size="small"
                          className="form-control bg-transparent"
                          type="text"
                        />
                      )}
                      control={control}
                    />
                  </div>
                  <div className="fv-row mb-4 fv-plugins-icon-container">
                    <Controller
                      name="firstName"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="firstName"
                          label="Tên"
                          variant="outlined"
                          size="small"
                          className="form-control bg-transparent"
                          type="text"
                        />
                      )}
                      control={control}
                    />
                  </div>
                  <div className="fv-row mb-4 fv-plugins-icon-container">
                    <Controller
                      name="subdivision"
                      render={({ field }) => (
                        <FormControl fullWidth className="pb-3">
                          <InputLabel id="demo-simple-select-label">
                            Chọn phân khu
                          </InputLabel>
                          <Select
                            {...field}
                            label={"Chọn phân khu"}
                            variant="outlined"
                            size="small"
                          >
                            {SubdivisionOptions.map((gender, index) => {
                              return (
                                <MenuItem
                                  value={gender.value}
                                  key={gender.value}
                                >
                                  {gender.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                      control={control}
                    />
                  </div>
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btn-primary"
                    >
                      <span className="indicator-label">ĐĂNG Ký</span>
                    </button>
                  </div>
                  <div className="text-gray-500 text-center fw-semibold fs-6">
                    Bạn đã có tài khoản? {""}
                    <a href="/login" className="link-primary">
                      Đăng Nhập
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
