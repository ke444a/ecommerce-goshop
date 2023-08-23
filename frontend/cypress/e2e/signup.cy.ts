/// <reference types="Cypress" />

import signupSel from "../selectors/signup.sel";

describe("Signup", () => {
    beforeEach(() => {
        cy.visit("/auth/signup");
    });

    it("Unsuccessful sign up: not all fields filled in", () => {
        cy.get(signupSel.emailField).type("janedoe@gmail.com");
        cy.get(signupSel.passwordField).type("123456");
        cy.get(signupSel.passwordConfirmField).type("123456");
        cy.get(signupSel.signUpButton).click();
        cy.get(":nth-child(1) > .text-red-500").should("have.text", "First name is required");
    });

    it("Unsuccessful sign up: existing email", () => {
        cy.on("uncaught:exception", (err, runnable) => {
            return false;
        });

        cy.get(signupSel.emailField).type("bobsmith@gmail.com");
        cy.get(signupSel.passwordField).type("123456");
        cy.get(signupSel.passwordConfirmField).type("123456");
        cy.get(signupSel.firstNameField).type("Bob");
        cy.get(signupSel.lastNameField).type("Smith");
        cy.get(signupSel.signUpButton).click();
        cy.get(".Toastify__toast-body").should("be.visible");
    });

    it("Unsuccessful sign up: passwords do not match", () => {
        cy.get(signupSel.emailField).type("bobsmith@gmail.com");
        cy.get(signupSel.passwordField).type("password");
        cy.get(signupSel.passwordConfirmField).type("passwor");
        cy.get(signupSel.firstNameField).type("Bob");
        cy.get(signupSel.lastNameField).type("Smith");
        cy.get(signupSel.signUpButton).click();
        cy.get("p.text-red-500").should("have.text", "Passwords do not match");
    });
});