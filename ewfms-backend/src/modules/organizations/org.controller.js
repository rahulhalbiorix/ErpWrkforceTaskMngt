import OrgService from "./org.service.js";

class OrgController {

    static async getAllOrgs(req, res) {
        try {
            const orgs = await OrgService.getAllOrgs();
            res.status(200).json(orgs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createOrg(req, res) {
        try {
            const organizationData = req.body;
            const org = await OrgService.createOrg(organizationData);
            res.status(201).json({message: 'Organization created successfully'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findOrgById(req, res) {
        try {
            const { id } = req.params;
            const org = await OrgService.findOrgById(id);
            res.status(200).json(org[0]);
        } catch (error) {       
            res.status(500).json({ error: error.message });
        }
    }    
    
    
    static async updateOrg(req, res) {
        try {
            const { id } = req.params;
            const organizationData = req.body;
            const org = await OrgService.updateOrg(id, organizationData);
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteOrg(req, res) {
        try {
            const { id } = req.params;
            await OrgService.deleteOrg(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default OrgController;