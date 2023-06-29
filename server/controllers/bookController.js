const uuid = require('uuid')
const path  = require('path')
const{Book, BookInfo}=require('../models/models')
const ApiError = require('../error/ApiError')
class BookController{
    async create (req, res, next) {
        try{
        const {name, price, typeId, info} = req.body
        const{img}=req.files
        let fileName = uuid.v4()+".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const device = await Book.create({name, price,typeId, img: fileName})

        if(info){
            info = JSON.parse(info)
            info.forEach(i => 
                BookInfo.create({
                    title: i.title,
                    description: i.description,
                    bookId: book.id
            })
         )  
        }
    
        return res.json(device)
    }catch(e){
        next(ApiError.badRequest(e.message))
    }
}
    async getAll(req, res){
        let {typeId, limit, page}  = req.query
        page = page || 1
        limit = limit || 9
        let offset = page *limit -limit
        let books;

        if(!typeId){
            books = await Book.findAndCountAll(limit, offset)
        }
        if(typeId){
            books = await Book.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(books);

    }
    async getOne(req, res){
        const{id} = req.params
        const book = await Book.findOne({
            where:{id},
            includ:[{model:BookInfo, as: 'info'}]
        },
        )
        return res.json(device)
    }
}
module.exports = new BookController()