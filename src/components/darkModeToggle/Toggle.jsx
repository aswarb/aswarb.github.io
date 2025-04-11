import style from './Toggle.module.scss?modules'

import { useState, useRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import LightIcon from '!assets/icons/light_mode_48dp_E3E3E3_FILL1_wght400_GRAD0_opsz48.svg?react'
import DarkIcon from '!assets/icons/dark_mode_48dp_E3E3E3_FILL1_wght400_GRAD0_opsz48.svg?react'

export default function Toggle({ toggleCallback, initialMode }) {
    console.log(initialMode)
    const [state, setState] = useState(initialMode)
    console.log(state)

    const lightRef = useRef(null)
    const darkRef = useRef(null)

    const fadeTransitionsCSS = {
        enter: style['fade-enter'],
        enterActive: style['fade-enter-active'],
        exit: style['fade-exit'],
        exitActive: style['fade-exit-active'],
    }

    return (
        <div
            onClick={(e) => {
                toggleCallback(e)
                console.log(state)
                if (state === 'dark') {
                    setState('light')
                } else if (state === 'light') {
                    setState('dark')
                }
            }}
            className={style.buttonContainer}
        >
            <TransitionGroup component={null}>
                {state === 'light' && (
                    <CSSTransition
                        key="light"
                        nodeRef={lightRef}
                        timeout={5000}
                        classNames={fadeTransitionsCSS}
                    >
                        <div className={style.svgContainer} ref={lightRef}>
                            <LightIcon />
                        </div>
                    </CSSTransition>
                )}

                {state === 'dark' && (
                    <CSSTransition
                        key="dark"
                        nodeRef={darkRef}
                        timeout={5000}
                        classNames={fadeTransitionsCSS}
                    >
                        <div className={style.svgContainer} ref={darkRef}>
                            <DarkIcon />
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}
