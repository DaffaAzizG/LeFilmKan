describe("About Page Testing", () => {
  it("Visits the About page and performs necessary checks", () => {
    // 1. Visit the About page
    cy.visit("/detail/:id");

    // 2. Scroll to the bottom of the page
    cy.scrollTo("bottom");

    // 3. Check the bottom-most text (excluding footer)
    cy.get("body")
      .children()
      .last()
      .should("contain.text", "Kalimat paling bawah yang bukan footer");
  });
});
