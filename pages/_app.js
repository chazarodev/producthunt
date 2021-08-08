import { Fragment } from 'react';
import '../styles/globals.css'
import App from 'next/app';
import firebase, {FirebaseContext} from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

function MyApp({ Component, pageProps }) {

  const usuario = useAutenticacion()

  return (
    
    <Fragment>
      <FirebaseContext.Provider
        value={{
          firebase,
          usuario
        }}
      >  
        <Component {...pageProps} />  
      </FirebaseContext.Provider>
    </Fragment>

  )
}

export default MyApp
