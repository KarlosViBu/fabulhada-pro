import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

import { FullScreenLoading } from '@/components/ui';
import { SalmodiaNZ } from '@/components/category';


const NaturalezaZodiacoPage: NextPage = () => {


   const { products, isLoading } = useProducts('/products?category=naturaleza-zodiaco');


   return (
      <ShopLayout title={'Fabul♥Hada - Naturaleza & Zodiaco'} 
      pageDescription={'Los mejores productos de FabulHada para la Naturaleza y Zodiaco'}>
      <Box display='flex' justifyContent='space-between'  align-items= 'end' >
        <h1 className='ktitle'>
          Naturaleza y Zodíaco
        </h1>
          <SalmodiaNZ  />
      </Box>
         {
            isLoading
               ? <FullScreenLoading />
               : <ProductList products={products} />
         }

      </ShopLayout>
   )
}

export default NaturalezaZodiacoPage
