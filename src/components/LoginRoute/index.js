import { Component } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import SocialAccounts from "../SocialAccounts";

import "./index.css";

function withNavigate(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class LoginRoute extends Component {
  state = {
    mobileNo: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    showPassword: false,
  };

  onChangeMobileNumber = (event) => {
    this.setState({ mobileNo: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { mobileNo } = this.state;
    Cookies.set("mobile_no", mobileNo, { expires: 30 });

    const { navigate } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    navigate("/", { replace: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { mobileNo, password } = this.state;
    const userDetails = { mobile_number: mobileNo, password };
    const url = "https://equip9-backend.onrender.com/login/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(response);
    console.log(data);

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken);
    } else {
      this.onSubmitFailure(data.message);
    }
  };
  changeShowPasswordStatus = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderPasswordField = () => {
    const { password, showPassword } = this.state;
    const passwordType = showPassword ? "text" : "password";

    return (
      <>
        <label className='input-label' htmlFor='password'>
          PASSWORD
        </label>
        <div className='password-input-container'>
          <input
            type={passwordType}
            id='password'
            className='password-input-field'
            value={password}
            onChange={this.onChangePassword}
            placeholder='Password'
          />
          <button
            className='show-password-btn'
            onClick={this.changeShowPasswordStatus}
            type='button'
          >
            {!showPassword && <IoMdEyeOff size='25' color='#64748b' />}
            {showPassword && <IoEye size='25' color='#64748b' />}
          </button>
        </div>
      </>
    );
  };

  renderMobileNumberField = () => {
    const { mobileNo } = this.state;

    return (
      <>
        <label className='input-label' htmlFor='mobile-number'>
          MOBILE NUMBER
        </label>
        <div className='mobile-num-input-container'>
          <input
            type='text'
            id='mobile-number'
            className='mobile-num-input-field'
            value={mobileNo}
            onChange={this.onChangeMobileNumber}
            placeholder='9876543210'
          />
        </div>
      </>
    );
  };

  onClickRegister = () => {
    this.props.navigate("/register", { replace: true });
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Navigate to='/' replace />;
    }

    return (
      <div className='login-form-container'>
        <img
          src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736324827/Screenshot_2025-01-07_184623_a2yl1e.png'
          className='login-website-logo-mobile-img'
          alt='website logo'
        />
        <img
          src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736334138/SaveClip.App_449766007_1180164039890703_1257474980195136244_n_d4tqy8.jpg'
          className='login-img'
          alt='website login'
        />
        <form className='form-container' onSubmit={this.submitForm}>
          <img
            src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736324827/Screenshot_2025-01-07_184623_a2yl1e.png'
            className='login-website-logo-desktop-img'
            alt='website logo'
          />
          <div className='input-container'>
            {this.renderMobileNumberField()}
          </div>
          <div className='input-container'>{this.renderPasswordField()}</div>
          <button type='submit' className='login-button'>
            Login
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
          <p>
            Don't have an account?
            <span className='suggest-msg' onClick={this.onClickRegister}>
              Register Here
            </span>
          </p>
          <SocialAccounts />
        </form>
      </div>
    );
  }
}

export default withNavigate(LoginRoute);
