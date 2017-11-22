import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setVisibility as setNotificationVisibility } from '../Notification/actions'
import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenuesComp from '../../components/Venues'

import {
  clearState,
  getUserLocation,
  getVenues,
  setCenterLocation,
  setListVisibility,
  setMapVisibility,
  setPopupVisibility,
  setShowSearchHere,
  setShowUserMarker,
  setUserLocation
} from './actions'
import makeSelectVenues from './selector'

const mapStateToProps = createStructuredSelector({
  notificationMessage: makeSelectVenues('notificationMessage'),
  listVisibility: makeSelectVenues('listVisibility'),
  loadingVenues: makeSelectVenues('loadingVenues'),
  loadingMap: makeSelectVenues('loadingMap'),
  mapVisibility: makeSelectVenues('mapVisibility'),
  userLocation: makeSelectVenues('userLocation'),
  centerLocation: makeSelectVenues('centerLocation'),
  showSearchHere: makeSelectVenues('showSearchHere'),
  sendingRequest: makeSelectApp('sendingRequest'),
  visibleVenues: makeSelectVenues('visibleVenues'),
  showUserMarker: makeSelectVenues('showUserMarker'),
  popupVisibility: makeSelectVenues('popupVisibility')
})

const mapDispatchToProps = dispatch => ({
  setVenuesUrl: () => {
    dispatch(setCurrentUrl('/'))
  },
  getVenues: () => {
    dispatch(getVenues())
  },
  clearState: () => {
    dispatch(clearState())
  },
  setCenterLocation: location => () => {
    dispatch(setUserLocation({ lat: 0, lng: 0 }))
    dispatch(setShowUserMarker(false))
    dispatch(setCenterLocation(location))
  },
  loadMore: () => {},
  showMap: () => {
    dispatch(setListVisibility(false))
    dispatch(setMapVisibility(true))
  },
  onClickMap: () => {
    dispatch(setPopupVisibility(false))
  },
  onDragMap: () => {
    dispatch(setNotificationVisibility(false))
    dispatch(setPopupVisibility(false))
    dispatch(setShowSearchHere(true))
  },
  onZoomMap: () => {
    dispatch(setPopupVisibility(false))
  },
  loadCenterVenues: location => {
    dispatch(setUserLocation({ lat: 0, lng: 0 }))
    dispatch(setShowUserMarker(false))
    dispatch(setCenterLocation(location))
    dispatch(getVenues())
  },
  getUserLocation: () => {
    dispatch(setPopupVisibility(false))
    dispatch(getUserLocation())
  },
  showPopup: () => {
    dispatch(setShowSearchHere(false))
    dispatch(setPopupVisibility(true))
  },
  hidePopup: () => {
    dispatch(setPopupVisibility(false))
  },
  showList: () => {
    dispatch(setMapVisibility(false))
    dispatch(setListVisibility(true))
  }
})

const VenuesPage = connect(mapStateToProps, mapDispatchToProps)(VenuesComp)

export default VenuesPage
