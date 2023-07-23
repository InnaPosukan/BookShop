import{makeAutoObservable} from "mobx"
export default class BookStore{
    constructor(){
        this._types =[
          
        ]
        this._books = [
            {id: 1, name: "После", price: 150, rating: 5 },
            {id: 2, name: "После", price: 150, rating: 5 },
            {id: 3, name: "После", price: 150, rating: 5 },
            {id: 4, name: "После", price: 150, rating: 5 },
            {id: 5, name: "После", price: 150, rating:4 },
            {id: 6, name: "После", price: 150, rating: 5 },
            {id: 7, name: "После", price: 150, rating: 5 }



        ]
        this._selectedType ={

        }
        
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types= types
    }
    setBooks(books){
        this._books = books
    }
    setSelectedType(type){
        this._selectedType = type

    }
    get types(){
        return this._types
    }
    get books(){
        return this._books
    }
    get selectedType(){
        return this._selectedType
    }

}