const express = require('express');
const {
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
} = require('../controllers/invoiceController');
const cors = require('cors');

const router = express.Router();
router.use(express.json());
router.use(cors());

// Show invoices created by a user
router.get('/:id', userCreatedInvoice);

// Show invoices
router.get('/patient_invoices/:id', showMyInvoices);

// Show unpaid invoices
router.get('/patient_invoices/unpaid/:id', showMyUnpaidInvoices);

// Show pending invoices
router.get('/patient_invoices/pending/:id', showMyPendingInvoices);

// Show paid invoices
router.get('/patient_invoices/paid/:id', showMyPaidInvoices);

// Show sent invoices
router.get('/sent_invoices/:id', showSender);

// Show sent unpaid invoices
router.get('/sent_invoices/unpaid/:id', showSentUnpaidInvoices);

// Show sent pending invoices
router.get('/sent_invoices/pending/:id', showSentUnpaidInvoices);

// Show sent paid invoices
router.get('/sent_invoices/paid/:id', showSentPendingInvoices);
//////////////////////////////////////////////////////////////////////////////

// Get Sender Info
router.get('/patient_invoices/sender/:id', showSenderInfo);

// Mark Invoice as paid
router.patch('/patient_invoices/:id', markAsPaid);

module.exports = router;
