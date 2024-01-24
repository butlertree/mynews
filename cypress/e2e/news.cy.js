//MOUNT
describe('On Page Load', () => {
  beforeEach(() => {
    // Intercept the API request for the general category
    cy.intercept('GET', `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=f1f66cfc65f944e7b26801f4632f16f3`, {
      statusCode: 200,
      fixture: 'general.json', 
    }).as('apiRequest');
    // Visit the path
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

//PATHS
describe('Category Navigation', () => {
  //All of the categories
  const categories = ['sports', 'business', 'health', 'science', 'technology', 'entertainment'];

  beforeEach(() => {
    // Intercept for the initial page load general by default
    cy.intercept('GET', 'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=f1f66cfc65f944e7b26801f4632f16f3', {
      statusCode: 200,
      fixture: 'general.json',
    }).as('generalRequest');
    
    // Visit the main page
    cy.visit('localhost:3000/');
    cy.wait('@generalRequest');
  });

  categories.forEach(category => {
    it(`should navigate to the ${category} category and display correct news`, () => {
      // Intercept for each category selection
      cy.intercept('GET', `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=f1f66cfc65f944e7b26801f4632f16f3`, {
        statusCode: 200,
        fixture: `${category}.json`,
      }).as('categoryRequest');

      // Select the category from the dropdown
      cy.get('select').select(category);
      cy.wait(`@categoryRequest`);

      cy.get('h2').should('contain', `${category.charAt(0).toUpperCase() + category.slice(1)} News`);


      if (category === 'sports') {
        // Add assertions 
        cy.get('.news-container').children().should('have.length', 5);
        
        cy.get('img[src="https://cdn.theathletic.com/app/uploads/2024/01/17103500/warriors-dejan-milojevic-1-scaled.jpg"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "Warriors game postponed after assistant Dejan Milojevic hospitalized in Utah with medical emergency - The Athletic");
        cy.get('.news-container').first().should('contain', "Milojević was hospitalized in Salt Lake City, Utah, on Tuesday night after suffering a medical emergency at a private team dinner.");
        cy.get('.news-container').first().should('contain', "2024-01-17T18:18:23Z");

        cy.get('img[src="https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F1122%2Fr1256800_1296x729_16%2D9.jpg"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "Report - Colts' Jim Irsay found unresponsive at home in December - ESPN");
        cy.get('.news-container').last().should('contain', "Colts owner Jim Irsay was found unresponsive and struggling to breathe before being transported to a hospital by paramedics last month, TMZ.com reported.");
        cy.get('.news-container').last().should('contain', "2024-01-17T17:33:00Z");
      }

      if (category === 'business') {
        // Add assertions 
        cy.get('.news-container').children().should('have.length', 1);
        
        cy.get('img[src="https://image.cnbcfm.com/api/v1/image/107173255-1672767515253-gettyimages-1245963875-US_STOCKS_2023.jpeg?v=1705442968&w=1920&h=1080"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "S&P 500 falls as Treasury yields rise: Live updates - CNBC");
        cy.get('.news-container').first().should('contain', "The three major averages as Treasury yields climbed higher.");
        cy.get('.news-container').first().should('contain', "2024-01-17T18:24:00Z");

        cy.get('img[src="https://image.cnbcfm.com/api/v1/image/107173255-1672767515253-gettyimages-1245963875-US_STOCKS_2023.jpeg?v=1705442968&w=1920&h=1080"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "S&P 500 falls as Treasury yields rise: Live updates - CNBC");
        cy.get('.news-container').last().should('contain', "The three major averages as Treasury yields climbed higher.");
        cy.get('.news-container').last().should('contain', "2024-01-17T18:24:00Z");
      }

      if (category === 'health') {
        // Add assertions 
        cy.get('.news-container').children().should('have.length', 4);
        
        cy.get('img[src="https://nypost.com/wp-content/uploads/sites/2/2024/01/sick.gif?w=1024"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "Here's the reason you get sick right after being sick - New York Post ");
        cy.get('.news-container').first().should('contain', "There’s a reason you’re chronically sick during flu season — COVID-19, RSV, 100-day cough, the common cold, oh my! — and, better yet, something you can do about it.");
        cy.get('.news-container').first().should('contain', "2024-01-17T15:34:00Z");

        cy.get('img[src="https://www.eatingwell.com/thmb/6NfOzrlOgORfxS4eV9h8bS6KmiQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Valerie-Bertinellis-Current-Favorite-Snack-Is-Packed-with-10-Grams-of-Protein-196113a92c084d8fb1a899e7d5c69d15.jpg"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "Valerie Bertinelli's Current Favorite Snack Is Packed with 10 Grams of Protein - EatingWell");
        cy.get('.news-container').last().should('contain', "In a recent post, Valerie Bertinelli shared her favorite snack that she’s been loving, and it’s a protein-packed goodie with no added sugar.");
        cy.get('.news-container').last().should('contain', "2024-01-17T14:21:25Z");
      }

      if (category === 'science') {
        // Add assertions 
        cy.get('.news-container').children().should('have.length', 7);
        
        cy.get('img[src="https://cdn.vox-cdn.com/thumbor/BHrJ4HZXKGdz0axKQZ4qy8IVUt4=/307x232:1807x1017/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/25230296/stsci_01gqqfcdz3j7arc9f8qdxe0f7z__1_.jpg"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "The wildest cosmic mystery the James Webb Space Telescope has uncovered - Vox.com");
        cy.get('.news-container').first().should('contain', "The awesome, confounding James Webb Space Telescope observations scientists are scrambling to make sense of.");
        cy.get('.news-container').first().should('contain', "2024-01-17T16:35:00Z");

        cy.get('img[src="https://spacenews.com/wp-content/uploads/2024/01/ax3-prelaunch.jpg"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "Third Axiom Space private astronaut mission ready for launch - SpaceNews");
        cy.get('.news-container').last().should('contain', "Axiom Space is set to launch its third private astronaut mission, although technical issues have compressed the timeline for launch preparations.");
        cy.get('.news-container').last().should('contain', "2024-01-17T12:26:18Z");
      }

      if (category === 'technology') {
        // Add assertions 
        cy.get('.news-container').children().should('have.length', 5);
        
        cy.get('img[src="https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2024/01/pixel-8-circle-to-search.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "Google 'Circle to Search' coming to Pixel 8 & S24 with awkward launch shortcut - 9to5Google");
        cy.get('.news-container').first().should('contain', "Google is following \"Now on Tap\" with a new \"Circle to Search\" feature debuting on the Pixel 8 and Samsung Galaxy S24 series...");
        cy.get('.news-container').first().should('contain', "2024-01-17T18:03:00Z");

        cy.get('img[src="https://www.gamespot.com/a/uploads/screen_kubrick/1595/15950357/4247190-nvidia.png"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "Nvidia GeForce RTX 4070 Super Now Available - Here's Where It's In Stock - GameSpot");
        cy.get('.news-container').last().should('contain', "Retailers are selling out of the new RTX 4070 Super, but there are still a few places with availability.");
        cy.get('.news-container').last().should('contain', "2024-01-17T16:03:56Z");
      }

      if (category === 'entertainment') {
        // Add assertions 
        cy.get('.news-container').children().should('have.length', 2);
        
        cy.get('img[src="https://variety.com/wp-content/uploads/2024/01/SMS_005.png?w=1000&h=563&crop=1"]').should('be.visible');
        cy.get('.news-container').first().should('contain', "‘Stop Making Sense’ Returning to Theaters (Again!) With Cinematic Celebration Tour (EXCLUSIVE) - Variety");
        cy.get('.news-container').first().should('contain', "A24 is bringing Talking Heads' 'Stop Making Sense' concert film back to movie theaters in celebration of its 40th anniversary.");
        cy.get('.news-container').first().should('contain', "2024-01-17T17:00:00Z");

        cy.get('img[src="https://variety.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-17-at-11.14.16-AM.png?w=1000&h=563&crop=1"]').should('be.visible');
        cy.get('.news-container').last().should('contain', "Pauly Shore to Play Richard Simmons in New Biopic - Variety");
        cy.get('.news-container').last().should('contain', "Pauly Shore is getting ready to sweat to the oldies, as the actor and comedian will play fitness icon Richard Simmons in a new biopic.");
        cy.get('.news-container').last().should('contain', "2024-01-17T16:32:00Z");
      }
    });
  });
});

//DETAIL PAGE
describe('Detail Page Navigation', () => {
  beforeEach(() => {
    // Intercept the API request for the general category
    cy.intercept('GET', `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=f1f66cfc65f944e7b26801f4632f16f3`, {
      statusCode: 200,
      fixture: 'general.json', 
    }).as('apiRequest');
    // Visit the path
    cy.visit('localhost:3000/');
    // Wait for the API request to complete
    cy.wait('@apiRequest');
  });

  it('should navigate to the detail page of the first news item and display correct information', () => {
    // Click on the first news item
    cy.get('.news-container').children().first().click();

    // Assertions to verify the details 
    cy.get('.card-detail').should('exist').and('contain', 'Trump looks on as E Jean Carroll testifies Trump shattered her reputation - BBC.com');
    cy.get('.news-image').should('exist').and('have.attr', 'src').and('include', 'https://ichef.bbci.co.uk/news/1024/branded_news/05EB/production/_132351510_c09127023cff7280b9010db7f0c47f127c578492.jpg');
    cy.get('.card-detail').should('exist').and('contain', 'E Jean Carroll looks on during opening arguments on Tuesday\r\nE Jean Carroll has testified that Donald Trump \"shattered\" her reputation after she accused him of sexually assaulting her in the 1990s.\r\n… [+4748 chars]');
    cy.get('.description').should('exist').and('contain', '2024-01-17T18:16:00Z');
    cy.get('.description a').should('exist').and('have.attr', 'href').and('include', 'https://www.bbc.com/news/world-us-canada-68009461');
  });
});
