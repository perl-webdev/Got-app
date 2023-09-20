export default class GotService {
	constructor() {
		this._apiBase = 'https://anapioficeandfire.com/api'
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received status ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
	}
	getCharacters = async (id) => {
		const res = await this.getResource(`/characters/${id}/`);
		return this._transformCharacter(res);
	}
	getAllBooks = async () => {
		const res = await this.getResource(`/books/`);
		return res.map(this._transformBooks);
	}
	getBooks = async (id) => {
		const res = await this.getResource(`/books/${id}`);
		return this._transformBooks(res); // Return the transformed book object, not an array
	}
	getAllHouses = async () => {
		const res = await this.getResource(`/houses/`);
		return res.map(this._transformHouses);
	}
	getHouses = async (id) => {
		const res = await this.getResource(`/houses/${id}/`);
		return this._transformHouses(res);
	}

	isSet(data) {
		return data ? data : 'N/A';
	}
	_extractId = (item) => {
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	}

	_transformCharacter = (char) => {
		return {
			id: this._extractId(char),
			name: this.isSet(char.name),
			gender: this.isSet(char.gender),
			born: this.isSet(char.born),
			died: this.isSet(char.died),
			culture: this.isSet(char.culture)
		}
	}
	_transformHouses = (house) => {
		return {
			id: this._extractId(house),
			name: this.isSet(house.name),
			region: this.isSet(house.region),
			words: this.isSet(house.words),
			titles: this.isSet(house.titles),
			seats: this.isSet(house.seats),
			ancestralWeapons: this.isSet(house.ancestralWeapons)
		}
	}
	_transformBooks = (book) => {
		return {
			id: this._extractId(book),
			name: this.isSet(book.name),
			isbn: this.isSet(book.isbn),
			authors: this.isSet(book.authors),
			numberOfPages: this.isSet(book.numberOfPages),
			publisher: this.isSet(book.publisher),
			mediaType: this.isSet(book.mediaType),
			released: this.isSet(book.released)
		}
	}
}