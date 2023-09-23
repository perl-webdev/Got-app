import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div class="card text-bg-danger text-center mb-3" style={{maxWidth: "50rem", margin: '50px auto'}}>
			<div class="card-header">404 NOT FOUND</div>
			<div class="card-body">
				<h1 class="card-title">The page you are looking for does not exist</h1>
				<h3 class="card-text text-center">Please check the URL you're looking for! Press the button below to return on the Home Page!</h3>
				<Link to='/' className="btn btn-dark btn-lg">Home Page</Link>
			</div>
		</div>
	);
};

export default NotFound;
