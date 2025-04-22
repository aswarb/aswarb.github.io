import style from './donutChart.module.scss?module'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin)

export default function DonutChart({ ref = {}, options = {}, data = {} }) {
    console.log(ref)

    return <Doughnut ref={ref} options={options} data={data} />
}
