import React,{Fragment, useEffect, useState} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";

import Title from './Title';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

const MapChart = ({data}) => {
    const [dataFormat, setDataFormat] = useState([])
  
    useEffect(()=>{
      let arrNuevo = []
      data.forEach((x)=>{
        let indice = arrNuevo.findIndex((y)=>{ return y.pais==x.pais })
        if(indice<0){
          arrNuevo.push({
            pais: x.pais, cant: 0
          })
          indice = arrNuevo.length-1
        }
        arrNuevo[indice].cant+=1
      })
      colorScale.domain([0,arrNuevo.length-1])
      setDataFormat(arrNuevo)
    },[data])
  
  //{ markerOffset: -30, pais:"Argentina", value: 4.4,name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
  return (
    <Fragment>
        <Title>Macroregion</Title>
        <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
            rotate: [58, 20, 0],
            scale: 400
        }}
        >
            <Geographies geography={geoUrl}>
                {
                    ({ geographies }) => geographies
                        .filter(d => d.properties.REGION_UN === "Americas")
                        .map(geo => {
                            const cur = dataFormat.find(s => s.pais === geo.properties.NAME);
                            console.log(cur)
                            return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={colorScale(cur ? cur.cant.toFixed(2) : 0.0)}
                                stroke="#D6D6DA"
                            />
                        )}
                    )
                
                }
            </Geographies>
            ))}
        </ComposableMap>

    </Fragment>
  );
};

export default MapChart;
