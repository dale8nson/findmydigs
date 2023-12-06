import * as React from 'react';
import { Box } from '@mui/material';

const Dots = ({ dot, of }) => {

  const dots = Array(of).fill(null).map((_, i) => {
    <Box key={`${i + 1}`} component={'div'} sx={{ borderRadius: '5px', borderStyle:'solid', borderWidth:'2px', height: '10px', width: '10px', backgroundColor: '#ee0000', zIndex: 50 }} />
  });

  return (
    <Box sx={{ borderColor: '#ffffff', borderStyle: 'solid', borderWidth: '5px', position: 'absolute', bottom: '8%', left: '25%', width: '50%', height:'10%', margin:'auto' }}>

      {dots}

    </Box>
  )
};

export default Dots;