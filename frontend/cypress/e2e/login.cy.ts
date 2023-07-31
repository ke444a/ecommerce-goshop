/// <reference types="Cypress" />
import loginSel from "../selectors/login.sel";

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/auth/login");
    });

    it("Successful login as admin", () => {
        cy.get(loginSel.emailField).type("admin@gmail.com");
        cy.get(loginSel.passwordField).type("123456");
        cy.get(loginSel.signInButton).click();
        cy.url().should("be.equals", Cypress.env("frontendUrl"));
    });

    it("Successful login as user", () => {
        cy.get(loginSel.emailField).type("bobsmith@gmail.com");
        cy.get(loginSel.passwordField).type("123456");
        cy.get(loginSel.signInButton).click();
        cy.url().should("be.equals", Cypress.env("frontendUrl"));
    });

    it("Unsuccessful login: wrong data", () => {
        cy.get(loginSel.emailField).type("user@gmail.com");
        cy.get(loginSel.passwordField).type("12345");
        cy.get(loginSel.signInButton).click();
        cy.get(".Toastify__toast-body").should("be.visible");
    });

    it("Unsuccesful login: not all fields filled in", () => {
        cy.get(loginSel.emailField).type("bobsmith@gmail.com");
        cy.get(loginSel.signInButton).click();
        cy.get("p.text-red-500").should("have.text", "Password is required");
        cy.get(loginSel.passwordField).type("123456");
        cy.get(loginSel.signInButton).click();
        cy.url().should("be.equals", Cypress.env("frontendUrl"));
    });
});