import Collapsible from '!components/collapsible'
import style from './about.module.css?module'

import { useRef, useState, useEffect } from 'react'

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
                <h1>about</h1>
                <div className="timeline">
                    <div className="event">
                        <div className="bar">
                            <div className="dot" />
                            <div className="connector" />
                        </div>

                        <div className="details">
                            details Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            a nibh nec felis dapibus mollis sit amet vitae ligula. Pellentesque sed
                            lorem porta, vehicula felis sit amet, malesuada lectus. Vestibulum non
                            commodo neque. Pellentesque at fringilla sapien. Nunc eu lorem a dolor
                            rhoncus rhoncus. Nulla sit amet convallis neque. Aliquam posuere ligula
                            libero. Mauris cursus, augue id aliquam rhoncus, erat ex aliquet tellus,
                            in maximus nisi magna vitae nibh. Proin quis libero non justo
                            scelerisque imperdiet. Nunc quis tortor id nibh suscipit tempus. Etiam
                            facilisis urna fringilla, bibendum nibh in, egestas ligula. Sed
                            elementum justo est. Morbi eu feugiat lectus. Quisque eget bibendum
                            dolor. Donec sed orci leo.
                        </div>
                    </div>
                    <div className="event">
                        <div className="bar">
                            <div className="dot" />
                            <div className="connector" />
                        </div>

                        <div className="details">
                            <p>
                                Vivamus viverra, nulla nec varius vulputate, libero ipsum semper
                                quam, ac laoreet mi velit sed nibh. Donec eleifend, leo nec suscipit
                                aliquam, dui justo pretium leo, eu commodo neque est vel elit. Etiam
                                egestas non sem nec laoreet. Morbi vitae sem egestas, dignissim elit
                                eget, elementum urna. Aliquam quis facilisis tortor. Nulla ac luctus
                                ligula. Quisque sagittis neque ligula, eget sagittis est tincidunt
                                id. Curabitur ultricies vitae augue at congue. Donec blandit laoreet
                                tellus, eget eleifend risus commodo quis. Donec ut rutrum sapien.
                                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc
                                vestibulum, massa vel pellentesque efficitur, massa augue mattis
                                leo, eu viverra odio turpis quis magna. Cras tincidunt sem a dui
                                efficitur, at mollis tellus posuere. Maecenas aliquet purus enim,
                                vestibulum viverra diam convallis ut. Donec sit amet semper turpis,
                                quis gravida nisi. Sed ut luctus ex.
                            </p>
                            Aenean vel diam at tellus interdum molestie a ac ligula. Morbi viverra
                            nec sapien sit amet rhoncus. Nunc lobortis suscipit nibh, eu consectetur
                            nunc ullamcorper nec. Morbi ante felis, viverra ut dignissim vitae,
                            elementum quis nibh. Pellentesque libero massa, efficitur faucibus massa
                            in, luctus posuere metus. Sed vulputate sit amet est vel laoreet. Nam
                            malesuada leo sapien, eget vestibulum ipsum dignissim a. Morbi consequat
                            imperdiet pellentesque. Mauris ullamcorper, dolor et tempor tempus,
                            neque massa sagittis lectus, condimentum suscipit orci nisi a dui. Nulla
                            quis mauris mi.
                        </div>
                    </div>
                </div>
                <h2
                    id={pageSections[0].id}
                    key={pageSections[0].id}
                    ref={(el) => (sectionRefs.current[pageSections[0].id] = el)}
                >
                    {pageSections[0].label}
                </h2>

                <p>Coleg Gwent</p>
                <p>Cardiff University</p>

                <h2
                    id={pageSections[1].id}
                    ref={(el) => (sectionRefs.current[pageSections[1].id] = el)}
                >
                    {pageSections[1].label}
                </h2>
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
