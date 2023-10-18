
const defaultData = {
    emoji: '',
    textEdge: '',
    imgNode: '',
    textNode: ''
  }

const reducerData = (state=defaultData, action)=>{
    switch (action.type){
    case "EMOJI":
      return {...state, emoji: action.payload.emoji}
    case "EDGE":
      return {...state, textEdge: action.payload.textEdge}
    case "IMG":
      return {...state, img: action.payload.img}
    case "NODE":
      return {...state, textNode: action.payload.textNode} 
      default:
        return state
    }
}
export default reducerData