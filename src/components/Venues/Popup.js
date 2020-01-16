import { forOwn } from 'lodash'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import PropTypes from 'prop-types'
import { number, shape, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import Icon from '../Icon'
import LinkButton from '../LinkButton'
import { colors, fonts, fontSize, fontWeight } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 22rem;
  width: 16rem;
`

const Content = styled.div`
  display: block;
  position: relative;
  clear: both;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: inherit;
  width: inherit;
  background-color: white;
  padding: 15px 15px 10px 15px;
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;

  height: 12rem;
  padding: 0.5rem;
`

const Name = styled.h2`
  overflow: hidden;
  margin: 0 0 20px 0;
  color: ${colors.black};
  font-size: ${fontSize.sm};
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.bold};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display: block;
  position: relative;
  padding: 0;
`

const Address = styled.h2`
  overflow: hidden;
  margin: 0;
  padding: 0 0 10px 0;
  color: ${colors.darkestGrey};
  font-size: ${fontSize.xs};
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.medium};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ScoreWrapper = styled.div`
  display: block;
  position: relative;
  clear: both;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  width: 100%;
`

const ScoreIcon = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3e1e0;
  height: 54px;
  width: 100%;
  background-color: ${props => props.backgroundColor || colors.white};
  color: ${props => props.textColor || colors.buttonColor};
`

const LinksWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-top: 0.5rem;
  width: 100%;
`

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Arrow = styled.div`
  align-self: flex-start;

  border: 0.5rem solid;
  border-color: white transparent transparent white;
  height: 0;
  margin-top: -1px;
  width: 0;

  content: ' ';
`

const ScoreHeader = styled.div`
  align-self: flex-start;
  display: block;
  position: relative;
  background-color: ${colors.black};
  color: ${colors.white};
  text-transform: uppercase;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xxs};
  text-align: center;
  padding: 5px 10px;
  border: 1px solid black;
`

const ScoreDefaultMessage = styled.div`
  display: block;
  position: relative;
  clear: both;
  padding: 10px 0;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.medium};
  font-size: ${fontSize.xxs};
  text-align: center;
`

const Popup = (props, context) => {
  let entryScoreIcon = (
    <ScoreIcon>
      <Icon
        glyph="entrylg"
        size={2}
        alt="Entrance"
        color={colors.buttonColor}
        style={{ margin: '14% auto', display: 'block' }}
      />
    </ScoreIcon>
  )
  if (props.entryScore >= 1 && props.entryScore < 3)
    entryScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert} textColor={colors.black}>
        <Icon
          glyph="entrylg"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
      </ScoreIcon>
    )
  if (props.entryScore >= 3 && props.entryScore < 4)
    entryScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingCaution}
        textColor={colors.black}
      >
        <Icon
          glyph="entrylg"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
      </ScoreIcon>
    )
  if (props.entryScore >= 4 && props.entryScore <= 5)
    entryScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingAccessible}
        textColor={colors.black}
      >
        <Icon
          glyph="entrylg"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
      </ScoreIcon>
    )

  let bathroomScoreIcon = (
    <ScoreIcon>
      <Icon
        glyph="restroom"
        size={2}
        style={{ margin: '14% auto', display: 'block' }}
        alt="Restroom"
        color={colors.buttonColor}
      />
    </ScoreIcon>
  )
  if (props.bathroomScore >= 1 && props.bathroomScore < 3)
    bathroomScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.alert}
        backgroundColor={colors.ratingAlert}
      >
        <Icon
          glyph="restroom"
          size={2}
          style={{ margin: '14% auto', display: 'block' }}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
        />
      </ScoreIcon>
    )
  if (props.bathroomScore >= 3 && props.bathroomScore < 4)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingCaution}>
        <Icon
          glyph="restroom"
          size={2}
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  if (props.bathroomScore >= 4 && props.bathroomScore <= 5)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAccessible}>
        <Icon
          glyph="restroom"
          size={2}
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )

  const stepsScoreIcon = (
    <ScoreIcon>
      <Icon
        glyph="interior"
        size={2}
        alt="Interior"
        color={colors.buttonColor}
      />
    </ScoreIcon>
  )
  {
    /*

    let stepsNumber = 'stepsUnknown'
    let stepsReviews = 0
    const maxSteps = { value: 0, key: '' }
    forOwn(this.props.steps, (value, key) => {
      stepsReviews += value
      if (value > maxSteps.value) {
        maxSteps.value = value
        maxSteps.key = key
      }
    });

    if (maxSteps.key === 'zero') {
      stepsScoreBox = (
        <ScoreIcon
          backgroundColor={colors.ratingAccessible}
          className={`score_accessible `}
        >
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
        </ScoreIcon>
      )
    } else if (maxSteps.key === 'one' || maxSteps.key === 'two') {
      stepsScoreBox = (
        <ScoreIcon
          backgroundColor={colors.ratingCaution}
          className={`score_caution`}
        >
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
        </ScoreIcon>
      )
    } else if (maxSteps.key === 'moreThanTwo') {
      stepsScoreBox = (
        <ScoreIcon
          backgroundColor={colors.ratingAlert}
          className={`score_alert`}
        >
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
        </ScoreIcon>
      )
    };
    */
  }

  return (
    <InfoBox
      position={new props.GoogleLatLng(props.location.lat, props.location.lng)}
      options={{
        closeBoxURL: '',
        enableEventPropagation: false,
        alignBottom: true,
        pixelOffset: new props.GoogleSize(0, -52),
        infoBoxClearance: new props.GoogleSize(20, 20)
      }}
    >
      <Wrapper>
        <Content>
          <Info>
            <LinkButton
              to={`/venues/${props.placeId}`}
              backgroundColor={colors.white}
              disabled={props.sendingRequest}
              className="text-link no-pad"
            >
              <Name>{props.name}</Name>
            </LinkButton>
            <Address>{props.address}</Address>

            <Grid container>
              <Grid item xs>
                <ScoreHeader>
                  {context.intl.formatMessage(messages.entrance)}
                </ScoreHeader>
                <ScoreWrapper>{entryScoreIcon}</ScoreWrapper>
              </Grid>
              <Grid item xs>
                <ScoreHeader>
                  {context.intl.formatMessage(messages.interior)}
                </ScoreHeader>
                <ScoreWrapper>{stepsScoreIcon}</ScoreWrapper>
              </Grid>
              <Grid item xs>
                <ScoreHeader>
                  {context.intl.formatMessage(messages.restroom)}
                </ScoreHeader>
                <ScoreWrapper>{bathroomScoreIcon}</ScoreWrapper>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ScoreDefaultMessage>
                  {context.intl.formatMessage(messages.scoreDefaultMessage)}
                </ScoreDefaultMessage>
              </Grid>
            </Grid>

            <LinksWrapper>
              <LinkButton
                to={`/venues/${props.placeId}/review`}
                backgroundColor={colors.primary}
                style={{ margin: '5px auto 0px auto' }}
                disabled={props.sendingRequest}
                className="primary-btn is-full"
              >
                <LinkContent>
                  {context.intl.formatMessage(messages.popupReviewLink)}
                </LinkContent>
              </LinkButton>
            </LinksWrapper>
          </Info>
        </Content>
        <Arrow />
      </Wrapper>
    </InfoBox>
  )
}

Popup.propTypes = {
  GoogleLatLng: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  GoogleSize: PropTypes.func.isRequired,
  photo: PropTypes.string,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  entryScore: PropTypes.number,
  interiorScore: PropTypes.number,
  bathroomScore: PropTypes.number,
  placeId: PropTypes.string.isRequired,
  sendingRequest: PropTypes.bool.isRequired
}

Popup.defaultProps = {
  photo: '',
  entryScore: 0,
  interiorScore: 0,
  bathroomScore: 0
}

Popup.contextTypes = {
  intl: intlShape
}

export default Popup
