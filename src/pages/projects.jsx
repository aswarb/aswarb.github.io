import * as projectMap from '!assets/project-mapping.json'
import { useFetch } from '!hooks/useFetch.jsx'

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
    const paragraphs = JSON.stringify(result.paragraphs);
    let content = "";
    console.log(paragraphs)

    result.paragraphs?.forEach((element) => {content += "<p>"+ element + "</p>"})

    return (
        <>
            <div className="titleBar">
                <div className="backButton" onClick={() => context.setValue(null)}>
                    Back{' '} 
		    <BackIcon className="svgIcon" />
                </div>
		<hr/>
            </div>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
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
