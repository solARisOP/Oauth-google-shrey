import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import { config } from "dotenv";
config();

export const googleOauthHandler = async (req, res) => {
	try {

		const origin = req.get('Origin'); // Gets the 'Origin' header
		const referer = req.get('Referer');

		console.log('Origin:', origin);
		console.log('Referer:', referer);

		const code = req.query.code;

		const { id_token, access_token } = await getGoogleOauthTokens(code);

		const googleUser = await getGoogleUser(id_token, access_token);

		console.log(googleUser.data.email);

		const user = await User.findOne({ email: googleUser.data.email });

		if (user) {
			const accessToken = jwt.sign({ id: user._id }, "jwtsecretfkfkkdddfkfkf", {
				expiresIn: "1d",
			});
			const refreshToken = jwt.sign(
				{ id: user._id },
				"jwtsecretfkfkkdddfkfkf",
				{ expiresIn: "10d" }
			);

			// set cookies
			const options = {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			};

			res
				.cookie("accessToken", accessToken, options)
				.cookie("refreshToken", refreshToken, options)

			return res
				.redirect("http://localhost:3000/")

		}

		const newuser = new User({
			email: googleUser.data.email,
			name: googleUser.data.name,
			picture: googleUser.data.picture,
		});
		await newuser.save();

		const accessToken = jwt.sign(
			{ id: newuser._id },
			"jwtsecretfkfkkdddfkfkf",
			{ expiresIn: "1d" }
		);
		const refreshToken = jwt.sign(
			{ id: newuser._id },
			"jwtsecretfkfkkdddfkfkf",
			{ expiresIn: "10d" }
		);

		// set cookies
		const options = {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		};

		res
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)

		return res
			.redirect("http://localhost:3000/")

	} catch (error) {
		console.error("Error in googleOauthHandler:", error.message);

		// If the error comes from the OAuth token request, log it for debugging
		if (error.response) {
			console.error("Error response data:", error.response.data);
		}

		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getGoogleOauthTokens = async (code) => {
	const url = "https://oauth2.googleapis.com/token";

	const values = {
		code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_REDIRECT_URL,
		grant_type: "authorization_code",
	};

	// console.log(values);

	try {
		const res = await axios.post(url, qs.stringify(values), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return res.data;
	} catch (error) {
		// Log more detailed error response
		if (error.response) {
			console.log("Error response data:", error.response.data);
		} else {
			console.log("Error message:", error.message);
		}
	}
};

export const getGoogleUser = async (id_token, access_token) => {
	try {
		const res = await axios.get(
			`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
			{
				headers: {
					Authorization: `Bearer ${id_token}`,
				},
			}
		);

		return res;
	} catch (error) {
		console.error(error);
	}
};

export const getUserData = async (req, res) => {

	const accessToken = req.cookies.accessToken

	if(!accessToken) {
		return res
		.json(null)
	}

	const decoded = jwt.verify(accessToken, 'jwtsecretfkfkkdddfkfkf')

	const user = await User.findById(decoded.id)

	console.log("here and there")
	return res
		.status(200)
		.json({
			email: user.email,
			name: user.name,
			picture: user.picture
		})

}

