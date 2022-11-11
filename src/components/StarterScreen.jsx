import React from "react";
import "../css/starterScreen.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TermsOfService from "./TermsOfService";

const StarterScreen = (props) => {
  const lookupTitle = "Private Offer Lookup";
  const label = "Terms of Service";

  const [tosAccepted, setTosAccepted] = React.useState(false);
  const [openTos, setOpenTos] = React.useState(false);

  const toggleSwitch = (props) => {
    setTosAccepted(!tosAccepted);
  };
  const openTosModal = () => {
    setOpenTos(true);
    let body = document.getElementsByTagName("body")[0];
    // body.style.backgroundColor =  "rgba(0, 0, 0, 0.6)"
  };

  return (
    <React.Fragment>
      <div className="lookup-view">
        <div className="lookup">
          <div className="lookup-title">{lookupTitle}</div>
          <div className="starting-logo"></div>
          <div className="tos">
            <span className="tos-line">I agree to the</span>
            <span className="tosSwitch">
              <div className="container">
                <span className="tos-label" onClick={openTosModal}>
                  {label}
                </span>{" "}
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onClick={toggleSwitch}
                    name={label}
                    id={label}
                  />
                  <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                  </label>
                </div>
              </div>
            </span>
          </div>
          <Link to={tosAccepted ? "/signin" : null}>
            <div
              className={
                tosAccepted ? "getStartedbtn" : "getStartedbtn-disabled"
              }
            >
              <div className="btn-label">get started</div>
            </div>
          </Link>
        </div>
      </div>
      {openTos && <TermsOfService closeTos={setOpenTos} />}
    </React.Fragment>
  );
};
export default StarterScreen;
