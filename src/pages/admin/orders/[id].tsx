import { GetServerSideProps, NextPage } from 'next';
import { Icon } from "@iconify/react"
import { getToken } from 'next-auth/jwt';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <AdminLayout
            title={`Orden: ${order._id}`}
            // subTitle={`OrdenId: ${order._id}`}
            subTitle={''}
            icon={<Icon icon="fluent-mdl2:activate-orders" color="#154" width="35" />}
        >
            <Grid container spacing={2} className='fadeIn'>
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
                            <Typography > { order.createdAt?.substring(0,10) }</Typography>
                            <Typography >{order.numberOfItems}</Typography>
                        </Box>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
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


                                <Box display='flex' flexDirection='column'>
                                    {
                                        order.isPaid
                                            ? (
                                                <Chip
                                                    sx={{ my: 2, flex: 1 }}
                                                    label="Orden ya fue pagada"
                                                    variant='outlined'
                                                    color="success"
                                                    component="a"
                                                    href='/admin/orders'
                                                    clickable
                                                    icon={<Icon icon="mdi:recurring-payment" color="#154" width="35" />}
                                                />

                                            ) : (
                                                <Chip
                                                    sx={{ my: 2, flex: 1 }}
                                                    label="Pendiente de pago"
                                                    variant='outlined'
                                                    color="error"
                                                    component="a"
                                                    href='/admin/orders'
                                                    clickable
                                                    icon={<Icon icon="mdi:recurring-payment" color="#a32" width="35" />}
                                                />
                                            )
                                    }
                                </Box>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </AdminLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const validRoles = ['admin']
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log({session});

    if (session && validRoles.includes(session.user.role)) {
        // console.log(session.user.role);

        const { id = '' } = query;
        const order = await dbOrders.getOrderById(id.toString());

        if (!order) {
            return {
                redirect: {
                    destination: '/admin/orders',
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
    else {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    
}


export default OrderPage;