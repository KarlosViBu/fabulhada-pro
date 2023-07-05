import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Link } from '@mui/material';
import { font3, font5 } from '../ui';

export const SalmodiaPT = () => {

   const [open, setOpen] = React.useState(false);
   const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

   const [fullWidth, setFullWidth] = React.useState(true);
   const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');

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
            <DialogTitle className={font3.className} id="scroll-dialog-title">SALMODIA PARA LA PROTECCION Y EL HOGAR (TALISMANES Y TOTEM)</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
               <DialogContentText
                  className='ksalmodia'
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
               >
                  <ol className={font5.className}>
                     <li>
                        <p>&nbsp;</p>
                        <p>Ángeles y seres custodios y protectores de nuestra vida y nuestro hogar</p>
                        <p>Protegednos con vuestro poder y majestad</p>
                        <p>Para que tengamos paz y armonía en todo momento y lugar</p>
                        <p>Y ningún ser o artilugio nos pueda dañar.</p>
                        <p>Os encomiendo mi persona, familia y mi hogar con fe, esperanza y buena vliuntad</p>
                     </li>
                     <li>
                        <p>&nbsp;</p>
                        <p>Cuando en mi refugio esté</p>
                        <p>Este tótem protector encontraré</p>
                        <p>Que alegría y paz</p>
                        <p>A mi hogar me de</p>

                     </li>
                     <li>
                        <p>&nbsp;</p>
                        <p>Bendito talismán conmigo siempre estarás</p>
                        <p>Y así mis pasos guiarás</p>
                        <p>Para el buen camino encontrar</p>
                        <p>Hacia mi felicidad</p>
                     </li>
                  </ol>
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
         </Dialog>
      </>
   )
}
