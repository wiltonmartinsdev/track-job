import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import errorHandling from "./middlewares/error-handling";
import { routes } from "./routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandling);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});
