import { useState, useEffect } from 'react'
import  style  from './collapsible.module.scss?module'

export default function Collapsible({ title, children }) {
    const [state, setState] = useState(false)

    return (
        <>
            <div
                className={style.title}
                onClick={() => {
                    setState(!state)
                }}
            >
                {title}
            </div>
            <div className={style.content + " " +(state ? style.active : '')}>{children}</div>
        </>
    )
}
