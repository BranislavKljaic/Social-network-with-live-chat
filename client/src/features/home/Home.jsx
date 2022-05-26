import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Post from '../posts/Post';
import { postsSliceActions } from '../../store/posts-slice';

import { getPosts } from '../../services/common/database-communication/firebase-api';

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [postsFromDatabase, setPostsFromDatabase] = useState([]);

  useEffect(async () => {
    setPostsFromDatabase(await getPosts());
  }, []);

  useEffect(() => {
    postsFromDatabase.forEach((postFromDatabse) => {
      if (postFromDatabse.owner !== undefined) {
        if (!posts.some((post) => post.id === postFromDatabse.id)) {
          dispatch(
            postsSliceActions.putPostOnList({
              id: postFromDatabse.id,
              name: postFromDatabse.name,
              date: postFromDatabse.date.toDate().toString(),
              accesibillity: postFromDatabse.accesibillity,
              description: postFromDatabse.description,
              owner: postFromDatabse.owner,
              place: postFromDatabse.place,
              tags: postFromDatabse.tags,
              type: postFromDatabse.type,
            }),
          );
        }
      }
    });
  }, [postsFromDatabase]);

  return (
    <div className="home-page">
      <div>
        <Header />
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <Post post={post} key={Math.random()} />
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
