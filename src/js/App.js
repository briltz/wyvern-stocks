import React from 'react';
import Stock from './Stock';
import StockPage from './StockPage';
import LearnPage from './LearnPage';
import NewsPage from './NewsPage';
import CommunityPage from './CommunityPage';
import CompetePage from './CompetePage';
import AboutPage from './AboutPage';
import Navbar from './Navbar';
import Home from './Home';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <a name="top" />
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/stocks" component={StockPage}/>
        <Route path="/learn" component={LearnPage}/>
        <Route path="/news" component={NewsPage}/>
        <Route path="/community" component={CommunityPage}/>
        <Route path="/compete" component={CompetePage}/>
        <Route path="/about" component={AboutPage}/>
      </Switch>
      <div class="top"><a href="#top">Back to top</a></div>
      <div class="footer">
        <div>Created by Jake Briltz - 2020</div>
      </div>
    </div>
    </Router>
  );
}

export default App;
