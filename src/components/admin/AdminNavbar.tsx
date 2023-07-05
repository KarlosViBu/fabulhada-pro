import { useContext } from 'react';
import NextLink from 'next/link';


import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';


import { UiContext } from '../../context';
import { font3 } from '../ui';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );
    

    return (
        <AppBar>
            <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
               <Link display='flex' alignItems='center'>
                  {/* <Typography variant='h1' component={'h1'}>Fabul♥Hada</Typography> */}
                  <Typography className={font3.className} sx={{ color: '#daa520' }}variant='h4'>Fabul</Typography>
                  <Typography className={font3.className} sx={{ color: '#ff0000' }}variant='h5'>♥</Typography>
                  <Typography className={font3.className} sx={{ color: 'blue' }}variant='h4'>Hada</Typography>
               </Link>
            </NextLink>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
