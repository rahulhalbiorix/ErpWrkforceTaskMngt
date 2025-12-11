import db from '../../config/db.js';
import { v4 as UUID } from 'uuid';

class OrgRepository {

  static async getAllOrgs() {
     const [orgs] = await db.query('SELECT * FROM organization')
     console.log('🟢🟢🟢' , orgs);
     return orgs;
  }

  static async createOrg(organizationData) {

    const { name, domain, logo_url, status } = organizationData;


    const id = UUID();

     return await db.query('INSERT INTO organization (organization_id , name , domain , logo_url , status  ) VALUES (? , ? , ? , ? , ? )', [id, name, domain, logo_url, status ]);
     

  }

  static async findOrgById(id) {
    return db.query(
      `SELECT * FROM organization 
             WHERE organization_id = ?`,
      [id]
    );
  }

  static async updateOrg(id, organizationData) {
    const { name, domain, logo_url, status } = organizationData;
    return db.query(
      `UPDATE organization 
             SET name = ?, domain = ?, logo_url = ?, status = ?, updated_at = NOW() 
             WHERE organization_id = ?`,
      [name, domain, logo_url, status, id]
    );
  }

  static async deleteOrg(id) {
    return db.query('DELETE FROM organization WHERE organization_id = ?', [id]);
  }

}  

export default OrgRepository;