import React, { useEffect } from 'react'
import axios from 'axios'
import pika from './assets/pika.png'

export default function Surfbot() {
  useEffect(() => {
    getWaveData()
  })

  async function getWaveData() {
    const url = "https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a7708b35&days=1&intervalHours=24"
    await axios
      .get(`${url}`)
      .catch(e => {
        console.log(e)
      })
      .then((res) => {
        renderWave(parseData(res.data.data.wave[0].surf))
      })
  }

  function renderWave({ min, max }) {
    document.body.classList.remove("blurred")
    renderCurrentWave(min, max)
  }
  
  function renderCurrentWave(min, max) {
    document.querySelector('[data-wave-min').textContent = min
    document.querySelector('[data-wave-max').textContent = max
  }
  
  function parseData({ min, max }) {
    return {
      min: Math.round(min),
      max: Math.round(max)
    }
  }
  
  return (
    <div>
      <header className="header">
        <h1>surfbot</h1>
        <img 
          data-current-icon 
          src={pika} 
          alt="surfing-pika"/>
        <div className="header-current-wave-range">
          <span data-wave-min>1</span>-<span data-wave-max>2</span> ft</div>
        <div>at canoes</div>
      </header>
    </div>
  )
}
