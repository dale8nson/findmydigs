import * as React from "react"
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText'
import LanguageIcon from '@mui/icons-material/Language';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import DialogButton from "./dialog-button";

const LanguageSelect = ({ setLanguage, languageDialogOpen, setLanguageDialogOpen, inout, setInout }) => {

  const clickHandler = (val) => {
    setLanguage(val);
    const a = inout[0].toSpliced(0,1,true);
    setInout(inout.toSpliced(0,1,a));
    setLanguageDialogOpen(false);
  }

  const languages = {
    'English': 'english',
    '官话': 'mandarin',
    // 'عَرَبِيّ': 'arabic',
    'ਪੰਜਾਬੀ': 'punjabi-gurmukhi',
    // 'اردو': 'urdu',
    'ትግርኛ': 'tigrinya',
    'አማርኛ': 'amharic',
    'tiếng Việt': 'vietnamese',
    'ภาษาไทย': 'thai',
    '한국어': 'korean',
    '廣東話': 'cantonese',
    'italiano': 'italian',
    'Ελληνικά': 'greek',
    'el castellano': 'spanish'
  }

  const buttons = Object.keys(languages).map((key, i) => {
    return (
        <DialogButton key={`db-${key}`} buttonKey={`db-${key}`} onClick={() => clickHandler(languages[key])} >
          {key}
        </DialogButton>
    );
  })

  return (
    <Dialog open={languageDialogOpen} scroll='paper' sx={{margin:'auto', width:'100%', height:'100%'}} >
      <DialogTitle>
        <LanguageIcon />
        Language
      </DialogTitle>
      <DialogContent >
        <List>
          {buttons}
        </List>
      </DialogContent>
    </Dialog>
  );

  // return (
  //   <React.Fragment>
  //     <CssBaseline />
  //     <Box sx={{ bgcolor: '#dddddd', height: 'auto', m:'auto', p: 2 }}>
  //       <Stack>
  //         <FormControl sx={{maxWidth:600}} >
  //           <InputLabel id="language-select-label" ><LanguageIcon />Language</InputLabel>
  //           <Select labelId="language-select-label" label="Language" value={language} onChange={onLanguageSelect} >
  //             <MenuItem value='english'>English</MenuItem>
  //             <MenuItem value='mandarin'>官话</MenuItem>
  //             <MenuItem value='arabic'>عَرَبِيّ</MenuItem>
  //             <MenuItem value='vietnamese'>tiếng Việt</MenuItem>
  //             <MenuItem value='thai'>ภาษาไทย</MenuItem>
  //             <MenuItem value='korean'>한국어</MenuItem>
  //             <MenuItem value='cantonese'>廣東話</MenuItem>
  //             <MenuItem value='punjabi-shahmukhi'>پنجابی; </MenuItem>
  //             <MenuItem value='punjabi-gurmukhi'>ਪੰਜਾਬੀ</MenuItem>
  //             <MenuItem value='italian'>l'italiano</MenuItem>
  //             <MenuItem value='greek'>Ελληνικά</MenuItem>
  //             <MenuItem value='spanish'>el castellano</MenuItem>
  //           </Select>
  //         </FormControl>
  //       </Stack>
  //     </Box>
  //   </React.Fragment>
  // );
}

export default LanguageSelect;