import { Box, Typography } from '@mui/material';
import { ShopLayout } from "../components/layouts";
import Image from 'next/image';
import gato from '../../public/gifs/gato.gif'

const Custom404 = () => {
  return (
    <ShopLayout title='Page Inexistente' pageDescription='Sin nada que mostrar aquí'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <Image src={gato} width={200} alt="gato" priority />
            <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 </Typography>
            <Typography fontSize={20} marginLeft={2}>No encontramos ninguna página aquí</Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404;