import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { CartContext } from '@/context';

import { ShopLayout } from '@/components/layouts';
import { ProductSlideshow, SizeSelector } from '@/components/products';

import { ItemCounter } from '@/components/ui/ItemCounter';
import { dbProducts } from '@/database';
import { ICartProduct, IProduct, IKind } from '@/interfaces';
import { currency } from '@/utils';
import { Product } from '@/models';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();
  const { addProductToCart } = useContext(CartContext)
  
  // console.log({ product });

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    kind: 'Simple',   //undefined,
    slug: product.slug,
    personage: product.personage,
    category: product.category,
    quantity: 1,
  })

  const selectedSize = (kind: IKind) => {
    // console.log('Padre:', kind);
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      kind
    }));
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {

    if (!tempCartProduct.kind) { return; }

    addProductToCart(tempCartProduct);
    router.push('/cart');
  }

  return (
    <ShopLayout title={product.personage} pageDescription={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <h2 className='ktitle2'>{product.personage}</h2>
            <h2 className='ktitle2'>{currency.format(product.price)}</h2>
            {/* <Typography variant='h1' component='h1'>{product.personage}</Typography>
            <Typography variant='h1'>
              {currency.format(product.price)}
            </Typography> */}

            {/* Cantidad */}
            <Box sx={{ my: 6 }}>
              <Typography variant='h2' component='h2'>Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                // maxValue={ product.inStock > 10 ? 10: product.inStock }
                maxValue={5}
              />
              <SizeSelector
                kinds={product.kind}
                selectedSize={tempCartProduct.kind}
                onSelectedSize={selectedSize}
              />
            </Box>


            {/* Agregar al carrito */}
            {
              (product.inStock > 0)
                ? (
                  <Button
                    // color="secondary" 
                    className='circular-btn'
                    size='large'
                    onClick={onAddProduct}
                  >
                    {
                      tempCartProduct.kind
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
                )
                : (
                  <Chip label="No hay disponibles" color="error" variant='outlined' />
                )
            }

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle1'>Materiales</Typography>
              <Typography variant='body1'>{product.description}</Typography>
            </Box>

            <Box display='flex' gap={3}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='subtitle1'>Tamaño</Typography>
                <Typography variant='body1'>{product.size} cm</Typography>
              </Box>
              <Box display='flex' flexDirection='column'>
                <Typography variant='subtitle1'>Color</Typography>
                <Typography variant='body1'>{product.color}</Typography>
              </Box>
            </Box>

            {
              product.observations !== ''
                ? (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant='subtitle1'>Observaciones</Typography>
                    <Typography variant='body1'>{product.observations}</Typography>
                  </Box>
                )
                : (<></>
                )
            }

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}

/*
getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// * No usar esto.... SSR
//                                                              ctx
// Cada vez que venga un Request a esta pagina.  El servidor procesa, renderiza y genera la respuesta.

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}
*/

// getStaticPaths....
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// Obtengo por Build todas los paths contruidos antes de que el usuario los solicite
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs();


  return {
    // desextructura            obj
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

// Para aquellos props (datos) que se renderizan cada determinado tiempo ej. 24h
// desextructura  del                                   ctx
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 24
  }
}


export default ProductPage