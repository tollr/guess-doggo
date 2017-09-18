import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'borzoi';
const PATH_BASE = 'https://dog.ceo/api/';
const PATH_SEARCH = 'breed/';

const all_breed = 'breeds/list/all';
const PATH_END = '/images/random';

const url = `${PATH_BASE}${PATH_SEARCH}${DEFAULT_QUERY}${PATH_END}`;

console.log(PATH_BASE + 'breeds/image/random');


const user =  {
  firstname: 'Robin',
  lastname: 'Wieruch'
}

const users = ['darwin', 'jean-jacques', 'riton'];

const [
  userOne,
  userTwo,
  userThree
] = users;

// ES6 Syntax, define two variables 
const {
  firstname,
  lastname 
} = user;

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      imageUrl: null,
      breed: DEFAULT_QUERY
    };

    this.fetchDogImage = this.fetchDogImage.bind(this); 
    this.fetchDogs = this.fetchDogs.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setDogBreed(result){
    this.setState({ breed: result[Math.floor((Math.random() * result.length) + 1)] });  
  }

  fetchDogImage(breed) {
    fetch('https://dog.ceo/api/breed/'+ breed +'/images/random')
      .then(response => response.json())
      .then(result => {
        this.setState({imageUrl: result.message}); 
      })
  }  

  fetchDogs(){
    fetch('https://dog.ceo/api/breeds/list')
      .then(response => response.json())
      .then(breed => this.setDogBreed(breed.message))
      .then(imageUrl => this.fetchDogImage(this.state.breed))
      .catch(e => e);
  }

  componentDidMount() {
    this.fetchDogs();
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId); this.setState({
      result: { ...this.state.result, hits: updatedHits } 
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  proposeDog(bred){

  }

  render() {
    const { breed, imageUrl } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <img src={imageUrl} alt="fetching doggo"/>
          <h2>{breed}</h2>
        </div>
        {/* <Button
            onClick={() => proposeDog()}
            className="button-inline"
          >
          Dismiss
        </Button> */}
      </div>
    );
  }
}

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
  </button>


export default App;
