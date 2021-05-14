import { BrowserRouter, Route, Switch } from "react-router-dom";

// Views
import Home from "./views/Home";

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
