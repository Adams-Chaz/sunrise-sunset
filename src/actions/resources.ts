import { Dispatch } from "react";
import { Actions } from "../constants";
import { IActionResponse, IResources } from "../models/models";

/**
 * Retrieve resources, defined by language. 
 * - Ideally, this would pull from the database. 
 * @returns 
 */
export const fetchResources = () => async (dispatch: Dispatch<IActionResponse<IResources>>) => {
    dispatch({
        type: Actions.RESOURCES_FETCH,
        data: {
            en: {
                find: 'Find',
                ipAddress: 'IP Address',                 
            }, 
            es: {
                find: 'Buscar', 
                ipAddress: 'Direccion IP'
            }
        }
    });
};