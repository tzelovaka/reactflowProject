
const defaultData = {
    emoji: '',
    textEdge: '',
    imgNode: '',
    textNode: ''
  }

const reducerData = (state=defaultData, action)=>{
    switch (action.type){
    case "EMOJI":
      return {
        ...state, emoji: action.payload
      }
    case "EDGE":
      return {
        ...state, textEdge: action.payload
      }
    case "IMG":
      return {
        ...state, img: action.payload
      }
    case "NODE":
      return {
        ...state, textNode: action.payload
      } 
      default:
        return state
    }
}
export default reducerData