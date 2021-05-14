import { BrowserRouter, Route, Switch } from "react-router-dom";

// Views
import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Content from "./views/Content";

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
					<Route path="/register" exact>
						<Register />
					</Route>
					<Route path="/article/:url" exact>
						<Content />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
