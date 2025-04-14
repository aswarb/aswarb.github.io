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
                <Card>
                    <Card.Content> test </Card.Content>
                </Card>
            </div>
        </div>
    )
}
