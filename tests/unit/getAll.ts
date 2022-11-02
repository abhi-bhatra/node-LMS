import { expect } from 'chai';
import { getBooks } from '../../src/queries';

// to mock the data in getBooks

describe('getBooks', () => {
    it('should return all books', async () => {
        const books = await getBooks();
        expect(books.rows).to.be.an('array');
    });
});
