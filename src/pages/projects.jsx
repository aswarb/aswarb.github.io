import * as projectMap from '!assets/project-mapping.json'
import { useFetch } from '!hooks/useFetch.jsx'
import { ProjectSection } from '!utils/makeProjectSection.jsx'

import React, { useCallback, createContext, useContext, useState } from 'react'

import DOMPurify from 'dompurify'

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

function ProjectQuicknotes({ noteArray }) {
    console.log(typeof noteArray)
    const notes = noteArray?.map((element, index) => {
        return (
            <li className="note" key={index}>
                {element}
            </li>
        )
    })

    return (
	<div className="quicknotes-container">
	<div className="title">  <BoltIcon className="svgIcon" height="1em" width="1em" style={{fill:"yellow"}}/> Quicknotes </div>
        <div className="quicknotes">
            <ul>{notes}</ul>
        </div></div>
    )
}

function ProjectFullPage({ url }) {
    const context = useContext(projectImportUrl)
    const result = useFetch(url)
    let content = result.sections?.map((element, index) => {
        return ProjectSection(index, element.type, element.classes, element.altText, element.value)
    })
    return (
        <>
            <div className="project-titlebar">
                <div className="backButton" onClick={() => context.setValue(null)}>
                    <BackIcon className="svgIcon" height="2em" width="2em" />
                </div>
            </div>
            <ProjectQuicknotes noteArray={result?.quicknotes} />
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
