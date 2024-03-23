import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import App from './app'; // Import the App class from the file where it's defined

describe('App', () => {
  let app: express.Application;

  beforeAll(() => {
    // Mock the environment variables
    process.env.MONGO_PATH = 'localhost:27017/test';

    // Initialize the app
    const controllers: any[] = []; // Add your controllers here if needed
    app = new App(controllers, 3000).express;
  });

  afterAll(async () => {
    // Close MongoDB connection after all tests are done
    await mongoose.disconnect();
  });

  it('should handle GET request to /api endpoint', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(404); // Adjust the expected status code as per your application's behavior
    // Add more assertions if needed
  });

  // Add more test cases as needed to cover other endpoints and functionality of your application
});
