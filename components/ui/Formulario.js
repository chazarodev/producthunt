import styled from "@emotion/styled";

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input {
        flex: 1;
        padding: 1rem;
        border: 2px solid var(--gris);
        border-radius: 5px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    box-shadow: 2px 2px 0px 1px var(--naranja2);
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    transition: all 50ms ease-in-out; 

    &:hover {
        cursor: pointer;
        width: 99.5%;
        box-shadow: 1px 1px 0px var(--naranja2); 
    }
`;

export const Error = styled.p`
    background-color: white;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FF0000;
    text-align: left;
    text-transform: capitalize;
    margin: 2rem 0;
`;