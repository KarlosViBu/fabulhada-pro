import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { CartContext, UiContext } from '@/context';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import SearchIcon from '../iconos/SearchIcon';
import CartIcon from '../iconos/CartIcon';
import ClearIcon from '../iconos/ClearIcon';
import { font3, font5 } from './font';

export const Navbar = () => {

   const { asPath, push } = useRouter();
   const { toggleSideMenu } = useContext(UiContext);
   const { numberOfItems } = useContext( CartContext );
   // const router = useRouter();

   // console.log({router});

   const [searchTerm, setSearchTerm] = useState('');
   const [isSearchVisible, setIsSearchVisible] = useState(false);

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      push(`/search/${searchTerm}`);
   }

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

            <Box flex={1} />

            <Box 
            sx={{ display: isSearchVisible ? 'none' : { xs:'none', sm:'none' , md: 'none', lg: 'block' } }}
                    className="fadeIn">
               <NextLink href='/category/amor-armonia' passHref legacyBehavior>
                  <Link>
                     <Button color={asPath === '/category/amor-armonia' ? 'primary' : 'info'}>Amor Armonía</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/abundancia-prosperidad' passHref legacyBehavior>
                  <Link>
                     <Button color={asPath === '/category/abundancia-prosperidad' ? 'primary' : 'info'}>Abundancia Prosperidad</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/salud-vitalidad' passHref legacyBehavior>
                  <Link>
                     <Button color={asPath === '/category/salud-vitalidad' ? 'primary' : 'info'}>Salud Vitalidad</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/sabiduria-poder' passHref legacyBehavior>
                  <Link>
                     <Button color={asPath === '/category/sabiduria-poder' ? 'primary' : 'info'}>Sabiduría Poder</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/naturaleza-zodiaco' passHref legacyBehavior>
                  <Link>
                     <Button color={asPath === '/category/naturaleza-zodiaco' ? 'primary' : 'info'}>Naturaleza Zodíaco</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/proteccion-talismanes' passHref legacyBehavior>
                  <Link>
                     <Button color={asPath === '/category/proteccion-talismanes' ? 'primary' : 'info'}>Protección Talismán</Button>
                  </Link>
               </NextLink>
            </Box>

            <Box flex={1} />

            {/* Pantallas pantallas grandes */}
            {
               isSearchVisible
                  ? (
                     <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={(e:any) => setSearchTerm(e.target.value)}
                        onKeyPress={(e:any) => e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={() => setIsSearchVisible(false)}
                              >
                              <ClearIcon width={20} fill="#F44336"/>
                              </IconButton>
                           </InputAdornment>
                        }
                     />
                  )
                  :
                  (
                     <IconButton
                        onClick={() => setIsSearchVisible(true)}
                        className="fadeIn"
                        sx={{ display: { xs: 'none', sm: 'none', md:'none', lg:'flex' } }}
                     >
                        <SearchIcon width={25} fill="#33496a"/>
                     </IconButton>
                  )
            }

             {/* Pantallas pequeñas  */}
            <IconButton
               sx={{ display: { xs: 'flex', sm: 'flex', md:'flex', lg:'none' } }}
               onClick={toggleSideMenu}
            >
               <SearchIcon width={25} fill="#33496a"/>
            </IconButton>

            <NextLink href="/cart" passHref legacyBehavior>
               <Link>
                  <IconButton>
                     <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color="primary">
                        <CartIcon width={25}/>
                     </Badge>
                  </IconButton>
               </Link>
            </NextLink>
               

            <Button onClick={ toggleSideMenu }>
               Menú
            </Button>

         </Toolbar>
      </AppBar>
   )
}
