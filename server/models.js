import mongoose from 'mongoose';
const {Schema,model}=mongoose;
export const Contact=model('Contact',new Schema({firstname:{type:String,required:true},lastname:{type:String,required:true},contactNumber:String,email:{type:String,required:true},message:{type:String,required:true},created:{type:Date,default:Date.now}}));
const itemFields={title:{type:String,required:true},firstname:String,lastname:String,email:String,completion:Date,description:{type:String,required:true}};
export const Project=model('Project',new Schema(itemFields));
export const Qualification=model('Qualification',new Schema(itemFields));
export const User=model('User',new Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true,select:false},role:{type:String,enum:['user','admin'],default:'user'},created:{type:Date,default:Date.now}}));
