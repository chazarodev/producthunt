import styled from "@emotion/styled";

const Boton = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #D1D1D1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    border-radius: .5rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000000'};
    transition: all 300ms ease-in-out;

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
        color: white;
        background-color: var(--naranja);
    }
`;

export default Boton;