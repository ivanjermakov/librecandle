/* @refresh reload */
import { render } from 'solid-js/web'

import {
    CandlestickSeries,
    ColorType,
    CrosshairMode,
    IChartApi,
    ISeriesApi,
    OhlcData,
    Time,
    createChart
} from 'lightweight-charts'
import { type Component, onMount } from 'solid-js'
import './index.css'

const App: Component = () => {
    let chartContainer: HTMLDivElement
    let chart: IChartApi
    let ohlcSeries: ISeriesApi<'Candlestick', Time>

    const data: OhlcData[] = [
        { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
        { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
        { time: '2019-01-01', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: '2019-01-02', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
        { time: '2019-01-03', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2019-01-04', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
        { time: '2019-01-05', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2019-01-06', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
        { time: '2019-01-07', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2019-01-08', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2019-01-09', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
        { time: '2019-01-10', open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
    ]

    onMount(() => {
        chart = createChart(chartContainer!, {
            autoSize: true,
            layout: {
                fontSize: 12,
                fontFamily: 'Space Mono',
                background: { type: ColorType.Solid, color: 'rgba(0, 0, 0, 0)' },
                textColor: 'white',
                attributionLogo: false
            },
            crosshair: {
                mode: CrosshairMode.Normal
            },
            grid: {
                vertLines: {
                    color: '#222222'
                },
                horzLines: {
                    color: '#222222'
                }
            },
            timeScale: {}
        })

        const color = {
            green: getComputedStyle(document.body).getPropertyValue('--green'),
            red: getComputedStyle(document.body).getPropertyValue('--red')
        }
        ohlcSeries = chart.addSeries(CandlestickSeries, {
            upColor: color.green,
            downColor: color.red,
            wickUpColor: color.green,
            wickDownColor: color.red,
            borderVisible: false
        })

        ohlcSeries.setData(data)

        chart.timeScale().fitContent()
    })
    return (
        <div class="App">
            <div class="chart" ref={chartContainer!}></div>
        </div>
    )
}

render(() => <App />, document.getElementById('root')!)
