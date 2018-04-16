import React from "react";

export class AnswersBlock extends React.Component {
    constructor(props) {
        super(props)
        this.overText = `Sorry Game Over True Answer is ${this.props.trueanswer}`
    }
    componentDidMount = () => {
        this.props.runTimer()
    }

    componentWillUnmount = () => {
        this.props.scoretobest()
    }

    checkAnswer = (e) => {
        let target = e.target;
        if (target.innerHTML === this.props.trueanswer) {
            target.className = "trueanswer";
            this.props.plusscores()
            setTimeout(this.nextStep.bind(null, target), 4000);
        } else {
            target.className = "falseanswer";
            this.props.stopTimer();
            this.props.showovertext(this.overText)
            setTimeout(this.nextStep.bind(null, target), 4000);
        }

    }

    nextStep = (target) => {
        this.props.changedisabled()
        target.className = "btnanswer";
        if (target.innerHTML === this.props.trueanswer) this.props.setquestion();
        else this.props.gameover(this.overText)



    }

    eachButton = () => {
        return this.props.answers.map((item, i) => {
            return (
                <button
                    disabled={this.props.disabled}
                    key={"answ" + i}
                    className="btnanswer"
                    id={"answ" + i}
                    onClick={this.checkAnswer}>{item}
                </button>
            )
        })
    }


    render() {
        return (
            <div>
                {this.eachButton()}
            </div>
        )
    }
}