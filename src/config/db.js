const LOGIN = process.env.DB_LOGIN;
const PASSWORD = process.env.DB_PASSWORD;
const URI = `mongodb+srv://${LOGIN}:${PASSWORD}@database-mzdui.mongodb.net/tests-management-application?retryWrites=true`

module.exports = {
    MongoDB_URI: URI
}