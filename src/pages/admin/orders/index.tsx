
import { Icon } from "@iconify/react"
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt';


// import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts'
import { IOrder, IUser } from '@/interfaces';
import { currency } from "@/utils";


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Ver orden',
        width: 105,
        // cellClassName: 'hisorder',
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
            ? (
                <Link href={ `/admin/orders/${ row.id }` } underline="none">
                    <h4 className="titleG">{ row.id.substring(15) }</h4> 
                </Link>
              )
            : (
                <Link href={ `/admin/orders/${ row.id }` } underline="none">
                    <h4 className="titleR">{ row.id.substring(15) }</h4> 
                </Link>
              )
        }
    },
    {
        field: 'isPaid',
        headerName: 'Estado',
        width:120,
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
                ? (<Chip 
                    variant='outlined' 
                    label="Pagada...." 
                    color="success"
                    component="a"
                    href={ `/admin/orders/${ row.id }` }
                    clickable
                 />)
                : (<Chip 
                    variant='outlined' 
                    label="Pendiente" 
                    color="error"
                    component="a"
                    href={ `/admin/orders/${ row.id }` }
                    clickable
                 />)
        }
    },
    { field: 'email', headerName: 'Correo', width: 400 },
    { field: 'name', headerName: 'Creada por usuario', width: 300 },
    {
        field: 'total',
        headerName: 'Total', width: 100, align: "right",
        renderCell: ({ row }: GridRenderCellParams) => {
            return currency.format(row.total)
        }
    },
    
    {
        field: 'updatedAt',
        headerName: 'Pagada en', width: 110, align: "right",
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
                ? (<p>{ row.updatedAt.substring(0,10) }</p>)
                : ('')
        }
    },

    { field: 'noProducts', headerName: '# Prod', align: 'center', width: 100 },
];


const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return (<></>);

    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
    }));


    return (
        <AdminLayout
            title={'Ordenes'}
            subTitle={''}
            icon={<Icon icon="fluent-mdl2:activate-orders" color="#154" width="35" />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 415, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                    />

                </Grid>
            </Grid>

        </AdminLayout>
    )
}

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

export default OrdersPage