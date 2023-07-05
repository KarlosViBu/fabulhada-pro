import { FC, useContext } from "react"
import { CartContext } from "@/context";
import { Grid, Typography } from "@mui/material"
import { currency } from '@/utils';

interface Props {
    orderValues?: {
       numberOfItems: number;
       subTotal: number;
       total: number;
       tax: number;
    }
 }
 
 export const OrderSummary: FC<Props> = ({ orderValues }) => {
 
    const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
 
    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax };

  return (
    <Grid container>
        
    {/*
        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ currency.format(summaryValues.subTotal) }</Typography>
        </Grid>

        <Grid item xs={6}>
            {/* <Typography>Impuestos (15%)</Typography> *
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            {/* <Typography>{ `$${ 35.34 }` }</Typography> *
        </Grid>
   */}
        <Grid item xs={6} sx={{ mt:2  }}>
            <Typography variant="h2"><b> Total: </b></Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ currency.format(summaryValues.total) }</Typography>
        </Grid>

    </Grid>
  )
}
