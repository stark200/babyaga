import Markdown from 'react-markdown'

import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import remarkGfm from 'remark-gfm'

const AppMessage = ({ role, text }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: role === 'assistant' ? 'row' : 'row-reverse',
                alignItems: 'flex-end',
                marginBottom: '8px',
                width: '100%',
            }}
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
                fontWeight="bold"
            >
                {role === 'assistant' ? (
                    <img
                        src="/babaYaga.svg"
                        alt="babaYaga"
                        loading="lazy"
                        draggable={false}
                    />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '4px',
                            marginRight: '7px',
                            backgroundColor: 'rgba(194, 122, 170, 1)',
                            fontSize: '14px',
                            borderRadius: '50%',
                            height: '44px',
                            width: '44px',
                            color: '#fff',
                        }}
                    >
                        <span>You</span>
                    </Box>
                )}
            </Box>
            <Box
                sx={{
                    marginLeft: role === 'assistant' ? 1 : 0,
                    marginRight: role === 'assistant' ? 0 : 1,
                    backgroundColor: '#FFFFFF',
                    padding: '12px',
                    borderRadius: '20px',
                    fontFamily: 'Inter, serif',
                    wordBreak: 'break-word',
                    maxWidth: '100%',
                    overflow: 'auto',
                }}
            >
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: ({ href, children }) => (
                            <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', color: '#1246CB'}}>
                                {children}
                            </Link>
                        ),
                    }}
                >
                    {text}
                </Markdown>
            </Box>
        </Box>
    )
}

export default AppMessage
