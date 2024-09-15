import { create } from 'zustand'


const initialState = {
    user_id: null,
}

const chatBotStore = create(() => ({ ...initialState }))


export const changeUserId = (getValue: any) => {
    chatBotStore.setState((state: any) => ({ ...state, user_id: getValue }))
}



export default chatBotStore