import * as React from "react";
import { useState, Suspense } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { LanguageSelect, Instructions } from "../components";
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from "@mui/material";

const IndexPage = () => {
  const [language, setLanguage] = useState('');
  const [languageDialogOpen, setLanguageDialogOpen] = useState(true);
  
  return (
    <>
    <Suspense fallback=<CircularProgress /> >
      <Container maxWidth='xl'  sx={{height:'100vh', backgroundColor:'#333333'}}>
        <LanguageSelect {...{setLanguage, languageDialogOpen, setLanguageDialogOpen}} />
        <Instructions language={language} />
      </Container>
    </Suspense>
    </>
  );
};


export default IndexPage;