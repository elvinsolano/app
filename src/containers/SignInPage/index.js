import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import { setCurrentUrl } from '../TopBar/actions'
import SignIn from '../../components/SignIn'

import makeSelectSignIn from './selector'
import {
  clearState,
  setData,
  setErrors,
  signInRequest,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  notificationMessage: makeSelectSignIn('notificationMessage'),
  data: makeSelectSignIn('data'),
  errors: makeSelectSignIn('errors'),
  showPassword: makeSelectSignIn('showPassword'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/sign-in'))
  },
  clearState: () => {
    dispatch(clearState())
  },
  onFormSubmit: e => {
    e.preventDefault()
    dispatch(signInRequest())
  },
  onDataChange: e => {
    dispatch(setData(e.target.id, e.target.value))
  },
  onInputFocus: e => {
    dispatch(setErrors(e.target.id, ''))
  },
  onShowPasswordChange: () => {
    dispatch(toggleShowPassword())
  }
})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignIn)

export default SignUpPage
