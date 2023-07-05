import { Icon } from "@iconify/react"
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getToken } from 'next-auth/jwt';

import { Avatar, Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts'
import { IProduct } from '@/interfaces';
import { currency } from "@/utils";
import { green } from "@mui/material/colors";


const columns: GridColDef[] = [
   {
      field: 'img',
      headerName: 'Foto',
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/admin/products/${row.slug}`} target="_blank" rel="noreferrer">
               <Avatar
                  variant="rounded"
                  sx={{ width: 35, height: 50 }} //, bgcolor:'#154' }}
                  alt={ row.personage }
                  src={ row.img }
               />
            </a>
         )
      }
   },
   {
      field: 'personage',
      headerName: 'Personage',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <h3>{row.personage}</h3>
         )
      }
   },
   { field: 'category', headerName: 'Categoría', width: 350 },
   { field: 'type', headerName: 'Tipo' },
   { field: 'inStock', headerName: 'Inventario' },
   { field: 'price', headerName: 'Precio', align:'right' },
   { field: 'size', headerName: 'Tamaño', width: 100 },

];


const ProductsPage = () => {

   const { data, error } = useSWR<IProduct[]>('/api/admin/products');

   if (!data && !error) return (<></>);

   const rows = data!.map(product => ({
      id: product._id,
      img: product.images[2],
      personage: product.personage,
      category: product.category,
      iam: product.iam,
      type: product.type,
      inStock: product.inStock,
      price: currency.format(product.price),
      size: product.size,
      slug: product.slug,
   }));


   return (
      <AdminLayout
         title={`Productos`} // (${data?.length})`}
         subTitle={'Mantenimiento de productos'}
         icon={<Icon icon="carbon:category-new-each" color="#019" width="30" />}
      >
         <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
            <Typography variant='h2' sx={{ mb: 1 }}>{ 'Mantenimiento de productos' }</Typography>
            <Button
               // startIcon={<Icon icon="mdi:tooltip-add-outline" color="#fff" width="35" />}
               // startIcon={<Icon icon="icon-park:add-one"  width="40" />}
               startIcon={<Icon icon="ic:twotone-add-to-drive" color="#fff" width="25" />}
               href="/admin/products/new"
               className="circular-btn" 
            >
               Crear producto
            </Button>
         </Box>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 430, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                     pagination: {
                        paginationModel: { pageSize: 6 }
                     },
                  }}
                  pageSizeOptions={[6, 12]}
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

export default ProductsPage;