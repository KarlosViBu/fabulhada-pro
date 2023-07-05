import { FC } from 'react';

import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Icon } from "@iconify/react"

interface Props {
    title: string | number;
    subTitle: string;
    icon: JSX.Element
}


export const SummaryTile:FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={10} sm={4} md={3}>
        <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ width: 50, display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                { icon }
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h1'>{ title }</Typography>
                <Typography variant='h2'>{ subTitle }</Typography>
            </CardContent>
        </Card>
        
    </Grid>
  )
}
