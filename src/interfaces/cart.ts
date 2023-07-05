import { IKind } from "./products";

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    kind?: IKind;
    slug: string;
    personage: string;
    category: 'amor-armonia'|'abundancia-prosperidad'|'salud-vitalidad'|'sabiduria-poder'|'naturaleza-zodiaco'|'proteccion-talismanes';
    quantity: number;
}
