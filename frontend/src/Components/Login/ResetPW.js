import React from "react";

const ResetPw = ({
  Password,
  onChangePassword,
  isPassword,
  passwordMessage,
  PasswordCheck,
  onChangePasswordCheck,
  isPasswordCheck,
  passwordCheckMessage,
  ResetPw,
}) => {
  //이 페이지에서는 이전에 넘어온 이름, 이메일 정보를 가지고 있어야합니다.
  console.log(Password);
  console.log(isPassword);
  console.log(isPasswordCheck);
  return (
    <>
      비밀번호 재설정 페이지.
      <form onSubmit={ResetPw}>
        <label className="signupform-label">Password</label>
        <div>
          <input
            type="password"
            value={Password}
            onChange={onChangePassword}
            className="signup-input"
          ></input>
          <p className="signup-message">
            {
              <span className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </span>
            }
          </p>
        </div>
        <label className="signupform-label">Password Check</label>
        <div>
          <input
            type="password"
            value={PasswordCheck}
            onChange={onChangePasswordCheck}
            className="signup-input"
          ></input>
          <p className="signup-message">
            {
              <span
                className={`message ${isPasswordCheck ? "success" : "error"}`}
              >
                {passwordCheckMessage}
              </span>
            }
          </p>
        </div>
        <button
          type="submit"
          disabled={!(isPassword && isPasswordCheck)}
          className="signup-button"
        >
          변경하기
        </button>
      </form>
    </>
  );
};

export default ResetPw;
