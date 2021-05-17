import axios from "axios";
import { createStore, thunk, action, persist } from "easy-peasy";

export default createStore(
	persist({
		api_uri:
			process.env.NODE_ENV === "development"
				? "http://localhost:3333/api/v1"
				: "https://10e6e69e00f7.ngrok.io/api/v1",
		token: null,
		contents: [],
		content: {},
		login: thunk(async (actions, payload, { getState }) => {
			const { api_uri } = getState();
			const { data } = await axios.post(`${api_uri}/auth/login`, payload);
			actions.setToken(data.token);
			return data;
		}),
		register: thunk(async (actions, payload, { getState }) => {
			const { api_uri } = getState();
			const { data } = await axios.post(`${api_uri}/auth/register`, payload);
			actions.setToken(data.token);
			return data;
		}),
		getContents: thunk(async (actions, payload, { getState }) => {
			const { token, api_uri } = getState();
			const { data } = await axios.get(`${api_uri}/scrap`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			actions.setContents(data.data);
			return data;
		}),
		singleContent: thunk(async (actions, url, { getState }) => {
			const { token, api_uri } = getState();
			const { data } = await axios.get(`${api_uri}/scrap?url=${url}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			actions.setSingleContent(data.data);
			return data;
		}),
		setToken: action((state, token) => {
			state.token = token;
		}),
		setContents: action((state, payload) => {
			state.contents = payload;
		}),
		setSingleContent: action((state, payload) => {
			state.content = payload;
		}),
	})
);
