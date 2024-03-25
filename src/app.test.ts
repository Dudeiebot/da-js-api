import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import App from './app'; 

describe('App', () => {
  let app: express.Application;
  beforeAll(() => {
    process.env.MONGO_PATH = 'localhost:27017/test';

    const controllers: any[] = []; 
    app = new App(controllers, 3000).express;
  });

  afterAll(async () => {
    // Close MongoDB connection after all tests are done
    await mongoose.disconnect();
  });

});
