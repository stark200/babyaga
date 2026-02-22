import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_GPT_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'access_token': import.meta.env.VITE_ACCESS_TOKEN,
    },
})

export const sendChatPrompt = async (messages) => {
    try {

        const response = await axiosInstance.post('/', {
            model: 'gpt-4o',
            messages: messages,
        })

        const { answer, question } = response.data

        const newMessages = []
        if (answer || question) {
            newMessages.push({
                role: 'assistant',
                answer: answer || null,
                question: question || null,
            })
        }

        return newMessages
    } catch (error) {
        console.error('Error sending chat prompt:', error)
        throw error
    }
}

