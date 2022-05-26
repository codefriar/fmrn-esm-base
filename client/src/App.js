import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import BuildEnv from './buildEnv.js'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const handleChange = (event) => setSearchTerm(event.target.value)
  const handleSearch = async (event) => {
    event.preventDefault()
    const searchResults = await fetch(
      `${BuildEnv()}/restaurant/search/${searchTerm}`
    )

    setResults(await searchResults.json())
  }
  return (
    <div className="App">
      <AppBar color="primary" position="static">
        <Toolbar>
          <TypoGraphy variant="h3" color="inherit">
            Fastify, React, Node & Mongo Atlas Search
          </TypoGraphy>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
          <TextField
            id="standard-basic"
            label="Search Term"
            variant="standard"
            placeholder="Search Term"
            value={searchTerm}
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
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          Results
          <List>
            {results.map((restaurant) => (
              <ListItem>
                <ListItemText
                  primary={restaurant.name}
                  secondary={restaurant.cuisine}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
