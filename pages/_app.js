import { Fragment } from 'react';
import '../styles/globals.css'
import App from 'next/app';
import firebase, {FirebaseContext} from '../firebase';

function MyApp({ Component, pageProps }) {
  return (
    
    <Fragment>
      <FirebaseContext.Provider
        value={{
          firebase
        }}
      >  
        <Component {...pageProps} />  
      </FirebaseContext.Provider>
    </Fragment>

  )
}

export default MyApp
