import React,{ Fragment, useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

//Firebase
import firebase from '../firebase';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: '',
  password: ''
}

export default function Login() {
  const [error, guardarError] = useState(false)

  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion)

  const {email, password} = valores

 async function iniciarSesion() {
   try {
     await firebase.Login(email, password)
     Router.push('/')
   } catch (error) {
    console.error('Hubo un error al autenticar el usuario', error.message)
    guardarError(error.message)
   }
 }

  return (
    <div>
      <Layout>

        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Iniciar Sesión</h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}
            <InputSubmit 
              type="submit"
              value="Iniciar Sesión"
            />
          </Formulario>
        </Fragment>
      </Layout>
    </div>
  )
}