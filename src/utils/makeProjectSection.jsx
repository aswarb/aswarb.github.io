export function ProjectSection(index, type, classes, altText, value) {
    let retVal = <></>
    switch (type) {
        case 'plaintext': {
            retVal = <>{value}</>
            break
        }
        case 'yt-embed':
            {
                const newValue = value.replace('watch?v=', 'embed/')
                retVal = (
                    <iframe
                        width="560"
                        height="315"
                        src={newValue}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                )
            }
            break
    }

    if (!classes.length) {
        classes = ' '
    } else {
        classes = classes.join(' ')
    }

    return (
        <p key={index} className={classes} alt={altText}>
            {retVal}
        </p>
    )
}
