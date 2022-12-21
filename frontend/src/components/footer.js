import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="text-white text-center" style={{fontSize: 'smaller'}}>Made with <span role="img" aria-label="emoji">&#128151;</span> by: Amit Kumar, IIT Kharagpur</div>
            </div>
        )
    }
}
