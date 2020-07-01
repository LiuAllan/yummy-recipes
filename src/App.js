import React from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = "9015daa8f46e3491af4d146a117aa860";
const APP_ID = "6fe6fe5e"

class App extends React.Component {
	//Using a state object so we can use our data we got from api_call anywhere in our app
	state = {
		// recipes: null,
		recipes: [],
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
			recipes: data.hits
		});
		console.log(this.state.recipes);

	}

	
	//Grabs our stored item when web page is reloaded
	componentDidMount() {
	    const json = localStorage.getItem("recipes");
	    if(json) {
	    	const recipes = JSON.parse(json);

	    	if(recipes.length === 0)
			{
				alert('No Recipes found for the given search term');
			}

	    	this.setState({
	    		recipes,
	    	})
	    }

	}
	

	//Remeber the last search results in local storage in form of a string. Only fires when a component gets updated.
	componetDidUpdate(prevProps, prevState) {
		console.log("hi");
		if(prevState.recipes.length !== this.state.recipes.length)
		{
			const recipes = JSON.stringify(this.state.recipes);
			localStorage.setItem("recipes", recipes);
			console.log(recipes);
		}
	}


	render() {
    	return (
      		<div className="App">
        		<header className="App-header">
          			<h1 className="App-title">Recipe Search</h1>
        		</header>
        		<Form getRecipe={this.getRecipe}/>
        		<Recipes recipes={this.state.recipes} test="test"/>
        		{/*
        		{this.state.recipes && <Recipes recipes={this.state.recipes}/>}
        		*/}
      		</div>
    	);
	}
}

export default App;