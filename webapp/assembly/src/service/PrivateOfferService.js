class PrivateOfferService {
	constructor() {
		this.error = "";
		this.signInRes = "";
		this.signInResponseData = "";
	}
	signIn(inputs) {
		try {
			fetch(
				// "http://localhost:7778/eeqreact/rest/privateOffer/login",
			"https://iri1satvfl.execute-api.us-east-1.amazonaws.com/dev/logintest",
			{
				method: "POST",
				body: JSON.stringify({
					dealerCode: inputs?.dealerCode,
					customerFirstName: inputs?.firstName,
					customerLastName: inputs?.lastName,
					attested: true,
					captchaUsed: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				this.signInRes = res;
				this.signInResponseData = res.json();
			});
		} catch (err) {
			console.log(err);
		}
	}
}

export default new PrivateOfferService();
