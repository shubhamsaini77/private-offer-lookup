import "./App.css";
import "./css/header-footer.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StarterScreen from "./components/StarterScreen";
import SignInPage from "./components/SignInPage";
import TermsOfService from "./components/TermsOfService";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LookupMethod from "./components/LookupMethod";
import OfferPromo from "./components/OfferPromo";
import CustomerEmail from "./components/CustomerEmail";
import CustomerMobNum from "./components/CustomerMobNum";
import CustomerDetails from "./components/CustomerDetails";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Router>
          <Routes>
            <Route exact path="/" element={<StarterScreen />} />
            <Route exact path="/signin" element={<SignInPage />} />
            <Route exact path="/lookupMethod" element={<LookupMethod />} />
            <Route exact path="/offerPromo" element={<OfferPromo />} />
            <Route exact path="/email" element={<CustomerEmail />} />
            <Route exact path="/mobileNumber" element={<CustomerMobNum />} />
            <Route exact path="/customerDetails" element={<CustomerDetails />} />
          </Routes>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
