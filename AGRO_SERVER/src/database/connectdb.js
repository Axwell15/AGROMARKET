import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

try
{
    await mongoose.connect(uri,{ useNewUrlParser: true });
    console.log('base de datos conectada');
}
catch(e)
{
    console.log('error al conectar la base de datos: ' + e);
}