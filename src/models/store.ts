import { IActionResponse, IResources } from "./models";

export interface IStore {
    latitudeLongitude: IActionResponse<any>;
    sunriseSunset: IActionResponse<any>;
    resources: IActionResponse<IResources>;
}