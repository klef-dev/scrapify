import { Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";

const Home = () => {
	const [loading, setLoading] = useState(false);
	const token = useStoreState((state) => state.token);
	const contents = useStoreState((state) => state.contents);

	const getContents = useStoreActions((actions) => actions.getContents);

	useEffect(() => {
		const fetchContents = async () => {
			setLoading(true);
			try {
				await getContents();
			} catch (err) {
				console.log(err);
			}
			setLoading(false);
		};
		if (token) {
			fetchContents();
		}
	}, [token, getContents]);

	if (!token) {
		return (
			<Redirect
				to={{
					pathname: "/login",
				}}
			/>
		);
	}
	return (
		<div>
			<h1>Home</h1>
			{loading && <h1>Loading...</h1>}
		</div>
	);
};
export default Home;
