import CommentsRepository from "./comments.repository.js";

class CommentsService {

    static async getAllComments() {
        return CommentsRepository.findAll();
    }

    static async getCommentById(id) {
        const comment = await CommentsRepository.findById(id);
        if (!comment) throw new Error("Comment not found");
        return comment;
    }

    static async createComment(data) {
        return CommentsRepository.create(data);
    }

    static async updateComment(id, data) {
        return CommentsRepository.update(id, data);
    }

    static async deleteComment(id) {
        return CommentsRepository.delete(id);
    }
}

export default CommentsService;
