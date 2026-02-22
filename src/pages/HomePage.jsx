import { useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'

import Header from 'components/header/Header.jsx'

import { messagesState } from 'store'
import AppChat from '../components/app/AppChat.jsx'
import AppTextPanel from '../components/app/AppTextPanel'

const HomePage = () => {
    const messages = useRecoilValue(messagesState)
    const [isHeaderIntersecting, setIsHeaderIntersecting] = useState(false)
    const firstMessageRef = useRef(null)
    const chatContainerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeaderIntersecting(!entry.isIntersecting)
            },
            {
                rootMargin: '0px',
                threshold: 0.1,
            },
        )

        if (firstMessageRef.current) {
            observer.observe(firstMessageRef.current)
        }

        return () => {
            if (firstMessageRef.current) {
                observer.unobserve(firstMessageRef.current)
            }
        }
    }, [messages])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%',
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <Header isHeaderIntersecting={isHeaderIntersecting} />

            <AnimatePresence>
                {messages.length === 0 && (
                    <motion.div
                        initial={{opacity: 1, scale: 1}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.9}}
                        transition={{duration: 0.8}}
                    >
                        <Typography sx={{
                            fontFamily: 'Nunito',
                            fontSize: '66px',
                            fontWeight: '700',
                            lineHeight: '66px',
                            textAlign: 'left',
                            position: 'absolute',
                            top: '100px',
                            left: '15px',
                        }}
                        >
                            Russia: Your Next Strategic Market
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>

            <Box
                ref={chatContainerRef}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    paddingBottom: '100px',
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                }}
            >
                <AppChat firstMessageRef={firstMessageRef} />
            </Box>

            <Box
                sx={{
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <AppTextPanel />
            </Box>
        </Box>
    )
}

export default HomePage
