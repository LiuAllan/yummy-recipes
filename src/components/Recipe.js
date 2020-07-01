import React from 'react';
import { Link } from 'react-router-dom';

const API_KEY = "9015daa8f46e3491af4d146a117aa860";
const APP_ID = "6fe6fe5e";

class Recipe extends React.Component {
	state = {
		activeRecipe: [],
	}

	componentDidMount = async () => {
		const title = this.props.location.state.recipe;
		const req = await fetch(`https://api.edamam.com/search?q=${title}&app_id=${APP_ID}&app_key=${API_KEY}`);

		// get data from api_call and turn it into JSON format.
		const res = await req.json();
		
		//Pick the most relevant recipe given the title
		this.setState({
			activeRecipe: res.hits[0].recipe
		})
		console.log(this.state.activeRecipe);

	}

	render()
	{
		const recipe = this.state.activeRecipe;

		return (
			<div className="container">
				{/*Only render the items if the state is not empty*/}
				{
					this.state.activeRecipe.length !== 0 &&

					<div className="active-recipe">
						<img className="active-recipe__img" src={recipe.image} alt={recipe.label} />
						<h3 className="active-recipe__title">{recipe.label}</h3>
						<h4 className="active-recipe__publisher">Publisher: {recipe.source}</h4>
						<p className="active-recipe__website">
							Website: <span><a href={recipe.url}>{recipe.url}</a></span>
						</p>
						<button 
							className="active-recipe__button"
						>
							<Link to="/">
								BACK
							</Link>
						</button>
					</div>
				}
			</div>
		);
	}
}

export default Recipe;
