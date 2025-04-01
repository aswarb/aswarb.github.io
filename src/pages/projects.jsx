import * as projectMap from '!assets/project-mapping.json'
import { useFetch } from '!hooks/useFetch.jsx'
import { ProjectSection } from '!utils/makeProjectSection.jsx'

import React, { useCallback, createContext, useContext, useState } from 'react'

import DOMPurify from 'dompurify'

import BackIcon from '!assets/icons/arrow_back_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'

const projectImportUrl = createContext(null)

function ProjectCard({ thumbnail, title, shortDescription, link }) {
    const context = useContext(projectImportUrl)
    const buttonClicked = useCallback(
        (link) => {
            context.setValue(link)
        },
        [context],
    )
    return (
        <div
            className="card"
            onClick={() => {
                buttonClicked(link)
                console.log(link)
            }}
        >
            <div className="cardContent">
                <img className="thumbnail" src={thumbnail} />
                <span className="title">{title}</span>
                <span className="shortDesc">{shortDescription}</span>
            </div>
        </div>
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

function ProjectFullPage({ url }) {
    const context = useContext(projectImportUrl)
    console.log(url)
    const result = useFetch(url)
    let content = result.sections?.map((element, index) => {
        return ProjectSection(index, element.type, element.classes, element.altText, element.value)
    })
    console.log(content)
    return (
        <>
            <div style={{ borderRadius: 5 + 'px', border: 1 + 'px solid black' }}>
                <div className="backButton" onClick={() => context.setValue(null)}>
                    <BackIcon className="svgIcon" />
                </div>
            </div>
            {content}
        </>
    )
}

function PageContent() {
    const context = useContext(projectImportUrl)

    const projects = projectMap.projects
    console.log(projects)
    return (
        <div className="cardContainer">
            {context.value === null ? (
                <ProjectCards projects={projects} />
            ) : (
                <ProjectFullPage url={context.value} />
            )}
        </div>
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
