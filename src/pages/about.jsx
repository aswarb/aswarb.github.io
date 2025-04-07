import Collapsible from '!components/collapsible'
import style from './about.module.css?module'
export function About() {
    return (
        <>
            <div className="leftcol">
                <div className="widget rightanchor verticalcenter"> test </div>
            </div>
            <div className="content">
                about
                <Collapsible title="titlebox">
                    <div> test </div>
                </Collapsible>
            </div>
        </>
    )
}
