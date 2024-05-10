import './App.css';
import { Route, BrowserRouter as Router, Routes,  } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Anime from './components/Anime';
import Movies from './components/Movies';
import Tvshows from './components/Tvshows';
import Notfound from './components/Notfound';

function App() {
  return (
  <>
  <Router basename='/movie-hub'>
    <Header />
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/movie-hub' element={<Home/>}/>
      <Route path='/Anime' element={<Anime/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/TvShows' element={<Tvshows/>}/>
      <Route Component={Notfound}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;
