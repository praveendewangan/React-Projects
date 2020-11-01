import React from 'react';
import { FaqContainer } from './containers/faq';
import { FooterContainer } from './containers/footer';
import { JumbotronContainer } from './containers/jumbotron';

function App() {
  return (
    <>
      <JumbotronContainer />
      <FaqContainer />
      <FooterContainer />
    </>
  )
}

export default App;
