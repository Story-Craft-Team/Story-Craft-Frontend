import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				// Добавляем fallback на локальный сервер для разработки
				destination:
					process.env.NEXT_PUBLIC_API_SECONDARY_URL ||
					"https://reimagined-tribble-pjjvj5vr44wrcjgj-3000.app.github.dev/:path*",
			},
			// Для загрузки изображений
			{
				source: "/upload",
				destination:
					"https://reimagined-tribble-pjjvj5vr44wrcjgj-3000.app.github.dev/upload",
			},
		];
	},
	// Добавляем настройки для CORS
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,POST,PUT,DELETE,OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
				],
			},
		];
	},
};

export default nextConfig;
