import React from "react";
import "../css/signin-page.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

const SignInPage = (props) => {
  const lookupTitle = "Private Offer Lookup";
  const [isVerified, setIsVerified] = React.useState(false);
  const [isInputEmpty, setIsInputEmpty] = React.useState(false);
  const [inputs, setInputs] = React.useState({});

  const handleClick = () => {
    setIsVerified(!isVerified);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (value == "") {
      alert("please fill all details");
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(!isInputEmpty);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue =
      document.forms["signin-form"]["dealerCode" && "firstName" && "lastName"]
        .value;
    console.log(inputs);
    setInputs({});
    if (inputValue == "") {
      return false;
    }
  };
  return (
    <React.Fragment>
      <div className="lookup-view">
        <div className="form-view">
          <div className="lookup-title">{lookupTitle}</div>
          <div className="signin-form">
            <form name="signin-form">
              <fieldset>
                <div className="formFieldBox">
                  <label id="dealer-code" htmlFor="DealerCode">
                    Manufacturer Dealer Code
                    <input
                      type="text"
                      name="dealerCode"
                      id="dealerCode"
                      placeholder="Enter Code"
                      maxLength="15"
                      value={inputs.dealerCode || ""}
                      onChange={handleChange}
                    />
                    {/* {<span>error</span>} */}
                    <div className="tooltip">
                      <span className="dealerCode-help-icon"></span>
                      <span className="tooltiptext below-right">
                        Don't know your dealership code? Ask your sales manager
                        or general manager
                      </span>
                    </div>
                  </label>
                </div>
                <div className="formFieldBox">
                  <label htmlFor="FirstName">
                    Your First Name
                    <input
                      type="text"
                      name="firstName"
                      id="fname"
                      placeholder="Enter First Name"
                      maxLength="15"
                      value={inputs.firstName || ""}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="formFieldBox">
                  <label htmlFor="LastName">
                    Your Last Name
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter Last Name"
                      maxLength="15"
                      value={inputs.lastName || ""}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="reCaptha">
                  <ReCAPTCHA
                    onChange={handleClick}
                    sitekey={"6LelSPEiAAAAADP89JRzn38SX7IXZQyJuulIOWge"}
                  />
                </div>
              </fieldset>
            </form>
            <div className="form-footer">
              <Link to={"/"}>
                <div className="form-cancel-btn">Cancel</div>
              </Link>
              <Link to={"/lookupMethod"}>
                <div
                  className={
                    isVerified && isInputEmpty
                      ? "form-signin-btn"
                      : "form-signin-btn-disabled"
                  }
                  onClick={handleSubmit}
                >
                  Sign In
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
