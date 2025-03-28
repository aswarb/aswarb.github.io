import * as projectMap from '!assets/project-mapping.json'
import { useFetch } from '!hooks/useFetch.jsx'

import React, { useCallback, createContext, useContext, useState } from 'react'

import DOMPurify from 'dompurify'

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

    const result = useFetch(url)

    return (
        <>
            <div onClick={() => context.setValue(null)}>Back </div>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.content) }} />
        </>
    )
}

function PageContent() {
    const context = useContext(projectImportUrl)

    const projects = projectMap.projects
    console.log(projects)
    return (
        <div>
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
                <div>
                    <h3>projects</h3>
                    <PageContent />
                </div>
            </ContextProvider>
        </div>
    )
}
