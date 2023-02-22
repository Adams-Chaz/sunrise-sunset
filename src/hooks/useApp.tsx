import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatitudeLongitude, fetchResources, fetchSunriseSunset } from '../actions';
import { ILanguage, IResources } from '../models/models';
import { selectLatitudeLongitude, selectResources, selectSunriseSunset } from '../selectors';
import { ICreateSelector } from '../utils';

interface IUseAppProps {
    resources: ILanguage;

    date: string; 
    onDateChange: (date: string) => void;
    onFormSubmit: (ip: string) => void;

    latLongState: ICreateSelector<any>;
    sunriseSunsetState: ICreateSelector<any>;
}

const AppContext = createContext<IUseAppProps>({} as IUseAppProps);

/**
 * Context Creator. 
 */
export const useApp = (): IUseAppProps => {
    const dispatch = useDispatch();

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1,
        today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
    ].join('-');

    const latLongState = useSelector(selectLatitudeLongitude);
    const resources = useSelector(selectResources);
    const sunriseSunsetState = useSelector(selectSunriseSunset);

    const [language, setLanguage] = useState<keyof IResources>('en');
    const [date, setDate] = useState<string>(todayString);

    /**
     * Given the IP address, fetch the nearest Latitude and Longitude.
     * @param ip 
     */
    const handleFormSubmit = (ip: string) => {
        dispatch<any>(fetchLatitudeLongitude(ip)({ }));
    };

    /**
     * On Component Mount, Fetch Resources;
     */
    useEffect(() => {
        dispatch<any>(fetchResources());
    }, []);

    useEffect(() => {
        if (latLongState?.isComplete) {
            dispatch<any>(fetchSunriseSunset(
                latLongState?.data?.data?.location?.latitude,
                latLongState?.data?.data?.location?.longitude,
                date
            )({ }));
        }
    }, [latLongState?.isComplete]);

    return {
        resources: resources?.data?.[language],
        date,
        onDateChange: setDate,
        onFormSubmit: handleFormSubmit,
        latLongState,
        sunriseSunsetState
    };
};

interface IUseAppContextProps extends IUseAppProps {

}

/**
 * App Context shared among child components.
 * @returns 
 */
export const useAppContext = (): IUseAppContextProps => {
    const {
        ...rest
    } = useContext(AppContext);

    return {
        ...rest
    };
};




interface IAppProviderProps {
    context: IUseAppProps;
}

export const AppProvider: FunctionComponent<PropsWithChildren<IAppProviderProps>> = ({
    children,
    context,
}) => {
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}