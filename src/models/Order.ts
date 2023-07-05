import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        personage   : { type: String, required: true, default:'' },
        kind    : { type: String, required: true, default:'Simple' },
        quantity: { type: Number, required: true, default:'' },
        slug    : { type: String, required: true, default:'' },
        image   : { type: String, required: true, default:'' },
        price   : { type: Number, required: true, default:0 },
    }],
    shippingAddress: {
        firstName : { type: String, required: true, default:'' },
        lastName  : { type: String, required: true, default:'' },
        address   : { type: String, required: true, default:'' },
        address2  : { type: String },
        zip       : { type: String, required: true, default:'630001' }, 
        city      : { type: String, required: true, default:'' },
        country   : { type: String, required: true, default:'Colombia' },
        phone     : { type: String, required: true, default:'' },
    },

    numberOfItems: { type: Number, required: true, default:0 },
    subTotal     : { type: Number, required: true, default:0 },
    tax          : { type: Number, required: true, default:0 },
    total        : { type: Number, required: true, default:0 },

    isPaid : { type: Boolean, required: true, default: false },
    paidAt : { type: String },

    transactionId: { type: String },
    
}, {
    timestamps: true,
})

const Order:Model<IOrder> = mongoose.models.Order || model('Order',orderSchema);

export default Order;