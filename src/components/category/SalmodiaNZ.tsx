import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Link } from '@mui/material';
import { font3, font5 } from '../ui';

export const SalmodiaNZ = () => {

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
            <DialogTitle className={font3.className} id="scroll-dialog-title">SALMODIA PARA LOS ELEMENTALES DE LA NATURALEZA</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
               <DialogContentText
                  className='ksalmodia'
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
               >
                  <div className={font5.className}>
                     <p>Espíritus de la naturaleza, escuchad al que os pide:</p>
                     <p></p>
                     <p>Que el aire me inspire</p>
                     <p>El agua me purifique</p>
                     <p>La tierra me cobije</p>
                     <p>El fuego me anime</p>
                     <p>Y así el sol de la vida me ilumine</p>
                     <p>Y las estrellas mi destino guíen</p>
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
