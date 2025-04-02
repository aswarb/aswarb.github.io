import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [result, setResult] = useState({})
    useEffect(() => {
        const loadProject = async () => {
            await fetch(url)
                .then((response) => response.json())
                .then((data) => setResult(data))
        }
        loadProject()
    }, [url])
    return result
}
