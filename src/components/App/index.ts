import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import htm from 'htm'

const html = htm.bind(h)

interface geolocationDataInterface {
  latitude: number | undefined
  longitude: number | undefined
}

interface objectUnknowKeys {
  [key: string]: any
}

const App = (): objectUnknowKeys => {
  const [isGeolocationSupported, setIsGeolocationSupported] = useState(false)
  const [geolocationData, setGeolocationData] = useState<geolocationDataInterface>({
    latitude: undefined,
    longitude: undefined
  })

  const isEmptyObject = (obj: objectUnknowKeys): boolean => Object.keys(obj).length === 0

  const getGeoLocationData = (): void => {
    if (isEmptyObject(navigator.geolocation)) {
      navigator.geolocation.getCurrentPosition(data => {
        setGeolocationData(data.coords)
      })
      setIsGeolocationSupported(true)
    } else {
      alert('Geolocalização não suportada')
    }
  }

  const getWeatherData = ({ latitude, longitude }: {latitude: number, longitude: number}): void => {
    const apiKey = 'c307ac859bc3423a830171218220706'
    const endpoint = `http://api.weatherapi.com/v1/current.json?key=${apiKey}q=${latitude},${longitude}&aqi=yes`
    console.log({ endpoint })

    fetch(endpoint)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    getGeoLocationData()
  }, [])

  useEffect(() => {
    if (geolocationData.latitude !== undefined) {
      console.log(geolocationData.latitude)
      const {
        latitude = 0,
        longitude = 0
      } = geolocationData

      getWeatherData({
        latitude,
        longitude
      })
    }
  }, [geolocationData])

  return html`
    ${isGeolocationSupported && html`<h1>Geolocation is supported</h1>`}
  `
}

export default App
