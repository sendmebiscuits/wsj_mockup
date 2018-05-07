import React,{ Component } from 'react';

import Article from '../src/article';

// Stateless component used to hold 10 articles and display 
const Column = ({articles}) => {
  return (
    <div className='column'>
      {articles}
    </div>
    )
}

export default Column;