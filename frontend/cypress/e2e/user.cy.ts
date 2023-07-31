import loginSel from "../selectors/login.sel";
import userSel from "../selectors/user.sel";

describe("User: shopping", () => {
    beforeEach(() => {
        cy.visit("/products/shop");
    });

    it("Shopping: search for a product", () => {
        cy.visit("/products/shop");
        cy.get(":nth-child(2) > .text-center > .text-xl").invoke("text").then(title => {
            const text = title.split(" ")[0];
            cy.get(userSel.searchField).clear().type(text);
            cy.get(":nth-child(1) > .text-center > .text-xl").contains(text, { matchCase: false });
        });
    });

    it("Shopping: unsuccesful search for a product", () => {
        cy.visit("/products/shop");
        cy.get(userSel.searchField).clear().type("Unreal MacBook");
        cy.get(".grid").children().should("not.exist");
    });

    it("Shopping: filtering by category", () => {
        cy.get(userSel.categoryField).select(2).invoke("val").then(selectedCategory => {
            cy.wait(300);
            cy.get(".grid").children().each($el => {
                cy.wrap($el).invoke("attr", "data-category").should("equal", selectedCategory);
            }); 
        });
    });

    // it("Shopping: sorting by newest", () => {
    // });

    // it("Shopping: sorting by price from high to low", () => {

    // });
    
    // it("Shopping: sorting by price from low to high", () => {
        
    // });
});

describe("User: profile", () => {
    beforeEach(() => {
        cy.visit("/auth/login");
        cy.get(loginSel.emailField).clear().type("bobsmith@gmail.com");
        cy.get(loginSel.passwordField).clear().type("123456");
        cy.get(loginSel.signInButton).click();
        cy.wait(1500);
        cy.visit("/dashboard");
        cy.get(".text-secondary > span").click();
    });

    it("Successfully updating the profile", () => {
        cy.intercept("PATCH", `${Cypress.env("apiUrl")}/users/update/3jsm6dS1FRhWsYSuoyGBEqXtglu2`, {
            statusCode: 200
        });

        cy.get(userSel.emailField).clear().type("johndoe@gmail.com");
        cy.get(userSel.firstNameField).clear().type("John");
        cy.get(userSel.lastNameField).clear().type("Doe");
        cy.get(userSel.updateButton).click();
        cy.get(".Toastify__toast-body").should("have.text", "User updated successfully");
    });

    it("Updating the profile with not full credentials", () => {
        cy.get(userSel.firstNameField).clear();
        cy.get(userSel.updateButton).click();
        cy.get("p.text-red-500").should("have.text", "This field is required.");
    });

    it("Updating the profile with already existing email", () => {
        cy.get(userSel.emailField).clear().type("admin@gmail.com");
        cy.get(userSel.updateButton).click();
        cy.get(".Toastify__toast-body").should("have.text", "User with given email already exists");
    });
});