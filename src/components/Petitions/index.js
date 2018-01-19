import { array, bool, func, number, string } from 'prop-types'
import React, { PureComponent } from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import noResultsImage from '../../images/no-results.png'
import Button from '../Button'
import Icon from '../Icon'
import NoResultsTitle from '../NoResults/NoResultsTitle'
import NoResultsImage from '../NoResults/NoResultsImage'
import NoResultsWrapper from '../NoResults/NoResultsWrapper'
import Spinner from '../Spinner'

import messages from './messages'
import Petition from './Petition'

const PetitionsWrapper = styled.article`
  width: 100%;
  padding-bottom: 5rem;

  ${media.tablet`
    padding-bottom: 0;
  `};
`

const PetitionsHeader = styled.h1`margin: 0 0 1rem;`

const PetitionsList = styled.ul`
  display: flex;
  list-style: outside none none;

  flex-direction: column;

  margin: 0.5rem 0 0;
  width: 100%;
  padding: 0;

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

const ButtonsWrapper = styled.div`
  bottom: 5rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  width: 100%;
  padding: 0 1rem;

  ${media.desktop`
    position: static;

    margin-top: 1rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Petitions extends PureComponent {
  static propTypes = {
    sendingRequest: bool.isRequired,
    filter: string.isRequired,
    loadingPetitions: bool.isRequired,
    nextPage: number,
    petitions: array.isRequired,
    clearState: func.isRequired,
    getPetitions: func.isRequired,
    onClickFilterReceived: func.isRequired,
    onClickFilterSent: func.isRequired,
    setPetitionAccepted: func.isRequired,
    setPetitionCanceled: func.isRequired,
    setPetitionRejected: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getPetitions()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const {
      filter,
      loadingPetitions,
      nextPage,
      petitions,
      sendingRequest,
      getPetitions,
      onClickFilterReceived,
      onClickFilterSent,
      setPetitionAccepted,
      setPetitionCanceled,
      setPetitionRejected
    } = this.props
    const formatMessage = this.context.intl.formatMessage

    const petitionsList = (
      <PetitionsList disabled={sendingRequest}>
        {petitions.map(petition => (
          <Petition
            key={petition.id}
            {...petition}
            filter={filter}
            sendingRequest={sendingRequest}
            setPetitionAccepted={setPetitionAccepted}
            setPetitionCanceled={setPetitionCanceled}
            setPetitionRejected={setPetitionRejected}
          />
        ))}
      </PetitionsList>
    )

    return (
      <PetitionsWrapper>
        <PetitionsHeader>{formatMessage(messages.headerTitle)}</PetitionsHeader>

        <Button
          disabled={filter === 'received'}
          onClickHandler={onClickFilterReceived}
        >
          Received
        </Button>

        <Button disabled={filter === 'sent'} onClickHandler={onClickFilterSent}>
          Sent
        </Button>

        {loadingPetitions ? <Spinner /> : petitionsList}

        {nextPage ? (
          <ButtonsWrapper>
            <Button
              disabled={sendingRequest}
              float
              onClickHandler={getPetitions}
            >
              <ButtonContent>
                <Icon glyph="load" size={1} color={colors.darkestGrey} />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.loadMoreButton)}
                </p>
              </ButtonContent>
            </Button>
          </ButtonsWrapper>
        ) : null}

        {!loadingPetitions && petitions.length === 0 ? (
          <NoResultsWrapper>
            <NoResultsImage src={noResultsImage} alt="No results" />
            <NoResultsTitle>
              {formatMessage(messages.noResultsText)}
            </NoResultsTitle>
          </NoResultsWrapper>
        ) : null}
      </PetitionsWrapper>
    )
  }
}

export default Petitions
