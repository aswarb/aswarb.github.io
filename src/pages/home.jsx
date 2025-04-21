import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import style from '!pages/home.module.scss?modules'
import * as projectMap from '!assets/project-mapping.json'
import Card from '!components/cards'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useStateContext } from '!src/context.jsx'

export function Home() {
    const context = useStateContext()
    const [difficultyBreakdown, setDifficultyBreakdown] = useState({})
    const [languageBreakdown, setLanguageBreakdown] = useState({})

    useEffect(() => {
        const request = async () => {
            const path = `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/src/data.json`
            const request = await fetch(path)
            const result = await request.json()
            return result
        }
        Promise.resolve(request()).then((result) => {
            setDifficultyBreakdown(result.solved[`by-diff`])
            setLanguageBreakdown(result.solved[`by-lang`])
        })
    }, [])

    const projects = projectMap.projects.sort((project) => project.lastEditDate)
    const shownProjects = projects.length > 3 ? projects.slice(0, 3) : projects
    return (
        <div className={'content scrollable yScroll ' + style.container}>
            <div className={style.section}>
                <div className={style.title + ' ' + style.leftOffset}>Welcome,</div>
                <div className={style.main + ' ' + style.leftOffset}> Feel free to explore </div>
            </div>
            <div className={style.section + ' ' + style.navArea}>
                <Card classNames={[style.navCard, style.fixedWidth]}>
                    <Card.Header> About </Card.Header>
                    <Card.Content>
                        <ul>
                            <li>
                                <Link to="/about#education"> About - Education </Link>
                            </li>
                            <li>
                                <Link to="/about#experience"> About - Experience </Link>
                            </li>
                            <li>
                                <Link to="/about#skills"> About - Skills</Link>
                            </li>
                        </ul>
                    </Card.Content>
                </Card>
                <Card classNames={[style.navCard]}>
                    <Card.Header> Projects </Card.Header>
                    <Card.Content>
                        <p>
                            {projectMap.projects.length} projects waiting for you{' '}
                            <Link to="/projects">here!</Link>
                        </p>
                        Most Recent Changes:
                        <br />
                        <br />
                        {shownProjects.map((element, index) => {
                            return (
                                <div key={index}>
                                    {element.lastEditDate}-
                                    <Link to={'/projects/?projectUrl=' + element.fullContentLink}>
                                        {element.title}
                                    </Link>
                                </div>
                            )
                        })}
                    </Card.Content>
                </Card>
                <Card classNames={[style.navCard, style.fixedWidth]}>
                    <Card.Header> Leetcode </Card.Header>
                    <Card.Content>
                        TBA. Will come with development of
                        <Link to="/leetcode"> Leetcode problems section </Link>
                        {JSON.stringify(languageBreakdown)}
                    </Card.Content>
                </Card>
            </div>
            <div className={[style.section, style.centredBlock].join(' ')}>
                <div>
                    Looking to hire? I'm open for work <span className={style.rarr}> &rarr; </span>
                    <div
                        className={style.textHighEmph + ' ' + style.clickable}
                        onClick={() => {
                            context.setIsOpen(!context.isOpen)
                        }}
                    >
                        Find contact details
                    </div>
                </div>
            </div>
        </div>
    )
}
