import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import moment from "moment";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Title from './Title';

moment.locale("es"); 

export default function FiltroFechas({onFilter}) {
    
    const [texto, setTexto] = useState('Esta Semana')
    const [nivel, setNivel] = useState(0)

    const handleSemana = (adelante) => {
        let niv = nivel
        if(!adelante){
            niv+=1
        }else{
            niv-=1
        }
        
        const fechaInicio = moment().startOf('isoWeek').subtract(7*niv, 'days')
        const fechaFin = moment().endOf('isoWeek').subtract(7*niv, 'days')

        if(niv==0){
            setTexto('Esta Semana')
            setNivel(niv)
            onFilter(fechaInicio, fechaFin)
        }else if(niv==1){
            setTexto('Semana Pasada')
            setNivel(niv)
            onFilter(fechaInicio, fechaFin)
        }else if(niv<0){
            setTexto('Esta Semana')
            setNivel(0)
        }else{
            setTexto(fechaInicio.format("DD MMMM")+" - "+fechaFin.format("DD MMMM"))
            setNivel(niv)
            onFilter(fechaInicio, fechaFin)
        }

    }

    return (
        <React.Fragment>
            <ButtonGroup color="primary" aria-label="large outlined primary button group">
                <Button variant="contained" onClick={()=>handleSemana(false)}>
                    <ChevronLeftIcon/>
                </Button>
                <Button>{texto}</Button>
                <Button variant="contained" onClick={()=>handleSemana(true)}>                
                    <ChevronRightIcon/>
                </Button>
            </ButtonGroup>
        </React.Fragment>
    );
}
