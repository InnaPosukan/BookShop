const{Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController{
    async create (req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
}
async deleteById(req, res) {
    const { id } = req.params; 

    try {
        const deletedType = await Type.destroy({
            where: { id },
        });

        if (deletedType) {
            return res.json({ message: 'Type deleted successfully' });
        } else {
            throw ApiError.NotFound('Type not found'); 
        }
    } catch (error) {
        console.error('Error deleting type by ID:', error);
        return next(ApiError.Internal('Error deleting type'));
    }
}

}
module.exports = new TypeController()