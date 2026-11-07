import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {User} from './models.js';
if(!process.env.MONGODB_URI||!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD.length<8){console.error('Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD (8+ characters)');process.exit(1)}
try{await mongoose.connect(process.env.MONGODB_URI);const email=process.env.ADMIN_EMAIL.trim().toLowerCase();await User.findOneAndUpdate({email},{$set:{name:process.env.ADMIN_NAME||'Administrator',password:await bcrypt.hash(process.env.ADMIN_PASSWORD,12),role:'admin'}},{upsert:true,runValidators:true});console.log('Admin account ready')}catch(e){console.error(e.message);process.exitCode=1}finally{await mongoose.disconnect()}
