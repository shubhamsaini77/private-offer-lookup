import React from "react";
import "../css/starterScreen.css";
import { useNavigate } from "react-router-dom";
import TermsOfService from "./TermsOfService";

const StarterScreen = ({ openTosModal, isTosOpen, isInternalUser }) => {
	const navigate = useNavigate();
	const lookupTitle = "Private Offer Lookup";
	const label = "Terms of Service";

	const [tosAccepted, setTosAccepted] = React.useState(false);
	const [openTos, setOpenTos] = React.useState(false);

	const toggleSwitch = (props) => {
		setTosAccepted(!tosAccepted);
	};

	return (
		<React.Fragment>
			<div
				className="lookup-view"
				style={{ display: isTosOpen ? "none" : "flex" }}
			>
				<div className="lookup">
					<div className="lookup-title">{lookupTitle}</div>
					<div className="starting-logo"></div>
					{!isInternalUser && (
						<div className="tos">
							<span className="tos-line">I agree to the</span>
							<span className="tosSwitch">
								<div className="container">
									<span className="tos-label" onClick={() => openTosModal()}>
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
					)}

					<div
						className={
							isInternalUser
								? "getStartedbtn"
								: tosAccepted
								? "getStartedbtn"
								: "getStartedbtn-disabled"
						}
						onClick={() =>
							isInternalUser
								? navigate("/lookupMethod")
								: tosAccepted
								? navigate("/signin")
								: null
						}
					>
						<div className="btn-label">get started</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default StarterScreen;
