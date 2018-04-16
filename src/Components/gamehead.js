import React from "react";


export class GameHead extends React.Component {

    render() {
        return (
            <div className="head">
                <div className={this.props.hurryupclass}>Hurry Up</div>
                <div id="info">
                    <div className="infos">Score:<span id="score">{this.props.score}</span></div>
                    <div className={this.props.secondsclass}>{this.props.seconds}</div>
                    <div className="infos">Best score:<span id="bestscore">{this.props.bestscore}</span></div>
                </div>
            </div>
        )
    }
}