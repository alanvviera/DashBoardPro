import React from 'react'
import { Chartjs } from './Chartjs'

export const CompositionTable = ({ percentajes, masses, density }) => {
  return (
    <div className='w-3/4  h-fit p-4 rounded-md'>
      <h1 className='text-xl font-bold mb-2'>Resultados</h1>

      <table className='w-full table-auto text-left border-collapse border-y mb-2 bg-terciary'>
        <thead>
          <tr>
            <th>
              Componente
            </th>
            <th>
              percentaje
            </th>
            <th>
              Kilogramos
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-y'>
            <td>
              Masa grasa
            </td>
            <td>
              {percentajes.fat_mass} %
            </td>
            <td>

              {masses.fat_mass} kg
            </td>
          </tr>

          <tr className='border-y'>
            <td>
              Masa osea
            </td>
            <td>

              {percentajes.bone_mass} %
            </td>
            <td>
              {masses.bone_mass} kg
            </td>
          </tr>

          <tr className='border-y'>
            <td>
              Masa residual
            </td>

            <td>

              {percentajes.residual_mass} %
            </td>

            <td>
              {masses.residual_mass} kg
            </td>
          </tr>

          <tr>
            <td>
              Masa muscular
            </td>
            <td>
              {percentajes.muscle_mass} %
            </td>
            <td>
              {masses.muscle_mass} kg
            </td>
          </tr>
            <tr className='border-y'>
              <td>
              Densidad corporal
              </td>
              <td>
              {density} 
              </td>
              <td>

              </td>
            </tr>
        </tbody>
        
      </table>
      
    </div >

  )
}