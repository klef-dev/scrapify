import { Request, Response } from "express";
import puppeteer from "puppeteer";

export class EconomistController {
	public index = async (req: Request, res: Response): Promise<object> => {
		try {
			const URL = "https://www.economist.com";
			let json_data = await this.sendRequest(URL);
			if (json_data && JSON.parse(json_data)) {
				json_data = JSON.parse(json_data);
				return res.json({ data: json_data.props.pageProps.sections });
			} else return res.send({ data: json_data });
		} catch (error) {
			return res.json({ error: "Something wrong happened" });
		}
	};

	public show = async (req: Request, res: Response): Promise<object> => {
		const { url } = req.body.params;
		try {
			const json_data = await this.sendRequest(url);

			return res.send(json_data);
		} catch (error) {
			return res.json({ error: "Something wrong happened" });
		}
	};

	private sendRequest = async (url: string) => {
		const browser = await puppeteer.launch({ headless: false });
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
