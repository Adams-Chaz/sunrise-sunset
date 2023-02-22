import { CircularProgress, styled, Typography } from '@mui/material';
import classnames from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { useAppContext } from '../../hooks';

const PREFIX = 'location';
const classes = {
    root: `${PREFIX}-root`,
    data: `${PREFIX}-data`,
    flex1: `${PREFIX}-flex1`,
    support: `${PREFIX}-support`,
};
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        width: '100%', 
        maxWidth: '400px',
        height: 'min-content',
        backgroundColor: '#f1f1f1', 
        borderRadius: '15px',
        padding: 25,
        zIndex: 10,

        // Tablet Friendly 
        [theme.breakpoints.down('md')]: {
            maxWidth: 'none',  
            width: 'auto',
        },
        // Mobile Friendly
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0',
            maxWidth: 'none',
            width: 'auto',
        },
    },
    [`& .${classes.data}`]: {
        display: 'flex', 
        flexDirection: 'column', 
    },
    [`& .${classes.flex1}`]: {
        flex: 1
    },
    [`& .${classes.support}`]: {
        display: 'flex', 
        flexDirection: 'column', 
    }
}));

interface ILocationProps {

}

export const LocationView: FunctionComponent<ILocationProps> = ({
    ...rest
}) => {
    // Use context to fetch API data;
    const {
        resources,
        latLongState, 
        sunriseSunsetState
    } = useAppContext();

    const sunrise = useMemo(() => {
        if (sunriseSunsetState?.data?.results?.sunrise) {
            var date = new Date(sunriseSunsetState?.data?.results?.sunrise);
            return date.toLocaleTimeString();
        } else {
            return null;
        }
    }, [sunriseSunsetState?.data?.results?.sunrise]);

    const sunset = useMemo(() => {
        if (sunriseSunsetState?.data?.results?.sunset) {
            var date = new Date(sunriseSunsetState?.data?.results?.sunset);
            return date.toLocaleTimeString();
        } else {
            return null;
        }
    }, [sunriseSunsetState?.data?.results?.sunset]);

    return (
        <Root className={classes.root}>
            {
                latLongState?.isPending
                    ? <CircularProgress />
                    : latLongState?.isDefault
                        ? null
                        : (
                            <div className={classes.data}>
                                <Typography variant='h4'>
                                    {resources?.location || 'Location'}
                                </Typography>

                                <Typography variant='body1'>
                                    {resources?.latitude || 'Latitude'}: {latLongState?.data?.data?.location?.latitude}
                                </Typography>
                                <Typography variant='body1'>
                                    {resources?.longitude || 'Longitude'}: {latLongState?.data?.data?.location?.longitude}
                                </Typography>

                                <br />

                                <Typography variant='body2'>
                                    {resources?.city || 'City'}: {latLongState?.data?.data?.location?.city?.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {resources?.country || 'Country'}: {latLongState?.data?.data?.location?.country?.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {resources?.continent || 'Continent'}: {latLongState?.data?.data?.location?.continent?.name}
                                </Typography>
                            </div>
                        )
            }

            {
                sunriseSunsetState?.isPending 
                    ? <CircularProgress />
                    : sunriseSunsetState?.isDefault
                        ? null
                        : (
                            <div className={classnames(classes.data, classes.flex1)}>
                                <Typography variant='h6'>
                                    {resources?.sunrise || 'Sunrise'}: {sunrise}
                                </Typography>
                                <Typography variant='h6'>
                                    {resources?.sunset || 'Sunset'}: {sunset}
                                </Typography>
                            </div>
                        )
            }

            <div className={classes.support}>
                <Typography variant='h6'>
                    {resources?.credit || 'Credit'}
                </Typography>
                <a href='https://freegeoip.app/'>
                    {resources?.ipLocationApi || 'IP Location'}
                </a>
                <a href='https://sunrise-sunset.org/api'>
                    {resources?.sunriseSunsetApi || 'Sunrise and Sunset'}
                </a>
            </div>
        </Root>
    );
}