'use strict'

const Empleado = use('App/Models/Empleado')

class EmpleadoController {

    async index({response}){
        let empleados = await Empleado.all()

        return response.json(empleados)
    }

    async store({request, response}){
        const info = request.all()

        const empleado = new Empleado()

        empleado.nombre = info.nombre
        empleado.apellido_p = info.apellido_p
        empleado.apellido_m = info.apellido_m
        empleado.sexo = info.sexo
        empleado.telefono = info.telefono
        empleado.direccion = info.direccion
        empleado.correo = info.correo

        await empleado.save()

        return response.status(200).json(empleado)
    }

    async show({request, response}){
        const info = request.all()

        const empleado = await Empleado.find(info.id)

        if(!empleado){
            return response.status(404).json({data: 'Empleado no existente'})
        }

        return response.status(200).json([empleado])
    }

    async update({request, response}){
        const info = request.all()
        
        const empleado = await Empleado.find(info.id)

        if(!empleado){
            return response.status(404).json({data: 'Empleado no existente'})
        }

        empleado.nombre = info.nombre
        empleado.apellido_p = info.apellido_p
        empleado.apellido_m = info.apellido_m
        empleado.sexo = info.sexo
        empleado.telefono = info.telefono
        empleado.direccion = info.direccion
        empleado.correo = info.correo

        await empleado.save()

        return response.status(200).json(empleado)

    }

    async delete({request, response}){
        const info = request.all()

        const empleado = await Empleado.find(info.id)

        if(!empleado){
            return response.status(404).json({data: 'Empleado no existente'})
        }

        await empleado.delete()

        return response.status(200).json({data: 'Empleado eliminado correctamente', empleado})

    }

}

module.exports = EmpleadoController
