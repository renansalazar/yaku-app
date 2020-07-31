import React, {useState, useEffect, Fragment} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer
  } from 'recharts';
import moment from "moment";

import Title from './Title';

moment.locale("es"); 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartSimple ({data}) {

    const theme = useTheme();
    const [dataFormat, setDataFormat] = useState([])
    
    useEffect(()=>{
      let arrNuevo = []
      data.forEach((x)=>{
        let indice = arrNuevo.findIndex((y)=>{ return y.tipo==x.tipo })
        if(indice<0){
          arrNuevo.push({
            tipo: x.tipo, cant: 0
          })
          indice = arrNuevo.length-1
        }
        arrNuevo[indice].cant+=1
      })
      console.log(arrNuevo)
      setDataFormat(arrNuevo)
    },[data])

    
    return (
      <Fragment>
        <Title>Tipos de Deshechos </Title>
        <div style={{ width: '100%', height: 290 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={dataFormat}
                cx={125}
                cy={125}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="cant"
                nameKey="tipo"
              >
                {
                  dataFormat.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip labelFormatter={(label)=>{console.log("ea",label); return label.tipo}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Fragment>
    );

}