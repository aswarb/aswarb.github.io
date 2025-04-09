import Collapsible from '!components/collapsible'
import style from './about.module.css?module'

import { useRef, useState, useEffect } from 'react'

import Timeline from '!components/timeline'

const pageSections = [
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
]

export function About() {
    const [activeSection, setActiveSection] = useState(null)
    const [scrollY, setScrollY] = useState(0)
    const sectionRefs = useRef({})

    useEffect(() => {
        const parent = document.getElementById('content')
        const observer = new IntersectionObserver(
            (entries) => {
                const filteredEntries = entries.filter((entry) => entry.isIntersecting)
                const sortedEntries = filteredEntries.sort(
                    (entry) => scrollY - entry.target.offsetTop / parent.scrollHeight - 0.1,
                )
                setActiveSection(sortedEntries[0].target.id)
                console.log(activeSection)
            },
            { threshold: 0.1, rootMargin: '0px' },
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

    const callback = (id) => {
        document.getElementById(id).scrollIntoView({ block: 'center', inline: 'nearest' })
    }

    return (
        <>
            <div className="leftcol">
                <div className="widget rightanchor verticalcenter shortcutBox">
                    <ul className="nobullets">
                        {pageSections.map((section) => {
                            return (
                                <li key={section.id}>
                                    <a
                                        className={
                                            'hidedecos ' +
                                            (section.id === activeSection ? 'active' : '')
                                        }
                                        //href={'./about#' + section.id}
                                        onClick={(e) => {
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
            </div>
            <div id="content" className="content">
                <h1>About</h1>

                <h2
                    id={pageSections[0].id}
                    key={pageSections[0].id}
                    ref={(el) => (sectionRefs.current[pageSections[0].id] = el)}
                >
                    {pageSections[0].label}
                </h2>

                <Timeline>
                    <Timeline.Event>
                        <h3> Coleg Gwent - A-levels </h3>
                        <ul>
                            <li> Computer Science </li>
                            <li> Mathematics</li>
                            <li> Physics </li>
                            <li> Welsh Baccalaureate </li>
                        </ul>
                    </Timeline.Event>
                    <Timeline.Event>
                        <h3> Cardiff University - BSc. Computer Science</h3>
                        <h4> Degree Classification: 2:1</h4>
                        <Collapsible title="Projects"> test </Collapsible>
                    </Timeline.Event>
                </Timeline>

                <h2
                    id={pageSections[1].id}
                    ref={(el) => (sectionRefs.current[pageSections[1].id] = el)}
                >
                    {pageSections[1].label}
                </h2>

                <Timeline>
                    <Timeline.Event>
                        <h3> Software Engineer @ Copner Biotech</h3>
                    </Timeline.Event>
                </Timeline>

                <h2
                    id={pageSections[2].id}
                    ref={(el) => (sectionRefs.current[pageSections[2].id] = el)}
                >
                    {' '}
                    {pageSections[2].label}{' '}
                </h2>
            </div>
        </>
    )
}
