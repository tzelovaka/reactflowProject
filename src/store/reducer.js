const defaultState = {
    emojiWindowIsOpen: false,
    textWindowIsOpen: false
  }
const reducer = (state=defaultState, action) => {
    if (action.type === "EMOJI_STATE"){
      switch (action.payload){
      case true:
        return {...state, emojiWindowIsOpen: true, textWindowIsOpen: false}
      case false:
        return {...state, emojiWindowIsOpen: false, textWindowIsOpen: false}
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