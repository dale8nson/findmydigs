import * as React from "react";
import { useState, useRef, useCallback, useMemo, forwardRef, Suspense } from "react";
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
import { useSwipeable } from "react-swipeable";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Instructions = ({ language, inout, setInout, imageUrls }) => {

  const [activeStep, setActiveStep] = useState(0);

  console.log(`language:`, language);
  const steps = {
    'english': [
      'Enter the driveway next to the Quest Hotel. Our apartment building is next to that driveway. You can ignore the “No Entry” sign. Currently it is used as both an entrance and an exit.',
      'Call unit 29 on the intercom next to the metal door, and we can let you in.',
      'Our apartment is on “Level 2”.'
    ],
    'mandarin': [
      '输入Quest酒店旁边的车道。我们的公寓楼就在那个车道旁边。您可以忽略“No Entry”标志。目前它被用作入口和出口。',
      '在金属门旁边的对讲机上呼叫29单元，我们可以放您进去。',
      '我们的公寓在“Level 2”。'

    ],
    'arabic': [
      
      `ادخل إلى الممر المجاور لـ` +
      `"Quest"` +
      `فندق.` +
      `مبنى شقتنا بجوار هذا الممر.` +
      `يمكنك تجاهل` +
      `"No Entry"` +
       `علامة.` +
      `حاليًا يتم استخدامه كمدخل ومخرج`,
      "اتصل بالوحدة 29 على جهاز الاتصال الداخلي المجاور للباب المعدني، ويمكننا السماح لك بالدخول",
      `شقتنا في "الطابق الثاني`
          ],
    'swahili': [
      'Ingia barabara ya gari karibu na Hoteli ya Quest. Jengo letu la ghorofa liko karibu na barabara hiyo. Unaweza kupuuza ishara ya "No Entry". Kwa sasa inatumika kama njia ya kuingilia na kutoka.',
      'Piga simu kwa kitengo cha 29 kwenye intercom karibu na mlango wa chuma, na tutakuruhusu ndani.',
      'Ghorofa yetu iko "Level 2".'
    ],
    'tigrinya': [
      'ኣብ ጎኒ Quest ሆቴል ኣብ ዝርከብ መእተዊ መንገዲ ኣቲኻ። ህንጻ ኣፓርታማና ኣብ ጎኒ እቲ መእተዊ መንገዲ እዩ። ነቲ “No Entry” ዝብል ናይ ጎደና ምልክት ሸለል ክትብሎ ትኽእል ኢኻ። ኣብዚ ሕዚ እዋን ከም መእተውን መውፅእን ነጥቢ ኮይኑ ይጥቀመሉ ኣሎ።',
      'ኣብ ጎኒ እቲ ብረት ማዕጾ ኣብ ዝርከብ ኢንተርኮም ናብ ኣሃዱ 29 ደውሉ፡ ክንኣትወኩም ንኽእል ኢና።',
      'ኣፓርትመንትና ኣብ “ደረጃ 2” እዩ ዘሎ።'
    ],
    'amharic': [
      'ከ Quest ሆቴል ቀጥሎ ያለውን የመኪና መንገድ ያስገቡ። የእኛ አፓርታማ ሕንፃ ከዚያ የመኪና መንገድ አጠገብ ነው። "No Entry" የሚለውን ምልክት ችላ ማለት ትችላለህ. በአሁኑ ጊዜ እንደ መግቢያ እና መውጫ ሆኖ ያገለግላል.',
      'ከብረት በር አጠገብ ባለው ኢንተርኮም ላይ ክፍል 29 ይደውሉ እና እናስገባዎታለን።',
      'የእኛ አፓርታማ ደረጃ 2 ላይ ነው.'
    ],

    'vietnamese': [
      'Nhập đường lái xe bên cạnh Khách sạn Quest. Tòa nhà căn hộ của chúng tôi nằm bên cạnh con đường đó. Bạn có thể bỏ qua biển "No Entry". Hiện tại nó đang được sử dụng làm cửa vào và cửa ra.',
      'Gọi đến căn hộ 29 trên hệ thống intercom bên cạnh cửa kim loại, và chúng tôi sẽ mở cửa cho bạn.',
      'Căn hộ của chúng tôi ở "Level 2".'
    ],
    'thai': [
      'เข้าไปในถนนรถแล่นถัดจากโรงแรม Quest อาคารอพาร์ตเมนต์ของเราอยู่ติดกับทางเข้านั้น คุณสามารถมองข้ามป้าย "No Entry" ได้ ปัจจุบันใช้เป็นทั้งทางเข้าและทางออก',
      'โทรหาหน่วย 29 ที่อินเตอร์คอมติกติดกับประตูโลหะ และเราสามารถปล่อยให้คุณเข้าไป',
      'อพาร์ทเมนต์ของเราอยู่ใน "Level 2"'

    ],
    'korean': [
      'Quest 호텔 옆 차도로 들어가세요. 저희 아파트 건물이 그 차도 옆에 있습니다. "No Entry" 표지를 무시해도 됩니다. 현재 그것은 출입구로 사용되고 있습니다.',
      '금속 문 옆 인터콤에서 29호 유닛에 전화하면 우리가 문을 열어 드립니다.',
      '우리 아파트는 "Level 2"에 있습니다.'
    ],
    'cantonese': [
      '进入Quest酒店旁边的车道。我们的公寓楼就在那个车道旁边。可以忽略“No Entry”标志，目前它作为入口和出口同时使用。',
      '在金属门旁边的对讲机上呼叫29号单元，我们会为您开门。',
      '我们的公寓在“Level 2”'
    ],
    'punjabi-shahmukhi': [
      'توں "No Entry" دا سائن نظر انداز کرسکدا ہے. حالت وچ اے یہ دونوں ورود اتے نکل دے طور تے استعمال ہو رہا ہےہوٹل "Quest" دے سائیں چی کرنے والے ڈرائیوے وچ داخلہ کرو. ہمارا ایپارٹمنٹ دا بلڈنگ اوہ ڈرائیوے دے بلیچ ہے.',
      'لوہے دے دروازے دے کھڑکی دے قریب انٹرکم ’تے یونٹ 29 نوں کال کرو، اتے ہم تنوں اندر کرن دے ہو سکدے ہیں.',
      'ہمارا ایپارٹمنٹ "Level 2" تے ہے.'
    ],
    'punjabi-gurmukhi': [
      `Quest ਹੋਟਲ ਦੇ ਕੋਲ ਡਰਾਈਵਵੇਅ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ। ਸਾਡੀ ਅਪਾਰਟਮੈਂਟ ਬਿਲਡਿੰਗ ਉਸ ਡਰਾਈਵਵੇਅ ਦੇ ਕੋਲ ਹੈ। ਤੁਸੀਂ “No Entry” ਚਿੰਨ੍ਹ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰ ਸਕਦੇ ਹੋ। ਵਰਤਮਾਨ ਵਿੱਚ ਇਹ ਇੱਕ ਪ੍ਰਵੇਸ਼ ਦੁਆਰ ਅਤੇ ਇੱਕ ਨਿਕਾਸ ਦੋਨਾਂ ਦੇ ਰੂਪ ਵਿੱਚ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।`,
      `ਸਾਡਾ ਐਪਾਰਟਮੈਂਟ "Level 2" 'ਤੇ ਹੈ।'`
    ],
    'urdu': [
      `فی الحال یہ داخلی اور خارجی راستے دونوں کے طور پر استعمال ہوتا ہےآپ "No Entry" کے نشان کو نظر انداز کر سکتے ہیں۔ہمارے اپارٹمنٹ کی عمارت اس ڈرائیو وے کے ساتھ ہے۔ہوٹل کے ساتھ والے ڈرائیو وے میں داخل ہوں۔"Quest"`,
      'دھاتی دروازے کے ساتھ والے انٹرکام پر یونٹ 29 کو کال کریں، اور ہمآپ کو اندر جانے دے سکتے ہیں۔',
      `پر ہے۔` + `"Level 2"` + `ہمارا اپارٹمنٹ`
    ],
    'italian': [
      `Entra nel vialetto accanto all'Quest Hotel. Il nostro edificio di appartamenti è accanto a quel vialetto. Puoi ignorare il cartello "No Entry". Attualmente è utilizzato sia come entrata che come uscita.`,
      `Chiama l'unità 29 sull'interfono accanto alla porta metallica, e ti faremo entrare.`,
      `Il nostro appartamento è al "Level 2".`
    ],
    'greek': [
      `Εισέλθετε στο δρομάκι δίπλα στο Quest Hotel. Το κτίριο του διαμερίσματός μας είναι δίπλα σε εκείνο το δρομάκι. Μπορείτε να αγνοήσετε το πινακίδιο "No Entry". Προς το παρόν χρησιμοποιείται τόσο ως είσοδος όσο και ως έξοδος.`,
      `Καλέστε τη μονάδα 29 στο ηλεκτρονικό κουδούνι δίπλα στη μεταλλική πόρτα, και θα σας αφήσουμε να μπείτε.`,
      `Το διαμέρισμά μας είναι στο "Level 2".`
    ],
    'spanish': [
      'Ingrese al camino de entrada al lado del hotel Quest. Nuestro edificio de apartamentos está al lado de esa carretera. Puede ignorar el cartel de "No Entry". Actualmente se utiliza como entrada y salida.',
      `Llama a la unidad 29 por el intercomunicador que está al lado de la puerta metálica y te dejaremos entrar.`,
      `Nuestro apartamento está en el "Level 2".`
    ],
  }

  // const imageUrls = [
  //   [entrance],
  //   [metalDoor, intercom],
  //   [postEntry, carparkView, apartmentSign, firstFlight, secondFlightPartI, secondFlightPartII, apartmentDoorLS, apartmentDoorCU]
  // ];

  const [pictureIndex, setPictureIndex] = useState(0);
  
  const pictureSwipeDirection = useRef('left');

  const pictureContainer = useRef(null);
  const pictureIn = useRef(true);

  // const [inout, setInout] = useState(Array(imageUrls.length).fill(null).map((urls,i) => Array(imageUrls[i].length).fill(false)));
  const [ pictureLoading, setPictureLoading] = useState(false);

  const onPictureLoadStart = e => {
    setPictureLoading(true);
  }
  
  const onPictureLoaded = e => {
    setPictureLoading(false);
  }

  console.log(`inout:`, inout);
  const images = useMemo(() => imageUrls.map((urls, i) => {
    return urls.map((url, j) => {
      return (
        <Box component={'div'} sx={{position:'absolute', margin:'auto', width:'100%', height:'100%'}}>
          <Slide mountOnEnter unmountOnExit in={inout[i][j]} direction={pictureSwipeDirection.current} timeout={500} container={pictureContainer.current} sx={{width:'100%', zIndex:0}} >
            <CardMedia loading='lazy' component='img' image={imageUrls[i][j]} sx={{ width:'100%', height: '100%', objectFit: 'contain' }} onLoadStart={onPictureLoadStart} onLoad={onPictureLoaded} />
          </Slide>
          {pictureLoading && <Skeleton variant='rectangular' sx={{margin:'auto', height:'25%', width:'95%', position:'absolute', top:0, zIndex:20}} /> }
          {pictureLoading && <Skeleton variant='rectangular' sx={{margin:'auto', height:'25%', width:'95%', position:'absolute', top:'25%', zIndex:20}} /> }
          {pictureLoading && <Skeleton variant='rectangular' sx={{margin:'auto', height:'25%', width:'95%', position:'absolute', top:'50%', zIndex:20}} /> }
          {pictureLoading && <Skeleton variant='rectangular' sx={{margin:'auto', height:'25%', width:'95%', position:'absolute', top:'75%', zIndex:20}} /> }
          {pictureLoading && <Container><Typography fontSize={'5rem'} sx={{zIndex:20, margin:'auto', width:'95%'}} >LOADING...</Typography></Container> }
        </Box>
      )
    }
    )
  }),[inout, pictureSwipeDirection.current]);
  const pictureCount = useRef(imageUrls[0].length);
  const Pictures = () => {
    
    return images[activeStep][pictureIndex];
  }

  const onLeftButtonClicked = (eventData) => {
    console.log(`user swiped left`);
    if (pictureIndex < pictureCount.current - 1) {
      const a = inout[activeStep].toSpliced(pictureIndex,2,false,true);
      setInout(inout.toSpliced(activeStep,1,a));
      setPictureIndex(pictureIndex + 1);

    } else if (activeStep < 2) {
      console.log(`activeStep < 2`);
      console.log(`setInout(inout[activeStep].splice(pictureIndex,1,false));`);
      const a1 = inout[activeStep].toSpliced(pictureIndex,1,false);
      setInout(inout.toSpliced(activeStep,1,a1));
      const a2 = inout[activeStep + 1].toSpliced(0,1,true);
      setInout(inout.toSpliced(activeStep + 1,1,a2));
      console.log(`setInout(inout[activeStep + 1].splice(0,1,true));`);
      console.log(`inout:`, inout);
      setActiveStep(activeStep + 1);
      pictureCount.current = images[activeStep + 1].length;
      setPictureIndex(0);
    }
    pictureSwipeDirection.current = 'left';
    // pictureAppear.current = true;
  }

  const onRightButtonClicked = (eventData)  => {
    console.log(`user swiped right`);
    if (pictureIndex > 0) {
      const a = inout[activeStep].toSpliced(pictureIndex - 1, 2, true, false);
      setInout(inout.toSpliced(activeStep, 1, a));
      setPictureIndex(pictureIndex - 1);
    } else if (activeStep > 0) {
      const a1 = inout[activeStep].toSpliced(pictureIndex,1,false);
      setInout(inout.toSpliced(activeStep, 1, a1));
      pictureCount.current = images[activeStep - 1].length;
      const a2 = inout[activeStep - 1].toSpliced(pictureCount.current - 1, 1, true);
      setInout(inout.toSpliced(activeStep - 1, 1, a2));
      setActiveStep(activeStep - 1);
      setPictureIndex(pictureCount.current - 1);
    }
    pictureSwipeDirection.current = 'right';
    // pictureAppear.current = true;

  }

  const handlers = useSwipeable({
    onSwipedLeft(eventData) {
      console.log(`user swiped left`);
      if (pictureIndex < pictureCount.current - 1) {
        const a = inout[activeStep].toSpliced(pictureIndex,2,false,true);
        setInout(inout.toSpliced(activeStep,1,a));
        setPictureIndex(pictureIndex + 1);

      } else if (activeStep < 2) {
        console.log(`activeStep < 2`);
        console.log(`setInout(inout[activeStep].splice(pictureIndex,1,false));`);
        const a1 = inout[activeStep].toSpliced(pictureIndex,1,false);
        setInout(inout.toSpliced(activeStep,1,a1));
        const a2 = inout[activeStep + 1].toSpliced(0,1,true);
        setInout(inout.toSpliced(activeStep + 1,1,a2));
        console.log(`setInout(inout[activeStep + 1].splice(0,1,true));`);
        console.log(`inout:`, inout);
        setActiveStep(activeStep + 1);
        pictureCount.current = images[activeStep + 1].length;
        setPictureIndex(0);
      }
      pictureSwipeDirection.current = 'left';
      // pictureAppear.current = true;
    },
    onSwipedRight(eventData) {
      console.log(`user swiped right`);
      if (pictureIndex > 0) {
        const a = inout[activeStep].toSpliced(pictureIndex - 1, 2, true, false);
        setInout(inout.toSpliced(activeStep, 1, a));
        setPictureIndex(pictureIndex - 1);
      } else if (activeStep > 0) {
        const a1 = inout[activeStep].toSpliced(pictureIndex,1,false);
        setInout(inout.toSpliced(activeStep, 1, a1));
        pictureCount.current = images[activeStep - 1].length;
        const a2 = inout[activeStep - 1].toSpliced(pictureCount.current - 1, 1, true);
        setInout(inout.toSpliced(activeStep - 1, 1, a2));
        setActiveStep(activeStep - 1);
        setPictureIndex(pictureCount.current - 1);
      }
      pictureSwipeDirection.current = 'right';
      // pictureAppear.current = true;

    }
  })

  

  return (
    <>
    <div {...handlers} >
      <Card raised={true} sx={{ margin:'auto', width:{xs:'100vw', md:'50vw'}, height: '100dvh', backgroundColor: '#333333', zIndex:0, position:'absolute', top:0, left:0, overflow:'hidden' }} >
        <CardMedia component={'div'} sx={{zIndex:0, height:'75%', position:'absolute',top:0, margin:'auto', width:'100%'}} >
          <Box sx={{height:'100%', width:'100%', margin:'auto'}} >
          <Pictures />
          <Button sx={{height:'10%', position:'absolute', left:'0%', top:'45%', zIndex:5}}  onClick={onRightButtonClicked}><ArrowBackIosNewIcon sx={{fontSize:'6rem', color:'white', padding:'2rem'}} className=' backdrop-blur bg-white bg-opacity-30 rounded-full  ' /></Button>
          <Button sx={{height: '10%', position: 'absolute', right:'0%', top:'45%', zIndex:5}} onClick={onLeftButtonClicked}> <ArrowForwardIosIcon sx={{fontSize:'6rem', color:'white', padding:'2rem'}} className='backdrop-blur bg-white  bg-opacity-30 rounded-full ' /></Button>
          </Box>
        </CardMedia>
      <CardContent sx={{ color: '#ffffff', width:'100%', minHeight:'25%', zIndex:0, position:'absolute', bottom:0, margin:'auto' }} className="MuiDialog-paper" >
        <Paper variant='elevation' elevation={5} sx={{ p:2, marginInline: 'auto', marginBlock:'0', backgroundColor: '#333333', color: '#fff', position:'absolute', left:0, top:0, width:'100%', height:'100%' }} >
          <Typography fontSize={'1.25rem'} sx={{zIndex:-10, width:'100%', height:'100%', marginInline:'auto', marginBlock:'0'}} className={`${language === "arabic" && '[writing-mode:horizontal-rtl]'}`} >{language && steps[language][activeStep]}</Typography>
        </Paper>
      </CardContent>
        {/* <MobileStepper sx={{ maxWidth: { xs: '100%', sm: '100%', md: '100%' }, position: 'fixed', bottom: 0, m: 'auto', backgroundColor: '#333333', color: '#ffffff' }}
          variant="text"
          steps={3}
          activeStep={activeStep}
          nextButton={<Button size='large' onClick={() => setActiveStep(activeStep + 1)} disabled={activeStep === 2 ? true : false}><KeyboardArrowRight /></Button>}
          backButton={<Button size='large' onClick={() => setActiveStep(activeStep - 1)} disabled={activeStep === 0 ? true : false}><KeyboardArrowLeft /></Button>} /> */}
      </Card>
      </div>
    </>
  );
}

export default Instructions;