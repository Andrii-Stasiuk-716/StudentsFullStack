import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import studentReducer from './slices/studentSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['theme'],
};

const rootReducer = combineReducers({
  students: studentReducer,
});

export { rootPersistConfig, rootReducer };
