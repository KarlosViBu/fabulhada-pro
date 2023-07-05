import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react"
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt';

import useSWR from 'swr';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem } from '@mui/material';

import { AdminLayout } from '@/components/layouts'
import { IUser } from '@/interfaces';
import { fabulhadaApi } from '@/api';


const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);


    useEffect(() => {
      if (data) {
          setUsers(data);
      }
    }, [data]) //Cuando la data cambia, cambia el setUsers
    

    if ( !data && !error ) return (<></>);

    const onRoleUpdated = async( userId: string, newRole: string ) => {

        const previosUsers = users.map( user => ({ ...user }));
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(updatedUsers);

        try {
            
            await fabulhadaApi.put('/admin/users', {  userId, role: newRole });

        } catch (error) {
            setUsers( previosUsers );
            console.log(error);
            alert('No se pudo actualizar el role del usuario');
        }

    }


    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 300 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 200,
            renderCell: ({row}: GridRenderCellParams) => {
                return (
                    <Select
                        value={ row.role }
                        label="Rol"
                        onChange={ ({ target }) => onRoleUpdated( row.id, target.value ) }
                        sx={{ width: '200px' }}
                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                        {/* <MenuItem value='super-user'> Super User </MenuItem> */}
                        {/* <MenuItem value='SEO'> SEO </MenuItem> */}
                    </Select>
                )
            }
        },
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


  return (
    <AdminLayout 
        title={'Usuarios'} 
        subTitle={'Mantenimiento de usuarios'}
        // icon={ <PeopleOutline /> }
        icon={ <Icon icon="system-uicons:users" color="#019" width="45" />}
    >

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:370, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                        pagination: { 
                          paginationModel: { pageSize: 5 } 
                        },
                      }}
                      pageSizeOptions={[5, 10, 25]}
                    // rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const validRoles = ['admin']
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log({session});

    if (session && validRoles.includes(session.user.role)) {
        // console.log(session.user.role);
        return { props: {} }
    }
    else {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

}

export default UsersPage