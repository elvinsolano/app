import axios from 'axios'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

export async function getIPLocationEndpoint() {
  let response

  try {
    response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
    )
  } catch (err) {
    throw err
  }

  const { location } = response.data
  return `${location.lat},${location.lng}`
}
