const mongoose = require("mongoose");
mongoose
  .connect(
   
    "mongodb+srv://rmguru98:raja1234@cluster0.57etmp9.mongodb.net/mentors-students",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // app.listen(3030, () => {
    //   console.log("Server started on Port 3030");
    // });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });