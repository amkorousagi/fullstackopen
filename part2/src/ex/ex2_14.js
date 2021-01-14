import React, { useEffect, useState } from "react"
import axios from "axios"
import key from "../key"

const Flag = ({ link }) => {
  return <img src={link} width='100px' height='100px' />
  //return <div dangerouslySetInnerHTML={{ __html: svg }}></div>
}

const Png = ({ link }) => {
  return <img src={link} width='100px' height='100px' />
}
const Weather = ({ name }) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${key.key}&query=${name}`
      )
      .then((res) => {
        setWeather(res.data)
      })
  }, [])
  if (Object.keys(weather).length === 0) {
    return <></>
  } else {
    return (
      <>
        <h3>Weather in {name}</h3>
        <p>
          <strong>temperature</strong> {weather.current.temperature}
        </p>
        <Png link={weather.current.weather_icons[0]} />
        <p>
          <strong>wind</strong> {weather.current.wind_speed} mph{" "}
          {weather.current.wind_dir}
        </p>
      </>
    )
  }
}
/*
https://api.weatherstack.com/current?access_key=779351d8a39111eee7fb666daef404bc&query=New York
*/
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
      <Weather name={c.name} />
    </>
  )
}
const Country = ({ country }) => {
  const [n, setN] = useState("")
  useEffect(() => {
    setN("")
  }, country)
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
