
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

export const saveState = (state, key) => {
	console.log(key);
	const temp = JSON.stringify(state);
	localStorage.setItem(key, temp);
}