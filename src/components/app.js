import React, { Fragment, useReducer } from "react";
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchFeeds } from '../actions';

class App extends React.Component {
    constructor(){
        super();
        this.page = 1;
        this.loadMore = this.loadMore.bind(this);
        this.upvoteHandler = this.upvoteHandler.bind(this);
        this.hideFeed = this.hideFeed.bind(this);
    }
    renderFeeds(){
        const feeds = this.props.feeds.map((feed, index) => {
            const domain = feed.url && feed.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
            return (
                <div key={index} className='feed-wrapper'>
                    <div className='feed-comments'>{feed.num_comments}</div>
                    <div className='feed-upvotes'>
                    {feed.points}
                    <span className='upvote-action' onClick={this.upvoteHandler}></span>
                    </div>
                    <div className='feed-title'>{feed.title}</div>
                    <div className='feed-domain'>{domain ? `(${domain})` : ''}</div>
                    <div className='feed-by-text'>{'by'}</div>
                    <div className='feed-author'>{feed.author}</div>
                    <div className='feed-time'>{moment(feed.created_at, "YYYYMMDD").fromNow()}</div>
                    <div className='feed-hide-action'>[<span className='hide-text' onClick={this.hideFeed}>hide</span>]</div>
                </div>
              );
        });
        return feeds;
    }

    hideFeed(){
        console.log('Hide Feed');
    }
    upvoteHandler() {
        console.log('Increase Upvote');
    }
    loadMore(){
        this.page += 1;
        this.props.fetchFeeds(this.page);
    }
    render() {
        return (
            <div>
                <div className='feed-header'>Hacker News Feeds</div>
                {this.renderFeeds()}
                <div className='feed-footer' onClick={this.loadMore}><span>More</span></div>
            </div>
            );
            
    }
}
function mapSateToProps(state) {
    return {
        feeds: state.feeds
    }
}
function loadData(store){
    return store.dispatch(fetchFeeds());

}
export {loadData};
export default connect(mapSateToProps, {fetchFeeds})(App);