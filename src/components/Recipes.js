import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = (props) => (
	<div className="container">
		<div className="row">
		{console.log(props.recipes)}
		{ props.recipes.map((recipe, index) => {
			return (
				<div 
					className="col-md-4"
					key={index}
					style={{ marginBottom: "2rem" }}
				>
					<div className="recipes__box">
						<img 
							className="recipe__box-img"
							src={recipe.recipe.image} 
							alt={recipe.recipe.label} 
						/>
						<div className="recipe__text">
							<h5 className="recipes__title">
								{/*check if the string is longer than 20 characters*/}
								{ recipe.recipe.label.length < 20 ? `${recipe.recipe.label}` : `${recipe.recipe.label.substring(0, 25)}...` }
							</h5>
							{/*input a slider here*/}
							<p className="recipes__subtitle">Diet: {recipe.recipe.dietLabels}</p>
						</div>
						<button className="recipe__buttons">
							{/*Pass the state of props recipe into the Recipe component upon button click*/}
							<Link to={{ 
								pathname: `/recipe/${recipe.recipe.label.replace(" ","-")}`,
								state: { recipe: recipe.recipe.label}
							}}>
								More Info
							</Link>
						</button>
					</div>
				</div>
			);
		}) }
		</div>
	</div>
)

export default Recipes;