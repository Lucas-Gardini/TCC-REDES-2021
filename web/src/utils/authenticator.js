import {
	getAuth,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	setPersistence,
	browserSessionPersistence,
	onAuthStateChanged,
} from "firebase/auth";

export default class Authenticator {
	googleAuth() {
		return new Promise((resolve, reject) => {
			const provider = new GoogleAuthProvider();
			const auth = getAuth();
			auth.languageCode = "pt-BR";

			setPersistence(auth, browserSessionPersistence).then(async () => {
				try {
					const result = await signInWithPopup(auth, provider);
					// const credential = GoogleAuthProvider.credentialFromResult(result);
					let user = {
						// credential,
						// token: credential.accessToken,
						info: result.user,
					};
					resolve(user);
				} catch (error) {
					reject({
						errorCode: error.code,
						errorMessage: error.message,
						email: error.email,
						credential: GoogleAuthProvider.credentialFromError(error),
					});
				}
			});
		});
	}
	googleLogout() {
		return new Promise((resolve, reject) => {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					resolve({});
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	checkAuth() {
		return new Promise((resolve, reject) => {
			const auth = getAuth();
			auth.languageCode = "pt-BR";

			onAuthStateChanged(auth, (user) => {
				if (user) {
					let userInfo = {
						info: user,
					};
					resolve(userInfo);
				} else {
					reject("Don't logged in");
				}
			});
		});
	}
}
