import React from "react";
import "../css/toggleSwitch.css";

const ToggleSwitch = ({label}, props) => {
  const [tosAccepted, setTosAccepted] = React.useState(false)

  const toggleSwitch = () => {
    setTosAccepted(!tosAccepted)
  }
  return (
    <div className="container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" onClick={toggleSwitch} name={label} id={label} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
export default ToggleSwitch;
