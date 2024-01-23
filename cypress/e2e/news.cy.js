//MOUNT
describe('On Page Load', () => {
  beforeEach(() => {
    // Intercept the API request for the general category
    cy.intercept('GET', `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=f1f66cfc65f944e7b26801f4632f16f3`, {
      statusCode: 200,
      fixture: 'general.json', // assuming you have a fixture for the general category
    }).as('apiRequest');
    // Visit the root path
    cy.visit('localhost:3000/');
    // Wait for the API request to complete
    cy.wait('@apiRequest');
  });
  
      it(`should display all of the general news correctly`, () => {
        cy.get('.news-container').children().should('have.length', 7)

        cy.get('img[src="https://ichef.bbci.co.uk/news/1024/branded_news/05EB/production/_132351510_c09127023cff7280b9010db7f0c47f127c578492.jpg"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "Trump looks on as E Jean Carroll testifies Trump shattered her reputation - BBC.com");
        cy.get('.news-container').first().should('contain', "The ex-president looks on as his rape accuser tells a court he branded her \"a fraud and a whack job\".");
        cy.get('.news-container').first().should('contain', "2024-01-17T18:16:00Z");

        cy.get('img[src="https://variety.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-17-at-11.14.16-AM.png?w=1000&h=563&crop=1"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "Pauly Shore to Play Richard Simmons in New Biopic - Variety");
        cy.get('.news-container').last().should('contain', "Pauly Shore is getting ready to sweat to the oldies, as the actor and comedian will play fitness icon Richard Simmons in a new biopic.");
        cy.get('.news-container').last().should('contain', "2024-01-17T16:32:00Z");
      })

      it('should display all initial UI elements correctly', () => {
    // Check Page Title
        cy.get('h1').should('contain', 'BNN');
        cy.get('h2').should('contain', 'General News');

        cy.get('nav.buttons-container a').contains('Main Page').should('be.visible');    


      });
    });
  

// ERROR HANDELING 300
 describe('Error Handling', () => {
  it('should show error messaging to a user', () => {
    cy.intercept('GET', `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=f1f66cfc65f944e7b26801f4632f16f3`, {
      forceNetworkError: true
    }).as('error');
    cy.visit('localhost:3000/');
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });
});


//ERROR HANDELING 404
describe('Error Handling', () => {
  it('should test for 404 network error', () => {
    cy.intercept('GET', `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=f1f66cfc65f944e7b26801f4632f16f3`, {
      statusCode: 200,
      fixture: 'general.json', 
    }).as('apiRequest');
    cy.visit('localhost:3000/hello');
    cy.wait('@apiRequest');
    cy.get('.not-found-container').contains('404 Page Not Found')
    cy.get('.not-found-container').contains('The page you are looking for does not exist.')
  });
});
