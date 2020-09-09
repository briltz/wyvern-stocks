import React from 'react';
import '../css/Home.css';
import Stock from './Stock';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return(
        <div>
            <div class="welcome">Welcome to Wyvern Stocks. Your all-in-one hub for stock tracking, signals, learning, and community. Do your due dilligence on any stock fast and easy with our intuitive and free system.</div>
            <Stock/>
            <div class="guide">
                <Link to='/learn'><button class="guide-button">Learn</button></Link>
                Expand your knowledege in the stock market
                <Link to='/stocks'><br /><button class="guide-button">Stocks</button></Link>
                Browse the list of stocks and examine it's most important information
                <Link to='/news'><br /><button class="guide-button">News</button></Link>
                Catch up on the latest news in the market
                <Link to='/community'><br /><button class="guide-button">Community</button></Link>
                Chat with others about stocks, strategies, and speculation
                <Link to='/compete'><br /><button class="guide-button">Compete</button></Link>
                Compete with others in a virtual stock trading game and put your skills to the test
                <Link to='/about'><br /><button class="guide-button">About</button></Link>
                Learn more about the creator of Wyvern Stocks
            </div>
        </div>
        )
    }
}

export default Home;