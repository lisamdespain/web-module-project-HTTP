import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';
import AddNewMovie from "./components/AddNewMovie";
import EditMovieForm from './components/EditMovieForm';
import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    // I'm not sure this is required. Local state was updated when I did the delete over in the movie component
    setMovies(movies.filter((item)=> item.id !== Number(id)))
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/add">
              <AddNewMovie setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie setMovies={setMovies} deleteMovie={deleteMovie}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} setMovies={setMovies}/>
            </Route>

            

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

