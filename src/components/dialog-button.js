import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText'

const DialogButton = ({ children, onClick, buttonKey }) => {
    return (
    <>
      <ListItem key={buttonKey}>
        <ListItemButton onClick={onClick}>
          <ListItemText>
            {children}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </>
    );
}

export default DialogButton;