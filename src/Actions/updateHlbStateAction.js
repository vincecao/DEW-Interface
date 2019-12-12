export const updateHlbStateAction = (hlbState) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_HLB_STATE", hlbState })
  }
}