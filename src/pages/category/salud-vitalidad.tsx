import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

import { FullScreenLoading } from '@/components/ui';
import { SalmodiaSV } from '@/components/category';


const SaludVitalidadPage: NextPage = () => {


   const { products, isLoading } = useProducts('/products?category=salud-vitalidad');


   return (
      <ShopLayout title={'Fabul♥Hada - Salud & Vitalidad'} pageDescription={'Los mejores productos de FabulHada para la Salud y Vitalidad'}>
      <Box display='flex' justifyContent='space-between'  align-items= 'end' >
        <h1 className='ktitle'>
          Salud y Vitalidad
        </h1>
          <SalmodiaSV  />
      </Box>
         {
            isLoading
               ? <FullScreenLoading />
               : <ProductList products={products} />
         }

      </ShopLayout>
   )
}

export default SaludVitalidadPage
