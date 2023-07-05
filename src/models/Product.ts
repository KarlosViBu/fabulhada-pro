import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    personage: { type: String, required: true, default:' ' },
    iam: { type: String, required: true, default:' ' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    size: { type: String, required: true, default:' ' },
    color: { type: String, required: true, default:' ' },
    kind: [{
        type: String,
        enum: {
            values: ['Simple','Compuesto'],
            message: '{VALUE} opción inválida'
        },
        default:'Simple'
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    feature: { type: String, required: true, default:'.' },
    description: { type: String, required: true, default:' ' },
    type: {
        type: String,
        enum: {
            values: ['hada','elfo','angel','buda','duende','gnomo','mago','genio','brujas','elementos','sirenas','miticos','zodiaco','lamparas','fuentes','bisuteria','recipiente','portasahumerio'],
            message: '{VALUE} tipo inválido'
        },
        default:'hada'
    },
    category: {
        type: String,
        enum: {
            values: ['amor-armonia','abundancia-prosperidad','salud-vitalidad','sabiduria-poder','naturaleza-zodiaco','proteccion-talismanes'],
            message: '{VALUE} categoría inválida'
        },
        default:'amor-armonia'
    },
    observations: { type: String, required: false },

},{
    timestamps: true
});


productSchema.index({ personage: 'text', tags: 'text' });


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );


export default Product;