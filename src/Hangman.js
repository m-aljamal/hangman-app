import React, { Component } from "react";
import "./Hangman.css";
import {randomWord} from './words';
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this)
   
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button className='butn'
        key={ltr}           //? here I add key
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  restart(){
    this.setState({nWrong: 0, guessed: new Set(), answer: randomWord()})
  }

  
  
  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWnner = this.guessedWord().join('') === this.state.answer;
    // display buttons if win hide button show you win if lose show you lose
    let gameState = this.generateButtons();
    if(isWnner) gameState = 'You win!!!';
    if(gameOver) gameState = 'You Lose'
    return (
      <div>
         <div className='Hangman'>
        <h1>Hangman</h1>
        <div className='Hangman-img-wrong'>
                                      {/* adding alt for img */}
            <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`}/>
                                      {/* display number of wrong gussed if type one wrong */}
            {this.state.nWrong > 0 && <h3 className='Hangman-wrong'>Wrong Guesses: {this.state.nWrong}</h3>}
        </div>
        <p className='Hangman-word'>{!gameOver ? this.guessedWord(): this.state.answer}</p>
                              {/* after 6 wrong guesses buttons will dispear and show You lose */} 
        <p className='Hangman-btns'>{gameState}</p>         
      </div>
     
      {/* restart the game */}
      <button onClick={this.restart} className='restart'>Restart</button>
      </div>
     
    );
  }
}

export default Hangman;
