import projectService from "./prj.service.js";

class projectController {

    // GET ALL PROJECTS
    static async getAllProjects(req, res) {
        try {
            const projects = await projectService.getAllProjects();
            return res.status(200).json({
                success: true,
                data: projects[0]
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // GET PROJECTS BY ORGANIZATION
    static async findProjectsByOrg(req, res) {
        const orgId = req.params.orgId;
        try {
            const projects = await projectService.findProjectsByOrg(orgId);

            return res.status(200).json({
                success: true,
                data: projects[0]
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // GET PROJECT BY ID
    static async getProjectById(req, res) {
        const projectId = req.params.projectId;

        try {
            const project = await projectService.getProjectById(projectId);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

           

            return res.status(200).json({
                success: true,
                data: project[0]
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // FIND PROJECTS ASSIGNED TO USER
    static async findProjectsAssignedToUser(req, res) {
        const userId = req.params.userId;

        try {
            const projects = await projectService.findProjectsAssignedToUser(userId);

            return res.status(200).json({
                success: true,
                data: projects[0]
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // CREATE PROJECT
    static async createProject(req, res) {
        const projectData = req.body;
              
        try {
            const newProject = await projectService.createProject(projectData);
               
     
            return res.status(201).json({
                success: true,
                message: "Project created successfully",         
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // UPDATE PROJECT
    static async updateProject(req, res) {
        const projectId = req.params.projectId;
        const projectData = req.body;

        try {
            const updatedProject = await projectService.updateProject(projectId, projectData);

            if (!updatedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Project updated successfully",
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // DELETE PROJECT
    static async deleteProject(req, res) {
        const projectId = req.params.projectId;

        try {
            const deletedProject = await projectService.deleteProject(projectId);

            if (!deletedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Project deleted successfully"
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}

export default projectController;
