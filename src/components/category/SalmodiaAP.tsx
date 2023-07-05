import React from 'react';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Link, Typography } from '@mui/material';
import { font3, font5 } from '../ui';

export const SalmodiaAP = () => {

   const [open, setOpen] = React.useState(false);
   const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

   const [fullWidth, setFullWidth] = React.useState(true);
   const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

   const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
      setOpen(true);
      setScroll(scrollType);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const descriptionElementRef = React.useRef<HTMLElement>(null);
   React.useEffect(() => {
      if (open) {
         const { current: descriptionElement } = descriptionElementRef;
         if (descriptionElement !== null) {
            descriptionElement.focus();
         }
      }
   }, [open]);

   return (
      <>
         <Link
            className='msalmodia'
            component="button"
            variant="body2"
            onClick={handleClickOpen('paper')}
         >
            Salmodia
         </Link>
         <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
         >
            <DialogTitle className={font3.className} id="scroll-dialog-title">SALMODIA DE LA ABUNDANCIA Y LA PROSPERIDAD</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
               <DialogContentText
                  className='ksalmodia'
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
               >
                  <div className={font5.className}>
                     <p>Elfos, duendes y Gnomos, custodios de los tesoros,</p>
                     <p>Traedme los bienes que escondidos tienes,</p>
                     <p>Traedme el oro que tanto añoro,</p>
                     <p>Traedme la plata que me hace falta,</p>
                     <p>Traedme el dinero que tanto quiero,</p>
                     <br />
                     <p>Os lo pido con mi intención y puro corazón</p>
                     <p>Que la sabiduría sea mi guía </p>
                     <p>para atraer todo lo que necesito a mi vida,</p>
                     <p>y compartir con todos mi abundancia y alegría.</p>

                  </div>
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
         </Dialog>
      </>
   )
}
