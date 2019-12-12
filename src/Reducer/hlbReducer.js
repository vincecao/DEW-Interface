const initState = {
  hlbState: {}
}

const hlbReducer = (state = initState, action) => {
  if (action.type === "UPDATE_HLB_STATE") {
    return {
      ...state,
      hlbState: action.hlbState
    }
  }
  return state
}
export default hlbReducer