describe("Session page", () => {
  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    cy.get("[data-cy=AllSessions]").as("AllSessions");
    cy.get("[data-cy=Wednesday]").as("Wednesday");
    cy.get("[data-cy=Thursday]").as("Thursday");
    cy.get("[data-cy=Friday]").as("Friday");
    cy.intercept("POST", "http://localhost:5000/graphql").as("getSessionInfo");
  });

  it("should navigate to conference session page and view day filter buttons", () => {
    cy.get("@AllSessions");
    cy.get("@Wednesday");
    cy.get("@Thursday");
    cy.get("@Friday");
  });
  it("should display all session when allsession button is clicked", () => {
    cy.get("@AllSessions").click();
    cy.wait("@getSessionInfo");

    // Assesion
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });

  it("should filter session and only display wednesday session when wednesday button is clicked", () => {
    cy.get("@Wednesday").click();
    cy.wait("@getSessionInfo");

    // Assession
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter session and only display thursday session whe thursday button is clicked", () => {
    cy.get("@Thursday").click();
    cy.wait("@getSessionInfo");

    // Assesions
    cy.get("[data-cy=day]").should("have.length", 98);
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter session and only display friday session when friday button is clicked", () => {
    cy.get("@Friday").click();
    cy.wait("@getSessionInfo");

    // Assetion
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
  });
});
