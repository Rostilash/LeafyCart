/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface NPRequest {
	modelName: string;
	calledMethod: string;
	methodProperties: Record<string, any>;
	apiKey?: string;
}

export default {
	async fetch(request: Request, env: { NP_API_KEY: string; LIQPAY_PUBLIC: string; LIQPAY_PRIVATE: string }) {
		const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://leafycart-shop.web.app'];

		//givess permition for this url's
		const origin = request.headers.get('Origin') || '';
		const corsHeaders = {
			'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		// OPTIONS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		if (request.method === 'GET') {
			return new Response('✅ Worker is running!', {
				headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
			});
		}

		if (request.method !== 'POST') {
			return new Response('Only POST allowed', { status: 405, headers: corsHeaders });
		}

		const body: NPRequest = await request.json();
		body.apiKey = env.NP_API_KEY;

		//LiqPay
		const liqpayKeys = {
			public: env.LIQPAY_PUBLIC || '',
			private: env.LIQPAY_PRIVATE || '',
		};

		const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const text = await response.text();

		return new Response(JSON.stringify({ np: JSON.parse(text), liqpay: liqpayKeys }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
		});
	},
};
