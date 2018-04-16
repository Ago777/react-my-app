import React from "react";

import { GameHead } from "./Components/gamehead";
import { GameBlock } from "./Components/gameblock";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      seconds: 30,
      score: 0,
      bestscore: 0,
      question: "",
      overtext: "",
      answers: new Array(4),
      blockclass: "question",
      hurryupclass: "hurryup",
      secondsclass: "timer",
      disabled: false

    }
    this.timeUpText = "Sorry time is up"
  }

  playGame = () => {
    this.setState({
      play: !this.state.play,
    })
  }


  runTimer = () => {

    this.intervalID = setInterval(() => {

      this.setState({
        seconds: this.state.seconds - 1
      });

      if (this.state.seconds < 6) {
        this.setState({
          hurryupclass: "hurry",
          secondsclass: "endtime"
        })

        if (this.state.seconds === 0) {
          clearInterval(this.intervalID);
          this.setState({
            blockclass: "gameover",
            question: "",
            overtext: this.timeUpText,
            disabled: !this.state.disabled
          })
          setTimeout(() => {
            this.playGame();
            this.scoreToBest()
          }, 4000)
        }
      } else {
        this.setState({
          hurryupclass: "hurryup",
          secondsclass: "timer",
        })
      }


    }, 1000)

  }

  stopTimer = () => {
    clearInterval(this.intervalID)
  }

  addScores = () => {
    this.setState({
      seconds: this.state.seconds + 10,
      score: this.state.score + 1,
      disabled: !this.state.disabled
    })
  }

  scoreToBest = () => {
    this.setState({
      seconds: 30,
      blockclass: "question",
      disabled: false,
      hurryupclass: "hurryup",
      secondsclass: "timer",
      bestscore: this.state.score > this.state.bestscore ? this.state.score : this.state.bestscore,
      score: 0,


    })



  }
  showOverText = (overText) => {
    this.setState({
      blockclass: "gameover",
      question: "",
      overtext: overText,
      disabled: !this.state.disabled
    })
  }

  addQuestion = (questionText) => {
    this.setState({
      question: questionText
    })
  }

  addAnswers = (btnanswers) => {
    this.setState({
      answers: btnanswers
    })
  }

  changeDisabled = () => {
    this.setState({
      disabled: !this.state.disabled
    })
  }






  render() {
    return (
      <div className="content">
        <GameHead
          seconds={this.state.seconds}
          score={this.state.score}
          bestscore={this.state.bestscore}
          hurryupclass={this.state.hurryupclass}
          secondsclass={this.state.secondsclass}
        />
        <GameBlock
          blockclass={this.state.blockclass}
          runTimer={this.runTimer}
          stopTimer={this.stopTimer}
          question={this.state.question}
          answers={this.state.answers}
          playGame={this.playGame}
          play={this.state.play}
          addquestion={this.addQuestion}
          addanswers={this.addAnswers}
          addscores={this.addScores}
          showovertext={this.showOverText}
          overtext={this.state.overtext}
          scoretobest={this.scoreToBest}
          disabled={this.state.disabled}
          changedisabled={this.changeDisabled}
        />
      </div>
    )
  }
}
