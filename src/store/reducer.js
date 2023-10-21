const defaultState = {
    type: "EMOJI_STATE",
    payload:{
      id: null,
      emojiWindowIsOpen: false,
    }
  }
const reducer = (state=defaultState, action) => {
    if (action.type === "EMOJI_STATE"){
      switch (action.payload.openingEmoji){
      case true:
        return {
          ...state, emojiWindowIsOpen: true, edgeId: action.payload.edgeId
        }
      case false:
        return {
          ...state, emojiWindowIsOpen: false, edgeId: action.payload.edgeId
        }
      default:
        return state
    }
    } 
    if (action.type === "TEXT_STATE"){
      switch (action.payload.openingText){
        case true:
          return {
            ...state, textWindowIsOpen: true, nodeId: action.payload.nodeId
          }
        case false:
          return {
            ...state, textWindowIsOpen: false, nodeId: action.payload.nodeId
          }
        default:
          return state
      }
    }
}
export default reducer