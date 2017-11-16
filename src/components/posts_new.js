import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

//reduxForm is like connect function from redux library

class PostsNew extends Component {
	//looks for parents until it finds a parent with Router
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		//createPost is an action creator creates a promise a payload
		//this call right here creates the same promise
		//blog post has been created, navigate to index
		//we navigate by calling this.context.router.push
		//with new path to navigate too
		this.props.createPost(props)
		.then(() => {
			this.context.router.push('/');
		});
	}

	render() {
		//same as
		// const handleSubmit = this.props.handleSubmit;
		const { fields: {title, categories, content }, handleSubmit } = this.props;
		// const title = this.props.fields.title;
		//pass title property to title with {...title}
		//this makes every key/value in title to show up
		//under the input
		//so the titles on change property is now in the input
		//as onChange = title.onChange;
		//handle submit checks validation, and if its allgood
		//then passes info to our action creator
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new Post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>
				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger': ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>				</div>
				<div className={`form-group ${content.touched && content.invalid ? 'has-danger': ''}`}>
					<label>Content</label>
					<textarea className="form-control" {...content} />
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>				
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

//validation fucntion for the form
//add to reduxForm fucntion at bottom
function validate(values) {
	const errors = {};

	if(!values.title) {
		errors.title = 'Enter a title';
	}

	if(!values.categories) {
		errors.categories = "Enter categories";
	}

	if(!values.content) {
		errors.content = "Enter content";
	}
	//you return a object with fields that match to the formfields
	//if the error object has fields corresponding to the form, reduxForm
	//assumes that the form is invalid
	return errors;
}

//reduxForm can be used to inject actioncreators into containers
//connect: first arg is mapStateToProps, second is mapDispatchToProps
//reduxFrom: 1st arg is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm', //name of form doesn't have to matchname of component
	fields: ['title', 'categories', 'content'],
	validate
}, null, {createPost})(PostsNew);

//whats happening
//when user types something in...records it in app state
/*
	state ==== {
		form : {
			PostsNewForm: {
				title: 'sample title',
				categories: 'sampleCategories',
				content: 'sampleContent'
			}
		}
	}
*/