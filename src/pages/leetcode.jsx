import { useFetch } from '!hooks/useFetch.jsx'
import Collapsible from '!components/collapsible'

import { useEffect, useState } from 'react'

function GetAllFiles(user, repoName) {
    const queryString = `https://api.github.com/repos/${user}/${repoName}/git/trees/main?recursive=1`
    return useFetch(queryString)
}

function getFileContent(path) {
    return useFetch(
        `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${path}`,
        'text',
    )
}

function Solution({ path }) {
    const [contents, setContents] = useState()
    const data = getFileContent(path, 'text')
    useEffect(() => {
        setContents(data)
    }, [data])

    return <div style={{whiteSpace:"pre-wrap"}}>{(contents)}</div>
}

function SolutionList() {
    const allFiles = GetAllFiles('aswarb', 'leetcodeSolutions')

    const [blobs, setBlobs] = useState([])

    useEffect(() => {
        setBlobs(allFiles.tree?.filter((el) => el.type === 'blob'))
    }, [allFiles])

    return (
        <div>
            {blobs?.map((b, index) => (
                <Collapsible title={b.path} key={index}>
                    <Solution path={b.path} />
                </Collapsible>
            ))}
        </div>
    )
}

export function Leetcode() {
    return (
        <div className="content">
            <SolutionList />
        </div>
    )
}
