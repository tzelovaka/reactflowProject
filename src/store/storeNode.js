import {create} from 'zustand'
export const useText = create(set => ({
    textWindowIsOpen: false,
    nodeId: null,
    switchText: (data)=>set(state=>{
        const textOpening = {
            textWindowIsOpen: data.textWindowIsOpen,
            nodeId: data.nodeId,
            placeholderLabel: data.placeholderLabel,
            placeholderImg: data.placeholderImg
        }
        return {
            textWindowIsOpen: textOpening.textWindowIsOpen,
            nodeId: textOpening.nodeId,
            placeholderLabel: textOpening.placeholderLabel,
            placeholderImg: textOpening.placeholderImg
        }
    })   
}))