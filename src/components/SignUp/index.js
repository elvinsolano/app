import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

import Button from '../Button'
import Container from '../Container'
import Footer from '../Footer'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import Logo from '../Logo'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import ProgressBar from '../../containers/ProgressBar'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'

import messages from './messages'
import Wrapper from './Wrapper'

class SignUp extends PureComponent {
  componentDidMount() {
    this.props.setUrl()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />
    }

    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <ProgressBar />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          backURL="/sign-in"
          title={this.context.intl.formatMessage(messages.headerTitle)}
        />

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        <Container>
          <Logo />

          <Form onSubmit={this.props.onFormSubmit} noValidate>
            <FormInput
              label={this.context.intl.formatMessage(messages.firstName)}
              id="firstName"
              type="text"
              value={this.props.data.firstName}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.firstName,
                options: [
                  'Is required',
                  'Should only have letters',
                  'Should have less than 25 characters',
                  'Should only be one name'
                ],
                values: [
                  this.context.intl.formatMessage(messages.firstNameError1),
                  this.context.intl.formatMessage(messages.firstNameError2),
                  this.context.intl.formatMessage(messages.firstNameError3),
                  this.context.intl.formatMessage(messages.firstNameError4)
                ]
              }}
              onInputFocus={this.props.onInputFocus}
            />

            <FormInput
              label={this.context.intl.formatMessage(messages.lastName)}
              id="lastName"
              type="text"
              value={this.props.data.lastName}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.lastName,
                options: [
                  'Is required',
                  'Should only have letters',
                  'Should have less than 37 characters',
                  'Should only be one surname'
                ],
                values: [
                  this.context.intl.formatMessage(messages.lastNameError1),
                  this.context.intl.formatMessage(messages.lastNameError2),
                  this.context.intl.formatMessage(messages.lastNameError3),
                  this.context.intl.formatMessage(messages.lastNameError4)
                ]
              }}
              onInputFocus={this.props.onInputFocus}
            />

            <FormInput
              label={this.context.intl.formatMessage(messages.email)}
              id="email"
              type="email"
              value={this.props.data.email}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.email,
                options: [
                  'Is required',
                  'Should have less than 255 characters',
                  'Should be a valid email',
                  'Is already taken'
                ],
                values: [
                  this.context.intl.formatMessage(messages.emailError1),
                  this.context.intl.formatMessage(messages.emailError2),
                  this.context.intl.formatMessage(messages.emailError3),
                  this.context.intl.formatMessage(messages.emailError4)
                ]
              }}
              onInputFocus={this.props.onInputFocus}
            />

            <FormInput
              label={this.context.intl.formatMessage(messages.password)}
              id="password"
              type={this.props.showPassword ? 'text' : 'password'}
              value={this.props.data.password}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.password,
                options: [
                  'Is required',
                  'Should have more than 7 characters',
                  'Should have less than 31 characters'
                ],
                values: [
                  this.context.intl.formatMessage(messages.passwordError1),
                  this.context.intl.formatMessage(messages.passwordError2),
                  this.context.intl.formatMessage(messages.passwordError3)
                ]
              }}
              onInputFocus={this.props.onInputFocus}
            />
            <Toggle
              active={this.props.showPassword}
              right
              small
              handler={this.props.onShowPasswordChange}
            >
              {this.context.intl.formatMessage(messages.showPassword)}
            </Toggle>

            <Toggle
              active={this.props.data.isSubscribed}
              handler={this.props.onIsSubscribedChange}
            >
              {this.context.intl.formatMessage(messages.isSubscribed)}
            </Toggle>

            <Button
              type="submit"
              marginBottom="2rem"
              width="100%"
              disabled={this.props.sendingRequest}
            >
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>

          <Link to="/sign-in">
            {this.context.intl.formatMessage(messages.signInLink)}
          </Link>
        </Container>

        <Footer />
      </Wrapper>
    )
  }
}

SignUp.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  notificationMessage: PropTypes.string,
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
  sendingRequest: PropTypes.bool.isRequired,
  setUrl: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onShowPasswordChange: PropTypes.func.isRequired,
  onIsSubscribedChange: PropTypes.func.isRequired
}

SignUp.contextTypes = {
  intl: intlShape
}

export default SignUp
