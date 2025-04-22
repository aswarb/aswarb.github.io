import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import style from '!pages/home.module.scss?modules'
import * as projectMap from '!assets/project-mapping.json'
import Card from '!components/cards'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

import Donutchart from '!components/donutChart'
import Carousel from '!components/carousel'
import { useStateContext } from '!src/context.jsx'

const chartColorMap = {
    fill: {
        easy: 'rgba(75, 192, 192, 0.3)',
        medium: 'rgba(255, 159, 64, 0.3)',
        hard: 'rgba(255, 99, 132, 0.3)',
        Python3: 'rgba(255,212,59,0.5)',
        Java: 'rgba(11,140,232,0.5)',
        JavaScript: 'rgba(252,222,25,0.5)',
    },
    border: {
        easy: 'rgba(75, 192, 192, 1)',
        medium: 'rgba(255, 159, 64, 1)',
        hard: 'rgba(255, 99, 132, 1)',
        Python3: 'rgba(11,140,232,1)',
        Java: 'rgba(255, 99, 99, 1)',
        JavaScript: 'rgba(0,0,0,1)',
    },
}

function getCSSVariable(name) {
    return getComputedStyle(document.getElementById('root')).getPropertyValue(name)
}

function TotalProblemsChart({ labels, data }) {
    const chartRef = useRef()
    console.log(getCSSVariable('--md-sys-color-on-surface'))
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const chart = chartRef.current
            if (chart) {
                console.log(chart.options.plugins.legend.labels)
                chart.options.plugins.legend.labels.color = getCSSVariable(
                    '--md-sys-color-on-surface-variant',
                )

                chart.options.plugins.annotation.annotations.dLabel.color = getCSSVariable(
                    '--md-sys-color-on-surface-variant',
                )
                chart.update()
            }
        })
        observer.observe(document.getElementById('root'), {
            atributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    }, [chartRef])

    const options = {
        plugins: {
            annotation: {
                annotations: {
                    dLabel: {
                        type: 'doughnutLabel',
                        content: ({ chart }) => ['Total', chart.getDatasetMeta(0).total],
                        font: [{ size: 60 }, { size: 60 }],
                        color: [getCSSVariable('--md-sys-color-on-surface-variant')],
                    },
                },
            },
            legend: {
                labels: {
                    padding: 7,

                    color: [getCSSVariable('--md-sys-color-on-surface-variant')],
                },
            },
        },
    }

    return (
        <Donutchart
            ref={chartRef}
            options={options}
            data={{
                labels: labels.map((key) => {
                    return key
                }),
                datasets: [
                    {
                        label: '# of Problems Solved',
                        data: labels.map((key, index) => {
                            return data[index]
                        }),
                        backgroundColor: labels.map((key) => {
                            return chartColorMap.fill[key]
                        }),
                        borderColor: labels.map((key) => {
                            return chartColorMap.border[key]
                        }),
                        borderWidth: 2,
                        borderRadius: 3,
                        hoverOffset: 5,
                        spacing: 1,
                    },
                ],
            }}
        />
    )
}

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
                    <Card.Header> Leetcode Problems</Card.Header>
                    <Card.Content>
                        <Carousel>
                            <div id="0by-lang" key="by-lang">
                                <TotalProblemsChart
                                    labels={Object.keys(languageBreakdown)}
                                    data={Object.keys(languageBreakdown).map((key) => {
                                        return languageBreakdown[key]
                                    })}
                                />
                            </div>
                            <div id="0by-diff" key="by-diff">
                                <TotalProblemsChart
                                    labels={Object.keys(difficultyBreakdown)}
                                    data={Object.keys(difficultyBreakdown).map((key) => {
                                        return difficultyBreakdown[key]
                                    })}
                                />
                            </div>
                        </Carousel>
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
