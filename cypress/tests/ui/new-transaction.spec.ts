describe("New Transaction", function () {
  it("navigates to the new transaction form, selects a user and submits a transaction payment", function () {
  });

  it("navigates to the new transaction form, selects a user and submits a transaction request", function () {
  });

  it("displays new transaction errors", function () {
    cy.getBySelLike("new-transaction").click();
    cy.wait("@allUsers");

    cy.getBySelLike("user-list-item").contains(ctx.contact!.firstName).click({ force: true });

    cy.getBySelLike("amount-input").type("43").find("input").clear().blur();
    cy.get("#transaction-create-amount-input-helper-text")
      .should("be.visible")
      .and("contain", "Please enter a valid amount");

    cy.getBySelLike("description-input").type("Fun").find("input").clear().blur();
    cy.get("#transaction-create-description-input-helper-text")
      .should("be.visible")
      .and("contain", "Please enter a note");

    cy.getBySelLike("submit-request").should("be.disabled");
    cy.getBySelLike("submit-payment").should("be.disabled");
    cy.visualSnapshot("New Transaction Errors with Submit Payment/Request Buttons Disabled");
  });

  it("submits a transaction payment and verifies the deposit for the receiver", function () {
  });

  it("submits a transaction request and accepts the request for the receiver", function () {
  });
});
