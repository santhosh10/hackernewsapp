import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Feed = ({ feed, domain, index }) => {
    const [upVoteIcon, setUpVoteIcon] = useState(true);
    const [point, setPoint] = useState(0);
    const [showFeed, setShowFeed] = useState(true);
    const [hideFeedOnLoad, setHideFeedOnLoad] = useState(false);
    const isHideFeed = () =>{
        if(localStorage.getItem('hiddenFeeds')){
            const hiddenFeeds = JSON.parse(localStorage.getItem('hiddenFeeds'));
            const isHidden = hiddenFeeds.filter((itemId) => {
                return feed.objectID === itemId;
            });
            return  isHidden.length > 0;
        }
        else {
            return false;
        }
    }
    const hideFeed = () => {
        let newSession = [];
        if (localStorage.getItem('hiddenFeeds')) {
            newSession = JSON.parse(localStorage.getItem('hiddenFeeds'));
            newSession.push(feed.objectID);
            localStorage.setItem('hiddenFeeds', JSON.stringify(newSession));
        } else {
            newSession.push(feed.objectID);
               
            localStorage.setItem('hiddenFeeds', JSON.stringify(newSession));
        }
        setShowFeed(false);
    }
    const upvoteHandler = () => {
        let newSession;
        if (sessionStorage.getItem('upVotedFeeds')) {
            newSession = JSON.parse(sessionStorage.getItem('upVotedFeeds'));
            newSession[feed.objectID] = feed.points + 1;
            sessionStorage.setItem('upVotedFeeds', JSON.stringify(newSession));
        } else {
            newSession = {
                [feed.objectID]: feed.points + 1
            };
            sessionStorage.setItem('upVotedFeeds', JSON.stringify(newSession));
        }
        setPoint(point + 1);
        setUpVoteIcon(false);
    }
    
    useEffect(() => {
        setUpVoteIcon(upVoteIcon);
        setHideFeedOnLoad(isHideFeed());
    }, [upVoteIcon]);

    return  showFeed && !hideFeedOnLoad && (
         <div key={index} className='feed-wrapper'>
            <div className='feed-comments'>{feed.num_comments}</div>
            <div className='feed-upvotes'>
            {feed.points + point}
            {upVoteIcon && <span className='upvote-action' onClick={upvoteHandler}></span>}
            </div>
            <div className='feed-title'>{feed.title}</div>
            <div className='feed-domain'>{domain ? `(${domain})` : ''}</div>
            <div className='feed-by-text'>{'by'}</div>
            <div className='feed-author'>{feed.author}</div>
            <div className='feed-time'>{moment(feed.created_at, "YYYYMMDD").fromNow()}</div>
            <div className='feed-hide-action'>[<span className='hide-text' onClick={hideFeed}>hide</span>]</div>
        </div>
      );
}

export default Feed;