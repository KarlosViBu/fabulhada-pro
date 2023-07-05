export interface IProduct {
    _id: string;
    personage: string;
    iam: string;
    images: string[];
    inStock: number;
    price: number;
    size: string;
    color: string;
    kind: IKind[];
    slug: string;
    tags: string[];
    feature: string;
    description: string;
    type: IType;
    category: ICategory;
    observations: string;

    createdAt: string;
    updatedAt: string;
}

export type ICategory = 'amor-armonia'|'abundancia-prosperidad'|'salud-vitalidad'|'sabiduria-poder'|'naturaleza-zodiaco'|'proteccion-talismanes';

export type IKind = 'Simple'|'Compuesto';
 
export type IType = 'hada'|'elfo'|'angel'|'buda'|'duende'|'gnomo'|'mago'|'genio'|'brujas'|'elementos'|'sirenas'|'miticos'|'zodiaco'|'lamparas'|'fuentes'|'bisuteria'|'recipiente'|'portasahumerio';

              // kind
// export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
// export type IType = 'shirts'|'pants'|'hoodies'|'hats';
