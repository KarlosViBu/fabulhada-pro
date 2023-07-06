'use client'
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "@/context";
import { useRouter } from "next/router";

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"

import SearchIcon from "../iconos/SearchIcon";
import UserIcon from "../iconos/UserIcon";
import OrdersIcon from "../iconos/OrdersIcon";
import KeyIcon from "../iconos/KeyIcon";
import ExitIcon from "../iconos/ExitIcon";
import CategorIcon from "../iconos/CategorIcon";
import UsersIcon from "../iconos/UsersIcon";
import MagicIcon from "../iconos/MagicIcon";

import DashboardIcon from "../iconos/DashboardIcon";

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
         
               {/* <div>
               <ListItem>
               
                  <CategorIcon/>
               
                  <AbundanceIcon />
                  <CubIcon/> 
                  <HealthIcon/>
               </ListItem>

               <ListItem>
                  <MagicIcon/>
               </ListItem>
               <ListItem>
                  <MaskIcon/>
               </ListItem>
               <ListItem>
                  <SunIcon/>
                  <ZodiacIcon/>

               </ListItem>
               </div> */}
               {
                  isLoggedIn && (
                     <>
                        <ListItem button>
                           <ListItemIcon>
                              <UserIcon width={40} fill="#33496a" />
                           </ListItemIcon>
                           <ListItemText primary={kperfil} />
                        </ListItem>

                        <ListItem 
                           button
                           onClick={() => navigateTo('/orders/history') }
                        >
                           <ListItemIcon>
                              <OrdersIcon width={25} fill="#33496a" />
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
                     <MagicIcon  />
                  </ListItemIcon>
                  <ListItemText primary={'Amor y Armonía'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/abundancia-prosperidad')}
               >
                  <ListItemIcon>
                     <MagicIcon fill="#ffd700" />
                  </ListItemIcon>
                  <ListItemText primary={'Abundancia y Prosperidad'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/salud-vitalidad')}
               >
                  <ListItemIcon>
                     <MagicIcon fill="#06870c" />
                  </ListItemIcon>
                  <ListItemText primary={'Salud y Vitalidad'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/sabiduria-poder')}
               >
                  <ListItemIcon>
                     <MagicIcon fill="#095ca4" />
                  </ListItemIcon>
                  <ListItemText primary={'Sabiduria y Poder'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/naturaleza-zodiaco')}
               >
                  <ListItemIcon>
                     <MagicIcon fill="#6609ac" />
                  </ListItemIcon>
                  <ListItemText primary={'Naturaleza y Zodíaco'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: { xs: '', sm: '', md: '', lg: 'none' } }}
                  onClick={() => navigateTo('/category/proteccion-talismanes')}
               >
                  <ListItemIcon>
                     <MagicIcon fill="#e68209" />
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
                              <DashboardIcon stroke="#033"/>
                           </ListItemIcon>
                           <ListItemText primary={'Dashboard'} />
                        </ListItem>

                        <ListItem
                           button
                           onClick={() => navigateTo('/admin/products')}
                        >
                           <ListItemIcon>
                              <CategorIcon width={30}/>
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