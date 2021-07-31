import React, { Fragment } from 'react';
import Header from './Header';
import {Global, css} from '@emotion/react';
import Head from 'next/head';

const Layout = (props) => {
    return (  
        <Fragment>
            <Global 
                styles={css`
                    :root{
                        --gris: #3D3D3D;
                        --gris2: #6F6F6F;
                        --gris3: #E1E1E1;
                        --naranja: #e12e0d;
                        --naranja2: #CC4D00;
                    }

                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit;
                    }
                    body {
                        font-size: 1.6rem;
                        line-height: 1.5;
                        font-family: 'PT Sans', sans-serif;
                    }
                    h1,h2,h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    h1,h2 {
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }
                    h3 {
                        font-family: 'PT Sans', sans-serif;
                    }
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                `}
            />
            <Head>
                <html lang="es"/>
                <title>Product Hunt Firebase y Next</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>
                <link href="/static/css/app.css" rel="stylesheet"/>
            </Head>
            <Header />
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}
 
export default Layout;