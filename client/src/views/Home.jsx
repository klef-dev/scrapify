import { Redirect, Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useStoreState((state) => state.token);
	const contents = useStoreState((state) => state.contents);

	const getContents = useStoreActions((actions) => actions.getContents);

	const getUrlPath = (url) => {
		return url.split("https://www.economist.com/").join("").split("/").join("%2f");
	};

	useEffect(() => {
		const fetchContents = async () => {
			setLoading(true);
			try {
				await getContents();
			} catch (error) {
				const { response } = error;
				if (response) {
					const { data } = response;
					if (data.error) {
						setError(data.error);
					} else if (data.message) {
						setError(data.message);
					}
				} else {
					setError("Make sure your connection is good");
				}
			}
			setLoading(false);
		};
		if (token) {
			fetchContents();
		}
	}, [token, getContents]);

	if (!token) {
		return (
			<Redirect
				to={{
					pathname: "/login",
				}}
			/>
		);
	}
	return (
		<div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
			<div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
				<div>
					<h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
						The Economist
					</h2>
					<p className="mt-3 text-xl text-gray-500 sm:mt-4">
						Data scrapped from The Economist Website
					</p>
				</div>
				{loading && <h1>Loading...</h1>}
				{error && <p className="text-red-500">{error}</p>}
				{!loading && !error && (
					<div>
						{contents.length &&
							contents.map((content, i) => (
								<div
									className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
									key={i}
								>
									{content.articles.map((article, j) => (
										<div
											key={j}
											className="flex flex-col rounded-lg shadow-lg overflow-hidden"
										>
											<div className="flex-shrink-0">
												<img
													className="h-48 w-full object-cover"
													src={article.image.src}
													alt=""
												/>
											</div>
											<div className="flex-1 bg-white p-6 flex flex-col justify-between">
												<div className="flex-1">
													<p className="text-sm font-medium text-indigo-600">
														<a
															href={content.title.url}
															className="hover:underline"
														>
															{content.title.text}
														</a>
													</p>
													<Link
														to={`article/${getUrlPath(article.url)}`}
														className="block mt-2"
													>
														<p className="text-xl font-semibold text-gray-900">
															{article.headline}
														</p>
													</Link>
												</div>
											</div>
										</div>
									))}
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};
export default Home;
