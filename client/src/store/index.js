import axios from "axios";
import { createStore, thunk, action, persist } from "easy-peasy";

export default createStore(
	persist({
		token: null,
		login: thunk(async (actions, payload) => {
			const { data } = await axios.post("/auth/login", payload);
			actions.setToken(data.token);
			return data;
		}),
		setToken: action((state, token) => {
			state.token = token;
		}),
	})
);
