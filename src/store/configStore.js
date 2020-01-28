import {createStore,combineReducers} from 'redux';
import reducer from './reducers/recuder';

const rootReducers = combineReducers({
    reducerList : reducer
});

const configureStore = () => {
    return createStore(rootReducers);
}

export default configureStore;