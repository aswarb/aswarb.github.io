import './App.css'

import { NavIcon } from '@/navIcon.jsx'

import { Link, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function NavBar() {
    const location = useLocation()

    return (
        <div className="navRail">
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
    )
}

function Content({ children }) {
    return <div className="contentBox"> {children} </div>
}

function App() {
    return (
        <Router>
            <div className="pageGrid">
                <NavBar />
                <Content>
                    <Routes>
                        <Route path="/" element={<div> home </div>} />
                        <Route path="/about" element={<div> about </div>} />
                        <Route path="/projects" element={<div> projects </div>} />
                        <Route path="/leetcode" element={<div> leetCode</div>} />
                        <Route path="/contact" element={<div> contacts</div>} />
                    </Routes>
                </Content>
            </div>
        </Router>
    )
}

export default App
