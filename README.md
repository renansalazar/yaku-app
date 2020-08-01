# YAKU App

The pollution of water remains a huge problem. Every day we can hear bad news related to water: crop disasters, famines, war, sewer dumps and oil spill. Many people don´t know what the consequences could be if we run out of this natural resource. The major water problems facing the world are:

1)	Lack of safe drinking water
2)	Water Pollution
3)	Excessive use of groundwater in our agricultural industries
4)	Climate change (Evaporative Loss)

Facing some of these problems, we have developed Yaku. Yaku is an application developed using IBM Cloud services, such as Watson Visual Recognition, Cloud Foundry, Cloudant and IoT. With this technology we would be able to classify the principal pollutants in a water area, we would be able to know if we could drink that water, we could detect early oil spill and be able to act timely.


<p align="center">
  <img src="https://github.com/real2412/yaku-app/blob/master/client/src/assets/logo.jpeg?raw=true" width="300" alt="Logo Yaku">
</p>

## Index
1. [Architecture](#Architecture)
2. [Functionality](#Functionality)
   - [Dashboard](#Dashboard)
3. [Development](#Development)
4. [Application](#Application)
5. [Authors](#Authors)

## Architecture
The Application Architecture could be evaluated below:

## Functionality

The application is developed with 2 important components, the information visualization dashboard and an image analysis 

### Dashboard

Through the Dashboard we can see more clearly the information received from different drones. Drones will be taking pictures that will be used on our platform, to feed our visual recognition database. In that way we can obtain a classification of the main pollutants in that area.On the other hand, we will get data from our sensors that will be measuring PH, detecting presence of heavy metals in water and measuring the position of our drones and sensors wiht acelerometers.And we can get acces to these Data using IBM IoT.

## Development

To see the FrontEnd section developed with React and IBM Cloud services, you can go to [readme](https://github.com/real2412/yaku-app/blob/master/client/README.md) of FrontEnd. 

To see the initial configuration from BackEnd section developed with Node.Js, you can see in the [readme](https://github.com/IBM-Cloud/get-started-node/blob/master/README.md). [readme](https://github.com/IBM-Cloud/get-started-node/blob/master/README.md).

## Application

The application is currently deployed from IBM Cloud Foundry and can be accessed through the following link:
https://yaku.us-south.cf.appdomain.cloud/

## Authors
*Grupo 6*
