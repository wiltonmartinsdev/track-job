import axios from "axios";

export const api = axios.create({
	baseURL: "https://track-job-api.onrender.com",
});
