import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";

const Content = () => {
	const { url } = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useStoreState((state) => state.token);
	const content = useStoreState((state) => state.content);

	const singleContent = useStoreActions((actions) => actions.singleContent);

	useEffect(() => {
		const fetchContent = async () => {
			setLoading(true);
			try {
				await singleContent(url);
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
			fetchContent();
		}
	}, [token, singleContent, url]);

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
					<div className="relative bg-white py-16 sm:py-24">
						{Object.keys(content).length && (
							<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
								<div className="relative sm:py-16 lg:py-0">
									<div
										aria-hidden="true"
										className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
									>
										<div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
										<svg
											className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
											width={404}
											height={392}
											fill="none"
											viewBox="0 0 404 392"
										>
											<defs>
												<pattern
													id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
													x={0}
													y={0}
													width={20}
													height={20}
													patternUnits="userSpaceOnUse"
												>
													<rect
														x={0}
														y={0}
														width={4}
														height={4}
														className="text-gray-200"
														fill="currentColor"
													/>
												</pattern>
											</defs>
											<rect
												width={404}
												height={392}
												fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
											/>
										</svg>
									</div>
									<div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
										<div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
											<img
												className="absolute inset-0 h-full w-full object-cover"
												src={content[0]._metadata.imageUrl}
												alt=""
											/>
											<div className="relative px-8">
												<footer className="mt-4">
													<p className="text-base font-semibold text-indigo-200">
														Author: {content[0]._metadata.author[0]}
													</p>
												</footer>
											</div>
										</div>
									</div>
								</div>

								<div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
									{/* Content area */}
									<div className="pt-12 sm:pt-16 lg:pt-20">
										<h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
											{content[0]._metadata.title}
										</h2>
										<div className="mt-6 text-gray-500 space-y-6">
											<p className="text-lg">
												{content[0]._metadata.description}
											</p>
											<p className="text-base leading-7">
												{content[0]._metadata.shareSnippet}
											</p>
											<p className="text-base leading-7">
												{content[0]._metadata.headline}
											</p>
										</div>
									</div>

									{/* Stats section */}
									<div className="mt-10">
										<dl className="grid grid-cols-2 gap-x-4 gap-y-8">
											<div className="border-t-2 border-gray-100 pt-6">
												<dt className="text-base font-medium text-gray-500">
													Published on
												</dt>
												<dd className="text-3xl font-extrabold tracking-tight text-gray-900">
													{content[0]._metadata.datePublished}
												</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
export default Content;
