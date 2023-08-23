import adminSel from "../selectors/admin.sel";
import loginSel from "../selectors/login.sel";

describe("Admin", () => {
    before(() => {
        cy.visit("/auth/login");
        cy.get(loginSel.emailField).clear().type("admin@gmail.com");
        cy.get(loginSel.passwordField).clear().type("123456");
        cy.get(loginSel.signInButton).click();
    });

    it("Admin: create a new product", () => {
        cy.visit("/dashboard");
        cy.get("#create-product").click();
        cy.get(adminSel.productNameField).type("MacBook Pro");
        cy.get(adminSel.productDescriptionField).type("This is a MacBook Pro");
        cy.get(adminSel.productPriceField).type("1000");
        cy.get(adminSel.productQuantityField).type("10");
        cy.get(adminSel.productCategoryField).type("Electronics");
        cy.get(adminSel.productImageField).click().selectFile("cypress/fixtures/products/macbook.jpeg");
        cy.get("#submitProductForm").click();
        cy.wait(3000);
        cy.get(adminSel.firstProductTitle).should("have.text", "MacBook Pro");
    });

    it("Admin: edit a product", () => {
        cy.visit("/dashboard");
        cy.get("#editProductButton").eq(0).click();
        cy.get(adminSel.productNameField).clear().type("Headphones");
        cy.get(adminSel.productDescriptionField).clear().type("This is a pair of headphones");
        cy.get(adminSel.productPriceField).clear().type("100");
        cy.get(adminSel.productQuantityField).clear().type("10");
        cy.get(adminSel.productCategoryField).clear().type("Electronics");
        cy.get(adminSel.productImageField).click();
        cy.get(adminSel.productImageField).click().selectFile("cypress/fixtures/products/headphones.jpeg");
        cy.get("#submitProductForm").click();
        cy.wait(3000);
        cy.get(adminSel.firstProductTitle).should("contain.text", "Headphones");
    });

    it("Admin: delete a product", () => {
        cy.visit("/dashboard");
        cy.get("#deleteProductButton").eq(0).click();
        cy.get(adminSel.firstProductTitle).should("satisfy", ($el) => {
            return $el.text() !== "Headphones";
        });
    });
});