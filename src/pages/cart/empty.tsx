import NextLink from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Box, Button, CardActionArea, CardActions, Link } from '@mui/material';

import { Avatar, Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "@/components/layouts"
// import medusa from '../../../public/gifs/carrito-de-compras.gif'

const EmptyPage = () => {

   const medusa = 'https://res.cloudinary.com/drxhdbob1/image/upload/v1688556802/p404-4_uz4rug.png'

   return (
      <ShopLayout title="Carrito vació" pageDescription="No hay artículos en el carrito de compras">
         <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 300px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
         >
            
            <Avatar
               alt="Remy Sharp"
               src={ medusa }
               sx={{ width: 300, height:305 }}
            />

            <Box display='flex' flexDirection='column' alignItems='center'>
               <Typography sx={{textAlign:'center' }} variant='h5'>Su carrito esta vacío</Typography>
               <NextLink href='/' passHref legacyBehavior>
                  <Link typography="h5" color='secondary'>
                     Regresar
                  </Link>
               </NextLink>
            </Box>


         


            {/* <Card sx={{ maxWidth: 445 }}>
               <CardActionArea>
                  <CardMedia
                     component="img"
                     height="240"
                     image={medusa}
                     alt="dragón"
                  />
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                        Su carrito está vacío
                     </Typography>
                  </CardContent>
               </CardActionArea>
               <CardActions>
                  <Button size="small" color="info" fullWidth className=''>
                     <NextLink href='/' passHref legacyBehavior>
                        <Link>
                           Regresar
                        </Link>
                     </NextLink>
                  </Button>
               </CardActions>
            </Card> */}


         </Box>
      </ShopLayout>
   )
}

export default EmptyPage