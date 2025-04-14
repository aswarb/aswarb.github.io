import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import style from '!pages/home.module.scss?modules'
import * as projectMap from '!assets/project-mapping.json'
import Card from '!components/cards'
import { Link } from 'react-router-dom'

import { useStateContext } from '!src/context.jsx'

export function Home() {
    console.log(projectMap)

    const context = useStateContext()

    return (
        <div className={'content ' + style.container}>
            <div className={style.section}>
                <div className={style.title}>Welcome,</div>
                <div className={style.main}> Feel free to explore </div>
            </div>
            <div className={style.section + ' ' + style.navArea}>
                <Card classNames={[style.navCard]}>
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
                            <Link to="/projects"> here! </Link>
                        </p>
                        <p>Most Recent Changes: TBA</p>
                    </Card.Content>
                </Card>
                <Card classNames={[style.navCard]}>
                    <Card.Header> Leetcode </Card.Header>
                    <Card.Content>
                        TBA. Will come with development of{' '}
                        <Link to="/leetcode"> Leetcode problems section </Link>{' '}
                    </Card.Content>
                </Card>
            </div>
            <div className={[style.section, style.centredBlock].join(' ')}>
                <div>
                    Looking to hire? I'm open for work <span className={style.rarr}> &rarr; </span>
                    <div
                        className={style.textHighEmph}
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
