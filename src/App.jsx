import './App.css'

import { NavIcon } from '@/navIcon.jsx'

import { Home } from '!pages/home.jsx'
import { About } from '!pages/about.jsx'
import { Projects } from '!pages/projects.jsx'
import { Leetcode } from '!pages/leetcode.jsx'
import { Contact } from '!pages/contact.jsx'

import { Link, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function NavBar() {
    const location = useLocation()

    return (
        <>
            <div className="navRail">
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
                        className={`navDest ${location.pathname === '/projects' ? 'active' : ''}`}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/leetcode"
                        className={`navDest ${location.pathname === '/leetcode' ? 'active' : ''}`}
                    >
                        LeetCode
                    </Link>
                    <Link
                        to="/contact"
                        className={`navDest ${location.pathname === '/contact' ? 'active' : ''}`}
                    >
                        Contact
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
            </div>
        </>
    )
}

function Content({ children }) {
    return <div className="contentBox"> {children} </div>
}

function App() {
    return (
        <Router>
            <div className="pageGrid">
                <div className="emptyDiv"> </div>
                <div className="titlebar">
                    <div className="namePlate">
                        {' '}
                        <div> Andrew Swarbrick </div>
                        <div> Developer Portfolio</div>
                    </div>
                </div>

                <NavBar />
                <Content>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/leetcode" element={<Leetcode />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Content>
            </div>
        </Router>
    )
}

export default App
