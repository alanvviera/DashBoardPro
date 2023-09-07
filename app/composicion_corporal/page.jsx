'use client'
import { CorporalForm } from '../components/FormularioCompCorporal'
import { Chartjs } from '../components/Chartjs'
import { CompositionTable } from '../components/CompositionTable'
import React, { useState } from 'react'

export const Density = () => {
  const [density, setDensity] = useState(null)

  const [percentajes, setPercentajes] = useState({
    bone_mass: '',
    fat_mass: '',
    residual_mass: '',
    muscle_mass: ''
  })

  const [masses, setMasses] = useState({
    bone_mass: '',
    fat_mass: '',
    residual_mass: '',
    muscle_mass: ''

  })

  const densityCalc = (inputValues) => {
    const { genre, bicep, tricep, subscapular, supraileaco, femur, bistiloideo, size, weight } = inputValues;

    const sumaPliegues = parseFloat(tricep) + parseFloat(bicep) + parseFloat(subscapular) + parseFloat(supraileaco);
    console.log("suma pliegue " + sumaPliegues)

    const calcularboneMass = () => {
      return (((((parseFloat(size / 100) ** 2) * parseFloat(femur / 100) * parseFloat(bistiloideo / 100) * 400) ** 0.712) * 3.02).toFixed(4));
    };

    const densityCalc = () => {
      let corporalDensity;

      if (inputValues.genre === 'hombre' || genre === 'mujer') {
        if (inputValues.genre === 'hombre') {
          corporalDensity = ((1.1765 - 0.0744 * Math.log10(sumaPliegues))).toFixed(2);

        } else {
          corporalDensity = ((1.1567 - 0.0717 * Math.log10(sumaPliegues))).toFixed(2);

        }


      } else {
        console.log('El género debe ser "hombre" o "mujer" para realizar el cálculo.');
      }

      return corporalDensity;
    };
    const calcularResidual = () => {
      let residual;

      if (inputValues.genre === 'hombre' || genre === 'mujer') {


        if (inputValues.genre === 'hombre') {
          residual = weight * 0.24;

        } else {
          residual = weight * 0.21;

        }

      } else {
        console.log('El género debe ser "hombre" o "mujer" para realizar el cálculo.');
      }

      return residual;
    };



    const MassesDensity = () => {
      const corporalDensity = densityCalc();
      const residual = calcularResidual();
      setDensity(corporalDensity);

      //percentajes
      //fat es el percentaje de fat corporal
      const fat = ((495 / corporalDensity) - 450).toFixed(2);
      const calculoboneMass = calcularboneMass();
      const percentajeBoneMass = ((calculoboneMass / weight) * 100).toFixed(2);
      const percentajeResidualMass = ((residual / weight) * 100).toFixed(2);
      const percentajeMuscleMass = 100 - (parseFloat(fat) + parseFloat(percentajeBoneMass) + parseFloat(percentajeResidualMass));

      //Masas
      const muscleMassKilos = (weight * (percentajeMuscleMass / 100)).toFixed(2)
      const fatMassKilos = (weight * (fat / 100)).toFixed(2);

      setMasses(() => ({
        bone_mass: calculoboneMass,
        fat_mass: fatMassKilos,
        muscle_mass: muscleMassKilos,
        residual_mass: residual,
      }));

      setPercentajes(() => ({
        bone_mass: percentajeBoneMass,
        fat_mass: fat,
        muscle_mass: percentajeMuscleMass,
        residual_mass: percentajeResidualMass,
      }));
    };

    MassesDensity();
  };




  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 bg-secondary p-4 md:p-8 h-auto md:h-screen'>

      <CorporalForm densityCalc={densityCalc} />


      {density && <CompositionTable percentajes={percentajes} masses={masses} density={density} />}

      {density && <Chartjs className="flex flex-row m-5" percentajes={percentajes} />}

    </div>
  )
}

export default Density