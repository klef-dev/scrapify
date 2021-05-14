import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	username: string;
	password: string;
	telephone: string;
	token?: string;
}

export interface LogInDto extends Document {
	email: string;
	password: string;
}
