describe("Submit session", () => {
  // it runs befor each test in this describe block

  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Session").click();
    cy.url().should("include", "/sessions");
    cy.get("a").contains("Submit a Session!").click();
  });

  it("should navigate to submit session page", () => {
    cy.url().should("include", "/sessions/new");
  });

  it("should submit a session successfully", () => {
    // filling the formwith session information
    cy.contains("Title").type("New session title");
    cy.contains("Description").type("This is the gretest session");
    cy.contains("Day").type("Thursday");
    cy.contains("Level").type("Advanced");

    // submiting the form
    cy.get("form").submit();

    // validate that a succes message is displayed
    cy.contains("Session Submitted Successfully!");
  });
});
