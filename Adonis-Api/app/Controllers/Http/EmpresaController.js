'use strict'

const Empresa = use('App/Models/Empresa')

class EmpresaController {

    async index({response}){
        let empresas = await Empresa.all()

        return response.json(empresas)
    }

    async store({request, response}){
        const info = request.all()

        const empresa = new Empresa()

        empresa.nombre = info.nombre
        empresa.rfc = info.rfc
        empresa.direccion = info.direccion
        empresa.telefono = info.telefono

        await empresa.save()

        return response.status(200).json(empresa)
    }

    async show({request, response}){
        const info = request.all()

        const empresa = await Empresa.find(info.id)

        if(!empresa){
            return response.status(404).json({data: 'Empresa no existente'})
        }

        return response.status(200).json([empresa])
    }

    async update({request, response}){
        const info = request.all()

        const empresa = await Empresa.find(info.id)

        if(!empresa){
            return response.status(404).json({data: 'Empresa no existente'})
        }

        empresa.nombre = info.nombre
        empresa.rfc = info.rfc
        empresa.direccion = info.direccion
        empresa.telefono = info.telefono

        await empresa.save()

        return response.status(200).json({data: 'Empresa actualizada Correctamente'})
    }

    async delete({request, response}){
        const info = request.all()

        const empresa = await Empresa.find(info.id)

        if(!empresa){
            return response.status(404).json({data: 'Empresa no existente'})
        }

        await empresa.delete()

        return response.status(200).json({data: 'Empresa eliminada Correctamente', empresa})
    }

}

module.exports = EmpresaController
