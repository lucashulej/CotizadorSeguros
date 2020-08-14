import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    
    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen,guardarCargando}) => {

    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [ error, guardarError ] = useState(false);

    const {marca,year,plan} = datos;

    const ObtenerInformacion = e => {
        guardarDatos({
            ...datos, 
            [e.target.name]: e.target.value
        })
    }

    const CotizarSeguro = e => {
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //Base de 2000
        let resultado = 2000;

        //Obtener la dfferencia en años, por cada año resta el 3%
        const diferencia = obtenerDiferenciaYear(year);
        resultado = resultado - (resultado * (diferencia * 0.03));

        //Asiatico 5%, Americano 15% y Europeo 30%
        resultado = resultado + (resultado * calcularMarca(marca));

        //Basico aumenta 20% y completo 50%
        resultado = parseFloat(resultado + (resultado * calcularPlan(plan))).toFixed(2);

        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);
    }

    return ( 
        <form
            onSubmit={CotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name='marca'
                    value={marca}
                    onChange={ObtenerInformacion}
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>Europeo</option>
                    <option value='asiatico'>Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name='year'
                    value={year}
                    onChange={ObtenerInformacion}
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                    <option value='2014'>2014</option>
                    <option value='2013'>2013</option>
                    <option value='2012'>2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type='radio'
                    name='plan'
                    value='basico'
                    checked={plan==='basico'}
                    onChange={ObtenerInformacion}
                />Basico
                <InputRadio
                    type='radio'
                    name='plan'
                    value='completo'
                    checked={plan==='completo'}
                    onChange={ObtenerInformacion}
                />Completo
            </Campo>
            <Boton
                type='submit'
            >Cotizar</Boton>
        </form>
    );
}
 
Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;