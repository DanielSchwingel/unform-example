import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import Input from './components/Form/input';
import imgRocketseat from './assets/images/logo_rocketseat.png'
import api from './services/api';

import './global.css';

function App() {
	const formRef = useRef(null);

	async function getUser(){
		const response = await api.get('/');
		formRef.current.setData(response.data);
	}

	useEffect(() => {
		getUser();
	}, [])
	
	async function handleSubmit(data, {reset}){
		try {
			const schema = Yup.object().shape({
				name: Yup.string().min(3, 'O nome deve ter no mínimo 3 caracteres!'),
				email: Yup.string().email('Informe um e-mail válido').required('O e-mail é obrigatório'),
				password: Yup.string().min(6, 'A senha deve ter no mínimo 3 caracteres!').required('A senha é obrigatória!'),
				address : Yup.object().shape({
					street: Yup.string().min(6, 'O rua deve ter no mínimo 3 caracteres!' ),
					number: Yup.string().required('O número é obrigatório!'),
					neighborhood: Yup.string().required('O bairro é obrigatório!'),
					city: Yup.string().required('A cidade é obrigatória'),
					uf: Yup.string().max(2, 'O rua deve ter no máximo 2 caracteres!' ),

				})
			});
			await schema.validate(data, {
				abortEarly: false,
			});
			// Validation passed
			console.log(data);
			reset();
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			}
		}
	}

	return (
		<div className='container'>
			<h1>Formulário com 'onform' da </h1>
			<img src={imgRocketseat}/>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<div className='field'>
					<label htmlFor='name'>Nome:</label>
					<Input type='text' name='name' id='name'/>
				</div>
				<div className='field'>
					<label htmlFor='email'>E-mail:</label>
					<Input type='text' name='email' id='email'/>
				</div>
				<div className='field'>
					<label htmlFor='password'>Senha:</label>
					<Input type='password' name='password' id='password'/>
				</div>
				<Scope path='address'>
					<div className='input-group'>
						<div className='field'>
							<label htmlFor='street'>Rua:</label>
							<Input type='text' name='street' id='street'/>
						</div>
						<div className='field'>
							<label htmlFor='number'>Número:</label>
							<Input type='text' name='number' id='number'/>
						</div>
					</div>
					<div className='field'>
						<label htmlFor='neighborhood'>Bairro:</label>
						<Input type='text' name='neighborhood' id='neighborhood'/>
					</div>
					<div className='input-group'>
						<div className='field'>
							<label htmlFor='city'>Cidade:</label>
							<Input type='text' name='city' id='city'/>
						</div>
						<div className='field'>
							<label htmlFor='uf'>UF:</label>
							<Input type='text' name='uf' id='uf'/>
						</div>
					</div>
				</Scope>
				<button type='submit'>Enviar</button>
			</Form>
		</div>
	);
}

export default App;
