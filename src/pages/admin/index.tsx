import { useState, useEffect } from 'react';

import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt';

import { Icon } from "@iconify/react"
import useSWR from 'swr';
// import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('Tick');
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
        }, 1000);

        return () => clearInterval(interval)
    }, []);


    if (!error && !data) {
        return <></>
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

    /*
*/
    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadisticas generales'
            icon={<Icon icon="streamline:interface-dashboard-layout-3-app-application-dashboard-home-layout" color="#019" width="25" />}
        >

            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subTitle="Ordenes"
                    icon={<Icon icon="fluent-mdl2:activate-orders" color="#154" width="40" />}
                />

                <SummaryTile
                    title={paidOrders}
                    subTitle="Pagadas"
                    icon={<Icon icon="ic:outline-attach-money" color="#154" width="60" />}
                />

                <SummaryTile
                    title={notPaidOrders}
                    subTitle="Pendientes"

                    icon={<Icon icon="mdi:recurring-payment" color="#a32" width="60" />}
                // icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={numberOfClients}
                    subTitle="Clientes"
                    icon={<Icon icon="system-uicons:users" color="#019" width="45" />}
                />

                <SummaryTile
                    title={numberOfProducts}
                    subTitle="Productos"
                    icon={<Icon icon="carbon:category-new-each" color="#019" width="55" />}
                />

                <SummaryTile
                    title={productsWithNoInventory}
                    subTitle="Sin Stock"
                    icon={<Icon icon="ic:round-cancel-presentation" color="#a32" width="55" />}
                />

                <SummaryTile
                    title={lowInventory}
                    subTitle="Bajo Stock"
                    icon={<Icon icon="fluent-mdl2:stock-down" color="#a32" width="55" />}
                />

                <SummaryTile
                    title={refreshIn}
                    subTitle="Se Actualiza:"
                    icon={<Icon icon="ant-design:reload-time-outline" color="#019" width="60" />}
                />

            </Grid>


        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const validRoles = ['admin']
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log({session});

    if (session && validRoles.includes(session.user.role)) {
        // console.log(session.user.role);
        return { props: {} }
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

export default DashboardPage