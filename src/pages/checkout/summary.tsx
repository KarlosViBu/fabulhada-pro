import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NextLink from 'next/link';
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartContext } from '@/context';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { CartList, OrderSummary } from '@/components/cart';
import { countries } from '@/utils';


const SummaryPage = () => {

   const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
   // console.log(shippingAddress);
   if (!shippingAddress) {
      return <></>;
   }

   const router = useRouter();
   const [isPosting, setIsPosting] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const onCreateOrder = async () => {
      setIsPosting(true);  //empieza el proceso, bloqueo boton

      const { hasError, message } = await createOrder();

      if (hasError) {
         setIsPosting(false);
         setErrorMessage(message);
         return;
      }

      // dependiendo del resultado navego
      router.replace(`/orders/${message}`);

   }

   const { firstName, lastName, address, address2 = '', city, country = 'Colombia', phone, zip ='10101' } = shippingAddress;

   return (
      <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
         <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

         <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
               <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        <a href='/checkout/address' rel="noreferrer" >
                           Editar
                        </a>
                        {/* <NextLink href='/checkout/address' passHref>
                           <Link underline='always'>
                              Editar
                           </Link>
                        </NextLink> */}
                     </Box>

                     <Typography>{firstName} {lastName}</Typography>
                     <Typography>{address}{address2 ? `, ${address2}` : ''} </Typography>
                     <Typography>{city}, {zip}</Typography>
                     {/* <Typography>{countries.find(c => c.code === country)?.name}</Typography> */}
                     <Typography>{ country }</Typography>
                     <Typography>{phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <OrderSummary />

                     <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                        <Button
                           // color="secondary"
                           className='circular-btn'
                           fullWidth
                           onClick={onCreateOrder}
                           disabled={isPosting}
                        >
                           Confirmar Orden
                        </Button>

                        <Chip
                           color="error"
                           label={errorMessage}
                           sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                        />

                     </Box>

                  </CardContent>
               </Card>
            </Grid>
         </Grid>


      </ShopLayout>
   )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

   const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   // console.log({session});

   if ( session ) {
       return { props: {} }
   }
   else {
       return {
           redirect: {
               destination: '/auth/login?p=/checkout/address',
               permanent: false
           }
       }
   }

}

export default SummaryPage;