module.exports = (io) => {

    const students = [];
    const blindStudents = [];
    const teachers = [];

    io.of('/teacher').on('connect', (socket) => {

        console.log('User arrived to teacher namespace');

        socket.on('login', (data) => {
            socket.login = data.login;
            socket.type = data.type;
            teachers.push({
                id: socket.id,
                login: socket.login,
                type: socket.type
            });
            console.log(teachers);
        })

        socket.on('logout', (data) => {
            teachers.splice(teachers.indexOf({
                id: socket.id,
                login: data.login,
                type: data.type
            }), 1);
            console.log(teachers);
        })

        socket.on('studentsList', () => {
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

        socket.on('sendTest', (login, questions) => {
            const allStudents = students.concat(blindStudents);
            allStudents.forEach(student => {
                if (student.login == login) {
                    if (student.type == 'student') {
                        io.of('/student').to(student.id).emit('sendTest', questions);
                    }
                    if (student.type == 'blind-student') {
                        const questionsWithoutImages = questions.filter(question => {
                            return question.imageUrl === ""
                        })
                        io.of('/blindStudent').to(student.id).emit('sendTest', questionsWithoutImages);
                    }
                }
            })
        })

        socket.on('disconnect', () => {
            teachers.splice(teachers.indexOf({
                id: socket.id,
                login: socket.login,
                type: socket.type
            }), 1);
            console.log(teachers);
        })

    });

    io.of('/student').on('connect', (socket) => {

        console.log('User arrived to student namespace');

        socket.on('login', (data) => {
            socket.login = data.login;
            socket.type = data.type;
            students.push({
                id: socket.id,
                login: socket.login,
                type: socket.type
            });
            console.log(students);
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

        socket.on('logout', (data) => {
            students.splice(students.indexOf({
                id: socket.id,
                login: data.login,
                type: data.type
            }), 1);
            console.log(students);
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

        socket.on('sendResult', (data) => {
            io.of('/teacher').emit('sendResult', data);
        })

        socket.on('disconnect', () => {
            students.splice(students.indexOf({
                id: socket.id,
                login: socket.login,
                type: socket.type
            }), 1);
            console.log(students);
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

    });

    io.of('/blindStudent').on('connect', (socket) => {

        console.log('User arrived to blind-student namespace');

        socket.on('login', (data) => {
            socket.login = data.login;
            socket.type = data.type;
            blindStudents.push({
                id: socket.id,
                login: socket.login,
                type: socket.type
            });
            console.log(blindStudents);
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

        socket.on('logout', (data) => {
            blindStudents.splice(blindStudents.indexOf({
                id: socket.id,
                login: data.login,
                type: data.type
            }), 1);
            console.log(blindStudents);
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

        socket.on('sendResult', (data) => {
            io.of('/teacher').emit('sendResult', data);
        })

        socket.on('disconnect', () => {
            blindStudents.splice(blindStudents.indexOf({
                id: socket.id,
                login: socket.login,
                type: socket.type
            }), 1);
            console.log(blindStudents);
            io.of('/teacher').emit('studentsList', students, blindStudents);
        })

    });

}