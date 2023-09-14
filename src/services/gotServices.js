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
		const defaultText = "N/A";
		return {
			name: char.name || defaultText,
			gender: char.gender || defaultText,
			born: char.born || defaultText,
			died: char.died || defaultText,
			culture: char.culture || defaultText
		}
	}
	_transformHouses(house) {
		const defaultText = "N/A";
		return {
			name: house.name || defaultText,
			region: house.region || defaultText,
			words: house.words || defaultText,
			titles: house.titles || defaultText,
			overlord: house.overlord || defaultText,
			ancestralWeapons: house.ancestralWeapons || defaultText
		}
	}
	_transformBooks(book) {
		const defaultText = "N/A";
		return {
			name: book.name || defaultText,
			isbn: book.isbn || defaultText,
			authors: book.authors || defaultText,
			numberOfPages: book.numberOfPages || defaultText,
			publisher: book.publisher || defaultText,
			mediaType: book.mediaType || defaultText,
			released: book.released || defaultText
		}
	}
}