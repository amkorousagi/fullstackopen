import React, { useEffect, useState } from "react"
import axios from "axios"


const Flag = ({ link }) => {
  const [svg, setSvg] = useState({})
  useEffect(() => {
    axios.get(link).then((res) => {
      console.log(res.data)
      setSvg(res.data)
    })
  })
  return <div dangerouslySetInnerHTML={ {__html: svg} }>
  </div>
}
const Country = ({ country }) => {
  if (country.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (country.length == 0) {
    return <p>no match</p>
  } else if (country.length != 1) {
    return (
      <>
        {country.map((c) => (
          <p>{c.name}</p>
        ))}
      </>
    )
  } else {
    const c = country[0]
    return (
      <>
        <h2>{c.name}</h2>
        <p>capital {c.capital}</p>
        <h3>Languages</h3>
        <div>
          {c.languages.map((l) => (
            <li>{l.name}</li>
          ))}
        </div>
        <Flag link={c.flag} />
      </>
    )
  }
}
const Search = ({ word, setWord }) => {
  return (
    <>
      find countries
      <input value={word} onChange={(e) => setWord(e.target.value)} />
    </>
  )
}
const App = () => {
  const [country, setCountry] = useState([])
  const [word, setWord] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(response)
      setCountry(response.data)
    })
  }, [])

  return (
    <div>
      <Search word={word} setWord={setWord} />
      <Country country={country.filter((c) => c.name.includes(word))} />
    </div>
  )
}

export default App
