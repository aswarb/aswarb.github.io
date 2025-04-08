import Collapsible from '!components/collapsible'
import style from './about.module.css?module'

import { useRef, useState, useEffect } from 'react'

const pageSections = [
    { id: 't1', label: 'Section 1' },
    { id: 't2', label: 'Section 2' },
    { id: 't3', label: 'Section 3' },
    { id: 't4', label: 'Section 4' },
    { id: 't5', label: 'Section 5' },
]

export function About() {
    const [activeSection, setActiveSection] = useState(null)
    const [scrollY, setScrollY] = useState(0)
    const sectionRefs = useRef({})

    useEffect(() => {
        const parent = document.getElementById('content')
        const observer = new IntersectionObserver(
            (entries) => {
                //console.log(entries)
                //console.log(entries.sort((entry) => entry.time))
                const filteredEntries = entries.filter((entry) => entry.isIntersecting)
                const sortedEntries = filteredEntries.sort(
                    (entry) => scrollY - entry.target.offsetTop / parent.scrollHeight,
                )
                setActiveSection(sortedEntries[0].target.id)
                console.log(activeSection)
            },
            { threshold: 0.5, rootMargin: '0px' },
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
            //console.log(event.target.scrollTop / event.target.scrollTopMax)
            //console.log(event.target.scrollTop)
            setScrollY(event.target.scrollTop / event.target.scrollTopMax)
        }

        const parent = document.getElementById('content')

        parent.addEventListener('scroll', onScroll)
        return () => parent.addEventListener('scroll', onScroll)
    })

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
                                        href={'./about#' + section.id}
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
                <h2
                    id={pageSections[0].id}
                    key={pageSections[0].id}
                    ref={(el) => (sectionRefs.current[pageSections[0].id] = el)}
                >
                    {pageSections[0].label}
                </h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac vulputate diam. In
                sed velit sit amet lorem aliquam scelerisque vel in turpis. In nec pellentesque
                orci. In a laoreet elit. Nam sollicitudin elit ut massa suscipit, nec egestas ipsum
                suscipit. Morbi eu posuere massa. Ut laoreet luctus commodo. Sed convallis, nibh a
                feugiat placerat, ex metus sodales ligula, ut gravida mi tellus id nisi. Sed
                vestibulum, ex pretium bibendum consectetur, lacus mauris viverra neque, vitae
                pulvinar diam dolor auctor ante. Aenean vehicula pulvinar dui. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Nam ac vulputate diam. In sed velit sit amet
                lorem aliquam scelerisque vel in turpis. In nec pellentesque orci. In a laoreet
                elit. Nam sollicitudin elit ut massa suscipit, nec egestas ipsum suscipit. Morbi eu
                posuere massa. Ut laoreet luctus commodo. Sed convallis, nibh a feugiat placerat, ex
                metus sodales ligula, ut gravida mi tellus id nisi. Sed vestibulum, ex pretium
                bibendum consectetur, lacus mauris viverra neque, vitae pulvinar diam dolor auctor
                ante. Aenean vehicula pulvinar dui.
                <h2
                    id={pageSections[1].id}
                    ref={(el) => (sectionRefs.current[pageSections[1].id] = el)}
                >
                    {pageSections[1].label}
                </h2>
                Proin tincidunt odio ac tellus convallis euismod. Integer tincidunt dolor metus, ac
                imperdiet sem bibendum nec. Mauris laoreet leo egestas, lacinia nunc a, consectetur
                ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia curae; Vestibulum et maximus tellus. Phasellus egestas mauris non sem
                tincidunt, vitae elementum est mollis. Nulla volutpat rutrum tortor id posuere.
                Maecenas tristique velit eget ante consequat sagittis. In eget ultricies enim.
                Integer aliquam, nibh sed ullamcorper maximus, mauris nisi tempus erat, eget aliquet
                tellus ex at justo. Curabitur nec vehicula quam, a bibendum ex. Curabitur at enim
                vehicula, rutrum turpis fringilla, malesuada mauris. Quisque posuere sapien elit,
                non placerat turpis vehicula porta. In ut mattis nulla. Sed imperdiet eget felis ut
                aliquam. Etiam iaculis porta purus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nam ac vulputate diam. In sed velit sit amet lorem aliquam
                scelerisque vel in turpis. In nec pellentesque orci. In a laoreet elit. Nam
                sollicitudin elit ut massa suscipit, nec egestas ipsum suscipit. Morbi eu posuere
                massa. Ut laoreet luctus commodo. Sed convallis, nibh a feugiat placerat, ex metus
                sodales ligula, ut gravida mi tellus id nisi. Sed vestibulum, ex pretium bibendum
                consectetur, lacus mauris viverra neque, vitae pulvinar diam dolor auctor ante.
                Aenean vehicula pulvinar dui.
                <h2
                    id={pageSections[2].id}
                    ref={(el) => (sectionRefs.current[pageSections[2].id] = el)}
                >
                    {' '}
                    {pageSections[2].label}{' '}
                </h2>
                Curabitur non massa quis dui placerat egestas et nec metus. Morbi finibus mollis
                felis, a tristique sem vestibulum vel. Curabitur arcu lectus, aliquet eu ipsum et,
                ultrices fermentum magna. Donec efficitur sapien at mi viverra laoreet. Nulla
                laoreet, ligula ac blandit faucibus, dui tellus tempus diam, nec molestie turpis
                orci sit amet neque. Nam rutrum, felis ac scelerisque suscipit, ante ante sodales
                odio, a auctor lacus dolor posuere nulla. Donec posuere enim non magna tincidunt, at
                volutpat magna pulvinar. Fusce urna leo, fermentum a leo et, volutpat aliquam erat.
                Morbi justo urna, maximus vitae auctor eu, lobortis eu augue. Nunc semper cursus
                lacus, id ullamcorper tortor pharetra tincidunt. In ornare ac turpis nec tincidunt.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Proin eget lacinia massa, quis dignissim lacus. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nam ac vulputate diam. In sed velit sit amet lorem
                aliquam scelerisque vel in turpis. In nec pellentesque orci. In a laoreet elit. Nam
                sollicitudin elit ut massa suscipit, nec egestas ipsum suscipit. Morbi eu posuere
                massa. Ut laoreet luctus commodo. Sed convallis, nibh a feugiat placerat, ex metus
                sodales ligula, ut gravida mi tellus id nisi. Sed vestibulum, ex pretium bibendum
                consectetur, lacus mauris viverra neque, vitae pulvinar diam dolor auctor ante.
                Aenean vehicula pulvinar dui.
                <h2
                    id={pageSections[3].id}
                    ref={(el) => (sectionRefs.current[pageSections[3].id] = el)}
                >
                    {' '}
                    {pageSections[3].label}{' '}
                </h2>
                Curabitur volutpat elit id rutrum mattis. Mauris urna dolor, hendrerit eget
                tristique ut, convallis vel neque. Donec metus lorem, pulvinar nec turpis ac,
                pellentesque mattis leo. Pellentesque ultrices nisl sit amet dolor finibus
                consequat. Pellentesque lacinia felis quis ultricies aliquet. Vivamus scelerisque
                orci dolor, vel porta nulla semper at. Maecenas ac ex eu metus accumsan sodales ac
                in ante. Cras vitae lacus eu ante maximus elementum at eget sapien. Pellentesque
                volutpat est ac volutpat auctor. Sed accumsan in est quis luctus. Ut lacinia sem
                nisl, a finibus felis viverra quis. Curabitur convallis sapien sem, in pharetra
                ipsum aliquam vel. Nullam ornare metus vitae nisi euismod, at commodo dui
                consectetur. Phasellus mollis eros orci, nec pulvinar velit vestibulum a. Curabitur
                ut massa elit. Suspendisse laoreet et lacus eget facilisis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Nam ac vulputate diam. In sed velit sit amet
                lorem aliquam scelerisque vel in turpis. In nec pellentesque orci. In a laoreet
                elit. Nam sollicitudin elit ut massa suscipit, nec egestas ipsum suscipit. Morbi eu
                posuere massa. Ut laoreet luctus commodo. Sed convallis, nibh a feugiat placerat, ex
                metus sodales ligula, ut gravida mi tellus id nisi. Sed vestibulum, ex pretium
                bibendum consectetur, lacus mauris viverra neque, vitae pulvinar diam dolor auctor
                ante. Aenean vehicula pulvinar dui.
                <h2
                    id={pageSections[4].id}
                    ref={(el) => (sectionRefs.current[pageSections[4].id] = el)}
                >
                    {' '}
                    {pageSections[4].label}{' '}
                </h2>
                Cras condimentum massa vel libero lacinia, dictum hendrerit elit efficitur. Proin
                lobortis euismod dolor, eu elementum enim maximus eu. Suspendisse consequat erat eu
                laoreet varius. Fusce posuere, odio eget ultricies tempus, massa massa pellentesque
                massa, quis feugiat augue dui a elit. Nulla id consequat mi, in lacinia velit.
                Vestibulum pharetra erat sed ex laoreet commodo. Suspendisse molestie enim velit, at
                laoreet metus luctus sed. Morbi tempus facilisis dui nec luctus. Nullam dictum
                convallis enim eget finibus. Nunc molestie tempus augue sed varius. Praesent rutrum
                eget felis sit amet scelerisque. Ut id tempus mi. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nam ac vulputate diam. In sed velit sit amet lorem
                aliquam scelerisque vel in turpis. In nec pellentesque orci. In a laoreet elit. Nam
                sollicitudin elit ut massa suscipit, nec egestas ipsum suscipit. Morbi eu posuere
                massa. Ut laoreet luctus commodo. Sed convallis, nibh a feugiat placerat, ex metus
                sodales ligula, ut gravida mi tellus id nisi. Sed vestibulum, ex pretium bibendum
                consectetur, lacus mauris viverra neque, vitae pulvinar diam dolor auctor ante.
                Aenean vehicula pulvinar dui.
            </div>
        </>
    )
}
