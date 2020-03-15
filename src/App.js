import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }

  getMovies = async () => {
    // proxy for the temporary api (2020.03.14 - 'https://yts.mx/api/v2/list_movies.json')
    const { data: { data: { movies }}} =  await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    this.setState({ movies, isLoading: false })
  }

  componentDidMount(){
    this.getMovies()
  }

  loader_default = () => {
    return (
      <div className="loader">
        <span className="loader_text">Loading...</span>
      </div>
    )
  }

  loader_movies = () => {
    const { movies } = this.state;
    return (
      <div className="movies">
        {movies.map(m => {
          return <Movie 
            key={m.id}
            id={m.id} 
            year={m.year} 
            title={m.title} 
            summary={m.summary} 
            poster={m.medium_cover_image}
            genres={m.genres}
            />
        })}
      </div>
    )
  }

  render() {
    const { isLoading } = this.state;
    console.log("RENDERED!")

    return <div className="App" > {
        isLoading 
        ? this.loader_default()
        : this.loader_movies()
      } 
    </div>
  }
}

export default App;
