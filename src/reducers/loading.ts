import * as loading from "../constants/loading";
import { fromJS } from "immutable";

export interface ILoadingState {
    enabled: boolean;
}

type LoadingAction = loading.ILoadingAction | loading.IOtherAction;

const INITIAL_STATE: ILoadingState = fromJS({
    "enabled": false
});

export default function reducer(state: ILoadingState = INITIAL_STATE, action: LoadingAction = loading.otherAction): ILoadingState {
    switch (action.type) {
        case loading.LOADING_ENABLE:
            return Object.assign({}, state, { "enabled": true });
        case loading.LOADING_DISABLE:
            return Object.assign({}, state, { "enabled": false });
        default:
            return state;
    }
}
