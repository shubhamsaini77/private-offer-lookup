import React from "react";

const classes = {
	commonHeader: {
		display: "flex",
		backgroundColor: "#593487",
		width: "100%",
		color: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
		height: "7vh",
		position: "fixed",
		zIndex: 999,
	},
	headerLogo: {
		display: "flex",
		flexDirection: "column",
		margin: "0px 0.96px",
	},
	headerLogoUp: {
		backgroundRepeat: "no-repeat",
		height: "14.033844947814941px",
		width: "32.246686935424805px",
		borderRadius: "0px",
		userSelect: "none",
	},
	headerLogoDown: {
		backgroundRepeat: "no-repeat",
		height: "2.2196388244628906px",
		width: "32.246686935424805px",
		borderRadius: "0px",
		userSelect: "none",
	},
	headerName: {
		fontSize: "26px",
		fontStyle: "italic",
		fontWeight: 400,
		fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
	},
};

const Header = () => {
	const headerName = "Mastermind";
	return (
		<div style={classes.commonHeader}>
			<div style={classes.headerLogo}>
				<span className="header-logo-up" style={classes.headerLogoUp}></span>
				<span
					className="header-logo-down"
					style={classes.headerLogoDown}
				></span>
			</div>
			<div style={classes.headerName}>{headerName}</div>
		</div>
	);
};

export default Header;
