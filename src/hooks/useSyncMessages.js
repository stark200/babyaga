import { useEffect } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { messagesState } from 'store'

export const useSyncMessages = () => {
    const messages = useRecoilValue(messagesState)
    const setMessages = useSetRecoilState(messagesState)

    // Синхронизация сохранённых сообщений при загрузке компонента
    useEffect(() => {
        const savedMessages = localStorage.getItem('messages')
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages))
        }
    }, [setMessages])

    // Сохраняем сообщения при их изменении
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages))
    }, [messages])
}
