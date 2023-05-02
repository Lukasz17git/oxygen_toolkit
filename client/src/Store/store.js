import { applyMiddleware, legacy_createStore } from 'redux'
import thunk from "redux-thunk";
import { useSelector } from "react-redux";
import { functionUpdateKey, resetStoreKey } from "./rootReducers";
import { initialConverter } from "./InitialStates/initialConverter";
import { initialPalette } from "./InitialStates/initialPalette";
import { initialModal } from "./InitialStates/initialModal";
import { initialUser } from "./InitialStates/initialUser";
import { initialRoute } from './InitialStates/initialRoute';

/*

I could have done the store and its reducers the "redux way" but i dont like having string keys "ACTIONS"
as selectors of the type of action to be dispatched, since its hard to know which ones are being
used in the application in the long term and you may have in future some cases that are useless,
also having a string key pattern may be usefull to call many reducers with the same key but it can
also cause some unintentional reducer calls without warnings, which are painfull to debug.
Also when calling "dispatch" i like to see in my component what's the actual update in the store,
it helps me visualize the store structure.

I have also read the "new Redux Toolkit way", but in my opinion its too opinionated and does too
many "magic things" under the hood, also i dont like how immer is being used as default, it should
have been redux toolkit without immer and an easy way to add immer as middleware in your reducers.
Thats why i use and like more Zustand, its less opinionated, lighter and without that much boilerplate.

*/

const initialState = {
    modal: initialModal,
    error: null,
    route: initialRoute,
    user: initialUser,
    converter: initialConverter,
    palette: initialPalette
}

const rootReducer = (state = initialState, action) => {
    if (action.type === functionUpdateKey) return action.functionUpdate(state)
    if (action.type === resetStoreKey) return initialState
    return state
}

/**
 * Aplying types to the store
 * @type {import("redux").Store<typeof initialState>}
 */
const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

/**
 * Aplying types to the useSelector hook
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @type {import("react-redux").TypedUseSelectorHook<RootState>}
 */
export const useTypedSelector = useSelector;

export default store