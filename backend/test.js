const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo-hostel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Database connected successfully');
    const admin = require('./models/admin.js');

    const user = await admin.findOne({
        resetPasswordToken: "0d4450b9a43e114d9bc8e5ce8ab910effdfd291ac015604b9e0aad6cbeaad1f0",
        resetPasswordExpires: { $gt: Date.now() }
    });

    console.log("User found:", user);
    mongoose.disconnect(); // Close the connection after the query
})
.catch((err) => {
    console.error('Database connection error:', err);
});
