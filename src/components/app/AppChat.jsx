import { useEffect, useRef } from 'react'

import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { isChatFetchingState, messagesState, typingState } from 'store'

import AppMessage from './AppMessage'

export const GENERAL_WELCOME_MESSAGE = 'Welcome! I am ready to provide you with all the necessary information and expertise for the successful development of your business in Russia'
export  const INTERACTIVE_WELCOME_MESSAGE = 'Ask any questions about the Russian market, competitors, consumers, or how we can help you achieve your goals.'

const AppChat = ({ firstMessageRef, ...props }) => {
    const messages = useRecoilValue(messagesState)
    const setMessages = useSetRecoilState(messagesState)
    const setTyping = useSetRecoilState(typingState)
    const isTyping = useRecoilValue(typingState)
    const [isChatFetching, setIsChatFetching] = useRecoilState(isChatFetchingState)
    const chatEndRef = useRef(null)
    const chatContainerRef = useRef(null) // Реф для контейнера чата

    const showWelcomeMessages = async () => {
        const hasGeneralMessage = messages.some(msg => msg.content === GENERAL_WELCOME_MESSAGE)
        const hasInteractiveMessage = messages.some(msg => msg.content === INTERACTIVE_WELCOME_MESSAGE)

        if (!hasGeneralMessage || !hasInteractiveMessage) {
            setTyping(true)
            setIsChatFetching(true)

            if (!hasGeneralMessage) {
                await new Promise(resolve => setTimeout(resolve, 2000))
                setMessages((msgs) => [
                    ...msgs,
                    {role: 'assistant', answer: GENERAL_WELCOME_MESSAGE },
                ])
            }

            setTyping(false)

            if (!hasInteractiveMessage) {
                await new Promise(resolve => setTimeout(resolve, 2000))
                setTyping(true)
                setIsChatFetching(true)

                await new Promise(resolve => setTimeout(resolve, 2000))
                setMessages((msgs) => [
                    ...msgs,
                    { role: 'assistant', answer: INTERACTIVE_WELCOME_MESSAGE },
                ])
            }
            setTyping(false)
            setIsChatFetching(false)
        }
    }

    useEffect(() => {
        showWelcomeMessages()
    }, [setMessages, setTyping])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight // Скроллит до конца контейнера
        }
    }, [messages, isTyping])

    return (
        <Box
            ref={chatContainerRef}
            sx={{
                paddingLeft: 2,
                paddingRight: 2,
                width: '100%',
                margin: '0 auto',
                height: 'calc(100vh - 100px)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                pt: '75px',
            }}
            {...props}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 2,
                    width: '100%',
                    margin: '0 auto',
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                }}
            >
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box ref={index === 0 ? firstMessageRef : null}>
                            {message.role === 'user' ? (
                                <AppMessage role={message.role.toLowerCase()} text={message.content} />
                            ) : (
                                <>
                                    {message.answer && <AppMessage role={message.role.toLowerCase()} text={message.answer} />}
                                    {message.question && <AppMessage role={message.role.toLowerCase()} text={message.question} />}
                                </>
                            )}
                        </Box>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box>
                            <AppMessage role="assistant" text="Baba Yaga is typing..." />
                        </Box>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </Box>
        </Box>
    )
}

export default AppChat
