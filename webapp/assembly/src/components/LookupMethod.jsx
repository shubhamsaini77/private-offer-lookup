import React from "react";
import "../css/lookup-method.css";
import "../css/signin-page.css";
import "../css/customer-details.css";
import Classes from "../css/offer-promo.module.css";
import PrivateOfferDetails from "./PrivateofferDetails";
import { useNavigate } from "react-router-dom";
import { stateOptions } from "../demoData/StateOptionsData";
import Logo from "./Logo";

const LookupMethod = ({ isTosOpen, isInternalUser }) => {
	const navigate = useNavigate();

	const [offerPromoCode, setOfferPromoCode] = React.useState(false);
	const [customerEmail, setCustomerEmail] = React.useState(false);
	const [customerMobileNumber, setCustomerMobileNumber] = React.useState(false);
	const [customerNameAddress, setCustomerNameAddress] = React.useState(false);
	const [error, setError] = React.useState("");
	const [responseData, setResponseData] = React.useState("");
	const [brandCode, setBrandCode] =React.useState("hello Brand code");
	const [promoCode, setPromoCode] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [mobNo, setMobNo] = React.useState("");
	const [cNameAddress, setCNameAddress] = React.useState({
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		zip: "",
	});
	const [isSuccess, setIsSuccess] = React.useState(false);
	function handleClick(targteName) {
		if (targteName === "OfferPromoCode") {
			setOfferPromoCode(!offerPromoCode);
			setCustomerEmail(false);
			setCustomerMobileNumber(false);
			setCustomerNameAddress(false);
		}
		if (targteName === "CustomerEmail") {
			setOfferPromoCode(false);
			setCustomerEmail(!customerEmail);
			setCustomerMobileNumber(false);
			setCustomerNameAddress(false);
		}
		if (targteName === "CustomerMobileNumber") {
			setOfferPromoCode(false);
			setCustomerEmail(false);
			setCustomerMobileNumber(!customerMobileNumber);
			setCustomerNameAddress(false);
		}

		if (targteName === "CustomerNameAddress") {
			setOfferPromoCode(false);
			setCustomerEmail(false);
			setCustomerMobileNumber(false);
			setCustomerNameAddress(!customerNameAddress);
		}
	}

	const handleSearch = async (e, payload) => {
		e.preventDefault();
		try {
			let res = await fetch(
				// "http://localhost:7778/eeqreact/rest/privateOffer/lookup",
				"https://iri1satvfl.execute-api.us-east-1.amazonaws.com/dev/lookuptest",
				{
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			let resJson = await res.json();
			if (res?.status === 200) {
				console.log(res.data);
				setResponseData(resJson);
				navigate("/lookupMethod/success");
				setIsSuccess(true);
			} else {
				setError(resJson?.error);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleStateChange = (e) => {
		console.log(e.target.value);
		setCNameAddress({
			...cNameAddress,
			state: e.target.value,
		});
	};
	const inputStyle = {
		background: "#FFFFFF",
		border: "1px solid #CCCCCC",
		boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.25)",
		borderRadius: "4px",
		marginTop: "8.37px",
		padding: "10px",
		width: "100%",
		// marginLeft: "5px",
		marginBottom: "10px",
	};
	const isBrand = true;
	return (
		<React.Fragment>
			{!isSuccess && (
				<>
					{/* <Logo detailsData={responseData} /> */}
					<div
						className="lookup-view"
						style={{
							display: isTosOpen ? "none" : "flex",
							marginTop: "7vh",
							marginBottom: "14vh",
							flexDirection: "column",
							height: customerNameAddress ? "auto" : "86vh"
						}}
					>
						<Logo detailsData={responseData} />
						<div
							className="hero"
							style={{ height: customerNameAddress ? "auto" : "500px" }}
						>
							<span className="lookup-title">Lookup Method</span>
							{error?.length > 0 && (
								<div className={Classes.errorWarning}>
									<span className="warning-icon"></span>
									<span className={Classes.button_text}>{error}</span>
								</div>
							)}
							<div className="method-btn">
								<div style={{ marginBottom: "10px", fontWeight: offerPromoCode ? 600 : 400 }}>
									<div className="radiobtn-container">
										<input
											style={{ marginRight: "10px", marginLeft: "0px" }}
											name="OfferPromoCode"
											type="radio"
											id="OfferPromoCode"
											className="checkmark"
											onClick={(e) => handleClick(e.target.name)}
											checked={offerPromoCode}
										/>
										<span className="checkmark"></span>
										<label style={{color: "#333333"}} htmlFor="OfferPromoCode">Offer/PromoCode</label>
									</div>

									{offerPromoCode && (
										<div>
											<input
												value={promoCode}
												onChange={(e) => {
													setPromoCode(e.target.value);
													setError("");
												}}
												id="lookup-input"
												style={inputStyle}
											/>
											<button
												style={{
													// marginLeft: "5px",
													width: "100%",
													marginBottom: "10px",
													// border: "none",
												}}
												className={
													promoCode.length > 0
														? "form-signin-btn"
														: "form-signin-btn btn-disabled"
												}
												name="Offer/Promo Code"
												onClick={(e) =>
													handleSearch(e, {
														lookupMethod: e.target.name,
														lookupReq: {
															promocode: promoCode,
															customerData: {
																firstName: "",
																lastName: "",
																email: "",
																mobNumber: "",
																address: "",
																city: "",
																state: "",
																zip: "",
															},
														},
													})
												}
											>
												Search
											</button>
										</div>
									)}
								</div>

								<div style={{ marginBottom: "10px", fontWeight: customerEmail ? 600 : 400 }}>
									<div className="radiobtn-container">
										<input
											style={{ marginRight: "10px", marginLeft: "0px" }}
											name="CustomerEmail"
											type="radio"
											id="CustomerEmail"
											onClick={(e) => handleClick(e.target.name)}
											checked={customerEmail}
										/>
										<span class="checkmark"></span>
										<label style={{color: "#333333"}} htmlFor="CustomerEmail">Customer Email</label>
									</div>

									{customerEmail && (
										<div>
											<input
												style={inputStyle}
												id="lookup-input"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
													setError("");
												}}
											/>
											<button
												className={
													email.length > 0
														? "form-signin-btn"
														: "form-signin-btn btn-disabled"
												}
												style={{
													// marginLeft: "5px",
													width: "100%",
													marginBottom: "10px",
													// border: "none",
												}}
												name="Customer Email"
												onClick={(e) =>
													handleSearch(e, {
														lookupMethod: e.target.name,
														lookupReq: {
															promocode: "",
															customerData: {
																firstName: "",
																lastName: "",
																email: email,
																mobNumber: "",
																address: "",
																city: "",
																state: "",
																zip: "",
															},
														},
													})
												}
											>
												Search
											</button>
										</div>
									)}
								</div>

								<div style={{ marginBottom: "10px", fontWeight: customerMobileNumber ? 600 : 400 }}>
									<div className="radiobtn-container">
										<input
											style={{ marginRight: "10px", marginLeft: "0px" }}
											name="CustomerMobileNumber"
											id="CustomerMobileNumber"
											type="radio"
											onClick={(e) => handleClick(e.target.name)}
											checked={customerMobileNumber}
										/>
										<span className="checkmark"></span>
										<label style={{color: "#333333"}} htmlFor="CustomerMobileNumber">
											Customer Mobile Number
										</label>
									</div>

									{customerMobileNumber && (
										<div>
											<input
												style={inputStyle}
												id="lookup-input"
												value={mobNo}
												onChange={(e) => {
													setMobNo(e.target.value);
													setError("");
												}}
											/>
											<button
												className={
													mobNo.length > 0
														? "form-signin-btn"
														: "form-signin-btn btn-disabled"
												}
												style={{
													// marginLeft: "5px",
													width: "100%",
													marginBottom: "10px",
													// border: "none",
												}}
												name="Customer Mobile Number"
												onClick={(e) =>
													handleSearch(e, {
														lookupMethod: e.target.name,
														lookupReq: {
															promocode: "",
															customerData: {
																firstName: "",
																lastName: "",
																email: "",
																mobNumber: mobNo,
																address: "",
																city: "",
																state: "",
																zip: "",
															},
														},
													})
												}
											>
												Search
											</button>
										</div>
									)}
								</div>

								<div style={{ marginBottom: "10px", fontWeight: customerNameAddress ? 600 : 400 }}>
									<div className="radiobtn-container">
										<input
											style={{ marginRight: "10px", marginLeft: "0px" }}
											name="CustomerNameAddress"
											id="CustomerNameAddress"
											type="radio"
											onClick={(e) => handleClick(e.target.name)}
											checked={customerNameAddress}
										/>
										<span className="checkmark"></span>
										<label style={{color: "#333333"}} htmlFor="CustomerNameAddress">
											Customer Name & Address
										</label>
									</div>

									{customerNameAddress && (
										<div>
											<div>
												<div className="wd-278">
													<div className="wd-133">
														<span>
															<label className="details-label">
																First Name
															</label>
															<input
																className="input-bx"
																id="lookup-input"
																value={cNameAddress.firstName}
																onChange={(e) => {
																	setCNameAddress({
																		...cNameAddress,
																		firstName: e.target.value,
																	});
																	setError("");
																}}
															></input>
														</span>
														<span>
															<label className="details-label">Last Name</label>
															<input
																className="input-bx"
																id="lookup-input"
																value={cNameAddress.lastName}
																onChange={(e) => {
																	setCNameAddress({
																		...cNameAddress,
																		lastName: e.target.value,
																	});
																	setError("");
																}}
															></input>
														</span>
													</div>
												</div>

												<div className="wd-277">
													<div>
														<label className="details-label">Address</label>
														<input
															className="input-bx"
															id="lookup-input"
															value={cNameAddress.address}
															onChange={(e) => {
																setCNameAddress({
																	...cNameAddress,
																	address: e.target.value,
																});
																setError("");
															}}
														></input>
													</div>
													<div>
														<label className="details-label">City</label>
														<input
															className="input-bx"
															id="lookup-input"
															value={cNameAddress.city}
															onChange={(e) => {
																setCNameAddress({
																	...cNameAddress,
																	city: e.target.value,
																});
																setError("");
															}}
														></input>
													</div>
												</div>
												<div id="wd-278">
													<div className="wd-133">
														<span style={{ width: "50%" }}>
															<label htmlFor="state" className="details-label">
																State
															</label>
															<div className="styled-select">
																<select
																	id="input-bx"
																	className="styled-icon"
																	onChange={handleStateChange}
																	value={cNameAddress.state}
																>
																	{stateOptions.map((elem) => (
																		<option key={elem.key} value={elem.key}>
																			{elem.value}
																		</option>
																	))}
																	<span className="dropdown-icon"></span>
																</select>
															</div>
														</span>
														<span style={{ width: "50%" }}>
															<label className="details-label">ZIP</label>
															<input
																id="input-bx"
																value={cNameAddress.zip}
																onChange={(e) => {
																	setCNameAddress({
																		...cNameAddress,
																		zip: e.target.value,
																	});
																	setError("");
																}}
															></input>
														</span>
													</div>
												</div>
												<button
													className={
														cNameAddress.firstName.length &&
														cNameAddress.lastName.length &&
														cNameAddress.address.length &&
														cNameAddress.city.length &&
														cNameAddress.state.length &&
														cNameAddress.zip.length
															? "form-signin-btn"
															: "form-signin-btn btn-disabled"
													}
													style={{
														// marginLeft: "5px",
														width: "100%",
														marginBottom: "10px",
														// border: "none",
													}}
													name="Customer Name & Address"
													onClick={(e) =>
														handleSearch(e, {
															lookupMethod: e.target.name,
															lookupReq: {
																promocode: "",
																customerData: {
																	firstName: cNameAddress.firstName,
																	lastName: cNameAddress.lastName,
																	email: "",
																	mobNumber: "",
																	address: cNameAddress.address,
																	city: cNameAddress.city,
																	state: cNameAddress.state,
																	zip: cNameAddress.zip,
																},
															},
														})
													}
												>
													Search
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{isSuccess && (
				<PrivateOfferDetails
					isInternalUser={isInternalUser}
					detailsData={responseData}
					lookupSuccess={setIsSuccess}
					emptyError={setError}
					emptyPromoCode={setPromoCode}
					emptyEmail={setEmail}
					emptyMobNo={setMobNo}
					emptyCNameAddress={setCNameAddress}
					setOfferPromoCode={setOfferPromoCode}
					setCustomerEmail={setCustomerEmail}
					setCustomerMobileNumber={setCustomerMobileNumber}
					setCustomerNameAddress={setCustomerNameAddress}
					isTosOpen={isTosOpen}
				/>
			)}
		</React.Fragment>
	);
};

export default LookupMethod;
