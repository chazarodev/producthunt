import React, {useEffect, useContext, useState, Fragment} from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';
import {FirebaseContext} from '../../firebase';
import Layout from '../../components/layouts/Layout'
import Error404 from '../../components/layouts/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {Campo, InputSubmit} from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
import BotonDelete from '../../components/ui/BotonEliminar';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    margin-bottom: 0;
    padding: .5rem, 2rem;
    border-radius: 2px;
    background-color: #DA552F;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    display: block;
    text-align: center;
`;

const Producto = () => {

    //state del componente
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)
    const [comentario, guardarComentario] = useState({})
    const [consultarDB, guardarConsultarDB] = useState(true)

    //Routing para obtener el id actual
    const router = useRouter()
    const {query: {id}} = router

    //Context de firebase
    const {firebase, usuario} = useContext(FirebaseContext)

    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()
                if (producto.exists) {
                    guardarProducto(producto.data())
                    guardarConsultarDB(false)
                } else {
                    guardarError(true)
                    guardarConsultarDB(false)
                }
            }
            obtenerProducto()
        }
    }, [id])

    if(Object.keys(producto).length === 0 && !error) return 'Cargando...'

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado} = producto

    console.log(usuario.uid)

    //Administrar y validar los votos
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login')
        }
        //Verificar si usuario actual ha votado
        if(haVotado.includes(usuario.uid)) {
            return
        }
        
        //Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1

        //Guardar Id del usuario que ha votado
        const hanVotado = [...haVotado, usuario.uid]

        //Actualizar en la BD
        firebase.db.collection('productos').doc(id).update({
            votos: nuevoTotal, 
            haVotado: hanVotado
        })

        //Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
        guardarConsultarDB(true) //Hay un voto, por lo tanto, consultar a la BD
    }

    //Funciones para crear Comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    //Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id === id) {
            return true
        }
    }

    const agregarComentario = e => {
        e.preventDefault()

        if (!usuario) {
            return router.push('/login')
        }

        //información extra al comentario
        comentario.usuarioId = usuario.uid
        comentario.usuarioNombre = usuario.displayName

        //Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario]

        //Actualizar BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        //Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        guardarConsultarDB(true) //Hay un comentario, por lo tanto, consultar a la BD
    }

    //Función que revisa que el creador del producto sea el mismo que se encuentra autenticado
    const puedeBorrar = () => {
        if (!usuario) {
            return false
        }
        if (creador.id === usuario.uid ) {
            return true;
        }
    }

    //Eliminar un producto de la BD
    const eliminarProducto = async () => {
        if (!usuario) {
            return router.push('/login')
        }

        if (creador.id !== usuario.uid ) {
            return router.push('/')
        }

        try {
            await firebase.db.collection('productos').doc(id).delete()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (  
        <Layout>
            <Fragment>
                {error ? <Error404 /> : (
                    <div className="contenedor">
                        <h1
                            css = {css`
                                text-align:center;
                                margin-top:5rem;
                            `}
                        >
                            {nombre}
                        </h1>
                        <ContenedorProducto>
                            <div>
                                <img src={urlimagen} />
                                <p>{descripcion}</p>
                                {usuario && (
                                    <Fragment>
                                        <h2>Agrega tu comentario</h2>
                                        <form
                                            onSubmit={agregarComentario}
                                        >
                                            <Campo>
                                                <input 
                                                    type="text"
                                                    name="mensaje"
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>
                                            <InputSubmit 
                                                type="submit"
                                                value="Agregar Comentario"
                                            />
                                        </form>
                                    </Fragment>
                                )}
                                <h2
                                    css = {css`
                                        margin: 2rem 0;
                                    `}
                                >Comentarios</h2>
                                {comentarios.length === 0 ? "Aún no hay comentarios" : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li
                                                key={`${comentario.usuarioId}-${i}`}
                                                css = {css`
                                                    border: 1px solid #e1e1e1;
                                                    border-radius: 5px;
                                                    padding: 2rem;
                                                    &:last-of-type {
                                                        margin-bottom: 2rem;
                                                    }
                                                `}
                                            >
                                                <p
                                                    css = {css`
                                                        margin-top: 0;
                                                    `}
                                                >{comentario.mensaje}</p>
                                                <p 
                                                    css = {css`
                                                        text-align: end;
                                                        margin-bottom: 0;
                                                    `}
                                                >Escrito por 
                                                <span 
                                                    css={css`
                                                        font-weight:bold;
                                                    `}> {comentario.usuarioNombre}</span>
                                                </p>
                                                {esCreador(comentario.usuarioId) && <CreadorProducto>Es Creador</CreadorProducto>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <aside>
                                <h4>Publicado por {creador.nombre} de {empresa}</h4>
                                <h4
                                    css = {css`
                                        margin-bottom: 3rem;
                                    `}
                                >hace {formatDistanceToNow(new Date(creado), {locale: es})}</h4>
                                <Boton
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Boton>
                                {usuario && (
                                    <Boton
                                        onClick={votarProducto}
                                    >Votar</Boton>
                                )}
                                <p
                                    css = {css`
                                        margin-top: 3rem;
                                        font-size: 2rem;
                                    `}
                                >{votos} Votos</p>
                            </aside>
                        </ContenedorProducto>
                        {puedeBorrar() && 
                            <BotonDelete onClick={eliminarProducto}>Eliminar Producto</BotonDelete>
                        }
                    </div>
                )}
            </Fragment>
        </Layout>
    );
}
 
export default Producto;
