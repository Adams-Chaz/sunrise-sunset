import { Dispatch } from "redux";
import { Actions, Statuses } from "../constants";
import { IActionResponse, IResponseCallback } from "../models/models";
import { instance } from "../store";

export const fetchLatitudeLongitude = (ip: string) =>
    (callbacks?: IResponseCallback<any>) =>
        async (dispatch: Dispatch<IActionResponse<any>>) => {
            const type = Actions.LAT_LONG_IP_FETCH;

            // Dispatch a PENDING action. 
            dispatch({
                type,
                status: Statuses.PENDING,
            });

            await instance
                .get(`https://api.ipbase.com/v2/info?apikey=y5L9A1hJOfE8Y6PgM69fBR3FljMrRqr2LWhanPLk&ip=${ip}`)
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
                        errors: e,
                        status: Statuses.ERROR
                    });
                    callbacks?.onFailure?.(e);
                }).finally(() => {
                    callbacks?.onComplete?.();
                });
        };