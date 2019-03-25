module.exports = function (io) {
    let teachersList = [];
    let studentsList = [];
    io.on('connection', (socket) => {

        socket.on('login', (data) => {

            socket.userId = socket.id;
            socket.userLogin = data.login;
            socket.userRole = data.role;

            if (socket.userRole == 'student' || socket.userRole == 'blind-student') {
                const index = studentsList.findIndex(user => user.login === socket.userLogin);
                if (index == -1) {
                    studentsList.push({
                        id: socket.userId,
                        login: socket.userLogin
                    });
                    io.emit('studentsList', studentsList);
                } else {
                    io.to(socket.userId).emit('loginStatus', true);
                    io.emit('studentsList', studentsList);
                }
            }

            if (socket.userRole == 'teacher') {
                const index = teachersList.findIndex(user => user.login === socket.userLogin);
                if (index == -1) {
                    teachersList.push({
                        id: socket.userId,
                        login: socket.userLogin
                    });
                    io.emit('teachersList', teachersList);
                } else {
                    io.to(socket.userId).emit('loginStatus', true);
                    io.emit('teachersList', teachersList);
                }
            }
        })

        socket.on('sendWarning', (msg) => {
            io.emit('warning', msg);
        })

        socket.on('studentsOnline', () => {
            io.emit('studentsList', studentsList);
        })

        socket.on('sendMessage', (userId, test) => {
            io.to(userId).emit('receiveMessage', test);
        })

        socket.on('sendMessageBLIND', (userId, test) => {
            io.to(userId).emit('receiveMessageBLIND', test);
        })

        socket.on('sendTestResults', (student, result) => {
            io.emit('receiveTestResult', student, result);
        })

        socket.on('logout', () => {
            if (socket.userRole == 'student') {
                let isLogged = studentsList.filter(user => user == socket.userLogin).length;
                if (isLogged >= 2) {
                    studentsList.splice(studentsList.indexOf(socket.userLogin), 1);
                }
            }
            if (socket.userRole == 'teacher') {
                let isLogged = teachersList.filter(user => user == socket.userLogin).length;
                if (isLogged >= 2) {
                    teachersList.splice(teachersList.indexOf(socket.userLogin), 1);
                }
            }
            socket.userId = null;
            socket.userLogin = null;
            socket.userRole = null;
            io.emit('studentsList', studentsList);
        });

        socket.on('disconnect', () => {
            if (socket.userRole == 'student') {
                studentsList.splice(studentsList.indexOf(socket.userLogin), 1);
                io.emit('studentsList', studentsList);
            }
            if (socket.userRole == 'teacher') {
                teachersList.splice(teachersList.indexOf(socket.userLogin), 1);
                io.emit('teachersList', teachersList);
            }
            console.log(studentsList);
            console.log(teachersList);
        });

    });
}