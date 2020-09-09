import React from 'react';
import '../css/Stock.css';
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class StockPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockYHighs: [],
            stockYLows: [],
            ticker: '',
            search: '',
            name: '',
            exchange: '',
            description: '',
            industry: '',
            lastClose: 0,
            secondLast: 0,
            currency: '',
            marketCap: 0,
            divYield: 0,
            sector: '',
            image: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    yieldColor(y){
        if(y*100 == 0){
            return({color: 'red'});
        }
        else if(y*100 > 5){
            return({color: 'fuchsia'});
        }
        else if(y*100 < 3){
            return({color: 'yellow'});
        }
        else{
            return({color: 'lightgreen'});
        }
    }

    capColor(mc){
        if (mc>1000000000000){
            return({color: 'orange'});
        }
        else if (mc>1000000000){
            return({color: 'fuchsia'});
        }
        else if(mc>1000000){
            return({color: 'lightgreen'});
        }
        else if(mc > 1000){
            return({color: 'red'});
        }
        else{
            return({color: 'white'});
        }
    }

    capInfo(mc){
        if (mc>1000000000000){
            return(<div style={this.capColor(mc)}><br />This stock has a market cap over One Trillion. This is a sign of long-term stability and a well established company, however not as much room to grow.</div>);
        }
        else if (mc>1000000000){
            return(<div style={this.capColor(mc)}><br />This stock has a market cap over One Billion. This is a sign of good stability, and possibly high growth potential.</div>);
        }
        else if(mc>1000000){
            return(<div style={this.capColor(mc)}><br />This stock has a market cap over One Million. This may imply the company is smaller with higher volatility, however there is lots of room to grow.</div>);
        }
        else if(mc > 1000){
            return(<div style={this.capColor(mc)}><br />This stock has a market cap over One Thousand. This implies high volatility, and likely low volume. This particular stock is probably a very risky buy.</div>);
        }
        else{
            return(<div style={this.capColor(mc)}><br />This stock has a market cap under One Thousand. There is either not enough data to properly determine it's market cap, or this particular stock is valued worthless.</div>);
        }
    }

    yieldInfo(y){
        if(y*100 == 0){
            return(<div style={this.yieldColor(y)}><br />This stock does not pay a dividend.</div>);
        }
        else if(y*100 > 5){
            return(<div style={this.yieldColor(y)}><br />This stock pays a large dividend. This may seem good, but is sometimes not a good sign! Take a look into the company financials to ensure it's earnings are stable.</div>);
        }
        else if(y*100 < 2.5){
            return(<div style={this.yieldColor(y)}><br />This stock pays a fair dividend. Usually safer for long-term holds, however it is on the lower end of dividend return.</div>);
        }
        else{
            return(<div style={this.yieldColor(y)}><br />This stock pays a good dividend. The yield is in the ideal range for a dividend-focused security.</div>);
        }
    }

    getCapString(mc){
        if (mc>1000000000000){
            return((mc/1000000000000).toFixed(2) + "T");
        }
        else if (mc>1000000000){
            return((mc/1000000000).toFixed(2) + "B");
        }
        else if(mc>1000000){
            return((mc/1000000).toFixed(2) + "M");
        }
        else if(mc > 1000){
            return((mc/1000).toFixed(2) + "K");
        }
        else{
            return(mc);
        }
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }
    
    handleSubmit(event) {
        this.fetchStock(this.state.search.toUpperCase());
        event.preventDefault();
    }

    componentDidMount() {
        this.fetchStock('AAPL');
    }

    fetchStock(tick) {
        const pointerToThis = this;
        const API_KEY = 'FBT0JJG7QAFALPC4';
        const API_KEY2 = 'E9DOOT4M5JRK14BN';
        let StockSymbol = tick;
        let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + StockSymbol + '&outputsize=full&apikey=' + API_KEY;
        let API_Info_Call = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + StockSymbol + '&apikey=' + API_KEY2;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let stockYHighsFunction = [];
        let stockYLowsFunction = [];
        let stockName = '';
        let stockExchange = '';
        let stockDescription = '';
        let stockIndustry = '';
        let stockClose = 0;
        let closeBool = false;
        let stockSecond = 0;
        let secondBool = false;
        let stockCurrency = '';
        let stockCap = 0;
        let stockYield = 0;
        let stockSector = '';

        fetch(API_Call)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                closeBool = false;
                for(var key in data['Time Series (Daily)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)']
                    [key]['4. close']);
                    stockYHighsFunction.push(data['Time Series (Daily)']
                    [key]['2. high']);
                    stockYLowsFunction.push(data['Time Series (Daily)']
                    [key]['3. low']);
                    if(secondBool){
                        stockSecond = data['Time Series (Daily)'][key]['4. close'];
                        secondBool = false;
                    }
                    if(!closeBool){
                        stockClose = data['Time Series (Daily)'][key]['4. close'];
                        closeBool = true;
                        secondBool = true;
                    }
                }

                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction,
                    ticker: StockSymbol,
                    lastClose : stockClose,
                    secondLast: stockSecond,
                    stockYHighs: stockYHighsFunction,
                    stockYLows: stockYLowsFunction
                });
            }
        )

        fetch(API_Info_Call)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                console.log(data);

                stockName = data['Name'];
                stockExchange = data['Exchange'];
                stockDescription = data['Description'];
                stockIndustry = data['Industry'];
                stockCurrency = data['Currency'];
                stockCap = data['MarketCapitalization'];
                stockYield = data['DividendYield'];
                stockSector = data['Sector'];

                pointerToThis.setState({
                    name: stockName,
                    exchange: stockExchange,
                    description: stockDescription,
                    industry: stockIndustry,
                    currency: stockCurrency,
                    marketCap: stockCap,
                    divYield: stockYield,
                    sector: stockSector
                });
            }
        )
    }

    render(){
        return(
            <div>
                <div class="header">Enter a stock ticker below to access it's data</div>
                <form onSubmit={this.handleSubmit} class="search">
                    <input type="text" placeholder="Enter Ticker" value={this.state.value} onChange={this.handleChange} class="search-bar"/>
                    <button type="submit" class="search-button">Search</button>
                </form>
                <div class="main-info">
                    <div class="info-header">
                        <div class = 'center'>
                            <div class = "info-header-item stock-name">{this.state.name}</div>
                            <div>{this.state.sector} / {this.state.industry} - {this.state.exchange}: {this.state.ticker}</div>
                        </div>
                        <div class = "info-header-item">{(this.state.lastClose+1-1+1).toFixed(2) + " " + this.state.currency}</div>
                        <div class = "info-header-item">{(this.state.lastClose - this.state.secondLast).toFixed(2) + " (" + ((this.state.lastClose - this.state.secondLast) / this.state.lastClose * 100).toFixed(2) + "%) Past Day"}</div>
                    </div>
                </div>
                <div class="stock">
                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'lightgreen'}
                    },
                    ]}
                    layout={ 
                        {
                            width: 800, 
                            height: 600, 
                            title: this.state.ticker, 
                            plot_bgcolor: 'black', 
                            paper_bgcolor: 'black',
                            font: {color: 'white'},
                            xaxis: {
                                rangeselector: {buttons: [
                                    {
                                        count: 1,
                                        label: '1D',
                                        step: 'day',
                                        stepmode: 'backward',
                                    },
                                    {
                                        count: 7,
                                        label: '1W',
                                        step: 'day',
                                        stepmode: 'backward',
                                    },
                                    {
                                        count: 1,
                                        label: '1M',
                                        step: 'month',
                                        stepmode: 'backward',
                                    },
                                    {
                                        count: 3,
                                        label: '3M',
                                        step: 'month',
                                        stepmode: 'backward'
                                    },
                                    {
                                        count: 1,
                                        label: '1Y',
                                        step: 'year',
                                        stepmode: 'backward',
                                    },
                                    {
                                        count: 5,
                                        label: '5Y',
                                        step: 'year',
                                        stepmode: 'backward',
                                    },
                                    {step: 'all'}
                                ],
                                font: {color: 'black'}},
                               // rangeslider: {range: ['2015-02-17', '2020-08-19']}
                            }
                        } }
                />
                <br />
                </div>
                    <div class="fundamentals">
                    <div class="tooltip" style={this.capColor(this.state.marketCap)}>Market Cap: {this.getCapString(this.state.marketCap)}
                    <span class="tooltiptext">
                        The total market capitalization of {this.state.name} is {this.getCapString(this.state.marketCap)} {this.state.currency}. Market cap is determined by the price per share multiplied by the number of shares outstanding. It is the true value of a stock, as opposed to it's share price. Useful for comparing. {this.capInfo(this.state.marketCap)}
                    </span>
                    </div>
                    <br/>
                        <div class="tooltip" style={this.yieldColor(this.state.divYield)}>Yield: {(this.state.divYield * 100).toFixed(2)}%
                    <span class="tooltiptext">
                        {this.state.name} shareholders will recieve a return of {(this.state.divYield * 100).toFixed(2)}% annually in the form of a dividend. Dividends are money given to shareholders per share as incentive to invest, often paid monthly or quarterly. {this.yieldInfo(this.state.divYield)}
                    </span>
                    </div>
                    </div>
                    <div class = "description">{this.state.description}</div>
                    <div class="stock-community">
                        <div class="community-header">
                            <div>|</div>
                            <button>Comments</button>
                            <div>|</div>
                            <button>Polls</button>
                            <div>|</div>
                            <button>Threads</button>
                            <div>|</div>
                        </div>
                        <hr />
                        There are no comments on this stock yet.
                        <button class="guide-button">Comment</button>
                    </div>
            </div>
        )
    }
}

export default StockPage;