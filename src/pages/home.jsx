import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { About } from '!pages/about.jsx'
import { Projects } from '!pages/projects.jsx'
import { Leetcode } from '!pages/leetcode.jsx'
import { Contact } from '!pages/contact.jsx'
export function Home() {
    return (
        <Routes className="content">
            {' '}
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/leetcode" element={<Leetcode />} />
            <Route path="/contact" element={<Contact />} />{' '}
        </Routes>
    )
}
