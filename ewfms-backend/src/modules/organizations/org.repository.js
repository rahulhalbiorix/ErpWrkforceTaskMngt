import db from '../../config/db.js';
import { v4 as UUID } from 'uuid';

 class OrgRepository {

    static async  getAllOrgs(){
       
        return [orgs] = await  db.query('SELECT * FROM organizations')
    
   }
    
     static async createOrg(){
          
     }

 }  
