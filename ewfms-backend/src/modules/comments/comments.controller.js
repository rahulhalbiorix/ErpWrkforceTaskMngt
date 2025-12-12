import CommentsService from "./comments.service.js";

class CommentsController {

    static async getAll(req, res) {
        try {
            const comments = await CommentsService.getAllComments();
            res.status(200).json(comments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const comment = await CommentsService.getCommentById(id);
            res.status(200).json(comment);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    static async create(req, res) {
        try {
            const comment = await CommentsService.createComment(req.body);
            res.status(201).json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await CommentsService.updateComment(id, req.body);
            res.status(200).json(updated);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await CommentsService.deleteComment(id);
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

export default CommentsController;
