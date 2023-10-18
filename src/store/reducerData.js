
const defaultData = {
    smile: '',
    textEdge: '',
    imgNode: '',
    textNode: ''
  }

const reducerData = (state=defaultData, action)=>{
    switch (action.type){
    case "EMOJI":
      return {...state, textEdge: action.payload.emoji}
    case "EDGE":
      return {...state, textEdge: action.payload.textEdge}
    case "IMG":
      return {...state, textEdge: action.payload.img}
    case "NODE":
      return {...state, textEdge: action.payload.textNode} 
      default:
        return state
    }
}
export default reducerData