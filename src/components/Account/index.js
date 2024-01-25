import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const Logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="Account_container">
      <Header />
      <div className="Account_card">
        <h1 className="Account">Account</h1>
        <hr className="hr1" />
        <p className="Member_ship">Member ship</p>
        <p className="gmail">rahul@gmail.com</p>
        <p className="Password">Password : ************</p>
        <hr className="hr2" />
        <p className="plain_details">Plan details</p>
        <p className="premium">Premium </p>
        <p className="ultra_hd">Ultra HD</p>
        <hr className="hr3" />
        <button className="logout_button" type="button" onClick={Logout}>
          Logout
        </button>
      </div>
      <div className="account_footer">
        <Footer />
      </div>
    </div>
  )
}
export default Account
