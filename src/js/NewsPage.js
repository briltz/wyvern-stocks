import React from 'react';
import '../css/News.css';

let rm = [false, false, false, false, false, false];

class NewsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            urls: {
                stockUrls: [],
                hotUrls: []
            },
            titles: {
                stockTitles: [],
                hotTitles: []
            },
            descriptions: {
                stockDescriptions: [],
                hotDescriptions: []
            },
            images: {
                stockImages: [],
                hotImages: []
            },
            sources: {
                stockSources: [],
                hotSources: []
            },
            content: {
                stockContent: [],
                hotContent: []
            },
            searchTerm: "Apple",
            searchSort: "recent",
            stockPage: 1,
            hotPage: 1
        }
        this.prevStockPage = this.prevStockPage.bind(this);
        this.nextStockPage = this.nextStockPage.bind(this);
        this.prevHotPage = this.prevHotPage.bind(this);
        this.nextHotPage = this.nextHotPage.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchNews(term,sort){
        const API_KEY = 'a64cac56532741d6a55d4df44ee9e454';
        let API_Call = 'http://newsapi.org/v2/everything?' +
        'q=stock market&' +
        'sortBy=recent&' +
        'apiKey=' + API_KEY;
        let API_Call2 = 'http://newsapi.org/v2/everything?' +
        'q=' + term + '&' +
        'sortBy=' + sort + '&' +
        'apiKey=' + API_KEY;
        let urlFunction = [];
        let titleFunction = [];
        let descriptionFunction = [];
        let imageFunction = [];
        let sourceFunction = [];
        let contentFunction = [];
        let hoturlFunction = [];
        let hottitleFunction = [];
        let hotdescriptionFunction = [];
        let hotimageFunction = [];
        let hotsourceFunction = [];
        let hotContentFunction = [];
        let pointerToThis = this;

        fetch(API_Call)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                console.log(data);
                for(var key in data['articles']){
                    urlFunction.push(data['articles'][key]['url']);
                    titleFunction.push(data['articles'][key]['title']);
                    descriptionFunction.push(data['articles'][key]['description']);
                    imageFunction.push(data['articles'][key]['urlToImage']);
                    sourceFunction.push(data['articles'][key]['source']['name']);
                }
            }
        )
        .then(
            fetch(API_Call2)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);
                    for(var key in data['articles']){
                        hoturlFunction.push(data['articles'][key]['url']);
                        hottitleFunction.push(data['articles'][key]['title']);
                        hotdescriptionFunction.push(data['articles'][key]['description']);
                        hotimageFunction.push(data['articles'][key]['urlToImage']);
                        hotsourceFunction.push(data['articles'][key]['source']['name']);
                    }

                    pointerToThis.setState({
                        urls: {stockUrls: urlFunction, hotUrls: hoturlFunction},
                        titles: {stockTitles: titleFunction, hotTitles: hottitleFunction},
                        descriptions: {stockDescriptions: descriptionFunction, hotDescriptions: hotdescriptionFunction},
                        images: {stockImages: imageFunction, hotImages: hotimageFunction},
                        sources: {stockSources: sourceFunction, hotSources: hotsourceFunction}
                    });
                }
            )
        )
    }

    toggleRead(a){
        rm[a] = !rm[a];
        console.log(rm);
    }

    getRecentNews(q){
        let articles = [];
        for(let x = 0; x < q; x++){
            let a = x + ((this.state.stockPage - 1) * 3);
            if(rm[x]){
                articles.push(
                    <div class="article">
                        <img src={this.state.images.stockImages[a]} alt={this.state.images.stockImages[a]} class='thumbnail' height='128px' width='228px' />
                        <div>
                            <div class="news-title">{this.state.titles.stockTitles[a]}</div>
                            Source: <a href={this.state.urls.stockUrls[a]}>{this.state.sources.stockSources[a]}</a>
                            <div>{this.state.descriptions.stockDescriptions[a]}</div>
                            <button class='readmore' onClick={() => { this.toggleRead(x) }}>Read More</button>
                        </div>
                    </div>
                );
            }
            else{
                articles.push(
                    <div class="article">
                        <img src={this.state.images.stockImages[a]} alt={this.state.images.stockImages[a]} class='thumbnail' height='128px' width='228px' />
                        <div>
                            <div class="news-title">{this.state.titles.stockTitles[a]}</div>
                            Source: <a href={this.state.urls.stockUrls[a]}>{this.state.sources.stockSources[a]}</a>
                            <div>{this.state.descriptions.stockDescriptions[a]}</div>
                            <button class='readmore' onClick={() => { this.toggleRead(x) }}>Read More</button>
                        </div>
                    </div>
                );
            }
        }
        return (articles);
    }

    getHotNews(q){
        let articles = [];
        for(let x = 0; x < q; x++){
            let a = x + ((this.state.hotPage - 1) * 3);
            articles.push(
                <div class="article">
                    <img src={this.state.images.hotImages[a]} alt={this.state.images.hotImages[a]} class='thumbnail' height='128px' width='228px' />
                    <div>
                        <div class="news-title">{this.state.titles.hotTitles[a]}</div>
                        Source: <a href={this.state.urls.hotUrls[a]}>{this.state.sources.hotSources[a]}</a>
                        <div>{this.state.descriptions.hotDescriptions[a]}</div>
                        <button class='readmore'>Read More</button>
                    </div>
                </div>
            );
        }
        return (articles);
    }

    getOptions(){
        let options = ['Alibaba','Amazon','AMD','Apple','Berkshire Hathaway','Beyond Meat','Cloudflare','Facebook','Google','Johnson and Johnson','JPMorgan','Mastercard','Microsoft','Netflix','Nvidia','Taiwan Semiconductor','Tesla','Visa','Walmart'];
        let opthtml = [];
        for(var o in options){
            opthtml.push(<option>{options[o]}</option>);
        }
        return opthtml;
    }

    componentDidMount() {
        this.fetchNews(this.state.searchTerm + " stock", this.state.searchSort);
    }

    handleSearch(event) {
        this.setState({searchTerm: event.target.value});
    }

    handleSort(event) {
        this.setState({searchSort: event.target.value});
        if(event.target.value == 'popular'){
            this.setState({searchSort: 'popularity'});
        }
    }

    handleSubmit(event) {
        this.fetchNews(this.state.searchTerm + " stock", this.state.searchSort);
        this.setState({hotPage: 1});
        event.preventDefault();
    }

    nextStockPage(){
        let page = this.state.stockPage + 1;
        this.setState({stockPage: page});
    }

    prevStockPage(){
        let page = this.state.stockPage - 1;
        this.setState({stockPage: page});
    }
    
    nextHotPage(){
        let page = this.state.hotPage + 1;
        this.setState({hotPage: page});
    }

    prevHotPage(){
        let page = this.state.hotPage - 1;
        this.setState({hotPage: page});
    }

    printStockNav(){
        let html = [];
        if(this.state.stockPage > 1){
            html.push(<button onClick={this.prevStockPage}>Prev</button>);
        }
        html.push(<span>Page {this.state.stockPage}</span>);
        if(this.state.stockPage < 6){
            html.push(<button onClick={this.nextStockPage}>Next</button>);
        }
        return html;
    }

    printHotNav(){
        let html = [];
        if(this.state.hotPage > 1){
            html.push(<button onClick={this.prevHotPage}>Prev</button>);
        }
        html.push(<span>Page {this.state.hotPage}</span>);
        if(this.state.hotPage < 6){
            html.push(<button onClick={this.nextHotPage}>Next</button>);
        }
        return html;
    }

    render(){
        return(
            <div>
                <div class="header">Latest Stock Market News</div>
                {this.getRecentNews(3)}
                <div class="news-nav">
                    {this.printStockNav()}
                </div>
                <div class="header">Hot Stocks</div>
                <form onSubmit={this.handleSubmit}>
                    <div class="news-search">
                        <span>Show me </span>
                        <select class="choose" onChange={this.handleSort}>
                            <option>recent</option>
                            <option>popular</option>
                        </select>
                        <span> news about </span>
                        <select class="choose" onChange={this.handleSearch} value={this.state.searchTerm}>
                            {this.getOptions()}
                        </select>
                        <span> stock.</span>
                        <button class="search-button" type="submit" style={{marginLeft:20}}>Search</button>
                    </div>
                </form>
                {this.getHotNews(3)}
                <div class="news-nav">
                    {this.printHotNav()}
                </div>
            </div>
        )
    }
}

export default NewsPage;