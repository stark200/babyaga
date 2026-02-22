import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { RecoilRoot } from 'recoil'

import { ThemeProvider } from './hoc/ThemeProvider.jsx'
import App from './App.jsx'

import './index.css'
import '@fontsource/inter/400.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>,
)
