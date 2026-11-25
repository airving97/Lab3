describe('Portfolio visitor', () => {
  it('opens Projects from Home and displays a project from the API', () => {
    cy.intercept('GET', '**/api/projects').as('projects');
    cy.visit('/');
    cy.contains('a', 'View Projects').click();
    cy.location('pathname').should('equal', '/projects');
    cy.wait('@projects').its('response.statusCode').should('equal', 200);
    cy.contains('h1', 'Featured Projects').should('be.visible');
    cy.contains('h3', 'CI portfolio project').should('be.visible');
    cy.screenshot('projects-result');
  });
});
