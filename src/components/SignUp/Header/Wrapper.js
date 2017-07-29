import styled from 'styled-components'

import { colors } from '../../../styles'

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;

  display: flex;

  height: 2.5rem;
  padding: 1rem 1rem 0 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};
`

export default Wrapper
