import { useState } from 'react'
import './App.css'
import { packageData, flightData, hotelData } from '../../mockTravelData'
import Loading from './Loading'

const LambdaURL =
  'https://atmre4czbwlfuvfe2pngkuogni0drcgt.lambda-url.us-west-2.on.aws/'

function App() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [vacation, setVacation] = useState('Select Vacation')
  const [flight, setFlight] = useState('Select Flight')
  const [hotel, setHotel] = useState('Select Hotel')
  const [transition, setTransition] = useState(false)

  const handleSubmit = e => {
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
    }, 2000)
    e.preventDefault()
    //
    const data = { email, subject, vacation, flight, hotel }
    // const data = { email, subject }
    console.log('This is the motherfuckn data', data)

    const fetchPromise = fetch(LambdaURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(data),
    })

    fetchPromise
      .then(res => res.json())
      .then(data => console.log('This is the data', data))

    setEmail('')
    setSubject('')
    setVacation('Select Vacation')
    setFlight('Select Flight')
    setHotel('Select Hotel')
  }

  return (
    <>
      {transition ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl mb-5">Lambda Email Test</p>
          <div className="p-3">
            <form className="flex flex-col gap-2 text-zinc-700">
              <input
                className="rounded p-2"
                type="text"
                value={email}
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
              <input
                className="rounded p-2"
                type="text"
                value={subject}
                placeholder="subject"
                onChange={e => setSubject(e.target.value)}
              />
              <select
                className="text-gray-700 p-2 rounded-md"
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
                className="text-gray-700 p-2 rounded-md"
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
                className="text-gray-700 p-2 rounded-md"
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
                className="hover:scale-105 text-white hover:text-white hover:bg-green-400 rounded bg-green-600 py-1 px-3 font-bold transition-all"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App
