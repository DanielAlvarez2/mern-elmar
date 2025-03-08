import mongoose from 'mongoose'
const WineSchema = new mongoose.Schema({
    type:{type:String},
    section:{type:String},
    category:{type:String},
    region:{type:String},
    subRegion:{type:String},
    bin:{type:String},
    description:{type:String},
    vintageSize:{type:String},
    price:{type:Number},
    microsPrice:{type:Number},
    sequence:{type:Number}
},{
    timestamps:true
})
export default mongoose.model('Wine', WineSchema)