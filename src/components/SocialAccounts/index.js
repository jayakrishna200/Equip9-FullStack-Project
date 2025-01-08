import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import './index.css'

const SocialAccounts = () => (
  <>
    <p className='or'>OR</p>
    <p>Login with social accounts</p>
    <div className='social-accounts-icons-cont'>
      <FaGoogle size='35' />
      <FaFacebook size='35' />
      <FaApple size='35' />
    </div>
  </>
);

export default SocialAccounts;