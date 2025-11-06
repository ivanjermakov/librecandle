/* @refresh reload */
import { render } from 'solid-js/web'

import {
    CandlestickSeries,
    ColorType,
    CrosshairMode,
    IChartApi,
    ISeriesApi,
    Time,
    createChart
} from 'lightweight-charts'
import { type Component, onMount } from 'solid-js'
import './index.css'

const apiKey: string = import.meta.env.INSIGHT_SENTRY_KEY
/*
 * https://rapidapi.com/insightsentry-insightsentry-default/api/insightsentry/playground
 */
const apiUrl = 'https://insightsentry.p.rapidapi.com/v3'

const App: Component = () => {
    let chartContainer: HTMLDivElement
    let chart: IChartApi
    let ohlcSeries: ISeriesApi<'Candlestick', Time>

    onMount(async () => {
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
            timeScale: {
                rightBarStaysOnScroll: true
            }
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
        const response = await (
            await fetch(
                `${apiUrl}/symbols/NASDAQ:AAPL/series?bar_type=day&bar_interval=1&extended=true&badj=true&dadj=false&dp=3000&long_poll=false`,
                {
                    headers: {
                        'x-rapidapi-host': 'insightsentry.p.rapidapi.com',
                        'x-rapidapi-key': apiKey
                    }
                }
            )
        ).json()
        console.log(response)
        const data = response.series
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
