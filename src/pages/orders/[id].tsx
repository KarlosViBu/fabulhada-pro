import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { PayPalButtons } from '@paypal/react-paypal-js';

import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip, CircularProgress } from '@mui/material';
// import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { Icon } from '@iconify/react';


import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { fabulhadaApi } from '../../api';

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

   // console.log({ order });

   const router = useRouter();
   const { shippingAddress } = order;
   const [isPaying, setIsPaying] = useState(false);

   const onOrderCompleted = async (kstatus: string, kid: string) => {

      if (kstatus !== 'COMPLETED') {
         return alert('Falta pago en Paypal');
      }

      setIsPaying(true);

      try {

         const { data } = await fabulhadaApi.post(`/orders/pay`, {
            transactionId: kid,
            orderId: order._id
         });

         router.reload();

      } catch (error) {
         setIsPaying(false);
         console.log(error);
         alert('Error');
      }

   }

   return (
      <ShopLayout title='Resumen de la orden 123671523' pageDescription={'Resumen de la orden'}>

         {
            order.isPaid
            //    ? (
            //       <Typography color='#06870c' variant='h1' component='h1'>Orden: {order._id}</Typography>
            //    ) :
            //    (
            //       <Typography color='error' variant='h1' component='h1'>Orden: {order._id}</Typography>
            //    )
            ? 
               ( <h1 className='ktitle titleG'>Orden: {order._id} </h1> ) 
            :  ( <h1 className='ktitle titleR'>Orden: {order._id} </h1> )
         }

         <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={7}>
               <CartList products={order.orderItems} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Box display='flex' justifyContent='space-between'>
                        <Typography >Fecha</Typography>
                        <Typography >{order.numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
                     </Box>
                     <Box display='flex' justifyContent='space-between'>
                        <Typography >{ order.createdAt?.substring(0,10) }</Typography>
                        <Typography >{order.numberOfItems} </Typography>
                     </Box>
                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        {
                           order.isPaid
                              ? ('')
                              :
                              (
                                 <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always'>
                                       Editar
                                    </Link>
                                 </NextLink>
                              )
                        }

                     </Box>

                     <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                     <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                     <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                     <Typography>{shippingAddress.country}</Typography>
                     <Typography>{shippingAddress.phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <OrderSummary
                        orderValues={{
                           numberOfItems: order.numberOfItems,
                           subTotal: order.subTotal,
                           total: order.total,
                           tax: order.tax,
                        }}
                     />

                     <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                        {/* TODO */}

                        <Box display="flex"
                           justifyContent="center"
                           className='fadeIn'
                           sx={{ display: isPaying ? 'flex' : 'none' }}>
                           <CircularProgress />
                        </Box>

                        <Box flexDirection='column' sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }} >
                           {
                              order.isPaid
                                 ? (
                                    <>
                                       <Chip
                                          sx={{ my: 2 }}
                                          label="Orden ya fue pagada"
                                          variant='outlined'
                                          color="success"
                                          icon={<Icon icon="mdi:recurring-payment" color="#06870c" width="35" />}
                                       />
                                       {/* <Icon icon="mdi:recurring-payment" color="#06870c" width="40" /> */}
                                    </>

                                 ) : (
                                    <>
                                       <PayPalButtons
                                          createOrder={(data, actions) => {
                                             return actions.order.create({
                                                purchase_units: [
                                                   {
                                                      amount: {
                                                         value: `${order.total}`,
                                                      },
                                                   },
                                                ],
                                             });
                                          }}
                                          onApprove={(data, actions) => {
                                             return actions.order!.capture().then((details) => {
                                                onOrderCompleted(details.status, details.id);
                                                // console.log({ details })
                                                // const name = details.payer.name?.given_name;
                                                // alert(`Transaction completed by ${name}`);
                                             });
                                          }}
                                       />
                                    </>
                                 )
                           }
                        </Box>

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
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

   const { id = '' } = query;
   const session: any = await getSession({ req });

   if (!session) {
      return {
         redirect: {
            destination: `/auth/login?p=/orders/${id}`,
            permanent: false,
         }
      }
   }

   const order = await dbOrders.getOrderById(id.toString());

   if (!order) {
      return {
         redirect: {
            destination: '/orders/history',
            permanent: false,
         }
      }
   }

   if (order.user !== session.user._id) {
      return {
         redirect: {
            destination: '/orders/history',
            permanent: false,
         }
      }
   }

   return {
      props: {
         order
      }
   }
}

export default OrderPage;