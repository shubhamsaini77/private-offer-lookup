import "./css/header-footer.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StarterScreen from "./components/StarterScreen";
import SignInPage from "./components/SignInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LookupMethod from "./components/LookupMethod";
import PrivateOfferDetails from "./components/PrivateofferDetails";
import Modal from "./components/Modal";
import TermsOfService from "./components/TermsOfService";

function App() {
	const [openTOS, setOpenTOS] = React.useState(false);
	const openTosModel = () => setOpenTOS(true);
	const closeTosModel = () => setOpenTOS(false);
	const isInternalUser = false;

	return (
		<React.Fragment>
			<Header />
			<Router>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<StarterScreen
								openTosModal={openTosModel}
								isTosOpen={openTOS}
								isInternalUser={isInternalUser}
							/>
						}
					/>
					<Route
						exact
						path="/signin"
						element={<SignInPage isTosOpen={openTOS} />}
					/>
					<Route
						exact
						path="/lookupMethod"
						element={
							<LookupMethod
								isTosOpen={openTOS}
								isInternalUser={isInternalUser}
							/>
						}
					/>
					<Route
						exact
						path="/lookupMethod/success"
						element={
							<LookupMethod
								isTosOpen={openTOS}
								isInternalUser={isInternalUser}
							/>
						}
					/>
					<Route
						exact
						path="/privateOfferDetails"
						element={
							<PrivateOfferDetails
								isTosOpen={openTOS}
								isInternalUser={isInternalUser}
							/>
						}
					/>
				</Routes>
			</Router>

			<Modal open={openTOS}>
				<TermsOfService close={() => closeTosModel()} />
			</Modal>
			<Footer
				openTosModal={openTosModel}
				isTosOpen={openTOS}
				isInternalUser={isInternalUser}
			/>
		</React.Fragment>
	);
}

export default App;
