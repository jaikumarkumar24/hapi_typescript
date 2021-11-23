import { Server, Request, ResponseToolkit } from "@hapi/hapi";


//Database configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_App', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err));

    import { model, Schema, Model, Document } from 'mongoose';

    interface IUser extends Document {
      email: string;
      firstName: string;
      lastName: string;
    }
    
    const UserSchema: Schema = new Schema({
      email: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true }
    });
    
    const User: Model<IUser> = model('User', UserSchema);


const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/api/user',
        handler: async (request, h) => {
            //let params = request.query
            let infos = await User.find().lean();
            return h.response(infos);
        }
    });

    server.route({
        method:'POST',
        path:'/api/usein',
        handler: async (request, h)=>{
            let info = request.payload;
            console.log();

            const user: IUser = await User.create({
                email: info['email'],
                firstName: info['firstName'],
                lastName: info['lastName']
              });
            return h.response("Success");

        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


init();