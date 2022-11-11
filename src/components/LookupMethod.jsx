import React from "react";
import "../css/lookup-method.css";
import Button from "../card/Button";
import { Link } from "react-router-dom";

const LookupMethod = () => {
  return (
    <React.Fragment>
      <div className="lookup-view">
        <div className="hero">
          <span>
            <h3 className="lookup-title">Lookup Method</h3>
          </span>
          <Link to={"/offerPromo"}>
            <Button>
              <span className="button_text">Offer/Promo Code</span>

              <span className="button_icon">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </span>
            </Button>
          </Link>

          <Link to={"/email"}>
          <Button>
            <span className="button_text">Customer Email</span>

            <span className="button_icon">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </span>
          </Button>
          </Link>

          <Link to={"/mobileNumber"}>
          <Button>
            <span className="button_text">Customer Mobile Number</span>

            <span className="button_icon">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </span>
          </Button>
          </Link>

          <Link to={"/customerDetails"}>
          <Button>
            <span className="button_text">Customer Name & Address</span>
            <span className="button_icon">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </span>
          </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LookupMethod;
