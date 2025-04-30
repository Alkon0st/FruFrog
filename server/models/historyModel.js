const Bill = require('./billModel');
const Event = require('./eventModel');

/**
 * Fetches and merges all historical entries (bills + events).
 * Returns a unified structure for client consumption.
 */
async function getHistoryData() {
  try {
    const bills = await Bill.find({});
    const events = await Event.find({});

    // Normalize bill data
    const formattedBills = bills.map(bill => ({
      id: bill._id,
      name: bill.title,
      category: bill.category || 'Bill',
      date: bill.date,
      amount: parseFloat(bill.total) || 0,
      icon: 'file-document-outline',
      source: 'bill',
    }));

    // Normalize event data
    const formattedEvents = events.map(event => ({
      id: event._id,
      name: event.title,
      category: event.category || 'Event',
      date: event.date,
      amount: parseFloat(event.amount) || 0,
      icon: 'calendar-check-outline',
      source: 'event',
    }));

    return [...formattedBills, ...formattedEvents];
  } catch (err) {
    console.error('Failed to get history data:', err);
    throw err;
  }
}

module.exports = { getHistoryData };
