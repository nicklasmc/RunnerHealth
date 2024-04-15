const { default: mongoose } = require('mongoose');
const Doctor = require('../models/doctorModel');
const Provider = require('../models/providerModel');
const Patient = require('../models/patientModel');
const Admin = require('../models/adminModel');
const invoiceModel = require('../models/invoiceModel');

// show invoices that a user created
const userCreatedInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .find({ createdBy: id })
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show patient invoices
const showMyInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show unpaid invoices
const showMyUnpaidInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(id),
          paid: false,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show pending invoices
const showMyPendingInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(id),
          paid: true,
          paymentConfirmation: false,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show paid invoices
const showMyPaidInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(id),
          paid: true,
          paymentConfirmation: true,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show sent invoices
const showSender = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          sender: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show sent unpaid invoices
const showSentUnpaidInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(id),
          paid: false,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show sent pending invoices
const showSentPendingInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(id),
          paid: true,
          paymentConfirmation: false,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Show sent paid invoices
const showSentPaidInvoices = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(id),
          paid: true,
          paymentConfirmation: true,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Get Sender Info in the invoice
const showSenderInfo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          sender: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'sender',
          foreignField: '_id',
          as: 'senders',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Get receiver Info in the invoice
const showReceiverInfo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such doctor' });
  }

  invoiceModel
    .aggregate([
      {
        $match: {
          sender: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'patients',
          localField: 'receiver',
          foreignField: '_id',
          as: 'receivers',
        },
      },
    ])
    .then((invoices) => res.json(invoices))
    .catch((err) => console.log(err));
};

// Mark Invoice as paid
const markAsPaid = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such invoice' });
  }

  invoiceModel
    .findByIdAndUpdate(id, { paid: true })
    .then((invoice) => res.json(invoice))
    .catch((err) => console.log(err));
};

// Confirm payment
const markAsConfirmed = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such invoice' });
  }

  invoiceModel
    .findByIdAndUpdate(id, { paymentConfirmation: true })
    .then((invoice) => res.json(invoice))
    .catch((err) => console.log(err));
};

module.exports = {
  userCreatedInvoice,
  showMyInvoices,
  showMyUnpaidInvoices,
  showMyPendingInvoices,
  showMyPaidInvoices,
  showSender,
  showSentUnpaidInvoices,
  showSenderInfo,
  markAsPaid,
  showSentPendingInvoices,
  showSentPaidInvoices,
  markAsConfirmed,
  showReceiverInfo,
};
