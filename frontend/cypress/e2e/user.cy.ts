import loginSel from "../selectors/login.sel";
import userSel from "../selectors/user.sel";
import users from "../fixtures/users/id";

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

    it("Shopping: sorting by newest", () => {
        const initialOrder = [];
        cy.get(".grid").children().each($el => {
            initialOrder.push($el.attr("data-created-at"));
        }).then(() => {
            const sortedOrderByDate = initialOrder.sort((a, b) => a - b);
 
            cy.get(userSel.sortField).select("Newest");
            cy.wait(400);

            cy.get(".grid").children().each(($el, index) => {
                cy.wrap($el).invoke("attr", "data-created-at").should("equal", sortedOrderByDate[index]);
            }); 
        });
    });

    it("Shopping: sorting by price from high to low", () => {
        const initialOrder: number[] = [];
        cy.get(".grid").children().each($el => {
            initialOrder.push(Number($el.attr("data-price")));
        }).then(() => {
            const sortedOrderByPrice = initialOrder.sort((a, b) => b - a);
            cy.get(userSel.sortField).select("Price: High to low");
            cy.wait(400);

            cy.get(".grid").children().each(($el, index) => {
                cy.wrap($el).invoke("attr", "data-price").should("equal", sortedOrderByPrice[index].toString());
            }); 
        });
    });
    
    it("Shopping: sorting by price from low to high", () => {
        const initialOrder: number[] = [];
        cy.get(".grid").children().each($el => {
            initialOrder.push(Number($el.attr("data-price")));
        }).then(() => {
            const sortedOrderByPrice = initialOrder.sort((a, b) => a - b);
            cy.get(userSel.sortField).select("Price: Low to high");
            cy.wait(400);

            cy.get(".grid").children().each(($el, index) => {
                cy.wrap($el).invoke("attr", "data-price").should("equal", sortedOrderByPrice[index].toString());
            }); 
        });
    });
});

describe("User: profile", () => {
    beforeEach(() => {
        cy.visit("/auth/login");
        cy.get(loginSel.emailField).clear().type("bobsmith@gmail.com");
        cy.get(loginSel.passwordField).clear().type("123456");
        cy.get(loginSel.signInButton).click();
        cy.wait(1500);
        cy.visit("/dashboard");
        cy.get("[data-cy=\"profile-btn\"]").click();
    });

    it("Successfully updating the profile", () => {
        cy.intercept("PATCH", `${Cypress.env("apiUrl")}/users/update/${users.BOB_SMITH_FIREBASE_ID}`, {
            statusCode: 200,
            body: {
                user: {
                    firebaseId: users.BOB_SMITH_FIREBASE_ID
                }
            }
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
        cy.on("uncaught:exception", (err, runnable) => {
            return false;
        });

        cy.get(userSel.emailField).clear().type("admin@gmail.com");
        cy.get(userSel.updateButton).click();
        cy.get(".Toastify__toast-body").should("have.text", "User with given email already exists");
    });
});