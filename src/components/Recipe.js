import React from 'react';
import { Link } from 'react-router-dom';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import LazyLoad from 'react-lazyload';

const API_KEY = "9015daa8f46e3491af4d146a117aa860";
const APP_ID = "6fe6fe5e";

class Recipe extends React.Component {
	state = {
		activeRecipe: [],
	}

	componentDidMount = async () => {
		Nprogress.start();
		const title = this.props.location.state.recipe;
		const req = await fetch(`https://api.edamam.com/search?q=${title}&app_id=${APP_ID}&app_key=${API_KEY}`);

		// get data from api_call and turn it into JSON format.
		const res = await req.json();
		
		//Pick the most relevant recipe given the title
		this.setState({
			activeRecipe: res.hits[0].recipe
		})
		Nprogress.done();

	}

	render()
	{
		const recipe = this.state.activeRecipe;

		return (
			<div className="active-container">
				    <div>
		        		<header className="App-header">
		          			<h1 className="App-title">Yummy Recipes</h1>
		        		</header>
	        		</div>
				{/*Only render the items if the state is not empty*/}
				{
					this.state.activeRecipe.length !== 0 &&
						<div className="active-recipe">
							<LazyLoad>
								<img className="active-recipe__img" src={recipe.image} alt={recipe.label} />
							</LazyLoad>
							<h3 className="active-recipe__title">{recipe.label}</h3>
							<h4 className="active-recipe__publisher">Publisher: {recipe.source}</h4>
							<p><b>Calories:</b> {Math.round(recipe.calories)}</p>
							<p>
								<b>Cautions:</b> {recipe.cautions.length === 0 ? "None" : recipe.cautions.map(caution => `${caution}, `)}
							</p>
							<p><b>Diet:</b> {recipe.dietLabels.length === 0 ? "None" : recipe.dietLabels}</p>
							<p><b>Health:</b> {recipe.healthLabels.map(label => `${label}, `)}</p>
							<p><b>Ingredients:</b> {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient.text}</li>)}</p>
							<button 
								className="active-recipe__button"
							>
								<Link to="/">
									BACK
								</Link>
							</button>
							<button className="active-recipe__button">
								<span><a href={recipe.url}>Recipe</a></span>
							</button>
						</div>
				}
			</div>
		);
	}
}

export default Recipe;
