import React,{ Component } from 'react';

import Article from '../src/article';
import Column from './Column';

export default class Grid extends Component {
  constructor(props){
    super(props);
        
    this.state={
      articles: this.props.articles
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.articles !== nextProps.articles){
      this.setState({articles: nextProps.articles});
    } 
  }

  renderColumns(){
    const chunk = 10;
    let columnArticles;
    let columns = [];
    
    for (let i=0,j=this.state.articles.length; i<j; i+=chunk) {
      if (i > j){
        columnArticles = this.state.articles.slice(i,i+(j%i)-1);
        columns.push(<Column key={i} articles={columnArticles}/>);
      } else {
        columnArticles = this.state.articles.slice(i,i+chunk);
        columns.push(<Column key={i} articles={columnArticles}/>);
      }
    }
    return columns;
  }
    
  render(){
    const {articles} = this.props;
    return (
      <div className='article_flex'>
        {this.renderColumns()}
      </div>
    )
  }
}