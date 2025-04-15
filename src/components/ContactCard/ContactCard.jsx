import style from './ContactCard.module.scss?modules'
import Card from '!components/cards'

export default function ContactCard({
    classNames = [],
    isShown = false,
    hideSelfCallback = () => {},
}) {
    return (
        <div
            className={style.cardContainer + ' ' + classNames.join(' ')}
            style={{ display: isShown ? 'block' : 'none' }}
        >
            <div className={style.background} onClick={hideSelfCallback} />
            <div className={style.foreground}>
                <Card classNames={[style.card]}>
                    <Card.Header classNames={[style.header]}>Contact Me</Card.Header>
                    <Card.Content classNames={[style.text]}>
                        Hi, if you have work available I'd love to chat
                        <br />
                        <br />
                        <div className={style.rowLayout}>
                            <div className={style.leftItem}> E-mail</div>
                            <div className={style.rightItem}>
                                {' '}
                                <a href="mailto:andrewoswarbrick@hotmail.co.uk">Click here</a>
                            </div>
                        </div>
                        <div className={style.rowLayout}>
                            <div className={style.leftItem}>LinkedIn</div>
                            <div className={style.rightItem}>
                                {' '}
                                <a href="https://www.linkedin.com/in/andrew-swarbrick-a04314261/">
                                    Click here
                                </a>{' '}
                            </div>
                        </div>
                        <div className={style.rowLayout}>
                            <div className={style.leftItem}>Github</div>
                            <div className={style.rightItem}>
                                {' '}
                                <a href="https://github.com/aswarb">Click here</a>{' '}
                            </div>
                        </div>
                    </Card.Content>
                    <Card.Footer classNames={[style.text]}>
                        <div className={style.rowLayout}>
                            <div
                                className={[style.exitButton, style.button, style.leftItem].join(
                                    ' ',
                                )}
                                onClick={hideSelfCallback}
                            >
                                Close
                            </div>
                            <a href="CV.pdf" className={style.cvLink}>
                                <div
                                    className={[
                                        style.downloadButton,
                                        style.button,
                                        style.rightItem,
                                    ].join(' ')}
                                >
                                    View CV
                                </div>
                            </a>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    )
}
