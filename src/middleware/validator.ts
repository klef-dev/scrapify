import {
	body,
	check,
	CustomValidator,
	ValidationChain,
} from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";

const registerRequest = (): ValidationChain[] => {
	const isValidEmail: CustomValidator = async (value: string) => {
		const user = await User.findOne({ email: value });
		if (user) {
			return Promise.reject("E-mail already in use");
		}
	};

	const passwordsMatch: CustomValidator = (value: string, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Password confirmation does not match password");
		}
		return true;
	};

	const isValidPhone: CustomValidator = async (value: string) => {
		const user = await User.findOne({ telephone: value });
		if (user) {
			return Promise.reject("Mobile number already in use");
		}
	};

	return [
		body("name", "Your name is required").exists(),
		body("email", "Invalid email")
			.exists()
			.isEmail()
			.custom(isValidEmail)
			.normalizeEmail(),
		body("password", "Password is required").exists().isLength({ min: 8 }),
		body("confirm_password", "Confirm password is required")
			.isLength({ min: 8 })
			.exists()
			.custom(passwordsMatch),
		body("telephone", "Invalid mobile number")
			.exists()
			.isNumeric()
			.isLength({ min: 11, max: 15 })
			.custom(isValidPhone),
	];
};

const loginRequest = (): ValidationChain[] => {
	return [
		body("email", "Email address is required")
			.isEmail()
			.exists()
			.not()
			.isEmpty(),
		body("password")
			.isLength({ min: 8 })
			.not()
			.isEmpty()
			.withMessage("Password should have minimum length of 8 characters"),
	];
};

export {
	registerRequest,
	loginRequest,
};
