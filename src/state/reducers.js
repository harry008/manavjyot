import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

import postsReducer from 'scenes/Home/reducer';
import volunteersReducer from 'scenes/Volunteers/reducer';

const reducers = combineReducers({
  routing: routerReducer,
  posts: postsReducer,
  volunteers: volunteersReducer,
  form: FormReducer
});

export default reducers;
