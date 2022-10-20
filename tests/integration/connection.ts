import { issueBook, returnBook, deleteBook } from "../../queries";
import { expect } from "chai";

describe("issueBook", () => {
    it("should issue a book", async () => {
        const book = {
            id: 0,
            name: "The Alchemist",
            author: "Paulo Coelho",
            avail: true
        };
        const issue = await issueBook(book);
        expect(issue).to.be.an("object");
    });
});

describe("returnBook", () => {
    it("should return a book", async () => {
        const book = {
            id: 0,
            name: "The Alchemist",
            author: "Paulo Coelho",
            avail: false
        };
        const returned = await returnBook(book);
        expect(returned).to.be.an("object");
    });
});

describe("deleteBook", () => {
    it("should delete a book", async () => {
        const book = {
            id: 0,
            name: "The Alchemist",
            author: "Paulo Coelho",
            avail: false
        };
        const deleted = await deleteBook(book);
        expect(deleted).to.be.an("object");
    });
});

