'use strict'

const Contrato = use('App/Models/Contrato')

const mongoose = require('mongoose');

let Schema =  mongoose.Schema;

let ContratosSchema =  new Schema({
  _id: Schema.Types.ObjectId,
  empleado_id: Schema.Types.Number,
  duracion_contrato: Schema.Types.String,
  puesto: Schema.Types.String,
  sueldo: Schema.Types.Number,
  nombre_empresa: Schema.Types.String
});

let ContratosMongo = mongoose.model('contratos',ContratosSchema);


class ContratoController {

    async mongoDBConnect(){

        await mongoose.connect('mongodb://127.0.0.1:27017/adonisangular', {useNewUrlParser: true, useMongoClient: true, useUnifiedTopology: true});
    
    }

    async index({response}){

        await this.mongoDBConnect();

        return await this.getData();

    }

    async store({request,response}){

        await this.mongoDBConnect();

        
    const data = await request.all();

    let contrato = await ContratosMongo.create({
        _id : new mongoose.Types.ObjectId(),
      empleado_id : data.empleado_id,
      duracion_contrato : data.duracion_contrato,
      puesto : data.puesto,
      sueldo : data.sueldo,
      nombre_empresa : data.nombre_empresa

    });

    return response.status(200).json({
      status:'OK',
      message:'La empresa ha sido registrada correctamente.',
      data:{
          contrato: contrato
      }
    });

    }

    async show({request,response}){

        await this.mongoDBConnect();

        const data = await request.all();

        const contratos = await this.getData(data.empleado_id);
    
        return response.status(200).json(contratos);
    

    }


    async update({request,response}){

        await this.mongoDBConnect();

        const data = await request.all();

        await ContratosMongo.update({_id: mongoose.Types.ObjectId(data._id)},{$set:{
            "empleado_id": data.empleado_id,
            "duracion_contrato" : data.duracion_contrato,
            "puesto" : data.puesto,
            "sueldo" : data.sueldo,
            "nombre_empresa" : data.nombre_empresa
            }
        })

        const newContrato = await ContratosMongo.find({_id: mongoose.Types.ObjectId(data._id)})

        return response.status(200).json({data: "Contrato actualizado correctamente" , "contrato" : newContrato })
    }

    async delete({request,response}){

        await this.mongoDBConnect();

        const data = await request.all();

        return await ContratosMongo.findOneAndRemove({_id: mongoose.Types.ObjectId(data._id)});

    }


  async getData(empleado_id){

    if(empleado_id!==null){
      //return await ContratosMongo.find();
      return await ContratosMongo.find({empleado_id: empleado_id});
    }
    return json("No data");

  }

}

module.exports = ContratoController
