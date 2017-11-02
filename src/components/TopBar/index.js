import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import { camelCase, upperFirst } from 'lodash'

import Container from './Container'
import NavDropdown from './NavDropdown'
import FilterButton from './FilterButton'
import FilterSelectBox from './FilterSelectBox'
import LinkButton from './LinkButton'
import LinkIcon from './LinkIcon'
import LinkLogo from './LinkLogo'
import messages from './messages'
import NavLink from './NavLink'
import SearchForm from './SearchForm'
import SectionLeft from './SectionLeft'
import SectionRight from './SectionRight'
import { venuesTypes } from './constants'
import Wrapper from './Wrapper'

const TopBar = (props, context) => {
  const options = venuesTypes.map(venueType => ({
    text: context.intl.formatMessage(
      messages[`filters${upperFirst(camelCase(venueType))}`]
    ),
    value: venueType
  }))
  options.unshift({
    text: context.intl.formatMessage(messages.filtersAll),
    value: 'all'
  })

  return (
    <Wrapper hideOn={props.hideOn}>
      <Container>
        <SectionLeft>
          <LinkLogo />

          <LinkIcon />

          <SearchForm
            value={props.query.keyword}
            onFormSubmit={props.onVenuesQuerySubmit}
            onValueChange={props.onQueryChange}
          />

          <FilterButton />

          <FilterSelectBox
            value={props.query.type}
            options={options}
            onValueChange={props.onQueryChange}
          />
        </SectionLeft>

        <SectionRight>
          <NavLink
            to="/"
            label={context.intl.formatMessage(messages.navVenues)}
            isActive={props.currentUrl === '/'}
          />
          <NavLink
            to="/mapathons"
            label={context.intl.formatMessage(messages.navMapathons)}
            isActive={props.currentUrl === '/mapathons'}
          />
          <NavLink
            to="/teams"
            label={context.intl.formatMessage(messages.navTeams)}
            isActive={props.currentUrl === '/teams'}
          />

          {props.authenticated ? (
            <NavDropdown
              avatarUrl={props.userData.avatar}
              sendingRequest={props.sendingRequest}
              onSignOutClick={props.onSignOutClick}
              isActive={props.currentUrl === '/account'}
            />
          ) : (
            <LinkButton
              to="/sign-in"
              label={context.intl.formatMessage(messages.navSignIn)}
            />
          )}
        </SectionRight>
      </Container>
    </Wrapper>
  )
}

TopBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  hideOn: PropTypes.string,
  query: PropTypes.shape({
    keyword: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  currentUrl: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    avatar: PropTypes.string
  }).isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  onVenuesQuerySubmit: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
}

TopBar.defaultProps = {
  hideOn: ''
}

TopBar.contextTypes = {
  intl: intlShape
}

export default TopBar
