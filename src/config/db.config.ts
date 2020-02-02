import mongoose from 'mongoose';

export class DBDriver {
  
  public async connect() {
    try {
      const connected = await this.connectDB(process.env.MONGODB_URI);
      console.log("Connected to mongo database successfully");
    } catch(e) {
      console.log('Error happend while connecting to the DB: ', e.message)
    }
  }

  public async connectDB(DBconnectionString) {
    console.log(`Connecting to DB - uri: ${DBconnectionString}`);
    return mongoose.connect(DBconnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  }
}
// When the node process is terminated (Ctrl+c is pressed) , close the connection to the DB.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
