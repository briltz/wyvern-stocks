import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return(
            <div class="navbar">
                <div class="navtitle">Wyvern Stocks</div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/learn'>Learn</Link></li>
                    <li><Link to='/stocks'>Stocks</Link></li>
                    <li><Link to='/news'>News</Link></li>
                    <li><Link to='/community'>Community</Link></li>
                    <li><Link to='/compete'>Compete</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;