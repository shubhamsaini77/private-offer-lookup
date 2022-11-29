import React from "react";

function Modal({ open, children }) {
	if (!open) return null;
	return (
		<div
			style={{
				height: "85vh",
				marginTop: "7vh",
				marginBottom: "1vh",
				display: "table-cell",
				verticalAlign: "middle",
			}}
		>
			{children}
		</div>
	);
}

export default Modal;
