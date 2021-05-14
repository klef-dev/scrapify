import axios from "axios";
import { useEffect } from "react";
function App() {
	useEffect(() => {
		axios
			.get("/scrap")
			.then(({ data }) => console.log(data))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="App">
			<h1>Mistho Frontend</h1>
		</div>
	);
}

export default App;
