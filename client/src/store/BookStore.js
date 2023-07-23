import{makeAutoObservable} from "mobx"
export default class BookStore{
    constructor(){
        this._types =[
          
        ]
        this._books = [
     
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