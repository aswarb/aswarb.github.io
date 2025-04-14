import Collapsible from '!components/collapsible'

import { Link, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import Timeline from '!components/timeline'
import style from './about.module.css?module'

const pageSections = [
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
]

function ShortCutWidget({ activeSection }) {
    const callback = (id) => {
        console.log(id)
        console.log(document.getElementById(id))
        document.getElementById(id).scrollIntoView({ block: 'center', inline: 'nearest' })
    }

    return (
        <div className="widget rightanchor verticalcenter shortcutBox">
            <ul className="nobullets">
                {pageSections.map((section) => {
                    return (
                        <li key={section.id}>
                            <a
                                className={
                                    'hidedecos ' + (section.id === activeSection ? 'active' : '')
                                }
                                href={'./about#' + section.id}
                                onClick={(e) => {
                                    console.log(section.id)
                                    callback(section.id)
                                }}
                            >
                                {section.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export function About() {
    const location = useLocation()
    useEffect(() => {
        const hash = location.hash
        if (hash != '') {
            document.getElementById(hash.replace('#', '')).scrollIntoView()
        }
    }, [location.hash])

    const [activeSection, setActiveSection] = useState(null)
    const [scrollY, setScrollY] = useState(0)
    const sectionRefs = useRef({})

    useEffect(() => {
        const parent = document.getElementById('content')
        const observer = new IntersectionObserver(
            (entries) => {
                const filteredEntries = entries.filter((entry) => entry.isIntersecting)
                const sortedEntries = filteredEntries.sort(
                    (entry) => scrollY - entry.target.offsetTop / parent.scrollHeight - 0.4,
                )
                if (sortedEntries.length) {
                    setActiveSection(sortedEntries[0].target.id)
                    if (sortedEntries[0].target.id != activeSection) {
                        window.history.pushState(null, '', `#${sortedEntries[0].target.id}`)
                    }
                }
            },
            { threshold: 0.4, rootMargin: '0px' },
        )
        pageSections.forEach((section) => {
            if (sectionRefs.current[section.id]) {
                observer.observe(sectionRefs.current[section.id])
            }
        })
        return () => observer.disconnect()
    }, [scrollY])

    useEffect(() => {
        const onScroll = (event) => {
            setScrollY(event.target.scrollTop / event.target.scrollTopMax)
        }

        const parent = document.getElementById('content')

        parent.addEventListener('scroll', onScroll)
        return () => parent.addEventListener('scroll', onScroll)
    })

    return (
        <>
            <div className="leftcol">
                <ShortCutWidget activeSection={activeSection} />
            </div>
            <div id="content" className="content">
                <h1>About</h1>
                <hr />
                <div
                    id={pageSections[0].id}
                    key={pageSections[0].id}
                    ref={(el) => (sectionRefs.current[pageSections[0].id] = el)}
                >
                    <h2>{pageSections[0].label}</h2>

                    <Timeline>
                        <Timeline.Event date="Sept. 2019 - June 2021">
                            <hr />
                            <h3> Coleg Gwent - A-levels </h3>
                            <ul>
                                <li> Computer Science - A*</li>
                                <li> Physics - A</li>
                                <li> Mathematics - B</li>
                                <li> Welsh Baccalaureate - A</li>
                            </ul>
                        </Timeline.Event>
                        <Timeline.Event date="Sept. 2021 - July 2024">
                            <hr />
                            <h3> Cardiff University - BSc. Computer Science</h3>
                            <h4> Degree Classification: 2:1</h4>
                            <Collapsible title="Projects">
                                <div className=""> </div>
                                <Link to="/projects/?projectUrl=/pages/cm2305.json">
                                    A Personal Security System for a Night Time Economy{' '}
                                </Link>
                                - Grade: 86%
                                <br />
                                <Link to="/projects/?projectUrl=/pages/cm3203.json">
                                    Automated Cyber Defence Through Reinforcement Learning{' '}
                                </Link>
                                - Grade: 80%
                            </Collapsible>
                        </Timeline.Event>
                    </Timeline>
                </div>
                <div
                    id={pageSections[1].id}
                    ref={(el) => (sectionRefs.current[pageSections[1].id] = el)}
                >
                    <h2>{pageSections[1].label}</h2>

                    <Timeline>
                        <Timeline.Event date="Sept. 2024 - March 2025">
                            <hr />
                            <h3> Software Engineer @ Copner Biotech</h3>
                            Hired to create next-generation CAD software for in-house 3D &amp; 4D
                            Bioprinters, targeting their proprietary GRAPE data modelling format,
                            this software was intended to replace their existing solution. I was be
                            the sole developer on this project.
                            <p>
                                <b>Backend: Node.js, Express, OS agnostic</b>
                                <br />
                                Solution was designed to maximise portability and minimise
                                maintenance and upkeep by designing a cross-platform solution based
                                on a Node.js &amp; Express Web Server. The web server hosted either
                                on Localhost or over a LAN enables any client on the network to
                                access the software without any setup on the part of the user.
                            </p>
                            <p>
                                <b>Frontend: JavaScript, HTML+CSS ,Vue.js, Three.js, Pinia</b>
                                <br />
                                Solution designed as an SPA, utilising Three.js as the environment
                                for modelling shapes and converting to the GRAPE format. Vue.js was
                                used as the frontend framework to dramatically simplify workload in
                                developing the solution, creating a intuitive, low-latency,
                                interface. <br /> The solution empowered the user to first create,
                                modify, merge, and deleete traditional polygonal meshes before
                                voxelising the mesh to convert to GRAPE. This was superior to the
                                existing solution, which modified GRAPE directly and therefore only
                                allowed the creation and manipulation of cuboids.
                            </p>
                            <p>
                                <b> Reference for this role available on request</b>
                            </p>
                        </Timeline.Event>
                    </Timeline>
                </div>
                <div
                    id={pageSections[2].id}
                    ref={(el) => (sectionRefs.current[pageSections[2].id] = el)}
                >
                    <h2>{pageSections[2].label}</h2>

                    <table>
                        <thead>
                            <tr>
                                <th align="left" className="label">
                                    Type
                                </th>
                                <th align="left" className="data">
                                    Skills
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="label">Langauges</td>
                                <td className="data">
                                    {' '}
                                    Python, Java, JavaScript, HTML+CSS, SQL, Bash
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Frameworks</td>
                                <td className="data">
                                    {' '}
                                    Vue.js, React, Stable Baselines 3, PyTorch
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Libraries</td>
                                <td className="data"> Three.js, Numpy, OpenCV</td>
                            </tr>
                            <tr>
                                <td className="label">Databases</td>
                                <td className="data"> MongoDB </td>
                            </tr>
                            <tr>
                                <td className="label">Tools</td>
                                <td className="data">Git, Node</td>
                            </tr>
                            <tr>
                                <td className="label">Operating Systems</td>
                                <td className="data">Linux, Microsoft Windows (Not certified)</td>
                            </tr>
                            <tr className="lastrow">
                                <td className="label">Other</td>
                                <td className="data"> HTTP APIs </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
