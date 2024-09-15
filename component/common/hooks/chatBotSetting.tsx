import chatBotStore, { changeUserId } from "@/store/zustand/chatBot"



export const useChatBotSetting = () => {
    const { user_id } = chatBotStore(
        (state: any) => state
    )


    return {
        user_id,
        changeUserId
    }
}  