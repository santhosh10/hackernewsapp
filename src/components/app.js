import React, { Fragment } from "react";
import axios from 'axios';

require('../styles/app.css');
class App extends React.Component {

  constructor(){
    super();
    this.state = {
      feeds: []
    }
    
  }
  componentDidMount(){
    this.fetchFeeds();
    console.log('DidMount');
  }
  fetchFeeds = () => {
    const url = "https://hn.algolia.com/api/v1/search?tags=front_page";

    axios.get(url).then((response) => {
      if(response.status=== 200) {
        return response.data;
      } else {
        throw new Error('API Error');
      }
    }).then((data) => {
      console.log(data);
      this.setState({
        feeds: data.hits
      });
    }).catch((err) => {
      console.info(err);
    });

  }
  
  renderFeeds = () => {console.log('renderFeeds');
    const {feeds} = this.state;

    return feeds.map((feed) => {
        return (
          <div className='feed-wrapper'>
            <div className='feed-comments'>{feed.num_comments}</div>
            <div className='feed-upvotes'>
              {feed.num_comments}
              <span className='upvote-action'></span>
            </div>
            <div className='feed-title'>{feed.num_comments}</div>
            <div className='feed-domain'>{feed.num_comments}</div>
            <div className='feed-by-text'>{'by'}</div>
            <div className='feed-author'>{feed.num_comments}</div>
            <div className='feed-time'>{feed.num_comments}</div>
            <div className='feed-hide-action'>{'[hide]'}</div>
          </div>
        )
    })
  }
  render() {
    return (
      <Fragment>
        <div className='header'></div>
        {this.state.feeds.length > 0 && this.renderFeeds()}
        <div className='footer'></div>
      </Fragment>
    );
  }
}
export default App;