import * as React from "react";
import "./EditProfile.css";
import NavBar from "../../Component/NavBar/Navbar";
import { showModalMessage } from "../../Redux/message/message.slice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../src/Ultils/functions";
import { logout, replacePassword } from "../../Redux/auth/auth.slice";
import { editProfile } from "../../Redux/user/user.slice";
import Footer from "../../Component/Footer/Footer";
import ButtonChat from "../../Component/Chat/ButtonChat";

const EditProfile = () => {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.auth?.user?.data?.data);
  const navigate = useNavigate();
  const [option, setOption] = React.useState(1);
  const [fullName, setFullName] = useState(infoUser?.fullName);
  const [userName, setUserName] = useState(infoUser?.userName);
  const [email, setEmail] = useState(infoUser?.email);
  const [status, setStatus] = useState(infoUser?.status);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPass, setConfirmPass] = useState("");
  const [fullNameError, setFullNameError] = useState({ err: false, msg: "" });
  const [userNameError, setUserNameError] = useState({ err: false, msg: "" });
  const [emailError, setEmailError] = useState({ err: false, msg: "" });
  const [curPasError, setCurPassError] = useState({ err: false, msg: "" });
  const [newPasError, setNewPasError] = useState({ err: false, msg: "" });
  const [confimrPasError, setConfirmPassError] = useState({
    err: false,
    msg: "",
  });

  const handleUpdateProfile = async () => {
    if (fullName === "") {
      setFullNameError({ err: true, msg: "Vui lòng nhập tên!" });
      setUserNameError({ err: false, msg: "" });
      setEmailError({ err: false, msg: "" });
      return;
    }
    if (userName === "") {
      setUserNameError({ err: true, msg: "Vui lòng nhập tên người dùng!" });
      setFullNameError({ err: false, msg: "" });
      setEmailError({ err: false, msg: "" });
      return;
    }
    if (!validateEmail(email)) {
      setEmailError({ err: true, msg: "Invalid email" });
      setFullNameError({ err: false, msg: "" });
      setUserNameError({ err: false, msg: "" });
      return;
    }
    const body = {
      fullName: fullName,
      userName: userName,
      email: email,
      status: status,
    };

    const res = await dispatch(editProfile(body));
    if (res?.payload?.status === 200) {
      dispatch(
        showModalMessage({
          type: "SUCCESS",
          msg: "Cập nhật thông tin cá nhân thành công!",
        })
      );
    } else {
      dispatch(
        showModalMessage({
          type: "ERROR",
          msg: "Email hoặc Tên người dùng đã tồn tại!",
        })
      );
    }
  };

  const handleReplacePassword = async () => {
    const body = {
      password: oldPassword,
      newPassword: newPassword,
    };
    if (oldPassword?.length < 6) {
      setCurPassError({
        err: true,
        msg: "Mật khẩu phải có ít nhất 6 kí tự",
      });
      setNewPasError({ err: false, msg: "" });
      setConfirmPassError({ err: false, msg: "" });
      return;
    }

    if (newPassword?.length < 6) {
      setNewPasError({
        err: true,
        msg: "Mật khẩu mới phải có ít nhất 6 kí tự",
      });
      setCurPassError({ err: false, msg: "" });
      setConfirmPassError({ err: false, msg: "" });
      return;
    }

    if (newPassword === oldPassword) {
      setNewPasError({
        err: true,
        msg: "Mật khẩu mới phải khác mật khẩu cũ!",
      });
      setCurPassError({ err: false, msg: "" });
      setConfirmPassError({ err: false, msg: "" });
      return;
    }

    if (confirmNewPass?.length < 6) {
      setConfirmPassError({
        err: true,
        msg: "Mật khẩu xác nhận phải có ít nhất 6 kí tự",
      });
      setNewPasError({ err: false, msg: "" });
      setCurPassError({ err: false, msg: "" });
      return;
    }

    if (confirmNewPass !== newPassword) {
      setConfirmPassError({
        err: true,
        msg: "Mật khẩu xác nhận không khớp với mật khẩu mới",
      });
      setNewPasError({ err: false, msg: "" });
      setCurPassError({ err: false, msg: "" });
      return;
    }

    setCurPassError({ err: false, msg: "" });
    setNewPasError({ err: false, msg: "" });
    setConfirmPassError({ err: false, msg: "" });
    const res = await dispatch(replacePassword(body));
    if (res?.error?.message === "Request failed with status code 404") {
      setCurPassError({ err: true, msg: "Mật khẩu không đúng!" });
      return;
    }
    if (res?.error?.message === "Network Error") {
      dispatch(
        showModalMessage({
          type: "ERROR",
          msg: "Lỗi Server!",
        })
      );
      return;
    }
    if (res?.payload?.status === 200) {
      dispatch(
        showModalMessage({
          type: "SUCCESS",
          msg: "Thay đổi mật khẩu thành công, Vui lòng đăng nhập lại!",
        })
      );
      dispatch(logout());
      localStorage.removeItem("persist:root");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="border" style={{ paddingTop: "6rem" }}>
        <div style={{ padding: "20px 0px" }}>
          <div className="edit_container">
            <div className="edit_option">
              <div
                onClick={() => {
                  setOption(1);
                }}
                className={option === 1 ? "active" : "option"}
              >
                Chỉnh sửa trang cá nhân
              </div>
              <div
                onClick={() => {
                  setOption(2);
                }}
                className={option === 2 ? "active" : "option"}
              >
                Đổi mật khẩu
              </div>
            </div>
            {option === 1 && (
              <div className="edit_box_data">
                <div className="edit_element">
                  <img
                    alt="element"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "30px",
                      marginLeft: "80px",
                    }}
                    src={`${infoUser?.avatar}`}
                  ></img>
                  <div>
                    <div className="edit_infoUser">{infoUser?.userName}</div>
                    {/* <div className="edit_avatar">Thay đổi ảnh đại diện</div> */}
                  </div>
                </div>

                <div className="edit_element">
                  <label className="edit_profile_label">Tên người dùng</label>
                  <div>
                    <input
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[A-Z\s]/g, "");
                        setUserName(value);
                      }}
                      value={userName}
                      className="edit_inputText"
                      type="text"
                    />
                    {userNameError.err && (
                      <div className="edit_profile_text_error">
                        {userNameError.msg}
                      </div>
                    )}
                  </div>
                </div>
                <div className="edit_element">
                  <label className="edit_profile_label">Email</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      className="edit_inputText"
                      type="text"
                    />
                    {emailError.err && (
                      <div className="edit_profile_text_error">
                        {emailError.msg}
                      </div>
                    )}
                  </div>
                </div>
                <div className="edit_element">
                  <label
                    style={{ marginRight: "20px" }}
                    className="edit_profile_label"
                  >
                    Phân khu
                  </label>
                   <br></br>
                  <input
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    type="radio"
                    id="subDiViSon"
                    name="subDiViSon"
                    value={1}
                    style={{ margin: "0px 5px" }}
                    defaultChecked={
                      infoUser?.subDiViSon === "Phân khu A" ? true : false
                    }
                  />
                  <label
                    className="text-success fw-bold"
                    for="subDiViSon"
                    style={{ marginRight: "30px" }}
                  >
                    Phân Khu A
                  </label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    type="radio"
                    id="subDiViSon"
                    name="subDiViSon"
                    value={0}
                    // eslint-disable-next-line react/jsx-no-duplicate-props

                    defaultChecked={
                      infoUser?.subDiViSon === "Phân khu B" ? true : false
                    }
                  />
                  <label className="text-danger fw-bold" for="subDiViSon">
                    Phân Khu B
                  </label>
                  <br></br>
                </div>
                <button onClick={handleUpdateProfile} className="edit_btn">
                  Lưu Thay Đổi
                </button>
              </div>
            )}
            {option === 2 && (
              <form className="edit_password" autoComplete="off">
                <div className="edit_element">
                  <img
                    alt="element"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "30px",
                      marginLeft: "80px",
                    }}
                    src={`${infoUser?.avatar}`}
                  ></img>
                  <div>
                    <div className="edit_infoUser">{infoUser?.userName}</div>
                  </div>
                </div>
                <div className="edit_element">
                  <label className="lb_pw edit_profile_label">
                    Mật khẩu cũ
                  </label>
                  <div>
                    <input
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                      defaultValue={""}
                      value={oldPassword}
                      className="edit_inputText"
                      type="password"
                      autoComplete="off"
                    />
                    {curPasError.err && (
                      <div className="edit_profile_text_error">
                        {curPasError.msg}
                      </div>
                    )}
                  </div>
                </div>
                <div className="edit_element">
                  <label className="lb_pw edit_profile_label">
                    Mật khẩu mới
                  </label>
                  <div>
                    <input
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      value={newPassword}
                      className="edit_inputText"
                      type="password"
                      autoComplete="off"
                    />
                    {newPasError.err && (
                      <div className="edit_profile_text_error">
                        {newPasError.msg}
                      </div>
                    )}
                  </div>
                </div>
                <div className="edit_element">
                  <label className="lb_pw edit_profile_label">
                    Xác nhận mật khẩu mới
                  </label>
                  <div>
                    <input
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                      }}
                      value={confirmNewPass}
                      className="edit_inputText"
                      type="password"
                    />
                    {confimrPasError.err && (
                      <div className="edit_profile_text_error">
                        {confimrPasError.msg}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleReplacePassword();
                  }}
                  className="edit_btn_pw"
                >
                  Đổi mật khẩu
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "200px" }}>
        <ButtonChat />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default EditProfile;
