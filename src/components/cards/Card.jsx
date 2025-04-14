import style from './Card.module.scss?modules'

export default function Card({ classNames = [], children }) {
    console.log(classNames)
    return <div className={style.card + ' ' + classNames.join(' ')}>{children}</div>
}

Card.Header = function CardHeader({ children }) {
    return <div className={style.header}>{children}</div>
}

Card.Media = function CardMedia({ src, alt }) {
    return <img className={style.media} src={src} alt={alt || 'Card media'} />
}

Card.Content = function CardContent({ children }) {
    return <div className={style.content}>{children}</div>
}

Card.Footer = function CardFooter({ children }) {
    return <div className={style.footer}>{children}</div>
}
