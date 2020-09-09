import React from 'react';
import '../css/Learn.css';

class LearnPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            basicDefinitions: ['Market Capitalization', 'Dividend Yield', 'P/E Ratio']
        }
    }

    render(){
        return(
            <div>
                <div class="main-header">Learn</div>
                <button>Stocks 101</button>
                <button>Definitions</button>
                <button>Helpful Videos</button>
            </div>
        )
    }
}

export default LearnPage;