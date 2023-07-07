import { useState, useEffect } from 'react';

import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt';

import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '@/components/admin'
import { DashboardSummaryResponse } from '@/interfaces';

import OrdersIcon from "@/components/iconos/OrdersIcon";
import PayIcon from "@/components/iconos/PayIcon";
import DashboardIcon from "@/components/iconos/DashboardIcon";
import CategorIcon from "@/components/iconos/CategorIcon";
import MoneyIcon from "@/components/iconos/MoneyIcon";
import UsersIcon from "@/components/iconos/UsersIcon";
import CancelIcon from "@/components/iconos/CancelIcon";
import StdownIcon from "@/components/iconos/StdownIcon";
import ReloadtimeIcon from "@/components/iconos/ReloadtimeIcon";

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
            pou={0}
            icon={<DashboardIcon stroke="#033"/>}
            // <Icon icon="streamline:interface-dashboard-layout-3-app-application-dashboard-home-layout" color="#019" width="25" />}
        >

            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subTitle="Ordenes"
                    icon={<OrdersIcon width={40} fill="#33496a" />}
                />

                <SummaryTile
                    title={paidOrders}
                    subTitle="Pagadas"
                    icon={<MoneyIcon width="60" fill="#06870c" />}
                />

                <SummaryTile
                    title={notPaidOrders}
                    subTitle="Pendientes"
                    icon={<PayIcon width="50" fill="#a13" />}
                />

                <SummaryTile
                    title={numberOfClients}
                    subTitle="Clientes"
                    icon={<UsersIcon width="45" />}
                />

                <SummaryTile
                    title={numberOfProducts}
                    subTitle="Productos"
                    icon={<CategorIcon fill="#33496a" width="50"/>}
                />

                <SummaryTile
                    title={productsWithNoInventory}
                    subTitle="Sin Stock"
                    icon={<CancelIcon fill="#a13" width="55" />}
                />

                <SummaryTile
                    title={lowInventory}
                    subTitle="Bajo Stock"
                    icon={<StdownIcon fill="#a32" width="55" />}
                />

                <SummaryTile
                    title={refreshIn}
                    subTitle="Se Actualiza:"
                    icon={<ReloadtimeIcon fill="#019" width="60" />}
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