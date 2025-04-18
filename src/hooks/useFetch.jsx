import { useState, useEffect } from 'react'

export function useFetch(url, type = 'json', assignCallback) {
    const [result, setResult] = useState({})
    useEffect(() => {
        const loadProject = async () => {
            await fetch(url)
                .then((response) => (type == 'json' ? response.json() : response.text()))
                .then((data) => setResult(data))
        }
        loadProject()
    }, [url])
    return result
}
