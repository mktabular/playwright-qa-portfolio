const { test, expect } = require('@playwright/test');

test('GET request returns a list of users', async ({ request }) => {
  
  // No API key needed — this is a genuinely free, public test API
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Note: unlike reqres.in, this endpoint returns a plain array directly —
  // no "data" wrapper — so we check the body itself, not body.data
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  console.log('First user:', body[0]);
});

test('GET request returns a single user by ID', async ({ request }) => {
  
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);

  const user = await response.json();

  // This endpoint returns ONE user object directly (not an array)
  expect(user.id).toBe(1);
  expect(user.name).toBeTruthy();
  expect(user.email).toContain('@');
});

test('GET request for a non-existent user returns 404', async ({ request }) => {
  
  // User ID 9999 doesn't exist in this fake dataset
  const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');

  // This is important: a GOOD test doesn't only check the "happy path" —
  // it also checks that things fail correctly when they should
  expect(response.status()).toBe(404);
});

test('POST request creates a new post', async ({ request }) => {
  
  // Unlike GET, POST needs to SEND data along with the request.
  // We pass a second argument to .post() — an object with a "data" property,
  // containing whatever we want to create
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'My first automated post',
      body: 'This post was created by a Playwright API test.',
      userId: 1
    }
  });

  // For successfully CREATING something, the standard success status code
  // is 201 (Created) — not 200. This is a real, meaningful difference:
  // 200 = "here's what you asked for", 201 = "I made something new for you"
  expect(response.status()).toBe(201);

  const newPost = await response.json();

  // The server should echo back the data we sent, PLUS a new "id" 
  // it generated for this new post
  expect(newPost.title).toBe('My first automated post');
  expect(newPost.body).toBe('This post was created by a Playwright API test.');
  expect(newPost.id).toBeTruthy();
});

test('PATCH request updates an existing post', async ({ request }) => {
  
  // We're updating post #1 — only changing its title, nothing else
  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
    data: {
      title: 'Updated title via Playwright'
    }
  });

  // Successful updates typically return 200 (not 201 — nothing new was CREATED,
  // an existing thing was just changed)
  expect(response.status()).toBe(200);

  const updatedPost = await response.json();

  // The response should reflect our change
  expect(updatedPost.title).toBe('Updated title via Playwright');

  // The id should stay the same — we updated post #1, we didn't create a new one
  expect(updatedPost.id).toBe(1);
});

test('PUT request replaces an existing post entirely', async ({ request }) => {
  
  // Unlike PATCH, PUT expects the FULL object — every field, not just what changed
  const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
    data: {
      id: 1,
      title: 'Completely replaced title',
      body: 'Completely replaced body text.',
      userId: 1
    }
  });

  expect(response.status()).toBe(200);

  const replacedPost = await response.json();

  expect(replacedPost.title).toBe('Completely replaced title');
  expect(replacedPost.body).toBe('Completely replaced body text.');
  expect(replacedPost.id).toBe(1);
});

test('DELETE request removes a post', async ({ request }) => {
  
  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

  // Successful deletes typically return 200, though some real APIs use 204 (No Content) —
  // meaning "success, but there's nothing to send back since the thing is gone"
  expect(response.status()).toBe(200);
});