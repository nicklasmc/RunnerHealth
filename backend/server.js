require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patients.js');
const adminRoutes = require('./routes/admins');
const doctorRoutes = require('./routes/doctors');
const appointmnetRoutes = require('./routes/appointments');
const invoiceRoutes = require('./routes/invoices');
const recordRoutes = require('./routes/records');
const recordModel = require('./models/recordModel.js');
const orgModel = require('./models/orgModel.js');
const notificationModel = require('./models/notificationModel.js');
const invoiceModel = require('./models/invoiceModel.js');
const Patient = require('./models/patientModel.js');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');

const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(
    '***********************************',
    '\n',
    'route: ',
    req.path,
    '\n',
    'method: ',
    req.method,
    '\n',
    '***********************************'
  );
  next();
});

// Routes
app.use('/patients', patientRoutes);
app.use('/admins', adminRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmnetRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/records', recordRoutes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post('/upload', upload.single('file'), (req, res) => {
  const { patientID, title } = req.body;

  recordModel
    .create({ image: req.file.filename, patientID: patientID, title: title })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post('/dupload', upload.single('file'), (req, res) => {
  const { patientID, doctorID, title } = req.body;
  recordModel
    .create({
      image: req.file.filename,
      patientID: patientID,
      doctorID: doctorID,
      title: title,
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get('/get_images', (req, res) => {
  recordModel
    .find()
    .then((records) => res.json(records))
    .catch((err) => console.log(err));
});

// create an invoice
app.post('/invoice', upload.single('file'), (req, res) => {
  const {
    origin,
    recipient,
    dateSent,
    dateDue,
    subject,
    message,
    link,
    createdBy,
  } = req.body;
  invoiceModel
    .create({
      createdBy: createdBy,
      sender: origin,
      receiver: recipient,
      dateSent: dateSent,
      dateDue: dateDue,
      subject: subject,
      message: message,
      link: link,
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post('/messenger', (req, res) => {
  const { mtitle, ugroup, uemail, mcontent } = req.body;
  notificationModel
    .create({
      sender: '65d696de8305820100ef32c4',
      senderGroup: 'doctors',
      title: mtitle,
      receiverGroup: ugroup,
      receiver: uemail,
      message: mcontent,
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get('/get_notys/:email', (req, res) => {
  const { email } = req.params;
  notificationModel
    .find({ receiver: email })
    .then((records) => res.json(records))
    .catch((err) => console.log(err));
});

app.get('/orgs/', (req, res) => {
  orgModel
    .find({})
    .then((orgs) => res.json(orgs))
    .catch((err) => console.log(err));
});

app.get('/orgs/:id', (req, res) => {
  const { id } = req.params;

  orgModel
    .find({ _id: id })
    .then((orgs) => res.json(orgs))
    .catch((err) => console.log(err));
});

app.get('/orgs/patients/:id', (req, res) => {
  const { id } = req.params;

  Patient.find({ org: id })
    .then((orgs) => res.json(orgs))
    .catch((err) => console.log(err));
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log('Connected!');
    app.listen(process.env.PORT, () => {
      console.log(`Node API app is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
