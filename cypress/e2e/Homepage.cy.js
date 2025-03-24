describe("Homepage Testing", () => {
  it("Visits the Homepage and performs necessary checks", () => {
    cy.visit("/");
    cy.scrollTo("bottom", { duration: 15000 });
    cy.contains("Selamat Datang di LeFilm Kan").should("be.visible");
    cy.get('[name= "search"]').click();
    cy.get('[name ="searchInput"]').type("Squid Game");
  });
});
