import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <>
     <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <header>
        <nav>
          <Link to="/" className="logo">
            <span>p</span>
            <span>r</span>
            <span>i</span>
            <span>v</span>
            <span>i</span>
            <span>l</span>
            <span>s</span> 
            <span>m</span>
            <span>o</span>
            <span>v</span>
            <span>i</span>
            <span>e</span>
            <span>h</span>
            <span>u</span>
            <span>b</span>
          </Link>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fa fa-bars"></i>
          </label>
          <ul>
            <li className="one">
              <Link to="/">home</Link>
            </li>
            <li className="two">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="three">
              <Link to="/TvShows">tv shows</Link>
            </li>
            <li className="four">
              <Link to="/Anime">anime</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
