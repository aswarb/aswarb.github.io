import './App.scss'

import { Home } from '!pages/home.jsx'
import { About } from '!pages/about.jsx'
import { Projects } from '!pages/projects.jsx'
import { Leetcode } from '!pages/leetcode.jsx'

import { Link, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { StateContextProvider, useStateContext } from '!src/context.jsx'

import ContactCard from '!components/ContactCard'
import { DarkModeToggle } from '!components/darkModeToggle'

const LOCALSTORAGE_DARKMODE_KEY = 'aswarb.github.io-darkmode'

function NavBar() {
    const location = useLocation()

    return (
        <>
            <div className="navRail" style={{ position: 'relative' }}>
                <div className="navSection">
                    <Link to="/" className={`navDest ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`navDest ${location.pathname === '/about' ? 'active' : ''}`}
                    >
                        About
                    </Link>
                    <Link
                        to="/projects"
                        className={`navDest ${location.pathname.includes('/projects') ? 'active' : ''}`}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/leetcode"
                        className={`navDest ${location.pathname === '/leetcode' ? 'active' : ''}`}
                    >
                        LeetCode
                    </Link>
                </div>
                <div className="navSection">
                    <div>
                        <a href="https://www.linkedin.com/in/andrew-swarbrick-a04314261/">
                            LinkedIn
                        </a>
                    </div>
                    <div>
                        <a href="https://github.com/aswarb">Github</a>
                    </div>
                </div>
                <div
                    style={{
                        marginBottom: '40px',
                        position: 'absolute',
                        bottom: '0px',
                        left: '50%',
                    }}
                >
                    <DarkModeToggle
                        initialMode={
                            localStorage.getItem(LOCALSTORAGE_DARKMODE_KEY) === 'true'
                                ? 'dark'
                                : 'light'
                        }
                        toggleCallback={function (event) {
                            const rootElement = document.getElementById('root')
                            rootElement.classList.toggle('dark')
                            if (rootElement.classList.value.includes('dark')) {
                                localStorage.setItem(LOCALSTORAGE_DARKMODE_KEY, true)
                            } else {
                                localStorage.setItem(LOCALSTORAGE_DARKMODE_KEY, false)
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}

function Content({ children }) {
    return <div className="contentBox"> {children} </div>
}

function PageGrid() {
    const darkmodeEnable = localStorage.getItem(LOCALSTORAGE_DARKMODE_KEY)
    if (darkmodeEnable === 'true') {
        document.getElementById('root').classList.add('dark')
    }

    const context = useStateContext()

    const hideContactCallback = () => {
        context.setIsOpen(!context.isOpen)
    }

    return (
        <div className="pageGrid">
            <ContactCard isShown={context.isOpen} hideSelfCallback={hideContactCallback} />
            <div className="emptyDiv"> </div>
            <div className="titlebar">
                <div className="namePlate">
                    <div> Andrew Swarbrick </div>
                    <div> Developer Portfolio</div>
                </div>
            </div>

            <NavBar />
            <Content>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects/?projectUrl=?" element={<Projects />} />
                    <Route path="/leetcode" element={<Leetcode />} />
                </Routes>
            </Content>
        </div>
    )
}

function App() {
    return (
        <Router>
            <StateContextProvider>
                <PageGrid />
            </StateContextProvider>
        </Router>
    )
}

function ContextWrapper({ children }) {}

export default App
