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

function Carousel({ children, listIndex = 0 }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    function scrollIntoView(dest) {
        //const root = document.getElementById('carousel')
        const destination = document.getElementById(dest)
        console.log(dest)
        destination.scrollIntoView({ inline: 'start', block: 'nearest' })
    }
    return (
        <>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '92.5%' }}>
                <div>
                    {children != '' &&
                        children.map((child, index) => {
                            return (
                                <button
                                    className={
                                        style.navButton +
                                        ' ' +
                                        (selectedIndex == index ? style.active : '')
                                    }
                                    key={listIndex + child.key + 'button'}
                                    onClick={() => {
                                        scrollIntoView(listIndex + child.key)
                                        setSelectedIndex(index)
                                    }}
                                >
                                    {child.key}
                                </button>
                            )
                        })}
                </div>
                <div className={style.carouselViewport}>
                    <div className={style.carousel} id={'carousel'}>
                        {children != '' &&
                            children.map((child, index) => (
                                <div key={index + child.key} className={[style.slide].join(' ')}>
                                    {child}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

async function getLazyFetchRequest(url, type = 'text') {
    const lazyFn = async () => {
        const res = await fetch(url)
        switch (type) {
            case 'text':
                return await res.text()
            case 'json':
                return await res.json()
            default:
                return await res.text()
        }
    }

    return lazyFn
}

function Solution({ jsonDataPath, listIndex = 0 }) {
    const [jsonData, setJsonData] = useState('')
    const [solutions, setSolutions] = useState([])
    const [problem, setProblem] = useState('')
    const [shouldFetchProblem, setShouldFetchProblem] = useState(false)
    const [shouldFetchSolutions, setShouldFetchSolutions] = useState(false)

    const data = getFileContent(jsonDataPath, 'json')
    const currentPath = jsonDataPath.slice(0, jsonDataPath.lastIndexOf('/') + 1)

    useEffect(() => {
        setJsonData(data)
    }, [data])

    useEffect(() => {
        if (shouldFetchSolutions === true) {
            const mappingsRequest = Object.keys(jsonData?.languages ?? {}).map(async (k) => {
                const file = data?.languages[k].file
                const path = `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${currentPath}${file.slice(2, file.length)}`

                const request = await fetch(path)
                const result = await request.text()

                const map = { lang: k, content: result }
                return map
            })
            Promise.all(mappingsRequest).then((result) => setSolutions(result))
        }
    }, [shouldFetchSolutions, jsonData])

    useEffect(() => {
        if (shouldFetchProblem === true) {
            const problemRequest = async () => {
                const path = `https://raw.githubusercontent.com/aswarb/leetcodeSolutions/main/${currentPath}problem.md`
                const request = await fetch(path)
                const result = await request.text()
                return result
            }
            Promise.resolve(problemRequest()).then((result) => setProblem(result))
        }
    }, [shouldFetchProblem, jsonData])

    return (
        <Collapsible
            title={jsonData?.problem?.name}
            classNames={[style.scrollOverflow]}
            onExpandCallback={() => {
                setShouldFetchSolutions(true)
            }}
        >
            <div style={{ overflow: 'scroll' }}>
                <Collapsible
                    title="Problem"
                    onExpandCallback={() => {
                        setShouldFetchProblem(true)
                    }}
                >
                    <div style={{ whiteSpace: 'pre-wrap' }}>{problem ?? ''}</div>
                </Collapsible>
                <Carousel listIndex={listIndex}>
                    {solutions?.map((s) => (
                        <div id={listIndex + s.lang} key={s.lang}>
                            <div style={{ whiteSpace: 'pre-wrap' }} className={style.codeblock}>
                                {s.content}
                            </div>
                            <div className={style.statsBox}>
                                <div>
                                    <div className={style.title}>Runtime</div>
                                    <span className={style.statName}> Value: </span>
                                    {JSON.stringify(
                                        jsonData?.languages[s.lang].stats.runtime.value,
                                    )}{' '}
                                    ms <br />
                                    <span className={style.statName}> Percentile: </span>
                                    {JSON.stringify(
                                        jsonData?.languages[s.lang].stats.runtime.percentile,
                                    )}
                                </div>
                                <div>
                                    <div className={style.title}>Memory</div>
                                    <span className={style.statName}> Value: </span>
                                    {JSON.stringify(
                                        jsonData?.languages[s.lang].stats.memory.value,
                                    )}{' '}
                                    ms <br />
                                    <span className={style.statName}> Percentile: </span>
                                    {JSON.stringify(
                                        jsonData?.languages[s.lang].stats.memory.percentile,
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </Collapsible>
    )
}

function SolutionList() {
    const allFiles = GetAllFiles('aswarb', 'leetcodeSolutions')
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
                    <Solution jsonDataPath={b.path} listIndex={index} />
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
