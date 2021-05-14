import axios from "axios";
import { createStore, thunk, action } from "easy-peasy";

export default createStore({
	token: null,
	login: thunk(async (actions, payload) => {
		const { data } = await axios.post("/auth/login", payload);
		actions.setToken(data.token);
		return data;
	}),
	setToken: action((state, token) => {
		state.token = token;
	}),
});
