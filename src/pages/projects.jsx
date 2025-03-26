import * as projectMap from '!assets/project-mapping.json'

function ProjectCard({ thumbnail, title, shortDescription, link }) {
    return (
        <a href={link}>
            <div className="card">
                <span>{thumbnail}</span>
                <span>{title}</span>
                <span>{shortDescription}</span>
            </div>
        </a>
    )
}

export function Projects() {
    const projects = projectMap.projects
    console.log(projects)
    return (
        <div className="content">
            <h3>projects</h3>
            <div>
                {projects.map((project) => (
                    <ProjectCard
                        thumbnail={project.thumbnail}
                        title={project.title}
                        shortDescription={project.shortDescription}
                        link={project.fullContentLink}
                    />
                ))}
            </div>
        </div>
    )
}
