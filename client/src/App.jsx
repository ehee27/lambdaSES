import './App.css'
import Form from './components/Form'

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl mb-5">Lambda Email Test</p>
        <div className="p-3">
          <Form />
        </div>
      </div>
    </>
  )
}

export default App
