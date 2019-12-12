import dewMainReducer from './dewMainReducer'
import hlbReducer from './hlbReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  dewMain: dewMainReducer,
  hlb: hlbReducer
})

export default rootReducer