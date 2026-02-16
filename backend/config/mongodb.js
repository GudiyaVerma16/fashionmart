import mongoose from 'mongoose'

const connectDB = async() => {
    const uri = process.env.MONGODB_URI
    if (!uri || !uri.startsWith('mongodb')) {
        console.error('\n❌ MongoDB connection error: MONGODB_URI missing ya galat hai.')
        console.error('   backend folder mein .env file banao aur add karo:')
        console.error('   MONGODB_URI=mongodb://127.0.0.1:27017')
        console.error('   (ya .env.example dekho)\n')
        process.exit(1)
    }
    mongoose.connection.on('connected', ()=>{
        console.log('Connected to MongoDB')
    })
    await mongoose.connect(`${uri}/e-commerce`)
}

export default connectDB;