import React from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';
import {saveState} from './components/Storage';


const API_KEY = "9015daa8f46e3491af4d146a117aa860";
const APP_ID = "6fe6fe5e"

class App extends React.Component {
	//Using a state object so we can use our data we got from api_call anywhere in our app
	state = {
		// recipes: null,
		recipes: [],
		resultsText: "",
	}

	//React 16, the constructor function and bind is removed. You can call the class methods normally and even declare states!
	// use async and await when using API calls
	getRecipe = async (event) => {
		//event.target returns the element that triggerd the event.
		//elements.recipeName access the element tag of the property recipeName
		const recipeName = event.target.elements.recipeName.value;
		event.preventDefault(); //prevents the default behaviour of the webpage (which is refreshing every time we click submit button)

		const api_call = await fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${API_KEY}`);

		// get data from api_call and turn it into JSON format.
		const data = await api_call.json();

		this.setState({
			recipes: data.hits,
			resultsText: `Results for ${recipeName}:`,
		});
		//Save to localStorage
		saveState(this.state.recipes, "recipes");
		saveState(this.state.resultsText, "resultsText");
	}

	
	//Grabs our stored item when web page is reloaded
	async componentDidMount() {
		//Initial load of page
		if(this.state.recipes.length === 0)
		{

			const recipeName = "random";
			const api_call = await fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${API_KEY}`);
			const data = await api_call.json();

			this.setState({
				recipes: data.hits,
				resultsText: "Check out the featured recipes!"
			});
		}

		//Get data from localStorage
	    const json = localStorage.getItem("recipes");
	    const resultsText = localStorage.getItem("resultsText");
	    if(json) {
	    	const recipes = JSON.parse(json);
	    	const searchText = JSON.parse(resultsText);

	    	this.setState({
	    		recipes: recipes,
	    		resultsText: searchText,
	    	})
	    }
	}
	

	//Remeber the last search results in local storage in form of a string. Only fires when a component gets updated.
	// componetDidUpdate(prevProps, prevState) {
	// 	console.log("hi");
	// 	if(prevState.recipes.length !== this.state.recipes.length)
	// 	{
	// 		const recipes = JSON.stringify(this.state.recipes);
	// 		localStorage.setItem("recipes", recipes);
	// 		console.log(recipes);
	// 	}
	// }


	render() {
    	return (
	      		<div className="App">
	      			<div>
		        		<header className="App-header">
		          			<h1 className="App-title">Yummy Recipes</h1>
		        		</header>
	        		</div>
	        		<div className="search-container">
	        		<h3 className="search-container-heading">Search for some yummy recipes!</h3>
	        			<Form getRecipe={this.getRecipe}/>
	        		</div>
	        		<div className="results">
	        			<h5 className="results-heading">{this.state.resultsText}</h5>
	        			<Recipes recipes={this.state.recipes} />
		        		{/*
		        		{this.state.recipes && <Recipes recipes={this.state.recipes}/>}
		        		*/}
		        	</div>
	      		</div>
    	);
	}
}

export default App;