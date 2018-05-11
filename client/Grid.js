import React,{ Component } from 'react';

import Column from './Column';

export default class Grid extends Component {
  constructor(props){
    super(props);
        
    this.state={
      articles: this.props.articles
    };
  }

  componentWillReceiveProps(nextProps){
    if (this.props.articles !== nextProps.articles){
      this.setState({articles: nextProps.articles});
    }
    if ((this.props.swapPos !== nextProps.swapPos)&&
        (this.props.selectedArticle !== nextProps.selectedArticle)){
      this.swapArticlePosition(nextProps.selectedArticle, nextProps.swapPos);
    }
  }

  swapArticlePosition(selectedPos, swapPos){
    let updatedArticles = this.state.articles,
        swapArticle = updatedArticles[swapPos],
        temp;
    temp = updatedArticles[selectedPos];
    updatedArticles[selectedPos] = swapArticle;
    updatedArticles[swapPos] = temp;
    
    this.setState({
      articles: updatedArticles
    });
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
    return (
      <div className='article_flex'>
        {this.renderColumns()}
      </div>
    );
  }
}