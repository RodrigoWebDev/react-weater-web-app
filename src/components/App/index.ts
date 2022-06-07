import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import htm from 'htm'

const html = htm.bind(h)

interface GeolocationInterface {
  coords: {
    accuracy: number | null
    altitude: number | null
    altitudeAccuracy: number |null
    heading: number | null
    latitude: number | null
    longitude: number | null
    speed: number | null
  }
  timestamp: number | null
} 

const App = () => {
  const [isGeolocationSupported, setSsGeolocationSupported] = useState<boolean | undefined>(undefined)
  const [geolocationData, setGeolocationData] = useState<GeolocationInterface | undefined>()

  const getGeoLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        setGeolocationData(data)
      });
      setSsGeolocationSupported(true)
    } else {
      setSsGeolocationSupported(false)
    }
  }

  useEffect(() => {
    getGeoLocationData()
  }, [])

  return html`
    ${isGeolocationSupported ? 
      html`<h1>Gelocation is supported</h1>` :
      html`<h1>Gelocation is NOT supported</h1>`
    }
  `
}

export default App
