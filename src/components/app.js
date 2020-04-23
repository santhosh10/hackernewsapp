import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { fetchFeeds } from '../actions';
import Feed from './feed';
const App = (props) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [upVoteIcon, setUpVoteIcon] = useState(true);
    const [point, setPoint] = useState(0);
    
    const renderFeeds = () => {
        const feeds = props.feeds.map((feed, index) => {
            const domain = feed.url && feed.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
            return <Feed feed={feed} domain={domain} index={index} key={feed.objectID} />;
        });
        return feeds;
    }
    const loadMore = () => {
        dispatch(fetchFeeds(page + 1));
        setPage(page + 1);
    }
    return (
        <div>
            <div className='feed-header'>Hacker News Feeds</div>
            {renderFeeds()}
            <div className='feed-footer' onClick={loadMore}><span>More</span></div>
        </div>
    );

}
const mapSateToProps = (state) => {
    return {
        feeds: state.feeds
    }
}
const loadData = (store) => {
    return store.dispatch(fetchFeeds());
}

App.propTypes = {
    feeds: PropTypes.arrayOf(PropTypes.any)
};
  
App.defaultProps = {
    feeds: []
};
export {loadData};
export default connect(mapSateToProps, {fetchFeeds})(App);