import React from "react";

function Logo({ detailsData }) {
	return (
		<div
			style={{
				marginTop: "4.7vh",
				marginBottom: "4vh",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<span className="brandLogo"></span>
		</div>
	);
}

export default Logo;
