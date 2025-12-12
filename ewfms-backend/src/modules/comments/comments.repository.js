import db from "../../config/db.js";
import { v4 as UUID } from "uuid";

class CommentsRepository {

    static async findAll() {
        const [rows] = await db.query("SELECT * FROM comments");
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM comments WHERE comment_id = ?", [id]);
        return rows[0];
    }

    static async create(data) {
        const id = UUID();
        const { task_id, author_id, message } = data;

        const created_at = new Date();

        await db.query(
            "INSERT INTO comments (comment_id, task_id, author_id, message, created_at) VALUES (?, ?, ?, ?, ?)",
            [id, task_id, author_id, message, created_at]
        );

        return this.findById(id);
    }

    static async update(id, data) {
        const { message } = data;

        await db.query(
            "UPDATE comments SET message = ? WHERE comment_id = ?",
            [message, id]
        );

        return this.findById(id);
    }

    static async delete(id) {
        return db.query("DELETE FROM comments WHERE comment_id = ?", [id]);
    }
}

export default CommentsRepository;
