import React from "react";

const classes = {
  footer: {
    bottom: 0,
    zIndex: 5,
    backgroundColor: "#ffffff",
    borderTop: "1px solid #cccccc",
    boxSizing: "border-box",
    width: "100%",
    color: "#ffffff",
    verticalAlign: "middle",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "7vh",
  },
  footerTitle: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "110.5%",
    display: "flex",
    alignItems: "center",
    color: "#333333",
    paddingBottom: "5px",
  },
  footerTos: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "110.5%",
    display: "flex",
    alignItems: "center",
    color: "#0a72cb",
  },
  footerLabel: {
    backgroundImage: "url('../../img/footer-label.svg')",
    backgroundRepeat: "no-repeat",
    width: "321px",
    height: "13px",
	marginTop: "1vh",
    userSelect: "none",
    display: "inline-block",
  }
};

const Footer = ({ openTosModal, isTosOpen, isInternalUser }) => {
  return (
    <div style={classes.footer}>
      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={classes.footerLabel}></span>
        <span style={classes.footerTos} onClick={() => openTosModal()}>
          <strong>Terms of Service•Privacy Policy</strong>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
