const mongoose = require('mongoose')

const packageTypeSchema = mongoose.Schema(
    {
        name:{type:String, required:true}
    }
)

const PackageType = mongoose.model("PackageType", packageTypeSchema)

const deliveryLocationSchema = mongoose.Schema(
    {
        pickUpLocation: {type:String, required:true},
        dropOffLocation: {type:String, required:true}
    },
    {timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }}
);

const DeliveryLocation = mongoose.model('DeliveryLocation', deliveryLocationSchema);


const deliveryInfoSchema = mongoose.Schema(
    {
        deliveryLocation: {type:mongoose.Types.ObjectId, ref:'DeliveryLocation'},
        senderName:{type:String, required:true},
        senderPhone: {type:Number, required:true},
        receiverName:{type:String, required:true},
        receiverPhone: {type:Number, required:true},
        packageType: {type:mongoose.Types.ObjectId, ref:'PackageType'},
        packageName: {type:String, required:true},
        additionalInfo: {type:String, required:true},
        user_id :{type:String, required:true}
    },
    {timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }}
)

const DeliveryInfo = mongoose.model('DeliveryInfo', deliveryInfoSchema)

module.exports = {DeliveryInfo, PackageType, DeliveryLocation}

