import React from "react";
import "../css/privateOffer-details.css";
import { useNavigate } from "react-router-dom";
import "../css/signin-page.css";
import "../css/customer-details.css";
import Classes from "../css/offer-promo.module.css";
import moment from "moment";

const PrivateOfferDetails = ({
	detailsData,
	lookupSuccess,
	emptyError,
	isInternalUser,
	emptyPromoCode,
	emptyEmail,
	emptyMobNo,
	emptyCNameAddress,
	setOfferPromoCode,
	setCustomerEmail,
	setCustomerMobileNumber,
	setCustomerNameAddress,
	isTosOpen,
}) => {
	const data = detailsData ? detailsData : {};
	const [requestPayload, setRequestPayload] = React.useState({
		email: "",
		mobileNumber: "",
		lookupResponse: detailsData,
	});
	const [error, setError] = React.useState("");
	const [isSuccess, setIsSuccess] = React.useState("");
	const [isPartialSuccess, setIsPartialSuccess] = React.useState(false);
	const [responseData, setResponseData] = React.useState("");
	let hideEmail = function (email) {
		// return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
		// 	for (let i = 0; i < gp3.length; i++) {
		// 		gp2 += "*";
		// 	}
		// 	return gp2;
		// });
		//     const [name, domain] = email.split("@");

		//     const { length: dom } = domain;

		//     const { length: len } = name;

		//     const maskedName =
		//       name[0] + name[1] + "*****" + name[len - 2] + name[len - 1];

		//     const maskedDomain =
		//       domain[0] +
		//       domain[1] +
		//       domain[2] +
		//       "*****" +
		//       domain[dom - 4] +
		//       domain[dom - 3] +
		//       domain[dom - 2] +
		//       domain[dom - 1];

		//     const maskedEmail = maskedName + "@" + maskedDomain;

		//     return maskedEmail;

		let maskedEmail = email.replace(
			/(^[^@]{2})?(@[^.]{3})?.(?=([^@]{2,}@)|([^@]*\.[^.]+$))/gm,
			"$1$2*"
		);

		return maskedEmail;
	};
	const navigate = useNavigate();
	const navigateToLookup = () => {
		emptyError("");
		emptyPromoCode("");
		emptyEmail("");
		emptyMobNo("");
		emptyCNameAddress({
			firstName: "",
			lastName: "",
			address: "",
			city: "",
			state: "",
			zip: "",
		});
		setOfferPromoCode(false);
		setCustomerEmail(false);
		setCustomerMobileNumber(false);
		setCustomerNameAddress(false);
		navigate("/lookupMethod");
		lookupSuccess(false);
	};
	const handleCheckboxChange = (e) => {
		if (e.target.checked) {
			// e.preventDefault();
			if (e.target.value === "Text Offer") {
				setRequestPayload({
					...requestPayload,
					mobileNumber: data.customerData.mobNumber,
				});
			}
			if (e.target.value === "Email Offer") {
				setRequestPayload({
					...requestPayload,
					email: data.customerData.email,
				});
			}
		} else {
			if (e.target.value === "Text Offer") {
				setRequestPayload({
					...requestPayload,
					mobileNumber: "",
				});
			}
			if (e.target.value === "Email Offer") {
				setRequestPayload({
					...requestPayload,
					email: "",
				});
			}
		}
	};
	const handleSend = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch(
				// "http://localhost:7778/eeqreact/rest/privateOffer/sendOfferDetails",
				"https://iri1satvfl.execute-api.us-east-1.amazonaws.com/dev/sendemailtest",

				{
					method: "POST",
					body: JSON.stringify(requestPayload),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			let resJson = await res.json();
			if (res?.status === 200) {
				setResponseData(resJson);
				setIsPartialSuccess(false);
				setIsSuccess(true);
			} else {
				setError(resJson?.error);
				// setIsSuccess(""); // nedd to discuss
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<React.Fragment>
			<div
				className="lookup-view"
				style={{ display: isTosOpen ? "none" : "flex" }}
			>
				<div className="success-body">
					<div className="private-incentive-logo">
						<svg
							width="75"
							height="75"
							viewBox="0 0 75 75"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16.0811 33.5118C16.0766 29.9586 16.894 26.4525 18.4694 23.2676C20.0449 20.0828 22.3357 17.3055 25.1627 15.153C27.9897 13.0005 31.2763 11.5311 34.7655 10.8597C38.2547 10.1882 41.8519 10.333 45.2759 11.2827C48.6998 12.2324 51.8577 13.9612 54.5026 16.3339C57.1475 18.7067 59.2076 21.6591 60.522 24.9603C61.8364 28.2615 62.3694 31.8219 62.0792 35.3633C61.7891 38.9046 60.6837 42.3309 58.8496 45.3741L58.9188 45.342C60.3215 44.6679 61.8578 44.3174 63.4141 44.3164C63.7864 44.3191 64.1584 44.3405 64.5286 44.3806C66.142 40.6105 66.8963 36.5286 66.7369 32.4309C66.5774 28.3332 65.5082 24.3223 63.6067 20.6889C61.7053 17.0556 59.0192 13.8908 55.7432 11.4241C52.4672 8.95733 48.6834 7.25041 44.6661 6.42703C40.6488 5.60366 36.4986 5.68446 32.5164 6.66359C28.5342 7.64272 24.8197 9.49564 21.6422 12.088C18.4648 14.6804 15.9039 17.9473 14.1453 21.6519C12.3867 25.3565 11.4744 29.406 11.4746 33.5069C11.4725 37.466 12.3273 41.3787 13.9805 44.9762C15.4096 44.3214 16.9382 43.9104 18.503 43.7603C16.9095 40.5791 16.0802 37.0699 16.0811 33.5118Z"
								fill="#593487"
							/>
							<path
								d="M49.4638 38.8001C49.4611 36.5665 48.5727 34.4252 46.9933 32.8458C45.414 31.2665 43.2726 30.378 41.0391 30.3754H37.1913C36.6197 30.3754 36.0716 30.1484 35.6675 29.7442C35.2633 29.3401 35.0363 28.792 35.0363 28.2204C35.0363 27.6489 35.2633 27.1008 35.6675 26.6966C36.0716 26.2925 36.6197 26.0654 37.1913 26.0654H49.4638V19.7784H42.6108V15.8243H36.3238V19.8402C34.1749 20.0619 32.1933 21.1006 30.7884 22.7418C29.3835 24.3829 28.6628 26.501 28.7751 28.6584C28.8874 30.8158 29.8242 32.8476 31.3919 34.334C32.9596 35.8204 35.0383 36.6477 37.1987 36.6451H41.0465C41.618 36.6451 42.1662 36.8721 42.5703 37.2763C42.9744 37.6804 43.2015 38.2285 43.2015 38.8001C43.2015 39.3716 42.9744 39.9198 42.5703 40.3239C42.1662 40.728 41.618 40.9551 41.0465 40.9551H28.774V45.6901C29.2114 45.868 29.6538 46.0583 30.106 46.261C30.9611 46.6514 33.8352 47.1111 39.1238 47.1111C40.0407 47.1111 40.6387 47.0938 40.6461 47.0938H40.7969C41.1206 47.0938 41.5581 47.1086 42.0696 47.1556C44.1084 46.9027 45.9848 45.9142 47.3463 44.3757C48.7077 42.8372 49.4607 40.8545 49.4638 38.8001Z"
								fill="#593487"
							/>
							<path
								d="M37.5423 58.6323H36.9047H36.8725L36.2893 58.6447H36.2152L35.7061 58.6595H35.6468L35.1871 58.6793H35.155C34.8584 58.6917 34.6113 58.7065 34.4136 58.7188L34.1665 58.7361L33.9416 58.7534H33.9218H33.8304C33.8016 58.7559 33.7726 58.7559 33.7439 58.7534H33.6178C33.5704 58.7462 33.5233 58.7363 33.477 58.7238L33.3633 58.6892L33.2372 58.6373L33.1285 58.5829C33.0901 58.5594 33.053 58.5338 33.0173 58.5063L32.9951 58.4915C32.9685 58.4739 32.9429 58.455 32.9184 58.4346C32.8863 58.405 32.8542 58.3729 32.8245 58.3407L32.8048 58.3185C32.7821 58.2966 32.7606 58.2735 32.7405 58.2493C32.7133 58.2147 32.6886 58.1751 32.6639 58.1381L32.6466 58.1109C32.6291 58.0856 32.6135 58.0592 32.5997 58.0318C32.5753 57.9829 32.5538 57.9325 32.5354 57.8811C32.5181 57.8415 32.5082 57.8143 32.4983 57.7872C32.4763 57.7061 32.4606 57.6235 32.4514 57.54V57.5153C32.4217 57.1555 32.5346 56.7984 32.7658 56.5211C32.9969 56.2437 33.3278 56.0683 33.687 56.0325H33.7711L33.9515 56.0177H33.9811L34.2282 56.0004H34.29L34.636 55.9806L35.0734 55.9584H35.1006L35.5776 55.9386H35.6517L36.1806 55.9238H36.2671L36.8651 55.9114H36.922H37.609H37.6337H38.3578H38.5506H39.1313H39.3216H39.418L39.9493 55.9312L40.2755 55.946L40.8069 55.9732L41.1504 55.993L41.7039 56.0325H41.7929L42.04 56.0498L42.6603 56.1067H42.7691L42.9594 56.124C43.2609 56.1536 43.5648 56.1857 43.8713 56.2228H43.896C44.0599 56.2433 44.225 56.2532 44.3903 56.2525H44.4644C44.508 56.255 44.5518 56.255 44.5954 56.2525H44.672C44.7832 56.2525 44.8919 56.2376 44.9957 56.2203L45.1638 56.1857H45.1959C45.2898 56.166 45.3837 56.1437 45.4727 56.1165L45.658 56.0325C45.7421 56.0004 45.8211 55.9658 45.9052 55.9287C45.9892 55.8917 46.0139 55.8768 46.0683 55.8472C46.1227 55.8175 46.2116 55.7607 46.2783 55.7162L46.3031 55.7014C46.3426 55.6742 46.3821 55.6495 46.4167 55.6223C46.4513 55.5951 46.5428 55.5185 46.6046 55.4666L46.6466 55.4271L46.7158 55.3653C46.7751 55.306 46.8294 55.2417 46.8838 55.1799L46.9258 55.1305L46.9604 55.091C47.0303 55.0007 47.0939 54.9058 47.1507 54.8068V54.7944C47.3214 54.4959 47.4243 54.1634 47.4522 53.8207C47.4869 53.2232 47.3004 52.6338 46.9283 52.1649L46.7578 51.94C46.551 51.7616 46.3331 51.5965 46.1053 51.4458C46.0633 51.4186 46.0189 51.3939 45.9768 51.3716L45.8582 51.3024L45.7816 51.253C45.6383 51.1665 45.5048 51.0825 45.3689 51.0059L45.186 50.9219L45.055 50.865L44.9389 50.8107C44.8252 50.7563 44.7115 50.7044 44.5929 50.6574C44.5237 50.6302 44.452 50.608 44.3804 50.5833L44.2445 50.5388L44.1184 50.4943C44.0122 50.4573 43.9059 50.4202 43.7971 50.3881C43.6884 50.3559 43.6439 50.3485 43.5648 50.3312L43.4339 50.2991L43.3103 50.267C43.204 50.2398 43.1002 50.2126 42.9989 50.1928C42.8976 50.1731 42.8358 50.1632 42.7518 50.1508L42.6307 50.131L42.5096 50.1113C42.4083 50.094 42.3094 50.0742 42.2106 50.0618L41.9634 50.0371H41.8473L41.7311 50.0248L41.4543 50.0001H41.222H41.1183H40.9972H40.7352H40.2928H39.0992C38.7705 50.0001 38.427 50.0001 38.0588 50.0001H37.9426H37.4063H37.3643L36.7638 49.9852H36.6304L36.0768 49.9679H35.9853L35.3502 49.9408H35.2563H35.2069L34.6558 49.9086H34.5965H34.5322L33.8872 49.8641H33.8057H33.7538C33.5733 49.8518 33.3929 49.8345 33.215 49.8172H33.1804H33.0692C32.8591 49.7974 32.6491 49.7752 32.444 49.7505H32.3797H32.3328L31.8187 49.6837L31.6704 49.6615C31.4727 49.6343 31.28 49.6022 31.0922 49.5701H31.0427H31.0106L30.5336 49.4786L30.4002 49.449C30.2247 49.4094 30.0542 49.3699 29.8936 49.3279H29.8689C29.7082 49.2834 29.5674 49.2414 29.4339 49.1969L29.3227 49.1573C29.1546 49.098 29.0237 49.0461 28.91 48.9942C28.48 48.7982 28.0483 48.6137 27.615 48.4407L27.3679 48.3443L27.2023 48.2825C26.9255 48.1738 26.6487 48.065 26.3794 47.9686L26.0705 47.8624L25.9197 47.8105C25.6726 47.7289 25.4427 47.6498 25.2104 47.5782L24.8397 47.467L24.7508 47.4423C24.5308 47.378 24.3134 47.3162 24.1008 47.2619L23.6634 47.037C23.4583 46.99 23.2556 46.9455 23.0579 46.906L22.6329 46.8244C22.4401 46.7898 22.2498 46.7602 22.062 46.733C21.9261 46.7132 21.7926 46.6935 21.6592 46.6786C21.4763 46.6564 21.2959 46.6391 21.118 46.6243H21.0413L20.7423 46.602C20.5644 46.602 20.3889 46.5872 20.2159 46.5847H19.8848C19.5512 46.5847 19.22 46.5995 18.8963 46.6267L18.7628 46.6416H18.6738C18.4267 46.6687 18.1796 46.7033 17.9324 46.7454L17.8484 46.7577L17.7001 46.7849C17.3986 46.8442 17.1144 46.9109 16.8525 46.9826L16.766 47.0098L16.6869 47.0345C16.462 47.0987 16.2396 47.1729 16.0221 47.252L15.9826 47.2668L15.7948 47.336C15.5155 47.4447 15.2708 47.5485 15.0534 47.6523L15.0138 47.6746L14.9595 47.7017C14.7519 47.8006 14.5443 47.9069 14.3219 48.0304L14.1044 48.1515C13.9067 48.2652 13.709 48.3814 13.5187 48.5024L13.4618 48.537L13.4124 48.5667C13.19 48.7076 12.975 48.8534 12.7625 49.0017L12.5475 49.1524L12.0532 49.5083L11.984 49.5602L11.8876 49.6318L11.2797 50.1014L10.951 50.3485L10.8793 50.4054L10.6717 50.5685C10.3875 50.7909 10.1058 51.0133 9.82408 51.2308L9.76972 51.2728L9.73017 51.3024C9.54483 51.4458 9.35701 51.5866 9.16919 51.725L9.13459 51.7522L9.00855 51.8437C8.78861 52.0043 8.56866 52.1625 8.34377 52.3132L8.29187 52.3478L8.25975 52.37C8.06204 52.501 7.86187 52.6172 7.66169 52.7531L7.47634 52.8643C7.20203 53.0274 6.98208 53.1535 6.75966 53.2647C6.62524 53.3334 6.5109 53.4358 6.42775 53.5618C6.3446 53.6878 6.29549 53.8332 6.28517 53.9838C6.28039 54.0849 6.29293 54.186 6.32224 54.2828L10.6717 68.52C10.6921 68.581 10.7186 68.6398 10.7508 68.6955L10.7755 68.7375C10.8052 68.7856 10.84 68.8304 10.8793 68.871L10.8942 68.8858C10.9326 68.923 10.9749 68.9562 11.0202 68.9846L11.0597 69.0094C11.106 69.0347 11.1539 69.057 11.2031 69.0761H11.2179H11.2327C11.2853 69.0913 11.339 69.102 11.3934 69.1082H11.5046H11.596H11.638C11.6887 69.0979 11.7383 69.083 11.7863 69.0637L11.8283 69.0464C11.8873 69.0217 11.9436 68.991 11.9964 68.955C18.5478 64.1508 19.3732 64.1508 19.6574 64.1508C20.9153 64.1508 25.8555 65.0157 32.4662 66.8692C32.7998 66.9631 33.1409 67.0496 33.5437 67.146L33.8131 67.2102C34.1813 67.2943 34.5026 67.361 34.8016 67.4154H34.8263C35.1377 67.4747 35.4466 67.5241 35.8148 67.5735L36.062 67.6057C36.3783 67.6452 36.66 67.6749 36.922 67.6971H36.9912C37.2605 67.7193 37.5447 67.7342 37.8635 67.7416H38.081H38.5258C38.8002 67.7416 39.072 67.7267 39.334 67.7095H39.4378L39.6404 67.6971C40.021 67.6625 40.3521 67.623 40.6561 67.5735L40.7352 67.5587C41.0194 67.5093 41.3085 67.45 41.6175 67.3734C41.6965 67.3561 41.7756 67.3338 41.8646 67.3116H41.9066C42.1315 67.2523 42.3539 67.1855 42.5689 67.1139L42.648 67.0892L42.8235 67.0298C43.1373 66.9211 43.4116 66.8148 43.6612 66.7061L43.6958 66.6888C43.943 66.585 44.1901 66.4664 44.4595 66.323L44.6399 66.2267L44.6918 66.1995C44.8796 66.0957 45.0649 65.9894 45.2453 65.8807L45.3071 65.8436L45.4628 65.7497C45.7297 65.5817 45.9571 65.4284 46.1721 65.2802C49.3279 63.056 63.9507 53.235 68.7499 50.0322C68.7252 49.9828 68.7005 49.9284 68.6709 49.8716C68.6412 49.8147 68.6288 49.7949 68.6091 49.7579C68.5423 49.6393 68.4707 49.5256 68.3965 49.4193L68.3669 49.3773L68.3496 49.3501C68.2535 49.2218 68.1503 49.0989 68.0407 48.9819L67.9888 48.9275L67.9566 48.8954C67.8627 48.8015 67.7639 48.71 67.665 48.6235L67.6255 48.5889L67.5711 48.5445C67.4377 48.4357 67.3018 48.3344 67.1658 48.243L67.1263 48.2207L67.0793 48.1911C66.9607 48.1145 66.8322 48.0403 66.7037 47.9711L66.5752 47.9044C66.3948 47.813 66.2341 47.7388 66.0809 47.6795C65.9277 47.6202 65.7473 47.5559 65.5545 47.4991L65.4087 47.4571C65.2506 47.4101 65.0899 47.3731 64.9342 47.3409L64.8823 47.3286H64.8477C64.6673 47.294 64.482 47.2643 64.2769 47.2421H64.1854H64.1311C63.9729 47.2421 63.8147 47.2198 63.6541 47.2149H63.5132H63.3699H63.2636C63.0635 47.2149 62.8979 47.2297 62.7397 47.2446C62.6557 47.2446 62.5733 47.2544 62.4926 47.2742H62.4679C62.3048 47.2965 62.1392 47.3236 61.9736 47.3558C61.8797 47.3731 61.7858 47.3928 61.6944 47.4151C61.5411 47.4521 61.378 47.4991 61.1803 47.5609L61.0864 47.5905L60.9381 47.6375C60.6933 47.7225 60.4532 47.8207 60.219 47.9316C59.8087 48.1787 52.9978 52.4442 50.2052 54.1296C50.1394 54.8573 49.9168 55.5621 49.5528 56.1956C48.5322 57.97 46.6194 59.0277 44.4323 59.0277C44.1507 59.0274 43.8693 59.0109 43.5896 58.9783C43.2955 58.9413 43.0014 58.9091 42.7098 58.8819L42.5318 58.8646H42.428L41.8423 58.8127L41.5779 58.793H41.5186L40.9922 58.7584L40.666 58.7386L40.1544 58.7114H40.105H39.8579L39.3364 58.6941H39.2326H39.0498H38.4418H38.3084C38.0835 58.6941 37.8611 58.6941 37.6461 58.6941H37.5497L37.5423 58.6323Z"
								fill="#593487"
							/>
						</svg>
					</div>
					<span className="private-incentive-title">Private Offer Details</span>
					{isSuccess === false && error?.length > 0 && (
						<div className={Classes.errorWarning}>
							<span className="warning-icon"></span>
							<span className={Classes.button_text}>{error}</span>
						</div>
					)}
					{isInternalUser &&
						!isPartialSuccess &&
						(isSuccess === "" || isSuccess === false) && (
							<div>
								<div style={{ margin: "10px 0" }}>
									<p style={{ margin: "0px" }}>
										<strong>
											{data?.customerData?.firstName}{" "}
											{data?.customerData?.lastName}
										</strong>
									</p>
									<p style={{ margin: "0px" }}>{data?.customerData?.address}</p>
									<p style={{ margin: "0px" }}>
										{data?.customerData?.city}, {data?.customerData?.state}{" "}
										{data?.customerData?.zip}
									</p>
								</div>
								<div>
									<p>
										<strong>Valid Until:</strong>{" "}
										{moment(data?.startDate).format("MMM DD, YYYY")} -{" "}
										{moment(data?.endDate).format("MMM DD, YYYY")}
									</p>
									<p>
										<strong>Bulletin: </strong>
										{data?.bulletin}
									</p>
									<p>
										<strong>Redemption Code: </strong>
										{data?.redemptionCode}
									</p>
									<p>
										<strong>Excluded Models: </strong>
										{data?.excludedModels
											?.map((model) => model.modelName)
											.join(", ")}
									</p>
								</div>
								<div style={{ margin: "20px 0" }}>
									<table style={{ width: "100%", borderCollapse: "collapse" }}>
										<thead>
											<tr
												key={"header"}
												style={{ borderBottom: "1px solid #ddd" }}
											>
												<th style={{ textAlign: "left", paddingBottom: "5px" }}>
													Primary Models
												</th>
												<th style={{ textAlign: "left", paddingBottom: "5px" }}>
													Amount
												</th>
											</tr>
										</thead>
										<tbody>
											{data?.primaryModels.map((item, i) => (
												<>
													{Object.values(item)?.map((val) => (
														<tr
															key={i}
															style={{ borderBottom: "1px solid #ddd" }}
														>
															<td style={{ paddingBottom: "5px" }}>
																{item.modelName}
															</td>
															<td style={{ paddingBottom: "5px" }}>
																${item.amount}
															</td>
														</tr>
													))}
												</>
											))}
										</tbody>
									</table>
								</div>
								<div style={{ margin: "20px 0" }}>
									<table style={{ width: "100%", borderCollapse: "collapse" }}>
										<thead>
											<tr
												key={"header"}
												style={{ borderBottom: "1px solid #ddd" }}
											>
												<th style={{ textAlign: "left", paddingBottom: "5px" }}>
													Alternate Models
												</th>
												<th style={{ textAlign: "left", paddingBottom: "5px" }}>
													Amount
												</th>
											</tr>
										</thead>
										<tbody>
											{data?.alternateModels?.map((item, i) => (
												<>
													{Object.values(item)?.map((val) => (
														<tr
															key={i}
															style={{ borderBottom: "1px solid #ddd" }}
														>
															<td style={{ paddingBottom: "5px" }}>
																{item.modelName}
															</td>
															<td style={{ paddingBottom: "5px" }}>
																${item.amount}
															</td>
														</tr>
													))}
												</>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
					{!isInternalUser && (isSuccess === "" || isSuccess === false) && (
						<div>
							<div>
								<p>
									<strong>Success!</strong>{" "}
								</p>
								<p>
									There is an active private offer available for{" "}
									{data?.customerData?.firstName} {data?.customerData?.lastName}
									. Offer code is : {data?.redemptionCode}.
								</p>
								<p>
									The offer details will be delivered to your customer directly.
									Always request customer permission prior to sending.
								</p>
							</div>

							<div>
								<p>
									<strong>
										Choose the customer's preferred delivery method:
									</strong>
								</p>
								<div>
									{data?.customerData?.mobNumber !== null && (
										<div>
											<input
												type="checkbox"
												id="textOffer"
												name="Text Offer"
												value="Text Offer"
												onChange={handleCheckboxChange}
											/>
											<label htmlFor="textOffer">
												{" "}
												<strong>Text Offer: </strong>{" "}
												{data.customerData.mobNumber.replace(
													/(\d{3})(\d{3})(\d{4})/,
													"(***) *** - $3"
												)}
											</label>
										</div>
									)}
									{data?.customerData?.email !== null && (
										<div>
											<input
												type="checkbox"
												id="emailOffer"
												name="Email Offer"
												value="Email Offer"
												onChange={handleCheckboxChange}
											/>
											<label htmlFor="emailOffer">
												{" "}
												<strong>Email Offer: </strong>{" "}
												{hideEmail(data.customerData.email)}
											</label>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
					{!isPartialSuccess && isSuccess === "" && (
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<button
								style={{ width: "45%", cursor: "pointer" }}
								onClick={navigateToLookup}
								className="search-another"
							>
								<strong>START OVER</strong>
							</button>
							{!isInternalUser && (
								<button
									style={{ marginTop: "21px", width: "45%", border: "none" }}
									className={
										isInternalUser
											? "form-signin-btn"
											: requestPayload.email?.length > 0 ||
											  requestPayload.mobileNumber?.length > 0
											? "form-signin-btn"
											: "form-signin-btn-disabled"
									}
									onClick={handleSend}
								>
									<strong>SEND DETAILS</strong>
								</button>
							)}
							{isInternalUser && (
								<button
									style={{ marginTop: "21px", width: "45%" }}
									className="form-signin-btn"
									onClick={() => setIsPartialSuccess(true)}
								>
									<strong>SEND DETAILS</strong>
								</button>
							)}
						</div>
					)}
					{isSuccess === true && (
						<div>
							<p>
								<strong>Success!</strong> Your customer's private offer is on
								its way{isInternalUser === false && " to: "}
								{!isInternalUser &&
									data?.customerData?.mobNumber !== null &&
									data.customerData.mobNumber.replace(
										/(\d{3})(\d{3})(\d{4})/,
										"(***) *** - $3"
									)}{" "}
								{!isInternalUser &&
									data?.customerData?.email !== null &&
									hideEmail(data.customerData.email)}
								.
							</p>
							<p>Please allow upto 5 minutes for delivery.</p>
							<div
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<button
									style={{ marginTop: "20px", width: "45%", cursor: "pointer" }}
									className="search-another"
									onClick={() => setIsSuccess("") && setIsPartialSuccess(false)}
								>
									<strong>Resend</strong>
								</button>
								<button
									style={{ marginTop: "21px", width: "45%" }}
									onClick={navigateToLookup}
									className="form-signin-btn"
								>
									<strong>START OVER</strong>
								</button>
							</div>
						</div>
					)}
					{isPartialSuccess && (
						<div>
							<div>
								<p>
									The offer details will be delivered to your customer directly.
									Always request customer permission prior to sending.
								</p>
							</div>

							<div>
								<p>
									<strong>
										Choose the customer's preferred delivery method:
									</strong>
								</p>
								<div>
									{data?.customerData?.mobNumber !== null && (
										<div>
											<input
												type="checkbox"
												id="textOffer"
												name="Text Offer"
												value="Text Offer"
												onChange={handleCheckboxChange}
											/>
											<label htmlFor="textOffer">
												{" "}
												<strong>Text Offer: </strong>{" "}
												{data.customerData.mobNumber
													.slice(2)
													.replace(/.(?=....)/g, "*")}
											</label>
										</div>
									)}
									{data?.customerData?.email !== null && (
										<div>
											<input
												type="checkbox"
												id="emailOffer"
												name="Email Offer"
												value="Email Offer"
												onChange={handleCheckboxChange}
											/>
											<label htmlFor="emailOffer">
												{" "}
												<strong>Email Offer: </strong>{" "}
												{hideEmail(data.customerData.email)}
											</label>
										</div>
									)}
									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<button
											style={{ width: "45%", cursor: "pointer" }}
											onClick={() => setIsPartialSuccess(false)}
											className="search-another"
										>
											<strong>CANCEL</strong>
										</button>

										<button
											style={{ marginTop: "21px", width: "45%" }}
											className="form-signin-btn"
											onClick={handleSend}
										>
											<strong>SEND</strong>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};
export default PrivateOfferDetails;
