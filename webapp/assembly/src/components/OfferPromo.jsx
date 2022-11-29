import React from "react";
import { Link } from "react-router-dom";
import Classes from "../css/offer-promo.module.css";

const OfferPromo = () => {
  const submitHandler = () => {};
  return (
    <React.Fragment>
      <div className="lookup-view">
        <div className={Classes.hero}>
          <span className="lookup-title">Offer/Promo Code</span>
          {/* <div className={Classes.errorWarning}>
            <span className="warning-icon"></span>
            <span className={Classes.button_text}>
              Customer Information not found. Please try again.
            </span>
          </div> */}
            <form onSubmit={submitHandler}>
              <label>
                <p className={Classes.text}>Offer/Promo Code</p>
              </label>
              <div>
                <input placeholder="ABCD1234" className={Classes.input} type="text" id="" />
              </div>
              <Link to={"/privateOfferDetails"}>
              <button className={Classes.buttonContinue}>continue</button>
              </Link>
            </form>
            <Link to={"/lookupMethod"}>
              <button className={Classes.buttonCancel}>CANCEL</button>
            </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OfferPromo;
