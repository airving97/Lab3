import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { apiRouter } from './server/routes.js';
import compression from 'compression';
import path from 'node:path';
const app=express();
app.use(compression());
app.use(cors({origin:process.env.CLIENT_ORIGIN || 'http://localhost:5173'}));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (_req, res) => res.json({message: 'Welcome to My Portfolio application.'}));
}
app.use('/api',apiRouter);
if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve('client/dist');
  app.use('/assets', express.static(path.join(dist, 'assets'), {immutable: true, maxAge: '1y'}));
  app.use(express.static(dist));
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.use((err,_req,res,_next)=>{
  if(err.name==='ValidationError')return res.status(400).json({error:err.message});
  if(err.name==='CastError')return res.status(400).json({error:'Invalid identifier'});
  console.error(err);res.status(500).json({error:'Internal server error'});
});
const port=process.env.PORT || 5000;
if(!process.env.MONGODB_URI || !process.env.JWT_SECRET){console.error('Set MONGODB_URI and JWT_SECRET in .env');process.exit(1)}
mongoose.connect(process.env.MONGODB_URI).then(()=>{
 console.log('MongoDB connected to',mongoose.connection.name);
 app.listen(port,()=>console.log(`Server running at http://localhost:${port}`));
}).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1)});
