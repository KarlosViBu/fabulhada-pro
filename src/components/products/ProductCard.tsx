import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip, Badge } from '@mui/material'
import 'animate.css';
import { IProduct } from '../../interfaces'
import { currency } from '@/utils';
import { font1, font2, font3, font4, font5 } from '../ui';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? product.images[1]
            : product.images[0];

    }, [isHovered, product.images])

    const inImage = useMemo(() => {
        return isHovered
            ? "animate__animated animate__flipInY kshadow"
            //  ? "animate__animated animate__zoomIn animate__fast bordImg  kshadow"
            : "animate__animated animate__fadeIn animate__slow bordImg"
        // : "animate__animated animate__zoomIn animate__faster"

    }, [isHovered])

    return (
        <Grid item
            xs={6}
            sm={3}

        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref legacyBehavior prefetch={false}>
                    <Link>

                        <CardActionArea
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >

                            {
                                (product.inStock === -0) && (
                                    <Chip
                                        color="warning"
                                        label={product.personage}

                                        // variant="outlined" 
                                        sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '50px' }}
                                    />

                                )
                            }

                            <CardMedia
                                component='img'
                                //  className='fadeIn'
                                className={inImage}
                                image={productImage}
                                alt={product.personage}
                                onLoad={() => setIsImageLoaded(true)}
                            />

                        </CardActionArea>
                    </Link>
                </NextLink>

            
            {/*  */}
            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn cardText'>

                {/* // >{product.personage}</Typography> */}
                <div className='kper'>
                    {/* <h3 className='kper font3.className' >{product.personage}</h3> */}
                    <h3 className={font3.className} >{product.personage}</h3>
                </div>
                    {/* <h3 className={font4.className} >{product.personage}</h3>
                    <h3 className={font5.className} >{product.personage}</h3>
                    <h3 className={font6.className} >{product.personage}</h3>
                    <h3 className={font2.className} >{product.personage}</h3>
                    <h3 className={font1.className} >{product.personage}</h3> */}
                <div className='kpre'>
                    <h3>{currency.format(product.price)}</h3>
                {/* <Chip 
                    color="secondary"
                    label={currency.format(product.price)}
                    className={font2.className}
                    variant="outlined"
                    //  sx={{ position: 'absolute', zIndex: 99, top: '400px', left:'50px' }}
                /> */}
                </div>
                {/* <p className='kpre'>{`$${product.price}`}</p> */}
                {/* <Typography  sx={{ mb:0 }}>{`$${product.price}`}</Typography> */}
            </Box>
            </Card>
        </Grid>
    )
}
