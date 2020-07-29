import React from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import Input from './components/Form/input';
function App() {

	const initialData = {
		email: 'danielfilipeschwingel@gmail.com'
	}

	function handleSubmit(data){
		console.log(data);
	}

	return (
		<div>
			<Form initialData={initialData} onSubmit={handleSubmit}>
				<Input type='text' name='name'/>
				<Input type='email' name='email'/>
				<Input type='password' name='password'/>
				
				<Scope path='address'>
					<Input type='text' name='street'/>
					<Input type='text' name='number'/>
					<Input type='text' name='neighborhood'/>
				</Scope>
				<button type='submit'>Enviar</button>
			</Form>
		</div>
	);
}

export default App;
