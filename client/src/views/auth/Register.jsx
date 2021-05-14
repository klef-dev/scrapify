import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useHistory, Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
	const [errors, setErrors] = useState([]);

	const register = useStoreActions((actions) => actions.register);

	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		setError(null);
		try {
			await register({
				email,
				password,
				username,
				name,
				telephone,
				confirm_password,
			});
			history.push("/");
		} catch (error) {
			const { response } = error;
			if (response) {
				const { data } = response;
				if (data.errors) {
					setErrors(data.errors);
				} else if (data.message) {
					setError(data.message);
				}
			} else {
				setError("Make sure your connection is good");
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Create a new account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Or{" "}
					<Link
						to="/login"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						sign in to your account
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" method="POST" onSubmit={handleSubmit}>
						{errors.map((error, i) => (
							<p className="text-red-500" key={i}>
								{error.msg}
							</p>
						))}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Full Name
							</label>
							<div className="mt-1">
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="confirm_password"
								className="block text-sm font-medium text-gray-700"
							>
								Confirm Password
							</label>
							<div className="mt-1">
								<input
									id="confirm_password"
									name="confirm_password"
									type="password"
									autoComplete="confirm-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									name="username"
									type="tel"
									autoComplete="username"
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="telephone"
								className="block text-sm font-medium text-gray-700"
							>
								Telephone
							</label>
							<div className="mt-1">
								<input
									id="telephone"
									name="telephone"
									type="tel"
									autoComplete="telephone"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									onChange={(e) => setTelephone(e.target.value)}
								/>
							</div>
						</div>

						<p className="text-red-500">{error}</p>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
