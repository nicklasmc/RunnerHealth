const express = require('express');
const { getRecords, deleteRecord } = require('../controllers/recordController');
const cors = require('cors');

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/:id', getRecords);

// delete a record
router.delete('/:id', deleteRecord);

module.exports = router;
