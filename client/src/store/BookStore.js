import{makeAutoObservable} from "mobx"
export default class BookStore{
    constructor(){
        this._types =[
            {id: 1, name: 'Художня'},
            {id: 1, name: 'Фантастика'}

        ]
        this._books = [
            {id: 1, name: "После", price: 150, rating: 5 }
        ]
        
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types= types
    }
    setBooks(books){
        this._books = books
    }
    get types(){
        return this._types
    }
    get books(){
        return this._books
    }
}