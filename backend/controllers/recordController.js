const { default: mongoose } = require('mongoose');
const recordModel = require('../models/recordModel');

const getRecords = async (req, res) => {
  const { id } = req.params;

  recordModel
    .find({ patientID: id })
    .then((records) => res.json(records))
    .catch((err) => console.log(err));
};

// delete a record
const deleteRecord = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }
  try {
    const record = await recordModel.findByIdAndDelete(id);
    if (!record) {
      return res
        .status(404)
        .json({ message: `cannot find any records with ID ${id}` });
    }
    res.status(200).json({ message: `deleted the following ${record}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getRecords,
  deleteRecord,
};
