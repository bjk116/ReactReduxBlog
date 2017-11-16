import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts} from '../actions/index';
import { Link } from 'react-router';

class PostIndex extends Component {
	//this is only called once on initial render, not re-renders
	componentWillMount() {
		console.log("this would be a good time to call an action creator to fetch posts");
		this.props.fetchPosts();
	}

	renderPosts() {
		return this.props.posts.map((post) => {
			return (
				<li className="list-group-item" key={post.id}>
					<Link to={"posts/" + post.id}>
						<span className="pull-xs-right">{post.categories}</span>
						<strong>{post.title}</strong>
					</Link>
				</li>
			);
		});
	}

	render() {
		return(
			<div>
				<div className="text-xs-right">
					<Link to="/posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
				<h3>Posts:</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {posts: state.posts.all};
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ fetchPosts}, dispatch);
// }
// export default connect(null, mapDispatchToProps)(PostIndex);
//the above can be rewritten by doing the follow
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
//this gives us access to this.props.fetchPosts