import './App.css';
import React from 'react';
import Main from './main';
import Header from './header';
import Footer from './footer';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Main/>
        <Footer/>
      </>
    );
  }
}


export default App;
