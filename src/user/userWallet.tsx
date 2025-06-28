import UserNav from "../Components/UserNav";
import "./css/UserWallet.css";

const UserWallet = () => {
  return (
    <>
      <UserNav />
      <div className="main-content">
        <div className="balance-container">
          <p>Nbuy Cash</p>
          <p className="balance">
            NGN <span className="balance-number">6,132,600.72</span>
          </p>
        </div>
        <div className="payment-methods-container">
          <h2>Payments Methods</h2>
          <div className="payment-method">{/* user payment method */}</div>
          <div className="add-payment-method-cointainer">
            <p>+ Add payment method</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserWallet;
