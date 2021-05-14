import { NextFunction, Request, response, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUser, LogInDto } from "../types/user";
import User from "../models/user";

export class AuthController {
	public register = async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let { email, password } = req.body;
		let hashPassword = await bcrypt.hash(password, 10);
		req.body.password = hashPassword;

		try {
			const user: IUser = await User.create(req.body);
			let payload = {
				user: {
					email: user.email,
					_id: user._id,
				},
			};
			try {
				const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
					expiresIn: "20 days",
				});

				user.token = token;

				return res.status(200).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					telephone: user.telephone,
					token: user.token,
				});
			} catch (error) {
				return res.status(406).json({ error });
			}
		} catch (err) {
			return res.status(400).json({ error: "Something went wrong" });
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const logInData: LogInDto = req.body;
		const user = await User.findOne({ email: logInData.email }).select(
			"+password"
		);
		if (user) {
			const isPasswordMatching = await bcrypt.compare(
				logInData.password,
				user.password
			);
			if (isPasswordMatching) {
				//create token
				let payload = {
					user: {
						email: user.email,
						_id: user._id,
					},
				};
				try {
					const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
						expiresIn: "20 days",
					});
					user.token = token;

					return res.status(200).json({
						_id: user._id,
						name: user.name,
						email: user.email,
						telephone: user.telephone,
						token: user.token,
					});
				} catch (error) {
					return res.status(406).json({ error });
				}
			} else {
				return res.status(404).send({
					message: "Email or password maybe incorrect",
				});
			}
		} else {
			return res.status(404).send({
				message: "This user does not exist or email & password maybe incorrect",
			});
		}
	};
}
