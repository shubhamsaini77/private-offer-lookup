import React from "react";

const TermsOfService = ({ close }) => {
	return (
		<div className="tos-view">
			<div className="close-btnBox">
					<div className="close-btn" onClick={close}>
						<span className="close-button close-icon"></span> Close
					</div>
				</div>
			<div className="terms-body">
				<div className="tos-title">Terms of Service</div>
				<div className="tos-labels">
					<p>
						I am a salesperson or sales manager employed by the dealership whose
						OEM dealer code I have entered herein.
					</p>
					<p>
						I am authorized to perform this lookup by my dealership management.
					</p>
					<p>
						I have explicit consent from the customer whose name I have entered
						to initiate the process of asserting whether they are currently
						eligible for a private offer from the OEM whose brand my dealership
						represents.
					</p>
					<p>
						I acknowledge and affirm that I will not use this system for
						prospecting.
					</p>
					<p>
						I affirm that I will not share any customer information with any
						unauthorized persons or entity inside or outside the dealership
						whose OEM code I have entered.
					</p>
					<p>
						Use of the manufacturer dealer code is only for the purpose of
						verifying your dealer credential and your permissible use of a
						private offer lookup.
					</p>
					<p>
						Usage of this system is monitored and audited. All data provided is
						recorded for security and verification purposes.
					</p>
				</div>
			</div>
		</div>
	);
};
export default TermsOfService;
