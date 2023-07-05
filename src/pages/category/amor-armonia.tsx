import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

import { FullScreenLoading } from '@/components/ui';
import { SalmodiaAA } from '@/components/category';


const AmorArmoniaPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?category=amor-armonia');


  return (
    <ShopLayout title={'Fabul♥Hada - Amor y Armonía'} pageDescription={'Los mejores productos de FabulHada para el Amor y Armonía'}>
      <Box display='flex' justifyContent='space-between' align-items='end' >
        <h1 className='ktitle'>
          Amor y Armonía
        </h1>
        <SalmodiaAA />
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default AmorArmoniaPage
