import React, { Component } from 'react';
import './App.css';

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
    this.onProposalChange = this.onProposalChange.bind(this);    
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

  onSubmit(event) {
    let result = (this.state.proposal === this.state.breed ? 'U got it' : 'No this doggo is a ' + this.state.breed + ' nice try though');
    this.setState({ result: result});
    event.preventDefault();

    setTimeout(() => this.fetchDogs(), 1000);
  }

  onProposalChange(event) {
    this.setState({ proposal: event.target.value });
  }

  getClue(event){
    let obfsRace = this.state.breed.replace(/[aeiou]/gi, "*" );
    this.setState({clue: obfsRace})
  }

  render() {
    const { breed, imageUrl, result, clue } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <h1>Guess Doggo</h1>
          <img src={imageUrl} alt="fetching doggo"/>

          { result && <h2>{result}</h2> }

          <Submit 
            value="What's this good doggo's breed ?"
            onSubmit={this.onSubmit}
            onChange={this.onProposalChange}
          >
            Submit  
          </Submit>
          <Clue 
            onClick={this.getClue}
            clue={clue }
          >
          </Clue>
        </div>
      </div>
    );
  }
}

const Submit = ({
  value,
  onChange,
  onSubmit,
  children
}) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      placeholder={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
</form>

const Clue = ({onClick, className, children, clue}) =>
  <div> 
    <label className="clue-target">{clue}</label>
    <button onClick={onClick} className={className} type="button">
      Help !
    </button>
  </div>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
  </button>

export default App;
