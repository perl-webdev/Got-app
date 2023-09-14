export default class GotService {
	constructor() {
		this._apiBase = 'https://anapioficeandfire.com/api'
	}

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, received status ${res.status}`);
		}
		return await res.json();
	}

	async getAllCharacters() {
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
	}
	async getCharacters(id) {
		const res = await this.getResource(`/characters/${id}/`);
		return this._transformCharacter(res);
	}
	getAllBooks() {
		return this.getResource(`/books/`);
	}
	getBooks(id) {
		return this.getResource(`/books/${id}/`)
	}
	getAllHouses() {
		return this.getResource(`/houses/`);
	}
	getHouses(id) {
		return this.getResource(`/houses/${id}/`)
	}
	_transformCharacter(char) {
		return {
			name: char.name,
			gender: char.gender,
			born: char.born,
			died: char.died,
			culture: char.culture
		}
	}
	_transformHouses(house) {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons
		}
	}
	_transformBooks(book) {
		return {
			name: book.name,
			isbn: book.isbn,
			authors: book.authors,
			numberOfPages: book.numberOfPages,
			publisher: book.publisher,
			mediaType: book.mediaType,
			released: book.released
		}
	}
}