// Our form collects the data and triggers 'sendData', which will fetch our Lambda URL and stringify the data.

import { useState } from 'react'
import { packageData, flightData, hotelData } from '../../../mockTravelData'
import Loading from './Loading'

const LambdaURL =
  'https://atmre4czbwlfuvfe2pngkuogni0drcgt.lambda-url.us-west-2.on.aws/'

const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [vacation, setVacation] = useState('Select Vacation')
  const [flight, setFlight] = useState('Select Flight')
  const [hotel, setHotel] = useState('Select Hotel')
  const [transition, setTransition] = useState(false)

  // HANDLE SUBMIT
  const handleSubmit = e => {
    // used setTimeout to create our loading transition
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
    }, 3000)
    e.preventDefault()
    const data = { name, email, vacation, flight, hotel }
    const sendData = fetch(LambdaURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(data),
    })
    // logout the data so we can see it
    sendData
      .then(res => res.json())
      .then(data => console.log('This is the data', data))

    setName('')
    setEmail('')
    setVacation('Select Vacation')
    setFlight('Select Flight')
    setHotel('Select Hotel')
  }
  return (
    <>
      {transition ? (
        <Loading />
      ) : (
        <div className="animate-slideright500">
          <div className="flex justify-center items-center gap-2 text-fuchsia-500 mb-3 font-serif">
            <p className="text-6xl">
              <span>Booking</span>
              <span className="text-xl">.fuk</span>
            </p>
          </div>
          <form className="flex flex-col gap-2 text-zinc-700 bg-white rounded-xl py-8 px-10 shadow-md">
            <input
              className="rounded-md p-2 bg-zinc-100 shadow-inner shadow-zinc-300"
              type="text"
              value={name}
              placeholder="Name"
              onChange={e => setName(e.target.value)}
            />
            <input
              className="rounded-md p-2 bg-zinc-100 shadow-inner shadow-zinc-300"
              type="text"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <select
              className="text-gray-700 p-2 rounded-md bg-zinc-100 shadow-inner shadow-zinc-300"
              value={vacation}
              onChange={e => setVacation(e.target.value)}
            >
              <option>{vacation}</option>
              {packageData.map((item, i) => (
                <option value={item.title} key={i}>
                  {item.title}
                </option>
              ))}
            </select>
            <select
              className="text-gray-700 p-2 rounded-md bg-zinc-100 shadow-inner shadow-zinc-300"
              value={flight}
              onChange={e => setFlight(e.target.value)}
            >
              <option>{flight}</option>
              {flightData.map((item, i) => (
                <option value={item.flight} key={i}>
                  {item.flight}
                </option>
              ))}
            </select>
            <select
              className="text-gray-700 p-2 rounded-md bg-zinc-100 shadow-inner shadow-zinc-300"
              value={hotel}
              onChange={e => setHotel(e.target.value)}
            >
              <option>{hotel}</option>
              {hotelData.map((item, i) => (
                <option value={item.stay} key={i}>
                  {item.stay}
                </option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              className="hover:scale-105 text-white hover:text-white hover:bg-fuchsia-400 rounded-lg bg-fuchsia-600 py-1 px-3 font-bold transition-all h-[35px] my-2"
            >
              SUBMIT
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Form
