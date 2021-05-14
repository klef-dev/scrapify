import { BrowserRouter, Route, Switch } from "react-router-dom";

// Views
import Home from "./views/Home";
import Login from "./views/auth/Login";

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/login" exact>
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
