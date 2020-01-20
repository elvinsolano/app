import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import Button from '../Button'
import Footer from '../Footer'
import googleBannerImage from '../../images/google-banner.png'
import Icon from '../Icon'
import RouterLink from '../RouterLink'
import Spinner from '../Spinner'
import { colors, media, fontSize, fontWeight, fonts } from '../../styles'
import { getGeneralType, getReviewsRatioWeight } from '../../utilities'

import messages from './messages'

const Wrapper = styled.div`
  position: relative;
  z-index: ${props => (props.visible ? 20 : -1)};
  display: flex;
  overflow-y: auto;
  align-items: center;
  align-self: flex-start;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;

  ${media.desktop`
    bottom: 0;
  `};

  ${media.widescreen`
    z-index: 20;
    width: 50%;
  `};
`

const CardsWrapper = styled.div`
  flex-grow: 1;
  border-top: 1px solid #cfcecf;
  padding: 1rem 1rem 0 1rem;
  width: 100%;
  background-color: ${colors.lightestGrey};

  &::after {
    display: table;
    clear: both;
    content: '';
  }
`

const Card = styled(RouterLink)`
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: inset 0px 0px 2px 1px ${colors.grey};
  height: 10rem;
  margin-bottom: 1rem;
  margin-right: 0;
  width: 100%;
  background-color: white;
  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  ${media.tablet`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: right;
      margin-right: 0;
    }
  `};

  ${media.desktop`
    flex-direction: column;
    height: 16.5rem;
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: left;
      margin-right: 0;
    }
  `};

  ${media.widescreen`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: left;
      margin-right: 0;
    }
  `};
`

const Photo = styled.div`
  height: inherit;
  width: 100%;
  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    height: 140px;
    width: 100%;
  `};
`

const IconMarker = styled.div`
  height: inherit;
  width: 100%;
  background: ${props =>
    `${colors[props.backgroundColor]} url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 3rem;

  ${media.desktop`
    height: 140px;
    width: 100%;
  `};
`

const Info = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: inherit;
  padding: 12px 14px;

  ${media.desktop`
    padding: 1rem;
  `};
`

const Name = styled.h2`
  overflow: hidden;
  display: block;
  position: relative;
  width: 100%;
  text-align: left !important;
  font-size: ${fontSize.sm} !Important;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary} !important;
  color: ${colors.darkestGrey};
  margin-top: 0 !Important;
  margin-bottom: 20px;

  ${media.desktop`
    font-size: ${fontSize.sm} !Important;
    margin-top: 0 !Important;
    margin-bottom: 10px;
  `};
`

const Address = styled.p`
  overflow: hidden;
  margin: 0 0 0.5rem 0;
  font-family: ${fonts.primary} !important;
  color: ${colors.textColorLight};
  font-weight: ${fontWeight.medium};
  font-size: ${fontSize.xs} !Important;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left !important;

  ${media.desktop`
    min-height: 50px;
  `};
`

const ScoreWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;

  margin-bottom: 0.5rem;
  width: 100%;

  ${media.desktop`
    justify-content: center;
  `};
`

const ScoreHeader = styled.div`
  display: block;
  text-align: center;
  text-transform: uppercase;
  color: ${colors.white};
  background-color: ${colors.textColor};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xxs};
  font-family: ${fonts.primary};
`

const ScoreIcon = styled.div`
  display: block;
  position: relative;
  text-align: center;
  height: 3.375rem;
  width: 100%;
  background-color: ${props => props.backgroundColor || colors.white};
  color: ${props => props.textColor || colors.buttonColor};
  border: 1px solid ${colors.blue100};
  padding-top: 10px;
`

const ScoreDescription = styled.div`
  display: block;
  position: relative;
  padding: 5px 10px;
  text-align: center;
  min-height: 72px;

  ${media.desktop`
    min-height: auto;
  `};
`

const ScoreDetail = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xxs};
  font-family: ${fonts.primary};
  color: ${colors.textColorLight};
`

const ButtonsWrapper = styled.div`
  bottom: 5rem;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    margin-bottom: 1rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ShowMapButton = styled(Button)`
  display: block;

  ${media.widescreen`
    display: none;
  `};
`

const GoogleBanner = styled.img.attrs({
  src: googleBannerImage,
  alt: 'Powered by Google image'
})`
  height: 1.5rem;
  margin-bottom: 5rem;
  width: auto;

  ${media.desktop`
    margin-bottom: 1rem;
  `};
`

const List = (props, context) => (
  <Wrapper visible={props.visible}>
    {props.loadingVenues ? (
      <Spinner />
    ) : (
      <CardsWrapper>
        {props.venues.map(venue => {
          const reviewData = {
            allowsGuideDog: venue.allowsGuideDog,
            bathroomScore: venue.bathroomScore || 0,
            entryScore: venue.entryScore || 0,
            interiorScore: venue.interiorScore || 0,
            hasParking: venue.hasParking,
            hasSecondEntry: venue.hasSecondEntry,
            hasWellLit: venue.hasWellLit,
            isQuiet: venue.isQuiet,
            isSpacious: venue.isSpacious,
            steps: venue.steps
          }
          const reviewsRatioWeight = getReviewsRatioWeight(reviewData)

          let selectedScore = ''
          if (reviewsRatioWeight > 0 && reviewsRatioWeight < 0.25)
            selectedScore = '-bad'
          else if (reviewsRatioWeight >= 0.25 && reviewsRatioWeight < 0.75)
            selectedScore = '-average'
          else if (reviewsRatioWeight >= 0.75 && reviewsRatioWeight <= 1)
            selectedScore = '-good'

          const selectedType = getGeneralType(venue.types)
          let backgroundIcon = 'grey'
          if (selectedScore === '-bad') backgroundIcon = 'ratingAlert'
          if (selectedScore === '-average') backgroundIcon = 'ratingCaution'
          if (selectedScore === '-good') backgroundIcon = 'ratingAccessible'
          const venueIcon = {
            url: `https://s3.amazonaws.com/axsmap-media/markers/${kebabCase(
              selectedType
            )}${selectedScore}.svg`,
            background: backgroundIcon
          }

          let entryScoreIcon = (
            <ScoreIcon>
              <Icon
                glyph="entrylg"
                size={2}
                alt="Entrance"
                color={colors.buttonColor}
              />
            </ScoreIcon>
          )
          if (venue.entryScore >= 1 && venue.entryScore < 3)
            entryScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAlert}
                textColor={colors.black}
                className="score_alert"
              >
                <Icon
                  glyph="entrylg"
                  size={2}
                  alt="Entrance"
                  className="fill-current text-black"
                  color={colors.black}
                />
              </ScoreIcon>
            )
          if (venue.entryScore >= 3 && venue.entryScore < 4)
            entryScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingCaution}
                textColor={colors.black}
                className="score_caution"
              >
                <Icon
                  glyph="entrylg"
                  size={2}
                  alt="Entrance"
                  className="fill-current text-black"
                  color={colors.black}
                />
              </ScoreIcon>
            )
          if (venue.entryScore >= 4 && venue.entryScore <= 5)
            entryScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAccessible}
                textColor={colors.black}
                className="score_accessible"
              >
                <Icon
                  glyph="entrylg"
                  size={2}
                  alt="Entrance"
                  className="fill-current text-black"
                  color={colors.black}
                />
              </ScoreIcon>
            )

          let bathroomScoreIcon = (
            <ScoreIcon>
              <Icon
                glyph="restroom"
                size={2}
                alt="Restroom"
                color={colors.buttonColor}
              />
            </ScoreIcon>
          )
          if (venue.bathroomScore >= 1 && venue.bathroomScore < 3)
            bathroomScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAlert}
                className="score_alert"
              >
                <Icon
                  glyph="restroom"
                  className="fill-current text-black"
                  color={colors.black}
                  size={2}
                  alt="Restroom"
                />
              </ScoreIcon>
            )
          if (venue.bathroomScore >= 3 && venue.bathroomScore < 4)
            bathroomScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingCaution}
                className="score_caution"
              >
                <Icon
                  glyph="restroom"
                  className="fill-current text-black"
                  color={colors.black}
                  size={2}
                  alt="Restroom"
                />
              </ScoreIcon>
            )
          if (venue.bathroomScore >= 4 && venue.bathroomScore <= 5)
            bathroomScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAccessible}
                className="score_accessible"
              >
                <Icon
                  glyph="restroom"
                  className="fill-current text-black"
                  color={colors.black}
                  size={2}
                  alt="Restroom"
                />
              </ScoreIcon>
            )

          let stepsScoreBox = (
            <ScoreIcon>
              <Icon
                glyph="interior"
                size={2.5}
                alt="Interior"
                color={colors.buttonColor}
              />
            </ScoreIcon>
          )
          if (venue.interiorScore >= 1 && venue.interiorScore < 3) {
            stepsScoreBox = (
              <ScoreIcon
                backgroundColor={colors.ratingAccessible}
                className="score_accessible"
              >
                <Icon
                  glyph="interior"
                  size={2.5}
                  className="fill-current text-black"
                  color={colors.black}
                  alt="Interior"
                />
              </ScoreIcon>
            )
          } else if (venue.interiorScore >= 3 && venue.interiorScore < 4) {
            stepsScoreBox = (
              <ScoreIcon
                backgroundColor={colors.ratingCaution}
                className="score_caution"
              >
                <Icon
                  glyph="interior"
                  size={2.5}
                  className="fill-current text-black"
                  color={colors.black}
                  alt="Interior"
                />
              </ScoreIcon>
            )
          } else if (venue.interiorScore >= 4 && venue.interiorScore <= 5) {
            stepsScoreBox = (
              <ScoreIcon
                backgroundColor={colors.ratingAlert}
                className="score_alert"
              >
                <Icon
                  glyph="interior"
                  size={2.5}
                  className="fill-current text-black"
                  color={colors.black}
                  alt="Interior"
                />
              </ScoreIcon>
            )
          }

          let detailsScore = (
            <ScoreDetail>
              {context.intl.formatMessage(messages.scoreDefaultMessage)}
            </ScoreDetail>
          )

          if (
            venue.bathroomScore === 0 &&
            venue.entryScore === 0 &&
            venue.interiorScore === 0
          )
            detailsScore = (
              <ScoreDetail>
                {context.intl.formatMessage(messages.scoreDefaultMessage)}
              </ScoreDetail>
            )
          else if (
            venue.bathroomScore !== 0 ||
            venue.entryScore !== 0 ||
            venue.interiorScore !== 0
          )
            detailsScore = (
              <ScoreDetail>
                {context.intl.formatMessage(messages.scoreDetailsMessage)}
              </ScoreDetail>
            )

          // const maxScore = 5;
          // const entryScoreStars = [];
          // const bathroomScoreStars = [];
          // for (let i = 1; i <= maxScore; i += 1) {
          //   const YellowStar = (
          //     <ScoreStar
          //       key={i}
          //       glyph="star"
          //       size={1}
          //       color={colors.ratingCaution}
          //     />
          //   );
          //   const GreyStar = (
          //     <ScoreStar key={i} glyph="star" size={1} color={colors.grey} />
          //   );

          //   if (Math.floor(venue.entryScore) >= i) {
          //     entryScoreStars.push(YellowStar);
          //   } else {
          //     entryScoreStars.push(GreyStar);
          //   }

          //   if (Math.floor(venue.bathroomScore) >= i) {
          //     bathroomScoreStars.push(YellowStar);
          //   } else {
          //     bathroomScoreStars.push(GreyStar);
          //   }
          // }

          return (
            <Card
              key={venue.placeId}
              to={`venues/${venue.placeId}`}
              disabled={props.sendingRequest}
              onFocus={props.setCenterLocation(venue.location)}
            >
              <Grid className="is-full">
                <Grid.Unit
                  size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 1 / 1 }}
                  verticalAlign="top"
                >
                  <Info>
                    <Name>{venue.name}</Name>
                    <Address>{venue.address}</Address>
                  </Info>
                </Grid.Unit>
                <Grid.Unit
                  size={{ tablet: 1 / 2, desktop: 1 / 2 }}
                  verticalAlign="top"
                  className="mobile-hide"
                >
                  {venue.photo ? (
                    <Photo backgroundImage={venue.photo} />
                  ) : (
                    <IconMarker
                      backgroundImage={venueIcon.url}
                      backgroundColor={venueIcon.background}
                    />
                  )}
                </Grid.Unit>
                <Grid.Unit
                  size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 1 / 2 }}
                  verticalAlign="top"
                  className="bg-blue100"
                >
                  <Grid className="is-full">
                    <Grid.Unit size={1 / 3}>
                      <ScoreHeader>
                        {context.intl.formatMessage(messages.entrance)}
                      </ScoreHeader>
                    </Grid.Unit>
                    <Grid.Unit size={1 / 3}>
                      <ScoreHeader>
                        {context.intl.formatMessage(messages.interior)}
                      </ScoreHeader>
                    </Grid.Unit>
                    <Grid.Unit size={1 / 3}>
                      <ScoreHeader>
                        {context.intl.formatMessage(messages.restroom)}
                      </ScoreHeader>
                    </Grid.Unit>
                  </Grid>
                  <Grid className="is-full">
                    <Grid.Unit size={1 / 3} className="bg-blue100">
                      <ScoreWrapper>{entryScoreIcon}</ScoreWrapper>
                    </Grid.Unit>
                    <Grid.Unit size={1 / 3} className="bg-blue100">
                      <ScoreWrapper>{stepsScoreBox}</ScoreWrapper>
                    </Grid.Unit>
                    <Grid.Unit size={1 / 3} className="bg-blue100">
                      <ScoreWrapper>{bathroomScoreIcon}</ScoreWrapper>
                    </Grid.Unit>
                  </Grid>
                  <Grid className="is-full">
                    <Grid.Unit size={1 / 1}>
                      <ScoreDescription>{detailsScore}</ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Grid.Unit>
              </Grid>
            </Card>
          )
        })}
      </CardsWrapper>
    )}

    <ButtonsWrapper>
      {props.incomingVenues ? (
        <Button
          float
          backgroundColor={colors.ratingCaution}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
          onClickHandler={props.getVenues}
          className="primary-btn px-2"
        >
          <ButtonContent>
            <Icon glyph="load" size={1} color={colors.darkestGrey} />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {context.intl.formatMessage(messages.loadMoreButton)}
            </p>
          </ButtonContent>
        </Button>
      ) : null}

      <ShowMapButton
        float
        backgroundColor={colors.gray500}
        color={colors.white}
        disabled={props.sendingRequest}
        onClickHandler={props.showMap}
        className="gray-btn"
      >
        <ButtonContent>
          <Icon glyph="map" size={1} />
          <p style={{ margin: '0 0 0 0.5rem' }}>
            {context.intl.formatMessage(messages.showMapButton)}
          </p>
        </ButtonContent>
      </ShowMapButton>
    </ButtonsWrapper>

    <GoogleBanner />

    <Footer hideOn="phone,tablet" wFontSize="0.9rem" />
  </Wrapper>
)

List.propTypes = {
  visible: PropTypes.bool.isRequired,
  loadingVenues: PropTypes.bool.isRequired,
  venues: PropTypes.array.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  incomingVenues: PropTypes.bool.isRequired,
  setCenterLocation: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  showMap: PropTypes.func.isRequired
}

List.contextTypes = {
  intl: intlShape
}

export default List
