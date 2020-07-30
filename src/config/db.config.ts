import mongoose from 'mongoose';

export class DBDriver {
  
  constructor(DBConnectionString) {
    this.connect(DBConnectionString)
  }

  public async connect(DBConnectionString) {
    console.log(`Connecting to DB - uri: ${DBConnectionString}`);
    try {
      await mongoose.connect(DBConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      console.log("Connected to mongo database successfully");
    } catch(e) {
      console.log('Error happend while connecting to the DB: ', e.message)
    }
  }
}
// When the node process is terminated (Ctrl+c is pressed) , close the connection to the DB.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
