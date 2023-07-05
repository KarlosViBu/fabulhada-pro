import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '../../components/ui';
import { SalmodiaAP } from '@/components/category';


const AbundanciaProsperidadPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?category=abundancia-prosperidad');

  return (
    <ShopLayout title={'Fabul♥Hada - Amor y Armonía'} pageDescription={'Los mejores productos de FabulHada para el Amor y Armonía'}>

      <Box display='flex' justifyContent='space-between'  align-items= 'end' >
        <h1 className='ktitle'>
          Abundancia y Prosperidad
        </h1>
          <SalmodiaAP  />
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}



export default AbundanciaProsperidadPage
