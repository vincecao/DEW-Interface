const initState = {
  currentMode: 'hlb',
  isExpand: true
}

const dewMainReducer = (state = initState, action) => {
  if (action.type === "SWITCH_MODE") {
    return {
      ...state,
      currentMode: action.currentMode
    }
  }
  if (action.type === "SWITCH_EXPAND") {
    return {
      ...state,
      isExpand: !state.isExpand
    }
  }
  return state
}
export default dewMainReducer