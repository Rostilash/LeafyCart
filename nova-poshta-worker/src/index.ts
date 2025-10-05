import CryptoJS from 'crypto-js';
interface NPRequest {
	modelName: string;
	calledMethod: string;
	methodProperties: Record<string, any>;
	apiKey?: string;
}

interface LiqPayRequest {
	amount: number;
	currency: string;
	description: string;
	order_id: string;
	result_url: string;
	server_url: string;
	sandbox?: '1' | '0';
}

async function generateLiqPaySignature(privateKey: string, data: string): Promise<string> {
	const encoder = new TextEncoder();
	const str = privateKey + data + privateKey;

	const buffer = encoder.encode(str);
	const hash = await crypto.subtle.digest('SHA-1', buffer);

	// Перетворюємо ArrayBuffer → Base64
	const bytes = new Uint8Array(hash);
	let binary = '';
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

export default {
	async fetch(request: Request, env: { NP_API_KEY: string; LIQPAY_PUBLIC: string; LIQPAY_PRIVATE: string }) {
		const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://leafycart-shop.web.app'];

		const origin = request.headers.get('Origin') || '';
		const corsHeaders = {
			'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		const url = new URL(request.url);

		// --- ROUTE: Health check ---
		if (request.method === 'GET') {
			return new Response('✅ Worker is running!', {
				headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
			});
		}

		if (request.method !== 'POST') {
			return new Response('Only POST allowed', { status: 405, headers: corsHeaders });
		}

		try {
			// --- ROUTE: Nova Poshta ---
			if (url.pathname === '/api/np') {
				const body: NPRequest = await request.json();
				body.apiKey = env.NP_API_KEY;

				const npResponse = await fetch('https://api.novaposhta.ua/v2.0/json/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				});
				return new Response(npResponse.body, {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					status: npResponse.status,
				});
			}

			// --- ROUTE: LiqPay ---
			if (url.pathname === '/api/liqpay') {
				const params: LiqPayRequest = await request.json();

				const dataToSign = {
					...params,
					public_key: env.LIQPAY_PUBLIC,
				};

				const jsonString = JSON.stringify(dataToSign);
				const data = btoa(unescape(encodeURIComponent(jsonString)));
				const signature = CryptoJS.SHA1(env.LIQPAY_PRIVATE + data + env.LIQPAY_PRIVATE).toString(CryptoJS.enc.Base64);

				return new Response(JSON.stringify({ data, signature }), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// --- ROUTE not found ---
			return new Response(JSON.stringify({ error: 'Route not found' }), {
				status: 404,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		} catch (err: any) {
			return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
