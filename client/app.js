import React,{ Component } from 'react';
import Modal from 'react-modal';

import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import Grid from './Grid';

import style from '../client/style/main.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      articleJSX: null,
      showModal: true,
      error: null,
      loaded: false,
    };
    
    this.notifyArticleClick = this.notifyArticleClick.bind(this);
    this.swapArticlePosition = this.swapArticlePosition.bind(this);
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
      //render articles
      let articleJSX = [];

      this.state.articles.map((article, idx) => {
        let imageSize = this.calculateButtonSizes();
        articleJSX.push(
          <Article
            key={idx}
            index={idx}
            headline={article.headline}
            summary={article.summary}
            images={article.images}
            image={article.image}
            link={article.share_link}
            category={article.category}
            width={imageSize[0]}
            height={imageSize[1]}
            notify={this.notifyArticleClick}
            foundCount= {0}
            requiredFind={Math.floor(Math.random()*(4-2)+2)}
          />
        );
      });
      this.setState({articleJSX: articleJSX});
    }).catch((error) => {
      console.log(error);

      this.setState({
        error: error,
        loaded: true
      });
    });
  }

  // 3:2 ratio 
  calculateButtonSizes(){
    let x = Math.floor((Math.random() * 500) + 200);
    return [x, x-(x/3)];
  }

  // Callback function to notify app component when article is clicked.
  // Swap article position with another random article if clicked.
  notifyArticleClick(foundCount, requiredFind, index){
    // console.log(foundCount, requiredFind);
    if (foundCount !== requiredFind){
      let randomArticlePos = Math.floor(Math.random() * this.state.articleJSX.length);
      this.swapArticlePosition(index, randomArticlePos, foundCount, requiredFind);
    }
  }
  
  // Swap article positions
  // Horribly inefficient but couldn't find a quick workaround for now
  swapArticlePosition(articlePos1, articlePos2, foundCount, requiredFind){
    let articlesCopy = this.state.articles;
    // Swap in the article state array
    let temp = articlesCopy[articlePos1];
    articlesCopy[articlePos1] = articlesCopy[articlePos2];
    articlesCopy[articlePos2] = temp;
  
    let articleJSX = [];

    articlesCopy.map((article, idx) => {
      let imageSize = this.calculateButtonSizes();
      articleJSX.push(
        <Article
          key={idx}
          index={idx}
          headline={article.headline}
          summary={article.summary}
          images={article.images}
          image={article.image}
          link={article.share_link}
          category={article.category}
          width={imageSize[0]}
          height={imageSize[1]}
          notify={this.notifyArticleClick}
          foundCount= {foundCount}
          requiredFind= {requiredFind}
        />
        );
      });
    // Update articles and articleJSX states and rerender
      this.setState({
        articles: articlesCopy,
        articleJSX: articleJSX
      });
  }

  closeModal(){
    this.setState({
      showModal: false
    })
  }

  render() {
    const {loaded, error, articles} = this.state;

    if (error) {
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded || !this.state.articleJSX) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <Modal isOpen={this.state.showModal}
                  ariaHideApp={false}
                  className='modal'
                  onRequestClose={this.closeModal}>
            You should subscribe if you want your articles.<br/>
            You may need to find your article a couple of times.
          </Modal>
          <HelloWorld/>
          <Grid articles={this.state.articleJSX}/>
        </div>
      );

    }
  }
}

export default App;