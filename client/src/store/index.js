import axios from "axios";
import { createStore, thunk, action, persist } from "easy-peasy";

export default createStore(
	persist({
		token: null,
		contents: [],
		login: thunk(async (actions, payload) => {
			const { data } = await axios.post("/auth/login", payload);
			actions.setToken(data.token);
			return data;
		}),
		register: thunk(async (actions, payload) => {
			const { data } = await axios.post("/auth/register", payload);
			actions.setToken(data.token);
			return data;
		}),
		getContents: thunk(async (actions, payload, { getState }) => {
			const { token } = getState();
			const { data } = await axios.get("/scrap", {
				headers: { Authorization: `Bearer ${token}` },
			});
			actions.setContents(data.data);
			return data;
		}),
		setToken: action((state, token) => {
			state.token = token;
		}),
		setContents: action((state, payload) => {
			state.contents = payload;
		}),
	})
);
