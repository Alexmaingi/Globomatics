describe("Session page", () => {
  const thursdaySessionsData = {
    data: {
      intro: [
        {
          id: "78170",
          title: "Cypress 9 Fundementals",
          startsAt: "8:30",
          day: "Thursday",
          room: "Jupiter",
          level: "Introductory and overview",
          speakers: [
            {
              id: "37313769-11ae-4245-93b3-e6e60d5187c",
              name: "Adhithi Ravichadran",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
      intermidiate: [
        {
          id: "85324",
          title: "Bombo Spec",
          startsAt: "8:30",
          day: "Thursday",
          room: "Io",
          level: "Intermidiate",
          speakers: [
            {
              id: "e9c40ccc-1ffd-44f5-90c2-9d69ada76073",
              name: "Benjamin Cox",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
      advanced: [
        {
          id: "84969",
          title: "Microservices -- The Hard Way is the rigt Way",
          startsAt: "9:45",
          day: "Thursday",
          room: "Ganymede",
          level: "Advanced",
          speakers: [
            {
              id: "60e31e1b-2d77-4f36-8e11-4d9f8b639bc8",
              name: "Joe Lopez",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
    },
  };

  beforeEach(() => {
    cy.clickViewSession();

    cy.dataCy("AllSessions").as("AllSessions");
    cy.dataCy("Wednesday").as("Wednesday");
    cy.dataCy("Thursday").as("Thursday");
    cy.dataCy("Friday").as("Friday");
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
    cy.dataCy("day").contains("Thursday").should("be.visible");
    cy.dataCy("day").contains("Wednesday").should("be.visible");
    cy.dataCy("day").contains("Friday").should("be.visible");
  });

  it("should filter session and only display wednesday session when wednesday button is clicked", () => {
    cy.get("@Wednesday").click();
    // cy.wait("@getSessionInfo");

    // Assession
    cy.dataCy("day").contains("Wednesday").should("be.visible");
    cy.dataCy("day").contains("Thursday").should("not.exist");
    cy.dataCy("day").contains("Friday").should("not.exist");
  });

  it("should filter session and only display thursday session whe thursday button is clicked", () => {
    cy.get("@Thursday").click();
    cy.wait("@getSessionInfo");

    // Assesions
    cy.dataCy("day").contains("Wednesday").should("not.exist");
    cy.dataCy("day").contains("Thursday").should("be.visible");
    cy.dataCy("day").contains("Friday").should("not.exist");
  });

  it("should filter session and only display friday session when friday button is clicked", () => {
    cy.get("@Friday").click();
    cy.wait("@getSessionInfo");

    // Assetion
    cy.dataCy("day").contains("Friday").should("be.visible");
    cy.dataCy("day").contains("Thursday").should("not.exist");
    cy.dataCy("day").contains("Wednesday").should("not.exist");
  });
});
