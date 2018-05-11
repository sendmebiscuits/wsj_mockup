import React,{ Component } from 'react';
// import Modal from 'react-modal';

import Modal from './Modal.js';
import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import Grid from './Grid';

import style from '../client/style/main.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      showModal: true,
      error: null,
      loaded: false,
      foundCountStates: [],
      requiredFind: [],
      showSummaries: [],
      swapPos: [],
      selectedArticle: null
    };

    this.handleOnArticleClick = this.handleOnArticleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
  }
  
  componentWillMount() {
    //fetching data clientside
    fetch('/api/articles').then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);

      this.setState({
        articles: data.items,
        loaded: true
      });
    }).then((result) => {
      let foundCountStates= [],
          requiredFind = [],
          showSummaries = [],
          swapPos = [];

      this.state.articles.map((article, idx) => {
        foundCountStates.push(0);
        requiredFind.push(Math.floor(Math.random()*(4-2)+2));
        showSummaries.push(false);
        swapPos.push(null);
      });
      this.setState({
        foundCountStates: foundCountStates,
        requiredFind: requiredFind,
        showSummaries: showSummaries,
        swapPos: swapPos
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        error: error,
        loaded: true
      });
    });
  }

  // Updates foundCount and clicked article index
  // If < requiredFind update next swapPos else toggle summary
  handleOnArticleClick(index){
    let updatedFoundCount = this.updateFoundCount(index);
    let requiredFind = this.state.requiredFind[index];
    let updatedSwaps = this.state.swapPos;
    
    console.log(updatedFoundCount, requiredFind);
    console.log(this.state.showSummaries, this.state.showSummaries[index]);
    
    if (updatedFoundCount < requiredFind){
      updatedSwaps[index] = Math.floor(Math.random() * this.state.articles.length);
      this.setState({
        swapPos: updatedSwaps,
        selectedArticle: index
      });
    } else {
      this.toggleSummary(index);
    }
  }
  
  updateFoundCount(index){
    let arr = this.state.foundCountStates;
    arr[index] = arr[index] + 1;
    this.setState({
      foundCountStates: arr
    });
    return arr[index];
  }
  
  toggleSummary(index){
    let arr = this.state.showSummaries;
    arr[index] = !arr[index];
    console.log(this.state);
    this.setState({
      showSummaries: arr,
      selectedArticle: index
    });
  }
  
  closeModal(){
    this.setState({
      showModal: false
    });
  }

  render() {
    const {loaded, error, selectedArticle, swapPos} = this.state;
    if (error) {
      return <div>Sorry! Something went wrong</div>;
    } else if (!loaded) {
      return <div>Loading...</div>;
    } else {
      this.articleJSX = [];

      this.state.articles.map((article, idx) => {
        this.articleJSX.push(
          <Article
            key={idx}
            index={idx}
            headline={article.headline}
            summary={article.summary}
            image={article.image}
            link={article.share_link}
            notify={this.handleOnArticleClick}
            showSummaries={this.state.showSummaries[idx]}
          />
        );
      });
      return (
        <div>
          <Modal isOpen={this.state.showModal}
                  ariaHideApp={false}
                  className='modal'
                  onRequestClose={this.closeModal}/>
          <HelloWorld/>
          <Grid
            articles={this.articleJSX}
            swapPos={swapPos[selectedArticle]}
            selectedArticle={selectedArticle}
            />
        </div>
      );
    }
  }
}

export default App;