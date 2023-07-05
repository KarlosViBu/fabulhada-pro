'use client'
import { useContext, useEffect, useState } from "react";
import { AuthContext, UiContext } from "@/context";
import { useRouter } from "next/router";

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { Icon } from '@iconify/react';

import ClearIcon from "../iconos/ClearIcon";
import SearchIcon from "../iconos/SearchIcon";
import UserIcon from "../iconos/UserIcon";
import OrdersIcon from "../iconos/OrdersIcon";

import KeyIcon from "../iconos/KeyIcon";
import ExitIcon from "../iconos/ExitIcon";
import CategorIcon from "../iconos/CategorIcon";
import UsersIcon from "../iconos/UsersIcon";
// import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

export const SideMenu = () => {

   const router = useRouter();

   const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
   const { user, isLoggedIn, logout } = useContext(AuthContext);

   const kperfil = `Perfil : ${user?.name}`

   const navigateTo = (url: string) => {
      toggleSideMenu();
      router.push(url);
   }

   const [searchTerm, setSearchTerm] = useState('');

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      navigateTo(`/search/${searchTerm}`);
   }

   return (
      <Drawer
         open={isMenuOpen}
         // open={ true }
         anchor='right'
         sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
         onClose={toggleSideMenu}
      >
         <Box sx={{ width: 250, paddingTop: 5 }}>

            <List>

               <ListItem>
                  <Input
                     autoFocus
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                     type='text'
                     placeholder="Buscar..."
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={onSearchTerm}
                           >
                              <SearchIcon width={25} fill="#33496a" />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </ListItem>

               {
                  isLoggedIn && (
                     <>
                        <ListItem button>
                           <ListItemIcon>
                              <UserIcon width={35} fill="#33496a" />
                           </ListItemIcon>
                           <ListItemText primary={kperfil} />
                        </ListItem>

                        <ListItem 
                           button
                           onClick={() => navigateTo('/orders/history') }
                        >
                           <ListItemIcon>
                              <OrdersIcon width={20} fill="#33496a" />
                           </ListItemIcon>
                           <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                     </>
                  )
               }

               <ListItem
                  button
                  // sx={{ display: { xs: '', md: 'none' } }}
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/amor-armonia')}
               >
                  <ListItemIcon>
                     {/* <LoveIcon width={30} fill="#203656" /> */}
                     <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#f89ea3" width="30" />
                     {/* <Icon icon="line-md:sun-rising-twotone-loop" color="#f47a80" width="35" /> */}
                  </ListItemIcon>
                  <ListItemText primary={'Amor y Armonía'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/abundancia-prosperidad')}
               >
                  <ListItemIcon>
                     {/* <AbundanceIcon width={30} fill="#203656" /> */}
                     {/* <Icon icon="line-md:sun-rising-twotone-loop" color="#ffd700" width="35" /> */}
                     <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#eecc09" width="30" />
                  </ListItemIcon>
                  <ListItemText primary={'Abundancia y Prosperidad'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/salud-vitalidad')}
               >
                  <ListItemIcon>
                     {/* <Icon icon="line-md:sun-rising-twotone-loop" color="#08ec13" width="35" /> */}
                     <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#06870c" width="30" />
                     {/* <HealthIcon width={30} fill="#203656" /> */}
                  </ListItemIcon>
                  <ListItemText primary={'Salud y Vitalidad'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/sabiduria-poder')}
               >
                  <ListItemIcon>
                     {/* <MagicIcon width={30} fill="#203656" /> */}
                     {/* <Icon icon="line-md:sun-rising-twotone-loop" color="#0a86f1" width="35" /> */}
                     <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#095ca4" width="30" />
                  </ListItemIcon>
                  <ListItemText primary={'Sabiduria y Poder'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/naturaleza-zodiaco')}
               >
                  <ListItemIcon>
                     {/* <ZodiacIcon width={40} fill="#203656" /> */}
                     <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#6609ac" width="30" />
                  </ListItemIcon>
                  <ListItemText primary={'Naturaleza y Zodíaco'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/proteccion-talismanes')}
               >
                  <ListItemIcon>
                     {/* <HomeIcon width={30} fill="#203656" /> */}
                     <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#e68209" width="30" />
                  </ListItemIcon>
                  <ListItemText primary={'Protección Hogar'} />
               </ListItem>

               {
                  !isLoggedIn
                     ? (
                        <ListItem button
                           onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                        >
                           <ListItemIcon>
                              <KeyIcon width={30} fill="#33496a" />
                           </ListItemIcon>
                           <ListItemText primary={'Ingresar'} />
                        </ListItem>
                     )
                     : (
                        <ListItem button onClick={logout}>
                           <ListItemIcon>
                              <ExitIcon width={30} fill="#33496a" />
                           </ListItemIcon>
                           <ListItemText primary={'Salir'} />
                        </ListItem>
                     )
               }

               {/* Admin */}
               {
                  user?.role === 'admin' && (
                     <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>
                        <ListItem
                           button
                           onClick={() => navigateTo('/admin/')}
                        >
                           <ListItemIcon>
                              <Icon icon="streamline:interface-dashboard-layout-3-app-application-dashboard-home-layout" color="#019" width="25" />
                           </ListItemIcon>
                           <ListItemText primary={'Dashboard'} />
                        </ListItem>

                        <ListItem
                           button
                           onClick={() => navigateTo('/admin/products')}
                        >
                           <ListItemIcon>
                              <CategorIcon />
                           </ListItemIcon>
                           <ListItemText primary={'Productos'} />
                        </ListItem>
                        <ListItem 
                           button
                           onClick={() => navigateTo('/admin/orders')}
                        >
                           <ListItemIcon>
                              <OrdersIcon width={25} fill="#33496a" />
                           </ListItemIcon>
                           <ListItemText primary={'Ordenes'} />
                        </ListItem>

                        <ListItem 
                           button
                           onClick={() => navigateTo('/admin/users')}
                        >
                           <ListItemIcon>
                              <UsersIcon width={30} />
                           </ListItemIcon>
                           <ListItemText primary={'Usuarios'} />
                        </ListItem>
                     </>
                  )
               }
            </List>
         </Box>
      </Drawer>
   )
}