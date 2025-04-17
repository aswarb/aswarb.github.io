import style from './Card.module.scss?modules'

export default function Card({ classNames = [], children }) {
    return <div className={style.card + ' ' + classNames.join(' ')}>{children}</div>
}

Card.Header = function CardHeader({ classNames = [], children }) {
    return <div className={style.header + ' ' + classNames.join(' ')}>{children}</div>
}

Card.Media = function CardMedia({ classNames = [], src, alt }) {
    return (
        <img
            className={style.media + ' ' + classNames.join(' ')}
            src={src}
            alt={alt || 'Card media'}
        />
    )
}

Card.Content = function CardContent({ classNames = [], children }) {
    return <div className={style.content + ' ' + classNames.join(' ')}>{children}</div>
}

Card.Footer = function CardFooter({ classNames = [], children }) {
    return <div className={style.footer + ' ' + classNames.join(' ')}>{children}</div>
}
