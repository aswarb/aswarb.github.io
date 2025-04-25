import { useEffect, useState } from 'react'
import isDarkMode from './isDarkMode.js'
import DOMPurify from 'dompurify'
import Card from '!components/cards'

function PlainText(value) {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}></div>
}

function YTEmbed(value) {
    const newValue = value
        ? value.replace('youtube.com/watch?v=', 'youtube-nocookie.com/embed/')
        : ''
    return (
        <iframe
            width="560"
            height="315"
            src={newValue}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    )
}

function useIsDarkMode() {
    const [isDark, setIsDark] = useState(isDarkMode())

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(isDarkMode())
        })

        observer.observe(document.getElementById('root'), {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    })
    return isDark
}

function RedditEmbed({ value } = '') {
    const isDark = useIsDarkMode()

    return (
        <iframe
            height="568"
            src={value + (isDark ? '?&theme=dark' : '')}
            width="640px"
            scrolling="no"
            allowFullScreen={true}
        ></iframe>
    )
}

async function GetRedditEmbed(value) {
    const newValue = value ? value.replace('www.reddit.com', 'embed.reddit.com') : ''
    try {
        await fetch(newValue, { mode: 'no-cors' })
        console.log(newValue)
        return <RedditEmbed value={newValue} />
    } catch (e) {
        return (
            <Card classNames={['errorContainerOverride']}>
                <Card.Header>
                    {' '}
                    Error - This embedded reddit post could not be be displayed{' '}
                </Card.Header>
                <Card.Content>
                    {' '}
                    Find the post here: <a href={value}>{value}</a>
                </Card.Content>
                <Card.Footer>
                    {' '}
                    This can be caused by firefox's enchanced tracking protection, try turning it
                    off temporarily to see if it gets fixed.
                </Card.Footer>
            </Card>
        )
    }
}

function Heading1(value) {
    return <span className="heading1"> {value} </span>
}

function SvgImg(value) {
    return <img src={value} />
}

export function ProjectSection(index, type, classes, altText, value) {
    let retVal = <></>

    switch (type) {
        case 'plaintext': {
            retVal = PlainText(value)
            break
        }
        case 'yt-embed': {
            retVal = YTEmbed(value)
            break
        }
        case 'reddit-embed': {
            retVal = async () => {
                return (
                    <div key={index} className={classes} alt={altText}>
                        {GetRedditEmbed(value)}
                    </div>
                )
            }
            break
        }
        case 'heading-1': {
            retVal = Heading1(value)
            break
        }
        case 'svg-img': {
            retVal = SvgImg(value)
            break
        }
    }

    if (!classes.length) {
        classes = ' '
    } else {
        classes = classes.join(' ')
    }
    if (typeof retVal === 'function') {
        return retVal
    } else {
        return (
            <div key={index} className={classes} alt={altText}>
                {retVal}
            </div>
        )
    }
}
