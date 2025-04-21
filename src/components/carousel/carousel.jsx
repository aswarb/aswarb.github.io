import { useState } from 'react'
import style from './carousel.module.scss?module'

export default function Carousel({ children, listIndex = 0 }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    function scrollIntoView(dest) {
        const destination = document.getElementById(dest)
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
