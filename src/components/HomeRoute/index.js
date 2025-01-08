import "./index.css";
import Header from "../Header";
import { Component } from "react";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


class HomeRoute extends Component {
  state = {
    firstName: "",
    lastName: "",
  };
  componentDidMount() {
    this.getUserDetails();
  }
  getUserDetails = async () => {
    const mobileNo = Cookies.get("mobile_no");
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://equip9-backend.onrender.com/user/${mobileNo}/`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const { first_name, last_name } = data;
    console.log(response)
    this.setState({ firstName: first_name, lastName: last_name });
  };
  render() {
    const { firstName, lastName } = this.state;
    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good Morning"
        : hour < 18
        ? "Good Afternoon"
        : "Good Evening";
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken === undefined) {
      <Navigate to='/login' />;
    }

    return (
      <div className='home-container'>
        <Header />
        <div className='home-content'>
          <div>
            <h1>
              {greeting} Mr. {firstName} {lastName}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeRoute;
