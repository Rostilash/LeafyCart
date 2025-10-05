import worker from '../src/index';
import { describe, it, expect } from 'vitest';

describe('Hello World worker', () => {
	it('responds with Hello World!', async () => {
		const request = new Request('http://example.com');
		const env = {
			NP_API_KEY: 'fake_test_key',
			LIQPAY_PUBLIC: 'fake_public_key',
			LIQPAY_PRIVATE: 'fake_private_key',
		};

		const response = await worker.fetch(request, env as any);
		const text = await response.text();

		expect(text).toBe('✅ Worker is running!');
	});
});
