

export interface IResponseCallback<T> {
    /**
     * Callback method when action was successful, returns the response;
     * @param items 
     * @returns 
     */
    onSuccess?: (items: T) => void;
    /**
     * Callback method when action threw an error, returns error response;
     * @param err 
     * @returns 
     */
    onFailure?: (err: any) => void;
    /**
     * Callback method regardless of success or failure;
     * @returns 
     */
    onComplete?: () => void;
}

export interface IActionResponse<T> {
    type: string;
    data?: T;
    status?: string;
}

export interface IResources {
    en: ILanguage;
    es: ILanguage;
}

export interface ILanguage {
    city?: string;
    country?: string;
    continent?: string;
    credit?: string;
    date?: string;
    find?: string;
    ipAddress?: string;
    ipLocationApi?: string;
    latitude?: string;
    location?: string;
    longitude?: string;
    sunrise?: string;
    sunset?: string;
    sunriseSunsetApi?: string;
}