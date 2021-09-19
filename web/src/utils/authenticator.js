import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default class Authenticator {
	googleAuth() {
		return new Promise((resolve, reject) => {
			const provider = new GoogleAuthProvider();

			const auth = getAuth();
			auth.languageCode = "pt-BR";
			signInWithPopup(auth, provider)
				.then((result) => {
					const credential = GoogleAuthProvider.credentialFromResult(result);
					let user = {
						credential,
						token: credential.accessToken,
						info: result.user,
					};
					resolve(user);
				})
				.catch((error) => {
					reject({
						errorCode: error.code,
						errorMessage: error.message,
						email: error.email,
						credential: GoogleAuthProvider.credentialFromError(error),
					});
				});
		});
	}
}
