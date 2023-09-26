// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
const express = require('express')
const Router = require('express')
const serverless = require('serverless-http')

const userRouter = require('../../routes/users')

// import express, { Router } from 'express';
// import serverless from 'serverless-http';

// import userRouter from '../../routes/users';

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

// router.get('/test', (req, res) => userRouter)
api.use('/test/', userRouter);

api.use('/api/', router);

// export const handler = serverless(api);
module.exports = serverless(api);