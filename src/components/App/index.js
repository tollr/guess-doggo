import React, { Component } from 'react';
import './App.css';
import {GuessForm} from '../GuessForm/';
import {Clue} from '../Clue/';

const DEFAULT_QUERY = 'borzoi';
const PATH_BASE = 'https://dog.ceo/api/';
const PATH_SEARCH = 'breed/';

// const all_breed = 'breeds/list/all';
const PATH_END = '/images/random';

const url = `${PATH_BASE}${PATH_SEARCH}${DEFAULT_QUERY}${PATH_END}`;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      imageUrl: '',
      breed: DEFAULT_QUERY,
      proposal: '', 
      result: '',
      clue:'',
    };

    this.baseState = this.state

    this.resetGame = this.resetGame.bind(this);    
    this.fetchDogImage = this.fetchDogImage.bind(this); 
    this.fetchDogs = this.fetchDogs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getClue = this.getClue.bind(this);    
  }

  resetGame = () => {
    this.setState(this.baseState)
  }

  setDogBreed(result){
    this.setState({ breed: result[Math.floor((Math.random() * result.length) + 1)] });  
  }

  // get random image from the breed
  fetchDogImage(breed) {
    fetch('https://dog.ceo/api/breed/'+ breed +'/images/random')
      .then(response => response.json())
      .then(result => {
        this.setState({imageUrl: result.message}); 
      })
  }  

  // Call for a random dog breed
  fetchDogs(){
    this.resetGame();   
    fetch('https://dog.ceo/api/breeds/list')
      .then(response => response.json())
      .then(breed => this.setDogBreed(breed.message))
      .then(imageUrl => this.fetchDogImage(this.state.breed))
      .catch(e => e);
    }

  componentDidMount() {
    this.fetchDogs();
  }

  onSubmit(proposal) {
    let result = (proposal === this.state.breed ? 
      'U got it' 
      : 'No this doggo is a ' + this.state.breed + ' nice try though'
    );

    this.setState({ result: result});

    setTimeout(() => {
      this.fetchDogs();
    }, 3000);
  }

  getClue(event){
    let obfsRace = this.state.breed.replace(/[aeiou]/gi, "*" );
    this.setState({clue: obfsRace})
  }

  render() {
    const { breed, imageUrl, result, clue } = this.state
    return (
      <div className="page">
        <div className="interactions">
          <h1>Guess Doggo</h1>
          <img src={imageUrl} alt="fetching doggo"/>

          { result && <h2>{result}</h2> }

          <GuessForm
            placeholder="What's this good doggo's breed ?"
            onSubmit={this.onSubmit}
            label="Submit"
            key={breed}
          />
          <Clue 
            onClick={this.getClue}
            clue={clue}
          >
          </Clue>
        </div>
      </div>
    );
  }
}

export default App;