import { Link } from '@mui/material'
import Box from '@mui/material/Box'

const Header = ({ isHeaderIntersecting }) => {
    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                backgroundColor: isHeaderIntersecting ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                transition: 'background-color 0.3s ease',
                borderRadius: '0px 0px 20px 20px',
                backdropFilter: isHeaderIntersecting ? 'blur(2.15px)' : 'none',
                WebkitBackdropFilter: isHeaderIntersecting ? 'blur(2.15px)' : 'none',
            }}
        >
            <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <img src='../logo.svg' alt='logo' draggable={false} loading='lazy' />
                <Link sx={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '16.94px',
                    textAlign: 'left',
                    color: '#000000',
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-center',
                    gap: 1
,                }}
                >
                    Explore more <span>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.5V8.5M8 8.5V15.5M8 8.5H1M8 8.5H15" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                 </span>
                </Link>
            </Box>
        </header>
    )
}

export default Header
