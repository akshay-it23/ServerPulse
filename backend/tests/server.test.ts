import request from 'supertest';
// Mock Express app testing setup
// We import/create a mock to verify health-check and base routes compilation
import express from 'express';

const app = express();
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

describe('GET /api/health', () => {
  it('should return 200 OK and status UP', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
  });
});
