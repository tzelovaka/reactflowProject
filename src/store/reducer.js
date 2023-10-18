const defaultState = {
    id: null,
    emojiWindowIsOpen: false,
    textWindowIsOpen: false,
  }
const reducer = (state=defaultState, action) => {
    if (action.type === "EMOJI_STATE"){
      switch (action.payload.openingEmoji){
      case true:
        return {...state, emojiWindowIsOpen: true, textWindowIsOpen: false, edgeId: action.payload.edgeId}
      case false:
        return {...state, emojiWindowIsOpen: false, textWindowIsOpen: false, id: action.payload.edgeId}
      default:
        return state
    }
    } else{
      switch (action.payload){
        case true:
          return {...state, emojiWindowIsOpen: false, textWindowIsOpen: true}
        case false:
          return {...state, emojiWindowIsOpen: false, textWindowIsOpen: false}
        default:
          return state
      }
    }
}
export default reducer