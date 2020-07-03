import React from 'react';

// stateless component.
const Form = (props) => {
	return (
		<form onSubmit={props.getRecipe} style={{ marginBottom:"2rem"}}>
			<input className="form__input" type="text" name="recipeName" placeholder="🔍"/>
			<button className="form__button">Search</button>
		</form>
	);
}

export default Form;