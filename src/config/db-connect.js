module.exports = (mongoose) => {
    const login = process.env.DB_LOGIN;
    const password = process.env.DB_PASSWORD;
    const database_uri = `mongodb+srv://${login}:${password}@database-mzdui.mongodb.net/tests-management-application?retryWrites=true`;
    mongoose.connect(database_uri, { useNewUrlParser: true }).then(() => console.log('Connected to database!')).catch(err => console.log(err));
}