import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("mobile_no")
    navigate("/login");
  };
  return (
    <nav>
      <img
        src='https://res.cloudinary.com/dqzf8y0bc/image/upload/v1736335460/Screenshot_2025-01-08_165346_nmv3up.png'
        alt='website logo'
        className='website-logo-header'
      />
      <button type='button' onClick={onClickLogout} className='logout-button'>
        Logout
      </button>
    </nav>
  );
};

export default Header;
