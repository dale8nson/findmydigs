import * as React from "react";
import { useState, Suspense } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import entrance from '../images/IMG_1809.webp';
import metalDoor from '../images/IMG_1812.webp';
import intercom from '../images/IMG_1815.webp';
import postEntry from '../images/IMG_1817.webp';
import carparkView from '../images/IMG_1818.webp';
import apartmentSign from '../images/IMG_1819.webp';
import firstFlight from '../images/IMG_1820.webp';
import secondFlightPartI from '../images/IMG_1821.webp';
import secondFlightPartII from '../images/IMG_1823.webp';
import apartmentDoorLS from '../images/IMG_1824.webp';
import apartmentDoorCU from '../images/IMG_1826.webp';

import { LanguageSelect, Instructions } from "../components";
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from "@mui/material";

const IndexPage = () => {

  const imageUrls = [
    [entrance],
    [metalDoor, intercom],
    [postEntry, carparkView, apartmentSign, firstFlight, secondFlightPartI, secondFlightPartII, apartmentDoorLS, apartmentDoorCU]
  ];
  const [language, setLanguage] = useState('');
  const [languageDialogOpen, setLanguageDialogOpen] = useState(true);
  const [inout, setInout] = useState(Array(imageUrls.length).fill(null).map((urls,i) => Array(imageUrls[i].length).fill(false)));
  return (
    <>
    <Suspense fallback=<CircularProgress /> >
      <Container maxWidth='xl'  sx={{height:'100vh', backgroundColor:'#333333'}}>
        <LanguageSelect {...{setLanguage, languageDialogOpen, setLanguageDialogOpen, setInout, inout}} />
        <Instructions language={language} {...{inout, setInout, imageUrls}} />
      </Container>
    </Suspense>
    </>
  );
};


export default IndexPage;