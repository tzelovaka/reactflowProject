import { createStore, combineReducers } from 'react-redux'
import {reducer} from './reducer'
import {reducerData} from './reducerData'
const rootReducer = combineReducers({
    window: reducer,
    data: reducerData
})
export const store = createStore(rootReducer)