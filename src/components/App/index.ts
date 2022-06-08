import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import htm from 'htm'
import Swal from "sweetalert2"

import { objectUnknowKeys } from "../../types"
import { isEmptyObject } from "../../utils"

const html = htm.bind(h)

interface GeolocationDataInterface {
  latitude: number | undefined
  longitude: number | undefined
}

const App = (): objectUnknowKeys => {
  const [isGeolocationSupported, setIsGeolocationSupported] = useState(false)
  const [geolocationData, setGeolocationData] = useState<GeolocationDataInterface>({
    latitude: undefined,
    longitude: undefined
  })

  const getGeoLocationData = (): void => {
    if (isEmptyObject(navigator.geolocation)) {
      navigator.geolocation.getCurrentPosition(data => {
        setGeolocationData(data.coords)
      })
      setIsGeolocationSupported(true)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Geolocalização não suportada',
      })
      setIsGeolocationSupported(false)
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

      console.log({latitude})
      console.log({longitude})

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
