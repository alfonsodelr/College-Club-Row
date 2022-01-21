// import { ddb_createTable } from "../../../libs/ddb_createtable"


//This API route can be used to create FORM table if table doensn't exist
export default function handler(req, res) {
    if (req.method === 'POST') {
        // if (!req.query.dbtk_form) return res.status(404);
        // const dbToken_form = req.query.dbtk_form;
        console.log(req.query)
        return res.status(200).json({ message: 'Hello from Next.js!' })
    }
    return res.status(404).json({ error: 'not found' });
}