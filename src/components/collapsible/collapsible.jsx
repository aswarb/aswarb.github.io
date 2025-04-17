import { useState, useEffect } from 'react'
import style from './collapsible.module.scss?module'
import DownIcon from '!assets/icons/arrow_drop_down_48dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.svg?react'

export default function Collapsible({ title = '', classNames = [], children }) {
    const [state, setState] = useState(false)

    return (
        <>
            <div
                className={style.title}
                onClick={() => {
                    setState(!state)
                }}
            >
                <DownIcon
                    className={style.svgArrow + ' ' + (state ? style.active : '')}
                    height="1.4em"
                    width="1.4em"
                    viewBox="0 -960 960 960"
                />
                {title}
            </div>
            <div
                className={
                    style.content + ' ' + (state ? style.active : '') + ' ' + classNames.join(' ')
                }
            >
                {children}
            </div>
        </>
    )
}
