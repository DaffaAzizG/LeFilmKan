describe("Detail Film Page Testing", () => {
  it("Visits the Detail Film page and performs necessary checks", () => {
    cy.visit("/detail/123");
    cy.scrollTo("bottom", { duration: 15000 });
    cy.contains(
      "Haloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
    ).should("be.visible");
  });
});
