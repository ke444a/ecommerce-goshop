/// <reference types="Cypress" />

import signupSel from "../selectors/signup.sel";

describe("Signup", () => {
    beforeEach(() => {
        cy.visit("/auth/signup");
    });

    it("Succesful sign up as new user", () => {
        const apiUrl = Cypress.env("apiUrl");
        cy.intercept("POST", `${apiUrl}/auth/register`, {
            statusCode: 200,
            body: {
                token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY5MDUyNTcxMiwiZXhwIjoxNjkwNTI5MzEyLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1reWNpbkBlY29tbWVyY2UtbWVybi0xLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGsta3ljaW5AZWNvbW1lcmNlLW1lcm4tMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IkpYRHpYZTNEbjVNSU8zUEtRcDJqSFRhN1A3UjIifQ.TmlBczyA8DBwXFMcsKGThsCJTkwer3LCol0hpKBJSX-NnX33WvGYKyH7jwrFu7dqWCw5l9ayjL5YUwK3VFOJNTwdmh7FsHhUOv77nk2WzRmrqI-mEUreAH22UmIrZf812XWvdLCkbis10PPcQ1gtiZsu4nIQmB2RXjI4zpnoj77aProMT6htAJLdEEm4yHhFuBnOBuMVbMBxmEKs4u0DbXci6343cRbLX-HLnCgrDGkn2FpoW34f7_hicFl-OwH2zv10jbsGEHbMGMiqEbzpjCXfgDI8s-8gBAlhkOxJSYPuEgInkUMAuQ9A74gdaV4prNWMmNUKEsaKuX42EbIdbA"
            }
        });

        cy.get(signupSel.emailField).type("johndoe@gmail.com");
        cy.get(signupSel.passwordField).type("123456");
        cy.get(signupSel.passwordConfirmField).type("123456");
        cy.get(signupSel.firstNameField).type("John");
        cy.get(signupSel.lastNameField).type("Doe");
        cy.get(signupSel.signUpButton).click();
        cy.url().should("be.equals", "http://localhost:5173/");
    });

    it("Unsuccessful sign up: not all fields filled in", () => {
        cy.intercept("POST", `${Cypress.env("apiUrl")}/auth/register`, {
            statusCode: 200,
            body: {
                token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY5MDUyNTE1NywiZXhwIjoxNjkwNTI4NzU3LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1reWNpbkBlY29tbWVyY2UtbWVybi0xLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGsta3ljaW5AZWNvbW1lcmNlLW1lcm4tMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjBIWEIyWWJ0aDFPdVdMRmhLMGdhUUJURlBHOTIifQ.Ue4F4ZOFRIjW76ffEITdkTxshJDVF3N4shRaeSvRd-NjSGih2kyNzWcNFWKB48YTTWkWNkBPIvMFZCbOlS-xUagG5wToh8XJPq5za1lnH2ltEM5_b66CUdM5hbAULR4gIWHpLfE4OGMj06VQBeX0xLrnM_jsSZfVFV4ZaJRkKHAdP3fxwbLSaTUO34lxTTeEfww6HK6d9RzotKcZ909NvIiUX7wIUNC0fTNNk7JgoTRkUSKPRxFJRCgSlpOHj7JK2T0mvyS-_fiGJwqQNKEVlZij8u8TK-sgsKu9LDiLcUOi9UPPE3pU6zFUNg4V0W1dMZHIll9dbZMHfG_mPtmgOw"
            }
        });

        cy.get(signupSel.emailField).type("janedoe@gmail.com");
        cy.get(signupSel.passwordField).type("123456");
        cy.get(signupSel.passwordConfirmField).type("123456");
        cy.get(signupSel.signUpButton).click();
        cy.get(":nth-child(1) > .text-red-500").should("have.text", "First name is required");
        cy.get(signupSel.firstNameField).type("Jane");
        cy.get(signupSel.lastNameField).type("Doe");
        cy.get(signupSel.signUpButton).click();
        cy.url().should("be.equals", "http://localhost:5173/");
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