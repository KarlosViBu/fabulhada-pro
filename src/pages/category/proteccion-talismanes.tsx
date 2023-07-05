import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

import { FullScreenLoading } from '@/components/ui';
import { SalmodiaPT } from '@/components/category';


const TalismanesPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?category=proteccion-talismanes');


  return (
    <ShopLayout title={'Fabul♥Hada - Talismanes'} pageDescription={'Los mejores productos de FabulHada acerca de Talismanes'}>
      <Box display='flex' justifyContent='space-between' align-items='end' >
        <h1 className='ktitle'>
          Protección y Talismán
        </h1>
        <SalmodiaPT />
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default TalismanesPage
