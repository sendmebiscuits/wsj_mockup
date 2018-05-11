import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSummary: null,
    };
  }
  
  componentWillMount(){
    this.setState({
      showSummary: this.props.showSummaries
    });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.showSummaries !== this.state.showSummary){
      this.setState({
        showSummary: nextProps.showSummaries
      });
    }
  }

  render() {
    const {index, headline, summary, image, link, notify} = this.props;
    const {showSummary} = this.state;
    this.summary = null;
    if (showSummary === true){
      this.summary = (
        <div>
          <p>
            {summary} <a href={link}>Read More</a>
          </p>
        </div>
        );
    }
    
    return (
      <div>
        <div className='headline_container'>
          <a href='#'>
            <img src={image}
                style={{width:'100%'}}
                onClick={(e)=>{
                  e.preventDefault();
                  console.log(this.state.showSummary);
                  notify(index)}
                }/>
          </a>
          <div className='headline'>{headline}</div>
        </div>
        {this.summary}
      </div>
      );
  }
}

export default Article;