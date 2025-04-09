import style from './Timeline.module.scss?modules'

export default function Timeline({ children }) {
    return <div className={style.timeline}>{children}</div>
}

Timeline.Event = function TimelineEvent({ children }) {
    return (
        <div className={style.event}>
            <div className={style.bar}>
                <div className={style.dot} />
                <div className={style.connector} />
            </div>
            <div className={style.details}>{children}</div>
        </div>
    )
}
