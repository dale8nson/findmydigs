import * as React from 'react';
import { Box } from '@mui/material';

const Dots = ({dot, of}) => {
  return (
<Box sx={{}}>
    <div className='relative h-10 justify-center flex'>
      {
        Array(of).fill(null).map((_, i) => {
          <div key={`${i + 1}`} className={`rounded-full w-4 bg-gray-50`}></div>
        }) 
      }
    </div>
</Box>
  )
};

export default Dots;