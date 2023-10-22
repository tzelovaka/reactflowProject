import {create} from 'zustand'
export const useEmoji = create(set => ({
    emojiWindowIsOpen: false,
    edgeId: null,
    switchEmoji: (data)=>set(state=>{
        const emojiOpening = {
            emojiWindowIsOpen: data.emojiWindowIsOpen,
            edgeId: data.edgeId
        }
        return {
            emojiWindowIsOpen: emojiOpening.emojiWindowIsOpen,
            edgeId: emojiOpening.edgeId
        }
    })   
}))