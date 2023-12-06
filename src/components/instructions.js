import * as React from "react";
import { flushSync } from "react-dom";
import { useState, useRef, useCallback, useMemo, forwardRef, Suspense } from "react";
import translations from "../data/translations";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import MobileStepper from "@mui/material/MobileStepper";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Dots from "./dots";
import { useSwipeable } from "react-swipeable";
import { KeyboardArrowLeft, KeyboardArrowRight, StoreMallDirectorySharp } from "@mui/icons-material";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Instructions = ({ language, inout, io, setInout, imageUrls, activeStep, setActiveStep, setStep, pictureIndex, setPictureIndex, pictureCount, setPictureCount, pictureSwipeDirection, intervalID, setIntervalID, slideShow, directions, setDirs, dirs }) => {
  const [btn1Disabled, setBtn1Disabled] = useState(false);
  const [btn2Disabled, setBtn2Disabled] = useState(false);

  console.log(`inout:`, inout);
  console.log(`language:`, language);


  // const imageUrls = [
  //   [entrance],
  //   [metalDoor, intercom],
  //   [postEntry, carparkView, apartmentSign, firstFlight, secondFlightPartI, secondFlightPartII, apartmentDoorLS, apartmentDoorCU]
  // ];

  const pictureContainer = useRef(null);
  const pictureIn = useRef(true);

  const [pictureLoading, setPictureLoading] = useState(false);

  const nodes = useRef([]);

  console.log(`inout:`, inout);
  // const images = useMemo(() => imageUrls.map((urls, i) => {
  const images = imageUrls.map((urls, i) => {
    const onPictureLoadStart = e => {
      setPictureLoading(true);
    }

    const onPictureLoaded = e => {
      setPictureLoading(false);
    }

    const addNode = node => {
      nodes.current.push(node);
    }
    console.log(`inout:`, inout);
    return urls.map((url, j) => {
      console.log(`inout:`, inout);
      return (
        <>
        <Box key={`${i}-${j}`} component={'div'} sx={{ position: 'absolute', top:'2.5%', left:'2.5%', margin: 'auto', width: '95%', height: '95%', overflow:'hidden', objectFit:'contain', zIndex:-1 }} >
          <Slide mountOnEnter unmountOnExit in={io.current[i][j]} easing={{enter:'linear', exit:'linear' }}  direction={directions.current[i][j]} timeout={1000} container={pictureContainer.current} sx={{ width: '100%', zIndex: 0}}>
            <CardMedia component='img' image={imageUrls[i][j]} onLoadStart={onPictureLoadStart} onLoad={onPictureLoaded} renderorder={j} />
          </Slide>
        </Box>

        </>
      )
    }
    )
  });


    const onRightButtonClicked = (eventData) => {
      console.log(`onRightButtonClicked`);
      clearTimeout(intervalID);
      
      if (activeStep < inout.length - 1) {

        directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureIndex, 1, 'right');
        io.current[activeStep] = io.current[activeStep].toSpliced(pictureIndex, 1, false);

        directions.current[activeStep + 1] = directions.current[activeStep + 1].toSpliced(0, 1, 'left');
        io.current[activeStep + 1] = io.current[activeStep + 1].toSpliced(0, 1, true);

        setActiveStep(activeStep + 1);
        setPictureCount(images[activeStep + 1].length);
        setPictureIndex(0);
        setIntervalID(setTimeout(() => slideShow(activeStep + 1, images[activeStep + 1].length, 0), 2500));
      }

    }

    const onLeftButtonClicked = (eventData) => {
      clearTimeout(intervalID);

      if (activeStep > 0) {
        directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureIndex, 1, 'left');
        io.current[activeStep] = io.current[activeStep].toSpliced(pictureIndex, 1, false);

        directions.current[activeStep - 1] = directions.current[activeStep - 1].toSpliced(0,1,'right');
        io.current[activeStep - 1] = io.current[activeStep - 1].toSpliced(0, 1, true);
        
        setPictureCount(images[activeStep - 1].length);
        setInout(io.current);
        setPictureIndex(0);
        setActiveStep(activeStep - 1);

      }
      setInterval(setTimeout(() => slideShow(activeStep - 1, images[activeStep - 1].length, pictureIndex), 2500));
    }

    const handlers = useSwipeable({

      onSwipedLeft(eventData) {
        console.log(`user swiped left`);
        clearTimeout(intervalID);

        if (pictureIndex < pictureCount - 1) {
          directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureIndex, 2, 'right', 'left');
          io.current[activeStep] = io.current[activeStep].toSpliced(pictureIndex, 2, false, true);
          setPictureIndex(pictureIndex + 1);
          setIntervalID(setTimeout(() => slideShow(activeStep, pictureCount, pictureIndex + 1), 2500));

        } else {
          directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureIndex, 1, 'right');
          io.current[activeStep] = io.current[activeStep].toSpliced(pictureIndex, 1, false);
          directions.current[activeStep] = directions.current[activeStep].toSpliced(0, 1, 'left');
          io.current[activeStep] = io.current[activeStep].toSpliced(0, 1, true);

          setPictureIndex(0);
          setIntervalID(setTimeout(() => slideShow(activeStep, pictureCount, 0), 2500));
        }
        setInout(io.current);
        
      },

      onSwipedRight(eventData) {
        clearTimeout(intervalID);
        console.log(`user swiped right`);
        if (pictureIndex > 0) {
          directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureIndex - 1, 2,'right', 'left');
          io.current[activeStep] = io.current[activeStep].toSpliced(pictureIndex - 1, 2, true, false);

          setPictureIndex(pictureIndex - 1);
          setIntervalID(setTimeout(() => slideShow(activeStep, pictureCount, pictureIndex - 1), 2500));

        } else {
          directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureIndex, 1, 'left');
          io.current[activeStep] = io.current[activeStep].toSpliced(pictureIndex, 1, false);
          directions.current[activeStep] = directions.current[activeStep].toSpliced(pictureCount - 1, 1, 'right');
          io.current[activeStep] = io.current[activeStep].toSpliced(pictureCount - 1, 1, true);

          setPictureIndex(pictureCount - 1);
          setIntervalID(setTimeout(() => slideShow(activeStep, pictureCount, pictureCount - 1), 2500));
        }
        setInout(io.current);
      }
    })

    return (
      <>
        <div {...handlers} >
          <Card raised={true} sx={{ display: 'flex', margin: '0 auto', width: { xs: '100vw', md: '30vw' }, height: '100vh', backgroundColor: '#333333', zIndex: 0, position: 'absolute', top: 0, left: { xs: 0, md: '35%' }, alignContent:'top' }} >
            <CardMedia component={'div'} sx={{ zIndex: 1, position: 'absolute', top: 0, margin: '0 auto', width: '100%', height:'50%' }} >
              {/* <Box sx={{ height: '100%', width: '95%', margin: '0 auto', overflow: 'hidden', zIndex:100, overflow:'hidden' }} > */}
                {/* {images} */}
                <Dots dot={pictureIndex} of={pictureCount} />
                <Button sx={{ height: '10%', position: 'absolute', left: '2.5%', top: '45%', zIndex: 5 }} onClick={onLeftButtonClicked} ><ArrowBackIosNewIcon sx={{ fontSize: '6rem', color: 'white', padding: '2rem' }} className=' backdrop-blur bg-white bg-opacity-30 rounded-full  ' /></Button>
                <Button sx={{ height: '10%', position: 'absolute', right: '2.5%', top: '45%', zIndex: 5 }} onClick={onRightButtonClicked} > <ArrowForwardIosIcon sx={{ fontSize: '6rem', color: 'white', padding: '2rem' }} className='backdrop-blur bg-white  bg-opacity-30 rounded-full ' /></Button>
              {/* </Box> */}
            </CardMedia>
            <CardContent sx={{ color: '#ffffff', width: '95%', height:'50%', zIndex: 0, position: 'absolute', top: {xs:'50%'}, left:'0', margin: '0 auto' }} className="MuiDialog-paper" >
              <Paper variant='elevation' elevation={5} sx={{margin: '0 auto', backgroundColor: '#333333', color: '#fff', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflowY: 'scroll' }} >
                <Typography fontSize={'1.25rem'} sx={{p:2, width: '100%', height: '100%', margin:'0 auto', position: 'absolute', top:'5%', left:'0%' }} className={`${language === "arabic" && '[writing-mode:horizontal-rtl]'}`} >{language && translations[language][activeStep]}</Typography>
              </Paper>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

export default Instructions;