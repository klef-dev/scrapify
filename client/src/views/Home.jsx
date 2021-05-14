import { Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";
const Home = () => {
	const easy_peasy = JSON.parse(localStorage.getItem("[EasyPeasyStore][0]"));
	const token = useStoreState((state) => state.token) || easy_peasy.data.token;
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
		</div>
	);
};
export default Home;
