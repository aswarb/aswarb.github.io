import { useEffect } from 'react'

function isFirefoxTrackingProtectionEnabled(url) {
    fetch(url, {
        method: 'GET',
    })
        .then((r) => {
            console.log(r)
        })
        .catch((e) => {})
}

export function ProjectSection(index, type, classes, altText, value) {
    let retVal = <></>

    switch (type) {
        case 'plaintext': {
            retVal = <>{value}</>
            break
        }
        case 'yt-embed': {
            const newValue = value
                ? value.replace('youtube.com/watch?v=', 'youtube-nocookie.com/embed/')
                : ''
            retVal = (
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
            break
        }
        case 'reddit-embed': {
            const newValue = value ? value.replace('www.reddit.com', 'embed.reddit.com') : ''
            const trackingOn = isFirefoxTrackingProtectionEnabled(newValue)
            console.log(trackingOn)
            retVal = (
                <iframe
                    height="568"
                    src={newValue}
                    width="640px"
                    scrolling="no"
                    allowFullScreen={true}
                ></iframe>
            )
            break
        }
        case 'heading-1': {
            retVal = <span className="heading1"> {value} </span>
        }
    }

    if (!classes.length) {
        classes = ' '
    } else {
        classes = classes.join(' ')
    }

    return (
        <div key={index} className={classes} alt={altText}>
            {retVal}
        </div>
    )
}
