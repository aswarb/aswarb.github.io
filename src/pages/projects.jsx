import * as projectMap from '!assets/project-mapping.json'
import { useFetch } from '!hooks/useFetch.jsx'
import { ProjectSection } from '!utils/makeProjectSection.jsx'

import React, { useCallback, createContext, useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Card from '!components/cards'
import CardStyle from '!components/cards/Card.module.scss?modules'

import projectStyle from '!pages/projects.module.scss?modules'

import BackIcon from '!assets/icons/arrow_back_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'
import BoltIcon from '!assets/icons/bolt_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'

const projectImportUrl = createContext(null)

function ProjectCard({ thumbnail, title, shortDescription, link }) {
    const context = useContext(projectImportUrl)
    const buttonClicked = useCallback(
        (link) => {
            context.setValue(link)
        },
        [context],
    )
    console.log(thumbnail)
    return (
        <Link to={'/projects/?projectUrl=' + link}>
            <Card
                classNames={[
                    CardStyle.clickable,
                    CardStyle.hoverEffects,
                    CardStyle.activeEffects,
                    projectStyle.projectCard,
                ]}
            >
                <Card.Media src={thumbnail} alt="Card Thumbnail" />
                <Card.Header>{title}</Card.Header>
                <Card.Content>{shortDescription}</Card.Content>
            </Card>
        </Link>
    )
}

function ContextProvider({ children }) {
    const [value, setValue] = useState(null)

    return (
        <projectImportUrl.Provider value={{ value, setValue }}>
            {children}
        </projectImportUrl.Provider>
    )
}

function ProjectCards(projects) {
    let count = 0
    return (
        <div>
            {projects.projects.map((project) => (
                <ProjectCard
                    key={(count += 1)}
                    thumbnail={project.thumbnail}
                    title={project.title}
                    shortDescription={project.shortDescription}
                    link={project.fullContentLink}
                />
            ))}
        </div>
    )
}

function ProjectQuicknotes({ noteArray }) {
    const notes = noteArray?.map((element, index) => {
        return (
            <li className="note" key={index}>
                {element}
            </li>
        )
    })

    return (
        <div className="quicknotes-container">
            <div className="title">
                <BoltIcon className="svgIcon" height="1em" width="1em" style={{ fill: 'yellow' }} />{' '}
                Quicknotes
            </div>
            <div className="quicknotes">
                <ul>{notes}</ul>
            </div>
        </div>
    )
}

function ProjectFullPage({ url }) {
    const result = useFetch(url)
    let content = result.sections?.map((element, index) => {
        return ProjectSection(index, element.type, element.classes, element.altText, element.value)
    })
    return (
        <>
            <div className="project-titlebar">
                <Link className="backButton" to="/projects">
                    <BackIcon className="svgIcon" height="2em" width="2em" />
                </Link>
                <div className="title">
                    <div
                        style={{
                            display: 'inline-block',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {result?.title}
                    </div>
                </div>
            </div>
            <ProjectQuicknotes noteArray={result?.quicknotes} />
            {content}
        </>
    )
}

function PageContent() {
    const context = useContext(projectImportUrl)

    const [params] = useSearchParams()
    const url = params.get('projectUrl')

    const projects = projectMap.projects
    return (
        <>
            {url === null ? (
                <>
                    <div className="project-titlebar">
                        <div className="title"> Projects </div>
                    </div>
                    <ProjectCards projects={projects} />
                </>
            ) : (
                <ProjectFullPage url={url} />
            )}
        </>
    )
}

export function Projects() {
    return (
        <div className="content">
            <ContextProvider>
                <PageContent />
            </ContextProvider>
        </div>
    )
}
