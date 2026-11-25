import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

test('Home welcomes visitors and links to About and Projects', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { default: Home } = await vite.ssrLoadModule('/src/pages/Home.jsx');
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(Home)));
    assert.match(html, /<h1>Welcome to My Personal Portfolio<\/h1>/);
    assert.match(html, /href="\/about"/);
    assert.match(html, /href="\/projects"/);
  } finally {
    await vite.close();
  }
});
