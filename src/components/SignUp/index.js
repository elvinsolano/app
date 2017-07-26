/* eslint consistent-return: off */

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import messages from './messages'

const SignUp = props =>
  <div>
    <h1>
      <FormattedMessage {...messages.headline} />
    </h1>

    {props.errorMessage || props.successMessage
      ? <div>
          <p>
            {(() => {
              if (props.errorMessage) {
                return <FormattedMessage {...messages.error} />
              }

              return <FormattedMessage {...messages.success} />
            })()}
          </p>
        </div>
      : null}

    <form onSubmit={props.handleSubmit} noValidate>
      <label htmlFor="firstName">
        <FormattedMessage {...messages.firstName} />
      </label>
      <input
        type="text"
        name="firstName"
        value={props.data.firstName}
        onChange={props.handleChangeData}
      />
      <p>
        {(() => {
          switch (props.errors.firstName) {
            case 'Is required':
              return <FormattedMessage {...messages.firstNameError1} />
            case 'Should be equal to or less than 24 characters':
              return <FormattedMessage {...messages.firstNameError2} />
            case 'Should only be one name':
              return <FormattedMessage {...messages.firstNameError3} />
            default:
              return null
          }
        })()}
      </p>

      <label htmlFor="lastName">
        <FormattedMessage {...messages.lastName} />
      </label>
      <input
        type="text"
        name="lastName"
        value={props.data.lastName}
        onChange={props.handleChangeData}
      />
      <p>
        {(() => {
          switch (props.errors.lastName) {
            case 'Is required':
              return <FormattedMessage {...messages.lastNameError1} />
            case 'Should be equal to or less than 36 characters':
              return <FormattedMessage {...messages.lastNameError2} />
            case 'Should only be one surname':
              return <FormattedMessage {...messages.lastNameError3} />
            default:
              return null
          }
        })()}
      </p>

      <label htmlFor="email">
        <FormattedMessage {...messages.email} />
      </label>
      <input
        type="email"
        name="email"
        value={props.data.email}
        onChange={props.handleChangeData}
      />
      <p>
        {(() => {
          switch (props.errors.email) {
            case 'Is required':
              return <FormattedMessage {...messages.emailError1} />
            case 'Should be equal to or less than 254 characters':
              return <FormattedMessage {...messages.emailError2} />
            case 'Should be a valid email':
              return <FormattedMessage {...messages.emailError3} />
            case 'Is already taken':
              return <FormattedMessage {...messages.emailError4} />
            default:
              return null
          }
        })()}
      </p>

      <label htmlFor="password">
        <FormattedMessage {...messages.password} />
      </label>
      <input
        type={props.showPassword ? 'text' : 'password'}
        name="password"
        value={props.data.password}
        onChange={props.handleChangeData}
      />
      <button type="button" onClick={props.handleShowPassword}>
        <FormattedMessage {...messages.showPassword} />
      </button>
      <p>
        {(() => {
          switch (props.errors.password) {
            case 'Is required':
              return <FormattedMessage {...messages.passwordError1} />
            case 'Should have 8 or more characters':
              return <FormattedMessage {...messages.passwordError2} />
            case 'Should have 30 or less characters':
              return <FormattedMessage {...messages.passwordError3} />
            default:
              return null
          }
        })()}
      </p>

      <div
        role="checkbox"
        tabIndex={0}
        aria-checked
        onClick={props.handleIsSubscribed}
      >
        <div>
          <div />
        </div>
        <p>
          <FormattedMessage {...messages.isSubscribed} />
        </p>
      </div>

      <button type="submit">
        <FormattedMessage {...messages.formButton} />
      </button>
    </form>

    <Link to="/sign-in">
      <FormattedMessage {...messages.signInLink} />
    </Link>
  </div>

SignUp.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isSubscribed: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleIsSubscribed: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignUp
