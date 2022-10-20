import { getBooks } from "../../src/queries";
import { expect } from "chai";

describe("getBooks", () => {
    it("should return all books", async () => {
        const books = await getBooks();
        expect(books.rows).to.be.an("array");
    });
});