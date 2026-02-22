import { useState } from 'react'

import { FormControl, IconButton, styled, TextField } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { sendChatPrompt } from '@/api/endpoints/chat.js'
import { GENERAL_WELCOME_MESSAGE, INTERACTIVE_WELCOME_MESSAGE } from 'components/app/AppChat.jsx'

import { isChatFetchingState, messagesState, typingState } from 'store'


const AppTextPanel = ({ ...props }) => {
    const [isChatFetching, setIsChatFetching] = useRecoilState(isChatFetchingState)
    const [textInput, setTextInput] = useState('')
    const setMessages = useSetRecoilState(messagesState)
    const setTyping = useSetRecoilState(typingState)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    const sendMessage = async () => {
        if (textInput.trim() === '') return

        setIsChatFetching(true)
        setTyping(true)

        const currentInput = textInput.trim()
        setTextInput('')

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: currentInput },
        ])


        try {
            const currentMessages = await new Promise((resolve) => {
                setMessages((prevMessages) => {
                    resolve(prevMessages.filter(
                        (msg) =>
                            msg.answer !== GENERAL_WELCOME_MESSAGE &&
                            msg.answer !== INTERACTIVE_WELCOME_MESSAGE,
                    ))
                    return prevMessages
                })
            })

            const formattedMessages = currentMessages.map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.role === 'assistant' ? msg.answer : msg.content,
            }))

            const response = await sendChatPrompt(formattedMessages)

            if (response) {
                setMessages((prevMessages) => [...prevMessages, ...response])
            }

        } catch (error) {
            console.error('Error during message processing:', error)
        } finally {
            setIsChatFetching(false)
            setTyping(false)
        }
    }

    
    const handleInputClick = () => {
        window.parent.postMessage({ type: 'SCROLL_TO_CHAT' }, '*')
    }

    return (
        <FormControl
            id="chat-block"
            sx={{
                width: '100%',
                margin: '0 auto',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px 20px 0px 0px',
                paddingTop: '20px',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingBottom: '15px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
            }}
            {...props}
        >
            <CustomTextField
                placeholder={'Text here'}
                multiline
                maxRows={12}
                onKeyDown={handleKeyDown}
                onChange={(e) => setTextInput(e.target.value)}
                value={textInput}
                fullWidth
            />
            <IconButton
                aria-label="submit"
                onClick={async () => {
                    handleInputClick()
                    await sendMessage()
                }}
                disabled={isChatFetching || !textInput.trim()}
                sx={{
                    backgroundColor: textInput.trim() ? '#000' : '#ADADAD',
                    '&:hover': {
                        backgroundColor: textInput.trim() ? '#333' : '#ADADAD',
                    },
                    '&:disabled': {
                        backgroundColor: '#ADADAD',
                    },
                }}
            >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="44" height="44" rx="22" />
                    <path d="M22 29L22 15M22 15L17 20.25M22 15L27 20.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </IconButton>
        </FormControl>
    )
}

const CustomTextField = styled(TextField)(() => ({
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: 24,
    fontFamily: 'Inter, serif',
    '& .MuiInputBase-root': {
        paddingLeft: '17px',
        paddingTop: '14px',
        paddingBottom: '14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiInputBase-input': {
        padding: 0,
    },
}))

export default AppTextPanel
