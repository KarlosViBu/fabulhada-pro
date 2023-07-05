import bcrypt from 'bcryptjs';

interface SeedProduct {
    personage: string;
    iam: string;
    images: string[];
    inStock: number;
    price: number;
    size: number;
    color: string;
    kind: ValidKinds[];
    slug: string;
    tags: string[];
    feature: string;
    description: string;
    type: ValidTypes;
    category: ValidCategories;
    observations: string;
}
                        // 1                    2                    3                     4                
type ValidCategories = 'amor-armonia'|'abundancia-prosperidad'|'salud-vitalidad'|'sabiduria-poder'|'naturaleza-zodiaco'|'talismanes';

type ValidKinds = 'Simple'|'Compuesto';

type ValidTypes = 'hada'|'elfo'|'angel'|'buda'|'duende'|'gnomo'|'mago'|'genio'|'brujas'|'elementos'|'sirenas'|'miticos'|'zodiaco'|'lamparas'|'fuentes'|'bisuteria'|'recipiente'|'portasahumerio';

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'|'client'
}



interface SeedData {
    products: SeedProduct[],
    users: SeedUser[];
}

export const initialData: SeedData = {
    users: [
        {
            name: 'Carlos Villegas',
            email: 'carlos@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Yudy Cardona',
            email: 'yudy@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'client'
        },
    ],
    products: [
        {
            description: "Porcelanicron, madera, alambre, tela, hilos, pinturas y materiales de reciclaje.",
            iam: "Soy el hada del amor que te ayudará a atraer y manifestar el amor de pareja y pasional en tu vida",
            images: [
                'afrodita.png',
                'afrodita2.png',
                'afrodita-mss.png',
            ],
            feature: "Hada Maciza",
            color: "Rojo",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple','Compuesto'],
            slug: "hada_maciza_afrodita_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Afrodita",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, alambre, telas, hilos, cintas, foamy, pinturas, escarchas, accesorios de bisutería y materiales de reciclaje.",
            iam: "Soy el hada del amor que te ayudará a manifestar tus deseos en todos los campos del amor: pareja, hijos y familia",
            images: [
                'merlina-rose.png',
                'merlina-rose-mss.png',
                'merlina-rose2.png',
            ],
            feature: "Hada Colgante",
            color: "Rosa",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "hada_colgante_merlina_rose_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Merlina Rose",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, madera, alambre, tul, pinturas.",
            iam: "Soy el hada del amor que te traerá paz y armonia en tus relaciones de pareja y amistad",
            images: [
                'adalina.png',
                'adalina-mss.png',
                'adalina2.png',
            ],
            feature: "Hada Maciza",
            color: "Rosa",
            inStock: 1,
            price: 40000,
            size: 10,
            kind: ['Simple'],
            slug: "hada_maciza_adalina_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Adalina",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, escarcha, pinturas.",
            iam: "Soy la hadita que traerá comprensión y dulzura en tu vida afectiva",
            images: [
                'tiny.png',
                'tiny-mss.png',
                'tiny2.png',
            ],
            feature: "Hada Maciza",
            color: "Rosa",
            inStock: 1,
            price: 30000,
            size: 10,
            kind: ['Simple'],
            slug: "hada_maciza_tiny_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Tiny",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron,  accesorios de bisutería, pinturas.",
            iam: "Soy la elfa que te dará la chispa de la alegría, travesura y jovialidad a tus relaciones",
            images: [
                'narcisa.png',
                'narcisa-mss.png',
                'narcisa2.png',
            ],
            feature: "Elfa Maciza",
            color: "Rosa",
            inStock: 1,
            price: 30000,
            size: 10,
            kind: ['Simple'],
            slug: "elfa_maciza_narcisa_amor",
            type: "elfo",
            tags: ['hada','amor','armonia'],
            personage: "Narcisa",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, accesorios de bisutería y material.",
            iam: "Soy la elfa que te abrirá los caminos para encontrar el amor romántico en tu vida",
            images: [
                'flora.png',
                'flora-mss.png',
                'flora2.png',
            ],
            feature: "Elfa Maciza",
            color: "Rosa",
            inStock: 1,
            price: 30000,
            size: 10,
            kind: ['Simple'],
            slug: "elfa_maciza_flora_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Flora",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, alambre, telas, hilos, cintas, foamy, pinturas, escarchas, accesorios de bisutería y materiales de reciclaje.",
            iam: "Soy la angelita que cuidará y protegera tus relaciones afectivas y de pareja",
            images: [
                'angelina.png',
                'angelina-mss.png',
                'angelina2.png',
            ],
            feature: "Angel Colgante",
            color: "Rosa",
            inStock: 1,
            price: 60000,
            size: 10,
            kind: ['Simple'],
            slug: "angel_colgante_angelina_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Angelina",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, pinturas, accesorios de bisuteria.",
            iam: "Soy la angelita que inundara de ternura y cariño tu hogar",
            images: [
                'alita.png',
                'alita-mss.png',
                'alita2.png',
            ],
            feature: "Angel Maciza",
            color: "Rosa",
            inStock: 1,
            price: 20000,
            size: 10,
            kind: ['Simple'],
            slug: "angel_maciza_alita_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Alita",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, alambre e hilos.",
            iam: "Soy el ángel que flechará el corazón de quien sea afin a ti en energía y vibración",
            images: [
                'cupido.png',
                'cupido-mss.png',
                'cupido2.png',
            ],
            feature: "Angel Macizo",
            color: "Rosa y rojo",
            inStock: 1,
            price: 30000,
            size: 10,
            kind: ['Simple'],
            slug: "angel_macizo_cupido_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Cupido",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron.",
            iam: "Soy el Buda del amor, que otorgo el perdón, la reconciliación y  la felicidad en tu mundo interno y externo.",
            images: [
                'budamor.png',
                'budamor-mss.png',
                'budamor2.png',
            ],
            feature: "Buda Macizo",
            color: "Rosa y rojo",
            inStock: 1,
            price: 40000,
            size: 10,
            kind: ['Simple'],
            slug: "buda_macizo_budamor_amor",
            type: "hada",
            tags: ['hada','amor','armonia'],
            personage: "Budamor",
            category: "amor-armonia",
            observations: ""
        },
        {
            description: "Porcelanicron, madera, alambre, acetato,  pinturas, accesorios de bisutería.",
            iam: "Soy el hada que traera prosperidad y éxito a tu vida.",
            images: [
                'prospera.png',
                'prospera-mss.png',
                'prospera2.png',
            ],
            feature: "Hada Maciza",
            color: "Azúl",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple','Compuesto'],
            slug: "hada_maciza_prospera_prosperidad",
            type: "hada",
            tags: ['hada','prosperidad','abundancia'],
            personage: "Próspera",
            category: "abundancia-prosperidad",
            observations: ""
        },
        {
            description: "Porcelanicron, accesorios de bisutería y material reciclable.",
            iam: "Soy el ángel que te proporciona la Abundancia y Prosperidad en los bienes físicos y materiales.",
            images: [
                'sandalfon.png',
                'sandalfon-mss.png',
                'sandalfon2.png',
            ],
            feature: "angel Macizo",
            color: "Azúl",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "angel_macizo_sandalfon_prosperidad",
            type: "hada",
            tags: ['hada','prosperidad','abundancia'],
            personage: "Sandalfón",
            category: "abundancia-prosperidad",
            observations: ""
        },
        {
            description: "Porcelanicron, accesorios de bisutería y material reciclable.",
            iam: "Soy el elfo que te conectara con los recursos y la creatividad para sacar adelante tus proyectos y negocios.",
            images: [
                'elfy.png',
                'elfy-mss.png',
                'elfy2.png',
            ],
            feature: "elfo Macizo",
            color: "Azúl",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple'],
            slug: "elfo_macizo_elfy_prosperidad",
            type: "hada",
            tags: ['hada','prosperidad','abundancia'],
            personage: "Elfy",
            category: "abundancia-prosperidad",
            observations: ""
        },
        {
            description: "Porcelanicron, accesorios de bisutería, material reciclable.",
            iam: "Soy el duende que te dará el magnetismo para que atraigas la suerte y la fortuna.",
            images: [
                'suertudo.png',
                'suertudo-mss.png',
                'suertudo2.png',
            ],
            feature: "duende Macizo",
            color: "Azúl",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "duende_macizo_suertudo_prosperidad",
            type: "hada",
            tags: ['hada','prosperidad','abundancia'],
            personage: "Suertudo",
            category: "abundancia-prosperidad",
            observations: "A este duende se le pondrá un trebol de 4 hojas en su mano"
        },
        {
            description: "Porcelanicron, accesorios de bisutería, material reciclable.",
            iam: "Soy el duende que te dará el magnetismo para que atraigas la suerte y la fortuna.",
            images: [
                'bonachon.png',
                'bonachon-mss.png',
                'bonachon2.png',
            ],
            feature: "duende Macizo",
            color: "Azúl",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "duende_macizo_bonachon_prosperidad",
            type: "hada",
            tags: ['hada','prosperidad','abundancia'],
            personage: "Bonachón",
            category: "abundancia-prosperidad",
            observations: "A este duende se le pondrá un trebol de 4 hojas en su mano"
        },
        {
            description: "Porcelanicron, alambre, telas, hilos, cintas, foamy, pinturas, escarchas, accesorios de bisutería y materiales de reciclaje.",
            iam: "Soy el hada de la salud, que te confiere la vitalidad y el bienestar de tu cuerpo físico",
            images: [
                'merlina-green.png',
                'merlina-rose-mss.png',
                'merlina-green2.png',
            ],
            feature: "Hada Colgante",
            color: "Verde",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "hada_colgante_merlina_green_salud",
            type: "hada",
            tags: ['hada','salud','vitalidad'],
            personage: "Merlina Green",
            category: "salud-vitalidad",
            observations: ""
        },
        {
            description: "Porcelanicron, madera, hilos, adornos bisutería, pinturas, material de reciclaje.",
            iam: "Soy el médico del cielo, que a través de mi llama sanadora verde sano tu cuerpo físico, tu corazón y tu mente, instalando la salud perfecta en todo tu ser",
            images: [
                'rafaelito.png',
                'rafaelito-mss.png',
                'rafaelito2.png',
            ],
            feature: "Angel macizo",
            color: "Blanco",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "angel_macizo_rafaelito_salud",
            type: "hada",
            tags: ['hada','salud','vitalidad'],
            personage: "Rafaelito",
            category: "salud-vitalidad",
            observations: ""
        },
        {
            description: "Porcelanicron, telas, bisutería y pinturas.",
            iam: "Soy el hada de la salud, te ayudo a vibrar en energias de equilibro, amor y salud a nivel físico, vital y espiritual",
            images: [
                'vitalicia.png',
                'vitalicia-mss.png',
                'vitalicia2.png',
            ],
            feature: "Hada maciza",
            color: "Verde",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple'],
            slug: "hada_maciza_vitalicia_salud",
            type: "hada",
            tags: ['hada','salud','vitalidad'],
            personage: "Vitalicia",
            category: "salud-vitalidad",
            observations: ""
        },
        {
            description: "Porcelanicron, telas, escarcha, material de reciclaje, cintas, accesorios bisutería.",
            iam: "Soy el mago Manú y vengo a enseñarte la sabiduría de las estrellas para que tengas el poder de dominar tu propio universo.",
            images: [
                'manu.png',
                'manu2.png',
                'manu-mss.png',
            ],
            feature: "Mago macizo",
            color: "Azúl",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple'],
            slug: "mago_macizo_manu_sabiduria",
            type: "hada",
            tags: ['hada','sabiduria','poder'],
            personage: "Manú",
            category: "sabiduria-poder",
            observations: ""
        },
        {
            description: "Alambre, porcelana fria, materiales de reciclaje, pinturas, accesorios de bisutería, tela.",
            iam: "Soy un mago poderoso que te concede el don de conocer y gobernar los elementos de la naturaleza externa y de tu propia naturaleza para que los puedas utilizar en tu crecimiento interior.",
            images: [
                'merlin.png',
                'merlin-mss.png',
                'merlin2.png',
            ],
            feature: "Mago macizo",
            color: "Azúl",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple'],
            slug: "mago_macizo_merlin_sabiduria",
            type: "hada",
            tags: ['hada','sabiduria','poder'],
            personage: "Merlín",
            category: "sabiduria-poder",
            observations: ""
        },
        {
            description: "Porcelanicron, icopor y pinturas.",
            iam: "Soy el genio que te ayudará a materializar y dar forma a tus deseos, planes y proyectos.",
            images: [
                'genius.png',
                'genius-mss.png',
                'genius2.png',
            ],
            feature: "Genio macizo",
            color: "Azúl",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "genio_macizo_genius_sabiduria",
            type: "hada",
            tags: ['hada','sabiduria','poder'],
            personage: "Genius",
            category: "sabiduria-poder",
            observations: ""
        },
        {
            description: "Icopor, porcelanicron, cono de incienso, silicona liquida y pinturas.",
            iam: "Soy el aroma que imprimirá magia a todos tus espacios.",
            images: [
                'fte-relax2.png',
                'fte-relax2-mss.png',
                'fte-relax22.png',
            ],
            feature: "Fuente de Humo de Incienso",
            color: "Azúl ozcura y café",
            inStock: 1,
            price: 80000,
            size: 25,
            kind: ['Simple'],
            slug: "humo_incienso_fte_relax2_talisman",
            type: "hada",
            tags: ['talisman'],
            personage: "Fuente Relax 2",
            category: "talismanes",
            observations: "Se le agregará una hadita"
        },
        {
            description: "Frasco de vidrio, imágenes, pasta para relieve, pinturas, accesorios bisutería, bolas de icopor.",
            iam: "Soy la luz que ilumina trayendo armonia y paz a tus espacios.",
            images: [
                'fte-relax1.png',
                'fte-relax1-mss.png',
                'fte-relax12.png',
            ],
            feature: "Fuente de Humo de Incienso",
            color: "Varios colores",
            inStock: 1,
            price: 20000,
            size: 10,
            kind: ['Simple'],
            slug: "lampara_fte_relax1_talisman",
            type: "hada",
            tags: ['talisman'],
            personage: "Fuente Relax 1",
            category: "talismanes",
            observations: "Esta lámpara se hará con la mecha para que funcione con parafina liquida o alcohol y se le colocaran motivos religiosos o fondos magicos"
        },
        {
            description: "Porcelanicron y pinturas, accesorios bisutería",
            iam: "Soy tu compañero de viaje en tus aventuras por la vida.",
            images: [
                'drago.png',
                'drago-mss.png',
                'drago2.png',
            ],
            feature: "Llavero dragón",
            color: "Varios colores",
            inStock: 1,
            price: 15000,
            size: 10,
            kind: ['Simple'],
            slug: "llavero_drago_talisman",
            type: "hada",
            tags: ['talisman'],
            personage: "Drago",
            category: "talismanes",
            observations: ""
        },
        {
            description: "Porcelana fría, alambre, pinturas, materiales de reciclaje",
            iam: "Soy el unicornio que te hará volar con la imaginación al mundo de tus sueños e ilusiones.",
            images: [
                'soniador.png',
                'soniador-mss.png',
                'soniador2.png',
            ],
            feature: "Unicornios",
            color: "Azúl claro",
            inStock: 1,
            price: 15000,
            size: 15,
            kind: ['Simple'],
            slug: "unicornio_soniador_mitico",
            type: "miticos",
            tags: ['mitico','naturaleza','zodiaco'],
            personage: "Soñador",
            category: "naturaleza-zodiaco",
            observations: ""
        },
        {
            description: "Porcelana fría, alambre, pinturas, materiales de reciclaje",
            iam: "Soy el unicornio que te conecta con tu pureza para que puedas aflorar tus mas nobles y puros sentimientos.",
            images: [
                'uniris.png',
                'uniris-mss.png',
                'uniris2.png',
            ],
            feature: "Unicornios",
            color: "Blanco",
            inStock: 1,
            price: 40000,
            size: 10,
            kind: ['Simple'],
            slug: "unicornio_uniris_mitico",
            type: "miticos",
            tags: ['mitico','naturaleza','zodiaco'],
            personage: "Uniris",
            category: "naturaleza-zodiaco",
            observations: ""
        },
        {
            description: "Porcelana fría, alambre, hilos, pinturas, materiales de reciclaje",
            iam: "Soy el caballito alado que te ayudará a proyectar tus sueños a lo mas alto y sublime.",
            images: [
                'pegaso.png',
                'pegaso-mss.png',
                'pegaso2.png',
            ],
            feature: "Caballo",
            color: "Blanco",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "caballo_pegaso_mitico",
            type: "miticos",
            tags: ['mitico','naturaleza','zodiaco'],
            personage: "Pegaso",
            category: "naturaleza-zodiaco",
            observations: "Se le agregarán las alas"
        },
        {
            description: "Porcelana fria, icopor, pinturas, accesorios de bisutería",
            iam: "Soy la sirena que seduce con sus cantos y encantos y te revela los secretos del profundo océano para que puedas llegar a conocer las profundidades de tu propio mundo.",
            images: [
                'loreley.png',
                'loreley-mss.png',
                'loreley2.png',
            ],
            feature: "Sirena",
            color: "Blanco",
            inStock: 1,
            price: 70000,
            size: 15,
            kind: ['Simple'],
            slug: "sirena_loreley_mitico",
            type: "miticos",
            tags: ['mitico','naturaleza','zodiaco'],
            personage: "Loreley",
            category: "naturaleza-zodiaco",
            observations: ""
        },
        {
            description: "Porcelana fría, alambre, telas, hilos, accesorios de bisutería",
            iam: "Soy la sirena que te conecta con tus emociones y sentimientos mas profundos y sinceros.",
            images: [
                'cefira.png',
                'cefira-mss.png',
                'cefira2.png',
            ],
            feature: "Sirena",
            color: "Blanco",
            inStock: 1,
            price: 60000,
            size: 15,
            kind: ['Simple'],
            slug: "sirena_cefira_mitico",
            type: "miticos",
            tags: ['mitico','naturaleza','zodiaco'],
            personage: "Céfira",
            category: "naturaleza-zodiaco",
            observations: ""
        },
    ]
}