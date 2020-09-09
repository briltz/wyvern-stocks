import React from 'react';
import '../css/Stock.css';
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            ticker: 'TICKER'
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'FBT0JJG7QAFALPC4';
        let StockSymbol = 'SPY';
        let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + StockSymbol + '&outputsize=compact&apikey=' + API_KEY;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                console.log(data);

                for(var key in data['Time Series (Daily)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)']
                    [key]['4. close']);
                }

                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction,
                    ticker: 'S&P 500 (SPY Index)'
                });
            }
        )
    }

    render() {
        return (
            <div class="stock">
                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'lightgreen', opacity: 0.5}
                    },
                    ]}
                    layout={ 
                        {
                            width: 720, 
                            height: 440, 
                            title: this.state.ticker, 
                            plot_bgcolor: 'black', 
                            paper_bgcolor: 'black',
                            font: {color: 'white'}
                        } }
                />
            </div>
        )
    }
}

export default Stock;