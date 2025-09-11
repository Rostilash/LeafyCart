import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new Request('http://example.com');
		const ctx = createExecutionContext();

		const customEnv = {
			...env,
			NP_API_KEY: 'fake_test_key',
		};

		const response = await worker.fetch(request, customEnv);
		await waitOnExecutionContext(ctx);

		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});
});
