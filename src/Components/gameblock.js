import React from "react";
import { AnswersBlock } from "./answers";


export class GameBlock extends React.Component {


    letsPlay = () => {
        this.props.playGame();
        this.setQuestion()

    }

    setQuestion = () => {
        let LetterArr = [];
        for (let i = 65; i < 91; i++) {
            LetterArr.push(String.fromCharCode(i))
        }

        let maxCount = LetterArr.length - 1;                                //25
        let randomIndexForLetter = Math.floor(Math.random() * maxCount);  //0-24 FOR INDEX ARRAAY for example 23-x  no-z
        let maxPlusNumber = maxCount - randomIndexForLetter;              //MAX NUMBER WE CAN PLUS for example 25-23=2 0,1or2 x+2=z
        let plusNumber = Math.ceil(Math.random() * maxPlusNumber)         // for example 1 or 2
        let questionText = `${LetterArr[randomIndexForLetter]} + ${plusNumber}`
        let trueAnswerIndex = randomIndexForLetter + plusNumber;
        this.props.addquestion(questionText);
        console.log(questionText)
        this.setAnswers(trueAnswerIndex, LetterArr, randomIndexForLetter)

    }



    setAnswers = (trueAnswerIndex, LetterArr, randomIndexForLetter) => {
        this.btnanswers = this.props.answers;
        this.trueAnswer = LetterArr[trueAnswerIndex];
        let randomIndexBtnAnswer = Math.floor(Math.random() * this.btnanswers.length);     //0-4
        this.btnanswers[randomIndexBtnAnswer] = this.trueAnswer;                      //true answer in new arr random index

        LetterArr.splice(trueAnswerIndex, 1);                                          // delete true answer from letterarr
        LetterArr.splice(randomIndexForLetter, 1)
        for (let i = 0; i < this.btnanswers.length; i++) {
            let randomIndexForAnswers = Math.floor(Math.random() * LetterArr.length);//0-24 A-Z except true letter
            if (i === randomIndexBtnAnswer) continue;
            else {
                this.btnanswers[i] = LetterArr[randomIndexForAnswers];
                LetterArr.splice(randomIndexForAnswers, 1)
            }
        }

        this.props.addanswers(this.btnanswers)
        console.log(this.trueAnswer)
    }



    blockRender() {
        if (!this.props.play) {
            return (
                <div className="start" onClick={this.letsPlay} >START</div>
            )
        } else {
            return (
                <div>
                    <div className={this.props.blockclass}>{this.props.question === "" ? this.props.overtext : this.props.question}</div>
                    <AnswersBlock
                        runTimer={this.props.runTimer}
                        stopTimer={this.props.stopTimer}
                        answers={this.btnanswers}
                        trueanswer={this.trueAnswer}
                        setquestion={this.setQuestion}
                        plusscores={this.props.addscores}
                        gameover={this.props.playGame}
                        showovertext={this.props.showovertext}
                        scoretobest={this.props.scoretobest}
                        disabled={this.props.disabled}
                        changedisabled={this.props.changedisabled} />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="Game">
                {this.blockRender()}
            </div>
        )
    }
}