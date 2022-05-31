import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import BuildEnv from './buildEnv.js'
import ResultsDataTable from './ResultsDataTable.js'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const handleChange = (event) => setSearchTerm(event.target.value)
  const handleSearch = async (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
    if (searchTerm.length > 0) {
      const searchResults = await fetch(
        `${BuildEnv()}/restaurant/search/${searchTerm}`
      )
      setResults(await searchResults.json())
    }
  }
  return (
    <div className="App">
      <AppBar color="primary" position="static">
        <Toolbar>
          <TypoGraphy variant="h3" color="inherit">
            NYC Restaurant Search
          </TypoGraphy>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
          <form onSubmit={handleSearch}>
            <TextField
              id="standard-basic"
              label="Search Term"
              variant="standard"
              placeholder="Search Term"
              value={searchTerm}
              onInput={(e) => {
                handleSearch(e)
              }}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="classes.submit"
              onClick={handleSearch}
            >
              Search{' '}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <ResultsDataTable results={results}></ResultsDataTable>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
