import { createSelector } from 'reselect'

const selectSignUp = state => state.signUp

export const makeSelectSuccessMessage = () =>
  createSelector(selectSignUp, signUpState => signUpState.successMessage)

export const makeSelectErrorMessage = () =>
  createSelector(selectSignUp, signUpState => signUpState.errorMessage)

export const makeSelectData = () =>
  createSelector(selectSignUp, signUpState => signUpState.data)

export const makeSelectErrors = () =>
  createSelector(selectSignUp, signUpState => signUpState.errors)

export const makeSelectShowPassword = () =>
  createSelector(selectSignUp, signUpState => signUpState.showPassword)
