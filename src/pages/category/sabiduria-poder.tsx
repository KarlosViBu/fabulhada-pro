import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

import { FullScreenLoading } from '@/components/ui';
import { SalmodiaSP } from '@/components/category';


const SabiduriaPoderPage: NextPage = () => {


   const { products, isLoading } = useProducts('/products?category=sabiduria-poder');


   return (
      <ShopLayout title={'Fabul♥Hada - sabiduria & poder'} pageDescription={'Los mejores productos de FabulHada para la Sabiduria y Poder'}>
      <Box display='flex' justifyContent='space-between'  align-items= 'end' >
        <h1 className='ktitle'>
          Sabiduría y Poder
        </h1>
          <SalmodiaSP  />
      </Box>
         {
            isLoading
               ? <FullScreenLoading />
               : <ProductList products={products} />
         }

      </ShopLayout>
   )
}

export default SabiduriaPoderPage
