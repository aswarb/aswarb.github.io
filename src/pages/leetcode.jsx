import { useFetch } from '!hooks/useFetch.jsx'
import Collapsible from '!components/collapsible'

import { useEffect, useState } from 'react'

function GetAllFiles(user, repoName) {
    const queryString = `https://api.github.com/repos/${user}/${repoName}/git/trees/main?recursive=1`
    return useFetch(queryString)
}

function getFileContent(path, type = 'text') {
    return useFetch(`https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${path}`, type)
}

function Solution({ jsonDataPath }) {
    const [jsonData, setJsonData] = useState('')
    const [solutions, setSolutions] = useState([])
    const data = getFileContent(jsonDataPath, 'json')
    const currentPath = jsonDataPath.slice(0, jsonDataPath.lastIndexOf('/') + 1)

    useEffect(() => {
        setJsonData(data)
	if (!data) {return}

        const mappings = Object.keys(data?.languages ?? {}).map(async (k) => {
            const file = data?.languages[k].file
            const path = `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${currentPath}${file.slice(2, file.length)}`

            const req = await fetch(path)
            const result = await req.text()

            const map = { lang: k, content: result }
            return map
        })

        Promise.all(mappings).then((result) => setSolutions(result))
    }, [data])

    return (
        <Collapsible title={jsonData?.problem?.name}>
            {solutions?.map((s) => (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {s.lang} {s.content}
                </div>
            ))}
        </Collapsible>
    )
}

function SolutionList() {
    const allFiles = GetAllFiles('aswarb', 'leetcodeSolutions')
    console.log(allFiles)
    const [blobs, setBlobs] = useState([])

    useEffect(() => {
        setBlobs(
            allFiles.tree?.filter(
                (el) => el.type === 'blob' && el.path.includes('json') && el.path.includes('src/'),
            ),
        )
    }, [allFiles])

    return (
        <div>
            {blobs?.map((b, index) => (
                <div key={index}>
                    <Solution jsonDataPath={b.path} />
                </div>
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
