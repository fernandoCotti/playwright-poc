import { test, expect } from '@playwright/test';

/**
 * API-layer coverage using Playwright's built-in request context —
 * no separate HTTP client dependency needed. Target is reqres.in,
 * a public mock REST API commonly used for automation practice.
 */
test.describe('Users API', () => {
  const apiBase = 'https://reqres.in/api';

  test('GET /users/2 returns a well-formed user payload', async ({ request }) => {
    const response = await request.get(`${apiBase}/users/2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toMatchObject({
      id: 2,
      email: expect.stringContaining('@'),
      first_name: expect.any(String),
      last_name: expect.any(String),
    });
  });

  test('GET /users/23 (nonexistent) returns 404', async ({ request }) => {
    const response = await request.get(`${apiBase}/users/23`);
    expect(response.status()).toBe(404);
  });

  test('POST /users creates a resource and echoes submitted fields', async ({ request }) => {
    const payload = { name: 'Fernando Cotti', job: 'QA Automation Engineer' };
    const response = await request.post(`${apiBase}/users`, { data: payload });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  test('PUT /users/2 updates a resource', async ({ request }) => {
    const response = await request.put(`${apiBase}/users/2`, {
      data: { name: 'Fernando Cotti', job: 'Senior QA Automation Engineer' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe('Senior QA Automation Engineer');
    expect(body.updatedAt).toBeDefined();
  });
});
