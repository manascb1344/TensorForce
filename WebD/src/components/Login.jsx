import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function Login() {
	const onSuccess = (res) => {
		// console.log("Login Success, USER: ", res);
	};

	const onFailure = (res) => {
		// console.log("Login Failed, res: ", res);
	};

	return (
		<div>
			<GoogleOAuthProvider clientId="712301480142-2n2939q3emacg9uu2534evs1b448f17k.apps.googleusercontent.com">
				<GoogleLogin onSuccess={onSuccess} onError={onFailure} />
			</GoogleOAuthProvider>
		</div>
	);
}
export default Login;
