import React from "react";
import "../../css/customer-details.css";
import { Link } from "react-router-dom";
import { stateOptions } from "../../demoData/StateOptionsData";

const CustomerDetails = () => {
  const submitHandler = () => {};

  return (
    <React.Fragment>
      <div className="lookup-view">
        <div className="customerDetails-body">
          <span className="lookup-title">Customer Name & Address</span>
          <form onSubmit={submitHandler}>
            <div className="wd-278">
              <div className="wd-133">
                <span>
                  <label className="details-label">First Name</label>
                  <input className="input-bx"></input>
                </span>
                <span>
                  <label className="details-label">Last Name</label>
                  <input className="input-bx"></input>
                </span>
              </div>
            </div>

            <div className="wd-277">
              <div>
                <label className="details-label">Address</label>
                <input className="input-bx"></input>
              </div>
              <div>
                <label className="details-label">City</label>
                <input className="input-bx"></input>
              </div>
            </div>
            <div id="wd-278">
              <div className="wd-133">
                <span>
                  <label htmlFor="state" className="details-label">
                    State
                  </label>
                  <div className="styled-select">
                    <select id="input-bx" className="styled-icon">
                      {stateOptions.map((elem) => (
                        <option key={elem.key} value={elem.key}>
                          {elem.value}
                        </option>
                      ))}
                      <span className="dropdown-icon"></span>
                    </select>
                  </div>
                </span>
                <span>
                  <label className="details-label">ZIP</label>
                  <input id="input-bx"></input>
                </span>
              </div>
            </div>
            <button className="detailsContinue-btn">continue</button>
          </form>
          <Link to={"/lookupMethod"}>
            <button className="detailsCancel-btn">CANCEL</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CustomerDetails;
