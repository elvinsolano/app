import { last } from 'lodash'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createPhotoEndpoint, deletePhotoEndpoint } from '../../api/photos'
import { createReviewEndpoint } from '../../api/reviews'
import appSelector from '../App/selector'
import { getVenueEndpoint } from '../../api/venues'

import {
  setCreateReviewVisible,
  setLoadingVenue,
  setPhoto,
  setVenue
} from './actions'
import {
  CREATE_PHOTO,
  CREATE_REVIEW,
  DELETE_PHOTO,
  GET_VENUE
} from './constants'
import venueSelector from './selector'

function* getVenueFlow(params) {
  yield put(startProgress())

  let response
  try {
    response = yield call(getVenueEndpoint, params.placeId)
  } catch (error) {
    yield put(setNotificationType('error'))

    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Venue.timeoutError'))
    } else if (error.response.data.general === 'Place not found') {
      yield put(setNotificationMessage('axsmap.components.Venue.notFoundError'))
    } else {
      yield put(setNotificationMessage('axsmap.components.Venue.serverError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    yield put(setLoadingVenue(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setVenue(response.data))
  yield put(setLoadingVenue(false))
}

function* createPhotoFlow({ data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(createPhotoEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Venue.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Venue.serverError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setPhoto(response.data.url))
}

function* deletePhotoFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const photo = yield select(venueSelector('photo'))
  const photoFileName = last(photo.split('/'))

  try {
    yield call(deletePhotoEndpoint, photoFileName)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Venue.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Venue.serverError'))
    }

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setPhoto(''))
}

function* createReviewFlow({ data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const venue = yield select(venueSelector('venue'))
  const photo = yield select(venueSelector('photo'))
  const reviewData = {
    allowsGuideDog:
      data.allowsGuideDog !== null ? data.allowsGuideDog : undefined,
    bathroomScore: data.bathroomScore !== null ? data.bathroomScore : undefined,
    comments: data.comments,
    entryScore: data.entryScore !== null ? data.entryScore : undefined,
    event: data.event !== null ? data.event : undefined,
    hasParking: data.hasParking !== null ? data.hasParking : undefined,
    hasSecondEntry:
      data.hasSecondEntry !== null ? data.hasSecondEntry : undefined,
    hasWellLit: data.hasWellLit !== null ? data.hasWellLit : undefined,
    isQuiet: data.isQuiet !== null ? data.isQuiet : undefined,
    isSpacious: data.isSpacious !== null ? data.isSpacious : undefined,
    photo,
    place: venue.placeId !== null ? venue.placeId : undefined,
    steps: data.steps !== null ? data.steps : undefined,
    team: data.team !== null ? data.team : undefined
  }

  try {
    yield call(createReviewEndpoint, reviewData)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Venue.timeoutError'))
    } else if (err.response.data.entryScore === 'Is required') {
      yield put(
        setNotificationMessage('axsmap.components.Venue.entryScoreError')
      )
    } else if (err.response.data.general === 'You already rated this venue') {
      yield put(
        setNotificationMessage('axsmap.components.Venue.alreadyRatedError')
      )
    } else {
      yield put(setNotificationMessage('axsmap.components.Venue.serverError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(
    setNotificationMessage('axsmap.components.Venue.createdReviewSuccess')
  )
  yield put(setNotificationIsVisible(true))

  yield put(setCreateReviewVisible(false))
  yield call(getVenueFlow, {
    placeId: venue.placeId
  })
}

export default function* venueSaga() {
  yield takeLatest(GET_VENUE, getVenueFlow)
  yield takeLatest(CREATE_PHOTO, createPhotoFlow)
  yield takeLatest(DELETE_PHOTO, deletePhotoFlow)
  yield takeLatest(CREATE_REVIEW, createReviewFlow)
}
