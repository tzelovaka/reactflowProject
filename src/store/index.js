import { createStore, combineReducers } from 'redux';
import reducer from './reducer'
import reducerData from './reducerData'
const rootReducer = combineReducers({
    window: reducer,
    data: reducerData
})
const store = createStore(rootReducer)
export default store