import{makeAutoObservable} from "mobx"
export default class BookStore{
    constructor(){
        this._types =[]
        this._books = []
        this._selectedType ={}
        this._totalCount = 0
        this._page = 1
        this._limit = 8
        
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types= types
    }
    setBooks(books){
        this._books = books
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type

    }
    setPage(page){
        this._page = page

    }
    setTotalCount(count){
        this._totalCount = count

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
    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }

}