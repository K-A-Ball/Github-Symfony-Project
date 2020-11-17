import React from 'react'
import ReactDOM from 'react-dom'
import UserInformationTable from './components/userInformationTable'
import './styles/app.css'


function App() {
    return (<UserInformationTable />)
}

ReactDOM.render(<App />, document.getElementById('root'))