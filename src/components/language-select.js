import * as React from "react"
import { useState, useCallback, useMemo } from 'react';
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
import { Directions, IosShare } from "@mui/icons-material";

const LanguageSelect = ({ setLanguage, languageDialogOpen, directions, setLanguageDialogOpen, inout, io, setInout, slideShow, setIntervalID, activeStep, setActiveStep }) => {

  const clickHandler = (val) => {
    setLanguage(val);
    const a = inout[0].toSpliced(0,1,true);
    directions.current[0] = directions.current[0].toSpliced(0, 1, 'left');
    io.current[0] = io.current[0].toSpliced(0,1,true);
    setInout(io.current);
    slideShow(activeStep, inout[activeStep].length, 0);
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
}

export default LanguageSelect;