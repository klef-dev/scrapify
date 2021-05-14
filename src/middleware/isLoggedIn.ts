import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const isLoggedIn = async (req: any, res: Response, next: NextFunction) => {
	const header = req.get("Authorization");
	if (!header) {
		return res.status(401).json({ message: "Not Authorized" });
	}
	const token = header.split(" ")[1];
	let decoded: any;
	try {
		decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
		if (!decoded) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const user = await User.findById(decoded.user._id);
		if (user) {
			req.body.authUser = user;
		} else {
			return res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		return res
			.status(401)
			.json({ message: "Could not process authentication status" });
	}
	next();
};

export { isLoggedIn };
