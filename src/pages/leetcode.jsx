import { useFetch } from '!hooks/useFetch.jsx'
import Collapsible from '!components/collapsible'

import style from '!pages/leetcode.module.scss?module'

import { useEffect, useState } from 'react'

function GetAllFiles(user, repoName) {
    const queryString = `https://api.github.com/repos/${user}/${repoName}/git/trees/main?recursive=1`
    return useFetch(queryString)
}

function getFileContent(path, type = 'text') {
    return useFetch(`https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${path}`, type)
}

function Carousel({ children }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    function scrollIntoView(dest) {
        const root = document.getElementById('carousel')
        const destination = document.getElementById(dest)
        console.log(root)
        console.log(destination)
        destination.scrollIntoView({ inline: 'start', block: 'nearest' })
    }

    return (
        <>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
                <div>
                    {children.map((child, index) => {
                        return (
                            <button
                                className={
                                    style.navButton +
                                    ' ' +
                                    (selectedIndex == index ? style.active : '')
                                }
                                key={child.key + 'button'}
                                onClick={() => {
                                    scrollIntoView(child.props.id)
                                    setSelectedIndex(index)
                                }}
                            >
                                {child.props.id}
                            </button>
                        )
                    })}
                </div>
                <div className={style.carouselViewport}>
                    <div className={style.carousel} id={'carousel'}>
                        {children.map((child, index) => (
                            <div key={index} className={[style.slide].join(' ')}>
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

function Solution({ jsonDataPath }) {
    const [jsonData, setJsonData] = useState('')
    const [solutions, setSolutions] = useState([])
    const [problem, setProblem] = useState('')
    const data = getFileContent(jsonDataPath, 'json')
    const currentPath = jsonDataPath.slice(0, jsonDataPath.lastIndexOf('/') + 1)

    useEffect(() => {
        setJsonData(data)
        if (!data) {
            return
        }

        const mappingsRequest = Object.keys(data?.languages ?? {}).map(async (k) => {
            const file = data?.languages[k].file
            const path = `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${currentPath}${file.slice(2, file.length)}`

            const req = await fetch(path)
            const result = await req.text()

            const map = { lang: k, content: result }
            return map
        })

        Promise.all(mappingsRequest).then((result) => setSolutions(result))

        const problemRequest = async () => {
            const path = `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${currentPath}problem.md`

            const req = await fetch(path)
            const result = await req.text()

            return result
        }
        Promise.resolve(problemRequest()).then((result) => setProblem(result))
    }, [data])

    return (
        <Collapsible title={jsonData?.problem?.name} classNames={[style.scrollOverflow]}>
            <div style={{ overflow: 'scroll' }}>
                <Collapsible title="Problem">
                    <div style={{ whiteSpace: 'pre-wrap' }}>{problem ?? ''}</div>
                </Collapsible>
                <Carousel>
                    {solutions?.map((s, index) => (
                        <div style={{ whiteSpace: 'pre-wrap' }} id={s.lang} key={index}>
                            {s.content}
                        </div>
                    ))}
                </Carousel>
            </div>
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
                <div key={index} style={{ marginBottom: '10px' }}>
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
