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
	async fetch(request: Request, env: { NP_API_KEY: string }) {
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*', // for localhost
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		if (request.method !== 'POST') {
			return new Response('Only POST allowed', { status: 405, headers: corsHeaders });
		}

		const body: NPRequest = await request.json();
		body.apiKey = env.NP_API_KEY;

		const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const text = await response.text();

		return new Response(text, { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
	},
};
