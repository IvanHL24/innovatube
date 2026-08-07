import { db } from "../config/database";
import bcrypt from "bcrypt";
import { CreateUser } from "../types/user.types";

export const createUser = async (user: CreateUser) => {

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const sql = `INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)
    `;

    const[result] = await db.execute(sql, [
        user.first_name,
        user.last_name,
        user.username,
        user.email,
        hashedPassword
    ]);

    return result;
}

// export const getUsers = async () => {

//     const[users] = await db.execute(`
//         SELECT
//             id,
//             first_name,
//             last_name,
//             username,
//             email
//         FROM users
//     `);

//     return users;
// }