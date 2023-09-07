import React, { useState } from 'react'

export const CorporalForm = ({ densityCalc }) => {
  const [inputValues, setInputValues] = useState({
    genre: '',
    weight: '',
    size: '',
    edad: '',
    bicep: '',
    tricep: '',
    subscapular: '',
    supraileaco: '',
    femur: '',
    bistiloideo: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === 'number' && value !== '') {
      parsedValue = parseFloat(value);
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    densityCalc(inputValues)

  }

  return (
    <div className='bg-secondary  rounded-md w-full h-full mx-auto px-6 py-4'>
      <h1 className='text-xl font-bold mb-5'>Composición corporal</h1>


      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-x-6 gap-y-2 mb-4'>

          <div className='flex flex-col'>

            <div className='flex flex-col relative'>
              <label htmlFor="genre">genre</label>
              <input name='genre' className='border-2 rounded-md' value={inputValues.genre} required onChange={handleInputChange} />


            </div>


          </div>

          <div className='flex flex-col relative'>
            <label htmlFor="weight">weight</label>
            <input name='weight' className='border-2 rounded-md' value={inputValues.weight} required onChange={handleInputChange} />

          </div>

          <div className='flex flex-col relative'>
            <label htmlFor="size">size</label>
            <input name='size' className='border-2 rounded-md' value={inputValues.size} required onChange={handleInputChange} />

          </div>

          <div className='flex flex-col'>
            <label htmlFor="edad">Edad</label>
            <input name='edad' className='border-2 rounded-md' value={inputValues.edad} required onChange={handleInputChange} />
          </div>


        </div>
        <div className='grid grid-cols-2 gap-x-6 gap-y-2 '>



          <div className='flex flex-col relative'>
            <label htmlFor='bicep'>Bicipital</label>
            <input name='bicep' className='border-2 rounded-md' value={inputValues.bicep} required onChange={handleInputChange} />

          </div>

          <div className='flex flex-col relative'>
            <label htmlFor='tricep'>Tricipital</label>
            <input name='tricep' className='border-2 rounded-md' value={inputValues.tricep} required onChange={handleInputChange} />

          </div>
          <div className='flex flex-col relative'>
            <label htmlFor='subscapular'>Subscapular</label>
            <input name='subscapular' className='border-2 rounded-md' value={inputValues.subscapular} required onChange={handleInputChange} />

          </div>
          <div className='flex flex-col relative'>
            <label htmlFor='supraileaco'>Supraileaco</label>
            <input name='supraileaco' className='border-2 rounded-md' value={inputValues.supraileaco} required onChange={handleInputChange} />

          </div>

          <div className='flex flex-col relative'>
            <label htmlFor='femur'>Femur</label>
            <input name='femur' className='border-2 rounded-md' value={inputValues.femur} required onChange={handleInputChange} />

          </div>

          <div className='flex flex-col relative'>
            <label htmlFor='bistiloideo'>Biestiloideo</label>
            <input name='bistiloideo' className='border-2 rounded-md' value={inputValues.bistiloideo} required onChange={handleInputChange} />

          </div>

        </div>

        <button className='mt-2 p-2 w-full bg-terciary text-black rounded-md' type='submit'>Calcular</button>
      </form>

    </div>
  )
}