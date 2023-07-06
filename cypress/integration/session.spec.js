describe("Session page", () => {
  it("should navigate to conference session page and view day filter buttons", () => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // validate if the filter buttons exists.

    cy.get("[data-cy=AllSessions]");
    cy.get("[data-cy=Wednesday]");
    cy.get("[data-cy=Thursday]");
    cy.get("[data-cy=Friday]");
  });

  it("should filter session and only display wednesday session when wednesday button is clicked", () => {
    cy.get("[data-cy=Wedneday]").click();
  });
});
