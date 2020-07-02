
export const loadState = (state) => {
	const json = localStorage.getItem("recipes");
	if(json) 
	{
    	return JSON.parse(json)

  //   	this.setState({
  //   		recipes,
		// })
    }
}

export const saveState = (state) => {
	const recipes = JSON.stringify(state);
	localStorage.setItem("recipes", recipes);
}