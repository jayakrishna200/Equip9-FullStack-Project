import { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

import SocialAccounts from "../SocialAccounts";

function withNavigate(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class RegisterRoute extends Component {
  state = {
    firstName: "",
    lastName: "",
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

  onChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  onChangeLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  onSubmitSuccess = (data) => {
    const { navigate } = this.props;
    navigate("/login");
  };

  onSubmitFailure = (data) => {
    const errorMsg = data.message;
    this.setState({ showSubmitError: true, errorMsg });
    console.log(data);
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { firstName, lastName, mobileNo, password } = this.state;
    const userDetails = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNo,
      password: password,
    };
    console.log(userDetails);
    const url = "https://equip9-backend.onrender.com/register/";
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
    if (response.ok === true) {
      this.onSubmitSuccess(data);
    } else {
      this.onSubmitFailure(data);
    }
  };

  changeShowPasswordStatus = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderNameField = () => {
    return (
      <>
        <div className='first-name-input-cont'>
          <label className='input-label' htmlFor='first-name'>
            FIRST NAME
          </label>
          <input
            type='text'
            id='first-name'
            className='first-name-input-field'
            placeholder='First Name'
            onChange={this.onChangeFirstName}
          />
        </div>
        <div className='last-name-input-cont'>
          <label className='input-label' htmlFor='last-name'>
            LAST NAME
          </label>
          <input
            type='text'
            id='last-name'
            className='last-name-input-field'
            placeholder='Last Name'
            onChange={this.onChangeLastName}
          />
        </div>
      </>
    );
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

  render() {
    const { showSubmitError, errorMsg } = this.state;

    return (
      <div className='register-form-container'>
        <img
          src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736324827/Screenshot_2025-01-07_184623_a2yl1e.png'
          className='register-website-logo-mobile-image'
          alt='website logo'
        />
        <img
          src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736330917/SaveClip.App_449494502_1003235201192425_526729144808334581_n_ue8z4m.jpg'
          className='register-image'
          alt='website login'
        />
        <form className='form-container' onSubmit={this.submitForm}>
          <img
            src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736324827/Screenshot_2025-01-07_184623_a2yl1e.png'
            className='register-website-logo-desktop-image'
            alt='website logo'
          />
          <div className='name-input-container'>{this.renderNameField()}</div>
          <div className='input-container'>
            {this.renderMobileNumberField()}
          </div>
          <div className='input-container'>{this.renderPasswordField()}</div>
          <button type='submit' className='register-button'>
            Register
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
          <p>
            Already Registered?
            <span
              className='redirect-to-login'
              type='button'
              onClick={this.onSubmitSuccess}
            >
              Login
            </span>
          </p>
          <SocialAccounts />
        </form>
      </div>
    );
  }
}

export default withNavigate(RegisterRoute);
