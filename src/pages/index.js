import * as React from "react";
import { useState, Suspense, useRef, useCallback, useEffect } from 'react';
import { flushSync } from "react-dom";
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
  const [inout, setInout] = useState(Array(imageUrls.length).fill(null).map((urls, i) => Array(imageUrls[i].length).fill(false)));
  const [pictureIndex, setPictureIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [intervalID, setIntervalID] = useState(() => 0);
  const pictureSwipeDirection = useRef('left');
  const [pictureCount, setPictureCount] = useState(imageUrls[0].length);

  const directions = useRef(Array(inout.length).fill(null).map((_, i) => Array(inout[i].length).fill('left')));
  console.log(`directions:`, directions);
  const [dirs, setDirs] = useState(directions.current);

  console.log(`initial value of inout:`, inout);
  const io = useRef(inout);
  console.log(`initial value of io.current:`, io.current);

  let slideShow;

  const step = useRef();
  const count = useRef();
  const index = useRef();
  slideShow = (activeStep, pictureCount, pictureIndex) => {
    clearTimeout(intervalID);
    step.current = activeStep;
    count.current = pictureCount;
    index.current = pictureIndex;
    console.log(`index.current:`, index.current)
    console.log(`step.current:`, step.current);
    console.log(`activeStep:`, activeStep);
    console.log(`pictureCount.current: ${pictureCount}`);
    console.log(`pictureIndex: ${pictureIndex}`);

    if (count.current > 1) {
      if (index.current < count.current - 1) {
        console.log(`directions:`, directions);
        directions.current[step.current] = directions.current[step.current].toSpliced(index.current, 2, 'right', 'left');

        io.current[step.current] = io.current[step.current].toSpliced(index.current, 2, false, true);
        console.log(`step.current: ${step.current}`);
        console.log(`inout[step.current].toSpliced(index.current, 1, false):`, inout[step.current].toSpliced(index.current, 1, false))
        setInout(io.current);

        setPictureIndex(index.current + 1);
        index.current += 1;
      }
      else {
        directions.current[step.current] = directions.current[step.current].toSpliced(index.current, 1, 'right');
        io.current[step.current] = io.current[step.current].toSpliced(index.current, 1, false);

        directions.current[step.current] = directions.current[step.current].toSpliced(0, 1, 'left');
        io.current[step.current] = io.current[step.current].toSpliced(0, 1, true);

        setPictureIndex(0);
        index.current = 0;
      }

      setInout(io.current);

      setIntervalID(setTimeout(() => {

        slideShow(step.current, count.current, index.current);

      }, 2500));
    }
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ height: '100dvh', backgroundColor: '#333333' }}>
        <LanguageSelect {...{ setLanguage, languageDialogOpen, setLanguageDialogOpen, setInout, inout, io, pictureIndex, directions, setPictureIndex, pictureCount, setPictureCount, activeStep, setActiveStep, pictureSwipeDirection, slideShow, setIntervalID }} />
        <Instructions language={language} {...{ inout, io, directions, dirs, setDirs, setInout, imageUrls, activeStep, setActiveStep, pictureIndex, setPictureIndex, pictureCount, setPictureCount, pictureSwipeDirection, slideShow, intervalID, setIntervalID }} />
      </Container>
    </>
  );
};


export default IndexPage;