'use strict'

const Contrato = use('App/Models/Contrato')

class ContratoController {

    async mongoDBConnect(){

        await Contrato.mongoose.connect('mongodb://127.0.0.1:27017/adonisangular', {useNewUrlParser: true, useMongoClient: true, useUnifiedTopology: true});
    }

    async closeConection(){
      await Contrato.mongoose.connection.close();
    }

    async index({response}){

        await this.mongoDBConnect();

        return await this.getData();

    }

    async store({request,response}){

      await this.closeConection();

      await this.mongoDBConnect();
  
      const data = await request.all();

      let contrato = await Contrato.ContratosMongo.create({
          _id : new Contrato.mongoose.Types.ObjectId(),
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

        await this.closeConection();

        await this.mongoDBConnect();

        const data = await request.all();

        const contratos = await this.getData(data.empleado_id);
    
        return response.status(200).json(contratos);
    

    }


    async update({request,response}){

        await this.closeConection();

        await this.mongoDBConnect();

        const data = await request.all();

        await Contrato.ContratosMongo.update({_id: Contrato.mongoose.Types.ObjectId(data._id)},{$set:{
            "empleado_id": data.empleado_id,
            "duracion_contrato" : data.duracion_contrato,
            "puesto" : data.puesto,
            "sueldo" : data.sueldo,
            "nombre_empresa" : data.nombre_empresa
            }
        })

        const newContrato = await Contrato.ContratosMongo.find({_id: Contrato.mongoose.Types.ObjectId(data._id)})

        return response.status(200).json({data: "Contrato actualizado correctamente" , "contrato" : newContrato })
    }

    async delete({request,response}){

        await this.closeConection();

        await this.mongoDBConnect();

        const data = await request.all();

        return await Contrato.ContratosMongo.findOneAndRemove({_id: Contrato.mongoose.Types.ObjectId(data._id)});;

    }


  async getData(empleado_id){

    if(empleado_id!==null){
      //return await ContratosMongo.find();
      return await Contrato.ContratosMongo.find({empleado_id: empleado_id});
    }
    return json("No data");

  }

}

module.exports = ContratoController
