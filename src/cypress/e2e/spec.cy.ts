import { isPermissionAllowed, isPermissionBlocked, isPermissionAsk } from 'cypress-browser-permissions'

describe('My tests', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  isPermissionBlocked('geolocation') &&
    it('should warn user desktop notifications are disabled', () => {
      /* ... */
    })
})