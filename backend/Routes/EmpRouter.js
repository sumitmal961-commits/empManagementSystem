
const { getAllEmployee, deleteEmployeeById, getEmployeeById, createEmployee, updateEmployeeById } = require('../Controllers/EmployeeController');
const ensureAuthenticated = require('../Middleware/Auth');
// const { createIndexes } = require('../Models/EmployeeModel.');
const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

router.get('/', getAllEmployee);
router.post('/', upload.single('profileImage'),createEmployee);
router.put('/:id', upload.single('profileImage'),updateEmployeeById);
router.get('/:id', getEmployeeById);
router.delete('/:id', deleteEmployeeById);

module.exports = router