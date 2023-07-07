import { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { AdminNavbar } from '../admin';

import { SideMenu, font3, font5 } from '../ui';
import NextLink from 'next/link';


interface Props {
    title: string;
    subTitle: string;
    pou: number;
    icon?: JSX.Element;
    children?: React.ReactNode;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, pou, icon }) => {

    let ruta = '/';
    if (pou === 1) ruta = '/admin/products';
    if (pou === 2) ruta = '/admin/orders';
    if (pou === 3) ruta = '/admin/users';

    return (
        <>

            <nav>
                <AdminNavbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                <Box display="flex" flexDirection='column' className={font3.className}>
                    <NextLink href={ ruta } passHref legacyBehavior>
                        <Link>
                            <h1 className='ktitle'>
                                {icon} {' '} {title}
                            </h1>
                        </Link>
                    </NextLink>
                    {/* <Typography variant='h1' component='h1'>
                    { icon }
                    {' '} { title }
                </Typography> */}

                    {/* <Typography variant='h2' sx={{ mb: 1 }}>{ subTitle }</Typography> */}

                </Box>

                <Box className='fadeIn'>
                    {children}
                </Box>

            </main>


        </>
    )
}


