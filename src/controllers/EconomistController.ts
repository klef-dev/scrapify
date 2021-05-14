import { Request, Response } from "express";
import puppeteer from "puppeteer";

export class EconomistController {
	public index = async (req: Request, res: Response): Promise<object> => {
		const { url } = req.query;
		try {
			const URL = url
				? `https://www.economist.com/${url}`
				: "https://www.economist.com";
			let json_data = await this.sendRequest(URL);
			json_data = JSON.parse(json_data);
			if (url) {
				return res
					.status(200)
					.json({ data: json_data.props.pageProps.content });
			} else
				return res
					.status(200)
					.json({ data: json_data.props.pageProps.sections });
		} catch (error) {
			return res.status(400).json({ error: "Something wrong happened" });
		}
	};

	private sendRequest = async (url: string) => {
		const browser = await puppeteer.launch({
			headless: true,
			defaultViewport: null,
			args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
		});
		const page = await browser.newPage();

		await page.goto(url);

		const json_data: any = await page.$eval(
			"#__NEXT_DATA__",
			(data) => data.innerHTML
		);

		await browser.close();

		return json_data;
	};
}
