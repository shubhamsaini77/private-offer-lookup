import React from "react";
import { Link } from "react-router-dom";
import Classes from "../css/offer-promo.module.css";

const CustomerEmail = () => {
  const submitHandler = () => {};
  return (
    <React.Fragment>
      <div className="lookup-view">
        <div className={Classes.hero}>
          <span className="lookup-title">Customer Email
          </span>
          {/* <div className={Classes.errorWarning}>
            <span className="warning-icon"></span>
            <span className={Classes.button_text}>
              Customer Information not found. Please try again.
            </span>
          </div> */}
          <form onSubmit={submitHandler}>
            <label>
              <p className={Classes.text}>Customer Email</p>
            </label>
            <div>
              <input className={Classes.input} type="text" id="" />
            </div>
              <button className={Classes.buttonContinue}>CONTINUE</button>
          </form>
          <Link to={"/lookupMethod"}>
            <button className={Classes.buttonCancel}>CANCEL</button></Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerEmail;
