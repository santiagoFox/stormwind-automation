require('dotenv').config();

const users = {
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
    },
    manager: {
        email: process.env.MANAGER_EMAIL,
        password: process.env.MANAGER_PASSWORD,
        role: 'manager'
    },
    student: {
        email: process.env.STUDENT_EMAIL,
        password: process.env.STUDENT_PASSWORD,
        role: 'student'
    }
};

module.exports = users;
