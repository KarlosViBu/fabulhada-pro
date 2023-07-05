import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { IKind } from '../../interfaces';


interface Props {
    selectedSize?: IKind;
    kinds: IKind[];

    // Method
    onSelectedSize: (kind: IKind ) => void;
}


export const SizeSelector: FC<Props> = ({selectedSize, kinds, onSelectedSize }) => {
  return (
    <></>
    // <Box>
    //     {
    //         kinds.map( kind => (
    //             <p     //Button     inhabilitado por innecesario
    //                 key={ kind }
    //                 // kin='small'
    //                 color={ selectedSize === kind ? 'success' : 'info' }
    //                 // onClick={ () => onSelectedSize( size ) }
    //             >
    //                 {/* { size } */}
    //             </p>
    //         ))
    //     }
    // </Box>
  )
}
