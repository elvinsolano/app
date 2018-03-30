import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { getLocationEndpoint } from '../../api/google'
import appSelector from '../App/selector'
import topBarSelector from '../TopBar/selector'
import { getVenuesEndpoint } from '../../api/venues'

import {
  addVenues,
  addVisibleVenues,
  setCenterLocation,
  setIncomingVenues,
  setLoadingMap,
  setLoadingVenues,
  setNextPage,
  setShowSearchHere,
  setShowUserMarker,
  setUserLocation,
  setVenues,
  setVisibleVenues
} from './actions'
import { GET_USER_LOCATION, GET_VENUES } from './constants'
import venuesSelector from './selector'

function* getVenuesFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let centerLocation = yield select(venuesSelector('centerLocation'))
  if (centerLocation.lat === 0 && centerLocation.lng === 0) {
    try {
      centerLocation = yield call(getLocationEndpoint)
    } catch (error) {
      yield put(setNotificationType('error'))
      if (error.code === 'ECONNABORTED') {
        yield put(
          setNotificationMessage('axsmap.components.Venues.timeoutError')
        )
      } else {
        yield put(
          setNotificationMessage('axsmap.components.Venues.serverError')
        )
      }
      yield put(setNotificationIsVisible(true))

      yield put(finishProgress())
      yield put(setSendingRequest(false))

      yield put(setVenues([]))
      yield put(setVisibleVenues([]))
      yield put(setNextPage(''))
      yield put(setLoadingMap(false))

      return
    }

    yield put(setCenterLocation(centerLocation))
    yield put(setLoadingMap(false))
  }

  const nextPage = yield select(venuesSelector('nextPage'))
  let venues = yield select(venuesSelector('venues'))
  let visibleVenues = yield select(venuesSelector('visibleVenues'))

  const keywords = yield select(topBarSelector('keywords'))
  const filters = yield select(venuesSelector('filters'))
  const getVenuesParams = {
    location: `${centerLocation.lat},${centerLocation.lng}`,
    keywords,
    type: filters.type,
    page: nextPage
  }

  if (nextPage) {
    let response
    try {
      response = yield call(getVenuesEndpoint, getVenuesParams)
    } catch (error) {
      yield put(setNotificationType('error'))
      if (error.code === 'ECONNABORTED') {
        yield put(
          setNotificationMessage('axsmap.components.Venues.timeoutError')
        )
      } else {
        yield put(
          setNotificationMessage('axsmap.components.Venues.serverError')
        )
      }
      yield put(setNotificationIsVisible(true))

      yield put(finishProgress())
      yield put(setSendingRequest(false))

      yield put(setVenues([]))
      yield put(setVisibleVenues([]))
      yield put(setNextPage(''))
      yield put(setLoadingMap(false))

      return
    }

    yield put(addVenues(response.data.results))
    if (response.data.nextPage) {
      yield put(setNextPage(response.data.nextPage))
    } else {
      yield put(setNextPage(''))
    }

    venues = yield select(venuesSelector('venues'))
    visibleVenues = yield select(venuesSelector('visibleVenues'))
    yield put(
      addVisibleVenues(
        venues.slice(visibleVenues.length, visibleVenues.length + 12)
      )
    )

    visibleVenues = yield select(venuesSelector('visibleVenues'))
    if (visibleVenues.length < venues.length) {
      yield put(setIncomingVenues(true))
    } else {
      yield put(setIncomingVenues(false))
    }

    yield put(setLoadingMap(false))
    yield put(setSendingRequest(false))
    yield put(finishProgress())
    yield put(setShowSearchHere(false))

    return
  } else if (visibleVenues.length < venues.length) {
    venues = yield select(venuesSelector('venues'))
    visibleVenues = yield select(venuesSelector('visibleVenues'))
    yield put(
      addVisibleVenues(
        venues.slice(visibleVenues.length, visibleVenues.length + 12)
      )
    )

    visibleVenues = yield select(venuesSelector('visibleVenues'))
    if (visibleVenues.length < venues.length) {
      yield put(setIncomingVenues(true))
    } else {
      yield put(setIncomingVenues(false))
    }

    yield put(setLoadingMap(false))
    yield put(setSendingRequest(false))
    yield put(finishProgress())
    yield put(setShowSearchHere(false))

    return
  }

  yield put(setIncomingVenues(false))

  let response
  try {
    response = yield call(getVenuesEndpoint, getVenuesParams)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    yield put(setVenues([]))
    yield put(setVisibleVenues([]))
    yield put(setNextPage(''))
    yield put(setLoadingVenues(false))
    yield put(setLoadingMap(false))

    return
  }

  yield put(setVenues(response.data.results))
  if (response.data.nextPage) {
    yield put(setNextPage(response.data.nextPage))
  } else {
    yield put(setNextPage(''))
  }

  venues = yield select(venuesSelector('venues'))
  visibleVenues = yield select(venuesSelector('visibleVenues'))
  yield put(
    setVisibleVenues(
      venues.slice(visibleVenues.length, visibleVenues.length + 12)
    )
  )

  visibleVenues = yield select(venuesSelector('visibleVenues'))
  if (visibleVenues.length < venues.length) {
    yield put(setIncomingVenues(true))
  } else {
    yield put(setIncomingVenues(false))
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setLoadingVenues(false))
  yield put(setLoadingMap(false))
  yield put(setShowSearchHere(false))
}

function getLocationPromised() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000
    })
  })
}

function* getUserLocationFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(setShowSearchHere(false))
  yield put(setNotificationIsVisible(false))

  if (navigator.geolocation) {
    try {
      const location = yield call(getLocationPromised)
      yield put(
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })
      )
      yield put(
        setCenterLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })
      )
      yield put(setShowUserMarker(true))

      yield put(setSendingRequest(false))

      yield call(getVenuesFlow)
    } catch (err) {
      yield put(setNotificationType('error'))

      if (err.code === 1) {
        yield put(
          setNotificationMessage('axsmap.components.Venues.userLocationError1')
        )
      } else if (err.code === 2) {
        yield put(
          setNotificationMessage('axsmap.components.Venues.userLocationError2')
        )
      } else {
        yield put(
          setNotificationMessage('axsmap.components.Venues.userLocationError3')
        )
      }

      yield put(setNotificationIsVisible(true))
    } finally {
      yield put(setSendingRequest(false))
    }
  } else {
    yield put(setNotificationType('error'))
    yield put(
      setNotificationMessage('axsmap.components.Venues.userLocationError4')
    )
    yield put(setNotificationIsVisible(true))
    yield put(setSendingRequest(false))
  }
}

export default function* venuesSaga() {
  yield takeLatest(GET_VENUES, getVenuesFlow)
  yield takeLatest(GET_USER_LOCATION, getUserLocationFlow)
}
