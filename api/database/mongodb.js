import mongoose from 'mongoose'

const connect = () => {
    // Connect MongoDB at default port 27017.
    mongoose.connect('mongodb://localhost:27017/mern_social', (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection: ' + err)
        }
    });
}

export default connect
