import { combineReducers } from '@reduxjs/toolkit';

import movieReducer from '../features/movie/slice';

const rootReducer = combineReducers({
  movie: movieReducer,
});

export default rootReducer;
