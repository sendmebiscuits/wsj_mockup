import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSummary: false,
      // How many times you found the article. 
      foundCount: this.props.foundCount,
      // How many times you need to find this article to read it without subscriton modal popping up.
      requiredFind: this.props.requiredFind
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e){
    e.preventDefault();
    let clicks = this.props.foundCount+1;
    // console.log(clicks);
    if (this.state.foundCount < this.state.requiredFind){
      // console.log(this.state.foundCount, this.state.requiredFind);
      this.setState({foundCount: this.props.foundCount + 1});
      this.props.notify(clicks, this.state.requiredFind,
                        this.props.index);
    } else if(this.state.foundCount >= this.state.requiredFind){
      this.setState(({showSummary: !this.state.showSummary}));
    }
  }

  render() {
    const {headline, summary, images, image, link, category,
            width, height, foundCount, requiredFind} = this.props;
    this.info = null;
    if (this.state.showSummary === true){
      this.info = (
        <div>
          <p>
            {summary} <a href={link}>Read More</a>
          </p>
        </div>
        );
    } else {
      this.info = null;
    }
    
    return (
      <div>
        <div className='headline_container'>
          <a href='#'>
            <img src={image}
                style={{width:'100%'}}
                onClick={this.handleOnClick}/>
          </a>
          <div className='headline'>{headline}</div>
        </div>
        {this.info}
      </div>
      );
    
  }
};

//set default props here, if any
Article.defaultProps = {};

export default Article;
