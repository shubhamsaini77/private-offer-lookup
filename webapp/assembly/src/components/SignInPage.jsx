import React from "react";
import "../css/signin-page.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { signIn } from "../service/PrivateOfferService";
import LookupMethod from "./LookupMethod";
import { useNavigate } from "react-router-dom";
import Classes from "../css/offer-promo.module.css";
// import PrivateOfferService from "../service/PrivateOfferService";

const SignInPage = ({ isTosOpen }) => {
	const navigate = useNavigate();
	const lookupTitle = "Private Offer Lookup";
	const [isVerified, setIsVerified] = React.useState(false);
	const [inputs, setInputs] = React.useState({});
	const [shouldSignIn, setShouldSignIn] = React.useState(false);
	const [error, setError] = React.useState("");
	const [resData, setResData] = React.useState("");
	// const res = PrivateOfferService.signInRes;
	// const responseData = PrivateOfferService.signInResponseData;
	const handleClick = () => {
		setIsVerified(!isVerified);
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	let handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch(
				// "http://localhost:7778/eeqreact/rest/privateOffer/login",
				"https://iri1satvfl.execute-api.us-east-1.amazonaws.com/dev/logintest",
				{
					method: "POST",
					body: JSON.stringify({
						dealerCode: inputs.dealerCode,
						customerFirstName: inputs.firstName,
						customerLastName: inputs.lastName,
						attested: true,
						captchaUsed: true,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			let resJson = await res.json();
			if (res?.status === 200) {
				setResData(resJson);
				console.log(resData);
				setInputs({});
				navigate("/lookupMethod");
			} else {
				setError(resJson?.error);
			}
		} catch (err) {
			console.log(err);
		}
		// PrivateOfferService.signIn(inputs);
		// console.log({ res, responseData });
	};
	return (
		<React.Fragment>
			{shouldSignIn === false && (
				<div
					className="lookup-view"
					style={{ display: isTosOpen ? "none" : "flex" }}
				>
					<div className="form-view">
						<div className="lookup-title">{lookupTitle}</div>
						{error?.length > 0 && (
							<div className={Classes.errorWarning}>
								<span className="warning-icon"></span>
								<span className={Classes.button_text}>{error}</span>
							</div>
						)}
						<div className="signin-form">
							<form name="signin-form" onSubmit={handleSubmit}>
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
												required
												value={inputs.dealerCode || ""}
												onChange={handleChange}
											/>
											<div className="tooltip">
												<span className="dealerCode-help-icon"></span>
												<span className="tooltiptext below-right">
													Don't know your dealership code? Ask your sales
													manager or general manager
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
												required
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
												required
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
								{/* <Link to={"/"}> */}
									<button onClick={()=> navigate("/")} className="form-cancel-btn">Cancel</button>
								{/* </Link> */}
								{/* <Link to={fromSignInLinkTo}> */}
								<button
									onClick={handleSubmit}
									type="submit"
									className={
										isVerified &&
										inputs.dealerCode &&
										inputs.firstName &&
										inputs.lastName
											? "form-signin-btn"
											: "form-signin-btn btn-disabled"
									}
								>
									Sign In
								</button>
								{/* </Link> */}
							</div>
						</div>
					</div>
				</div>
			)}

			{shouldSignIn === true && <LookupMethod />}
		</React.Fragment>
	);
};

export default SignInPage;
