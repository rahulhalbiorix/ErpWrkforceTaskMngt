import projectRepository from "./prj.repository.js";

class projectService {

static async getAllProjects(){
      return projectRepository.getAllproject()
}

static async findProjectsByOrg(orgId){
    return projectRepository.findProjectsByOrg(orgId)
}

static async getProjectById(projectId){
    return projectRepository.getProjectById(projectId)
}

static async findProjectsAssignedToUser(userId){
    return projectRepository.findProjectsAssignedToUser(userId)
}

static async createProject(projectData){
    return projectRepository.createProject(projectData)
}

static async updateProject(projectId, projectData){
    return projectRepository.updateProject(projectId, projectData)
}

static async deleteProject(projectId){
    return projectRepository.deleteProject(projectId)
}

}

export default projectService;
