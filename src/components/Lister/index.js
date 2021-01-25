import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	const onDeletePost = id => {
		setPosts(allPosts.filter(element => element.id !== id))
	}

	const onCreatePost = post => {
		setPosts([...allPosts, { ...post, id: allPosts.length + 1 }])
	}

	if (loading) return <div className="postList"><h1>Loading...</h1></div>	
	if (!Array.isArray(allPosts) || !allPosts.length) return <div className="postList">
		<h1>No posts available...</h1>
		<CreatePost onCreate={onCreatePost} />
	</div>
	
	return <div className="postList">
		{allPosts.map(post => { 
			const { title, body, author, id } = post;
			return <Post key={id} title={title} body={body} author={author} onDelete={() => onDeletePost(id)} />
		})}
	<CreatePost onCreate={onCreatePost} />
	</div>
	
};

export default Lister;