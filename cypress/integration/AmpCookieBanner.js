import config from '../support/config';

const getPrivacyBanner = () =>
  cy.contains("We've updated our Privacy and Cookies Policy");

const getCookieBanner = () => cy.contains('Let us know you agree to cookies');

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}.amp`);
  });

  it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    cy.contains('OK').click();

    getCookieBanner().should('be.visible');
    getPrivacyBanner().should('not.be.visible');

    cy.contains('Yes, I agree').click();

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');
  });

  it('should show privacy banner on reload if cookie banner isnt accepted', () => {
    cy.contains('OK').click();

    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}.amp`);

    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');
  });

  it('should not show banners once accepted on reload', () => {
    cy.contains('OK').click();
    cy.contains('Yes, I agree').click();

    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}.amp`);

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('not.be.visible');
  });

  it('should not show banners if cookie banner declined on reload', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    cy.contains('OK').click();
    cy.contains('No, take me to settings').click();

    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}.amp`);

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('not.be.visible');
  });
});
