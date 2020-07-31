import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Tooltip, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from "moment";

import Title from './Title';

moment.locale("es"); 

export default function Chart({data}) {
  const theme = useTheme();
  const [dataFormat, setDataFormat] = useState([])
  
  useEffect(()=>{
    let arrNuevo = []
    data.forEach((x)=>{
      let indice = arrNuevo.findIndex((y)=>{ return y.fec==x.fec })
      if(indice<0){
        arrNuevo.push({
          fec: x.fec, cant: 0, fec_x:Date.parse(moment(x.fec).toDate())
        })
        indice = arrNuevo.length-1
      }
      arrNuevo[indice].cant+=1
    })
    setDataFormat(arrNuevo.sort((a,b)=>{ return moment(a.fec)-moment(b.fec) }))
  },[data])

  const formatXAxis = tickItem => {
    return moment(tickItem).format('DD MMM');
  }

  return (
    <React.Fragment>
      <Title>Linea de Tiempo</Title>
      {
        dataFormat.length>0?
          <ResponsiveContainer>
            <LineChart
              data={dataFormat}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" scale='time'  dataKey="fec_x"  domain={['min', 'max']} tickFormatter={formatXAxis} stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                <Label
                  angle={270}
                  position="left"
                  style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                >
                  Cantidad
                </Label>
              </YAxis>
              <Tooltip labelFormatter={(label)=>moment(label).format("DD MMMM")} />
              <Line type="monotone" dataKey="cant" stroke={theme.palette.primary.main} />3
            </LineChart>
          </ResponsiveContainer>
        :
          <div></div>
      }
    </React.Fragment>
  );
}
