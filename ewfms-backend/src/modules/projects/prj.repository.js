import db from '../../config/db.js'
import { v4 as UUID } from 'uuid'

class projectRepository {

    static async getAllproject() {
        return db.query('SELECT * FROM projects')
        
    }

    static async findProjectsByOrg(orgId) {
        return db.query(
            "SELECT * FROM Projects WHERE organization_id = ?",
            [orgId]
        );
    }

    static async getProjectById(projectId) {
        return db.query(
            "SELECT * FROM Projects WHERE project_id = ?",
            [projectId]
        );
    }

    static async findProjectsAssignedToUser(userId) {
        return db.query(
            "SELECT * FROM projects INNER JOIN tasks  ON   projects.project_id = tasks.project_id WHERE tasks.assigned_to = ?",
            [userId]
        );
    }

static async createProject(projectData) {
    const project_id = UUID(); // generate ID

    const { organization_id, name, description, createdBy, status, start_date, end_date } = projectData;

    const query = `
        INSERT INTO projects 
        (project_id, organization_id, name, description, created_by, status, start_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] =await  db.query(query, [
        project_id,
        organization_id,
        name,
        description,
        createdBy,
        status,
        start_date,
        end_date
    ]);

  return result;

}


    static async updateProject(projectId, projectData) {
    const {
        organization_id,
        name,
        description,
        createdBy,
        status,
        start_date,
        end_date
    } = projectData;

    const query = `
        UPDATE projects 
        SET 
            organization_id = ?, 
            name = ?, 
            description = ?, 
            created_by = ?, 
            status = ?, 
            start_date = ?, 
            end_date = ?
        WHERE project_id = ?
    `;

    return db.query(query, [
        organization_id,
        name,
        description,
        createdBy,
        status,
        start_date,
        end_date,
        projectId
    ]);
}
   
static async deleteProject(projectId){
    return db.query("DELETE FROM projects WHERE project_id = ?", [projectId])

}
}

export default projectRepository;