import {Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {Contact,Project,Qualification,User} from './models.js';
export const apiRouter=Router();
const wrap=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const safe=u=>({id:u.id,name:u.name,email:u.email,role:u.role});
const tokenFor=u=>jwt.sign({sub:u.id},process.env.JWT_SECRET,{expiresIn:'2h'});
async function authenticate(req,res,next){
 try{const token=req.headers.authorization?.match(/^Bearer (.+)$/i)?.[1];if(!token)return res.status(401).json({error:'Authentication required'});const payload=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(payload.sub);if(!user)return res.status(401).json({error:'Account unavailable'});req.user=user;next()}catch{return res.status(401).json({error:'Invalid or expired token'})}
}
const admin=(req,res,next)=>req.user?.role==='admin'?next():res.status(403).json({error:'Admin access required'});
apiRouter.post('/auth/signup',wrap(async(req,res)=>{
 const {name,email,password}=req.body;
 if(!name?.trim()||!/^\S+@\S+\.\S+$/.test(email||'')||typeof password!=='string'||password.length<8)return res.status(400).json({error:'Valid name, email and password (8+ characters) required'});
 if(await User.exists({email:email.toLowerCase().trim()}))return res.status(409).json({error:'Email already registered'});
 const u=await User.create({name:name.trim(),email,password:await bcrypt.hash(password,12),role:'user'});res.status(201).json({user:safe(u),token:tokenFor(u)});
}));
apiRouter.post('/auth/signin',wrap(async(req,res)=>{
 const u=await User.findOne({email:String(req.body.email||'').trim().toLowerCase()}).select('+password');
 if(!u||!await bcrypt.compare(String(req.body.password||''),u.password))return res.status(401).json({error:'Invalid credentials'});
 res.json({token:tokenFor(u),user:safe(u)});
}));
apiRouter.get('/auth/signout',(_req,res)=>res.json({message:'Signed out'}));
apiRouter.post('/auth/signout',(_req,res)=>res.json({message:'Signed out'}));
apiRouter.get('/auth/me',authenticate,(req,res)=>res.json(safe(req.user)));
function crud(path,Model,{publicCreate=false}={}){
 const router=Router();
 router.get('/',wrap(async(_req,res)=>res.json(await Model.find().sort({_id:-1}))));
 router.get('/:id',wrap(async(req,res)=>{const item=await Model.findById(req.params.id);if(!item)return res.status(404).json({error:'Not found'});res.json(item)}));
 router.post('/',...(publicCreate?[]:[authenticate,admin]),wrap(async(req,res)=>res.status(201).json(await Model.create(req.body))));
 router.put('/:id',authenticate,admin,wrap(async(req,res)=>{const {_id,id,...data}=req.body;const item=await Model.findByIdAndUpdate(req.params.id,{$set:data},{new:true,runValidators:true});if(!item)return res.status(404).json({error:'Not found'});res.json(item)}));
 router.delete('/:id',authenticate,admin,wrap(async(req,res)=>{const item=await Model.findByIdAndDelete(req.params.id);if(!item)return res.status(404).json({error:'Not found'});res.json({message:'Deleted'})}));
 apiRouter.use('/'+path,router);
}
crud('contacts',Contact,{publicCreate:true});crud('projects',Project);crud('qualifications',Qualification);
apiRouter.get('/users',authenticate,admin,wrap(async(_req,res)=>res.json((await User.find()).map(safe))));
