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
  return <div dangerouslySetInnerHTML={{ __html: svg }}></div>
}
const Des = ({ c }) => {
  return (
    <>
      <h2>{c.name}</h2>
      <p>capital {c.capital}</p>
      <h3>Languages</h3>
      <div>
        {c.languages.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </div>
      <Flag link={c.flag} />
    </>
  )
}
const Country = ({ country }) => {
  const [n, setN] = useState("")
  useEffect(() => {
    setN("")
  },country)
  const handleN = (e, name) => {
    e.preventDefault()
    setN(name)
  }
  if (country.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (country.length == 0) {
    return <p>no match</p>
  } else if (country.length != 1) {
    if (n === "") {
      return (
        <>
          {country.map((c) => (
            <p>
              {c.name} <button onClick={(e) => handleN(e, c.name)}>show</button>
            </p>
          ))}
        </>
      )
    } else {
      return (
        <>
          {country.map((c) => (
            <p>
              {c.name} <button onClick={(e) => handleN(e, c.name)}>show</button>
            </p>
          ))}
          <Des c={country.filter((c) => c.name.includes(n))[0]}></Des>
        </>
      )
    }
  } else {
    return <Des c={country[0]} />
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
