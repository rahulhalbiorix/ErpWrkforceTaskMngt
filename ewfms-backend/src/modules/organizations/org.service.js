import OrgRepository from "./org.repository.js";

class OrgService {

    static async getAllOrgs() {
        return OrgRepository.getAllOrgs();
    }

    static async createOrg(organizationData) {

        if (!organizationData.name || organizationData.name.trim() === '' || organizationData.domain.trim() === '') {
            throw new Error('Organization name and domain are required');
        }

        return OrgRepository.createOrg(organizationData);
    }

    static async findOrgById(id) {
        return OrgRepository.findOrgById(id);
    }

    static async updateOrg(id, organizationData) {


        if (!organizationData.name || organizationData.name.trim() === '' || organizationData.domain.trim() === '') {
            throw new Error('Organization name and domain are required');
        }
        return OrgRepository.updateOrg(id, organizationData);
    }

   static async activeInactiveOrg(id, status) {
        if(id.trim() === '' ){
            throw new Error('Organization id is required');
        }
        if(status.trim() === '' ){
            throw new Error('Status is required');
        }
        return OrgRepository.activeInactiveOrg(id, status);
    }


}

export default OrgService;