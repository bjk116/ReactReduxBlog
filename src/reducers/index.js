import { combineReducers } from 'redux';
import PostReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';
//import redux-form, get redux-form.reducer, and rename as const formReducer=redux-form.reducer;

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;