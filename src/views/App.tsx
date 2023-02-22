import { styled } from '@mui/material';
import React, { CSSProperties, useEffect, useState } from 'react';
import { AppProvider, useApp } from '../hooks';
import { FormView } from './FormView';
import { LocationView } from './LocationView';

const PREFIX = 'app';
const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
  background: `${PREFIX}-background`,
  backgroundSunrise: `${PREFIX}-backgroundSunrise`,
  backgroundSunset: `${PREFIX}-backgroundSunset`,
};
const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    width: '100%', 
    height: '100vh', 
    overflow: 'hidden', 
  },
  [`& .${classes.container}`]: {
    width: '100%',
    maxWidth: '1100px', 
    margin: '0 auto',
    display: 'flex', 
    flexDirection: 'row', 
    gap: '55px',
    padding: 50,

    // Tablet Friendly
    [theme.breakpoints.down('md')]: {
      gap: '25px',
      flexDirection: 'column',
      margin: 0, 
      padding: 25
    },
    // Mobile Friendly
    [theme.breakpoints.down('sm')]: {
      gap: '15px',
      flexDirection: 'column',
      margin: 0, 
      padding: 0
    }
  },
  [`& .${classes.backgroundSunrise}`]: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    backgroundColor: '#ffd966',

    '& .sun': {
      width: '250px', 
      height: '250px', 
      position: 'absolute', 
      transform: 'translate(-50%, -50%)',
      left: '50%', 
      top: '50%',  
      backgroundColor: '#ff531a', 
      borderRadius: '50%',
    },
  },
  [`& .${classes.backgroundSunset}`]: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    backgroundColor: '#111',

    '& .moon': {
      width: '250px', 
      height: '250px', 
      position: 'absolute', 
      transform: 'translate(-50%, -50%)',
      left: '50%', 
      top: '50%', 
      backgroundColor: '#a6a6a6', 
      borderRadius: '50%',
    },
  },
}));

interface IAppProps {

}

export const App: React.FunctionComponent<IAppProps> = () => {

  const context = useApp();

  const [style, setStyle] = useState<CSSProperties>({
    clipPath: `polygon(50% 50%, 100% 100%, 100% 100%, 50% 100%, 0 100%, 0 100%)`,
  });

  // On time change, calculate the backgrand position;
  useEffect(() => {
    let sunrisePer = 5;
    if (context?.sunriseSunsetState?.data?.results?.sunrise) {
      var dateR = new Date(new Date(context?.sunriseSunsetState?.data?.results?.sunrise).toLocaleString());
      sunrisePer = Math.round(dateR.getHours());
    } 

    let sunsetPer = 19;
    if (context?.sunriseSunsetState?.data?.results?.sunset) {
      var dateS = new Date(new Date(context?.sunriseSunsetState?.data?.results?.sunset).toLocaleString());
      sunsetPer = 24 - Math.round(dateS.getHours());
    }
    
    const red = '50% 50%';
    const green = sunsetPer <= 3 ? `${100 / (sunsetPer % 3)}% 100%` : `100% ${100 - (100 / 6 * (sunsetPer - 3))}%`;
    const yellow = sunsetPer <= 3 ? `${100 / (sunsetPer % 3)}% 100%` : '100% 100%';
    const blue = '50% 100%';
    const purple = sunrisePer <= 3 ? `0 ${100 / (sunrisePer % 3)}%` : '0 100%';
    const white = sunrisePer <= 3 ? `0 ${100 / (sunrisePer % 3)}%` : `0 ${100 / 6 * (sunrisePer - 3)}%`;

    setStyle({
      clipPath: `polygon(${red}, ${green}, ${yellow}, ${blue}, ${purple}, ${white})`,
    });  
  }, [
    context?.sunriseSunsetState?.data?.results?.sunrise, 
    context?.sunriseSunsetState?.data?.results?.sunset
  ]);

  return (
    <Root className={classes.root}>
      <AppProvider context={context}>
        <div className={classes.container}>
          {/* Input Form: IP, to generate lat and Long.  */}
          <FormView />
          <LocationView />

          <div
            className={classes.backgroundSunrise}
          >
            <div className='sun' />
          </div>
          <div
            className={classes.backgroundSunset}
            style={style}
          >
            <div className='moon' />
          </div>
        </div>
      </AppProvider>
    </Root>
  );
}
