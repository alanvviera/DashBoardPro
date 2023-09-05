'use client'

import { FormularioCompCorporal } from '../components/FormularioCompCorporal'
import { Grafica } from '../components/Grafica'
import { TablaComposicion } from '../components/TablaComposicion'
import React, { useState } from 'react'

export const Densidad = () => {


  const [densidad, setDensidad] = useState(null)

  const [porcentajes, setPorcentajes] = useState({
    masa_osea: null,
    masa_grasa: null,
    masa_residual: null,
    masa_muscular: null
  })

  const [masas, setMasas] = useState({
    masa_osea: null,
    masa_grasa: null,
    masa_residual: null,
    masa_muscular: null

  })

  const calcularDensidad = (inputValues) => {
    const { genero, bicep, tricep, subscapular, supraileaco, femur, bistiloideo, talla, peso } = inputValues;

    const sumaPliegues = parseFloat(tricep) + parseFloat(bicep) + parseFloat(subscapular) + parseFloat(supraileaco);
    console.log("suma pliegue " + sumaPliegues)

    const calcularMasaOsea = () => {
      return (((((parseFloat(talla / 100) ** 2) * parseFloat(femur / 100) * parseFloat(bistiloideo / 100) * 400) ** 0.712) * 3.02).toFixed(4));
    };

    const calcularDensidad = () => {
      let densidadCorporal;

      if (inputValues.genero === 'hombre' || genero === 'mujer') {
        if (inputValues.genero === 'hombre') {
          densidadCorporal = (1.1765 - 0.0744 * Math.log10(sumaPliegues));

        } else {
          densidadCorporal = (1.1567 - 0.0717 * Math.log10(sumaPliegues));

        }


      } else {
        console.log('El género debe ser "hombre" o "mujer" para realizar el cálculo.');
      }

      return densidadCorporal;
    };
    const calcularResidual = () => {
      let residual;

      if (inputValues.genero === 'hombre' || genero === 'mujer') {


        if (inputValues.genero === 'hombre') {
          residual = peso * 0.24;

        } else {
          residual = peso * 0.21;

        }

      } else {
        console.log('El género debe ser "hombre" o "mujer" para realizar el cálculo.');
      }

      return residual;
    };



    const densidadYMasas = () => {
      const densidadCorporal = calcularDensidad();
      const residual = calcularResidual();
      setDensidad(densidadCorporal);

      //Porcentajes
      //grasa es el porcentaje de grasa corporal
      const grasa = ((495 / densidadCorporal) - 450).toFixed(2);
      const calculoMasaOsea = calcularMasaOsea();
      const porcentajeMasaOsea = ((calculoMasaOsea / peso) * 100).toFixed(2);
      const porcentajeMasaResidual = ((residual / peso) * 100).toFixed(2);
      const porcentajeMasaMuscular = 100 - (parseFloat(grasa) + parseFloat(porcentajeMasaOsea) + parseFloat(porcentajeMasaResidual));
      console.log(grasa)
      console.log(porcentajeMasaOsea)
      console.log(porcentajeMasaResidual)


      //Masas

      const masaMuscularKilos = (peso * (porcentajeMasaMuscular / 100)).toFixed(2)
      console.log(masaMuscularKilos)
      const masaGrasaKilos = (peso * (grasa / 100)).toFixed(2);

      setMasas((prevValues) => ({
        ...prevValues,
        masa_osea: calculoMasaOsea,
        masa_grasa: masaGrasaKilos,
        masa_muscular: masaMuscularKilos,
        masa_residual: residual,
      }));

      setPorcentajes((prevValues) => ({
        ...prevValues,
        masa_osea: porcentajeMasaOsea,
        masa_grasa: grasa,
        masa_muscular: porcentajeMasaMuscular,
        masa_residual: porcentajeMasaResidual,
      }));
    };

    densidadYMasas();
  };




  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 bg-secondary p-4 md:p-8 h-auto md:h-screen'>

      <FormularioCompCorporal calcularDensidad={calcularDensidad} />


      {densidad && <TablaComposicion porcentajes={porcentajes} masas={masas} densidad={densidad} />}

      {densidad && <Grafica className="flex flex-row m-5" porcentajes={porcentajes} />}

    </div>
  )
}

export default Densidad