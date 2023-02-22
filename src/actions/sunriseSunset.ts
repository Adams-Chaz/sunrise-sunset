import { Dispatch } from "redux";
import { Actions, Statuses } from "../constants";
import { IActionResponse, IResponseCallback } from "../models/models";
import { instance } from "../store";

/**
 * Fetch Sunrise and Sunset;
 * @param latitude 
 * @param longitude 
 * @param date 
 * @returns 
 */
export const fetchSunriseSunset = (latitude: string, longitude: string, date?: string) =>
    (callbacks?: IResponseCallback<any>) =>
        async (dispatch: Dispatch<IActionResponse<any>>) => {
            const type = Actions.RISE_SET_FETCH;

            // Dispatch a PENDING action. 
            dispatch({
                type,
                status: Statuses.PENDING,
            });

            // Construct URL, with optional parameters.
            const params = [
                latitude ? `lat=${latitude}` : null,
                longitude ? `lng=${longitude}` : null,
                date ? `date=${date}` : null,
                'formatted=0'
            ].filter(f => !!f).join('&');

            await instance
                .get('https://api.sunrise-sunset.org/json?' + params)
                .then(v => {
                    dispatch({
                        type,
                        data: v?.data,
                        status: Statuses.COMPLETE
                    });
                    callbacks?.onSuccess?.(v);
                }).catch(e => {
                    dispatch({
                        type,
                        errors: JSON.stringify(e),
                        status: Statuses.ERROR
                    });
                    callbacks?.onFailure?.(e);
                }).finally(() => {
                    callbacks?.onComplete?.();
                });
        };