function createClaimData() {
  const incident = new Date();
  incident.setDate(incident.getDate() - 1);
  const incidentDate = incident.toISOString().slice(0, 10);
  const incidentDateText = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(incident);
  const runTag = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    incidentDate,
    incidentDateText,
    location: 'Hyderabad, Telangana',
    amount: '1000',
    formattedAmount: '$1,000.00',
    description: `Automated QA claim ${runTag}`,
  };
}

module.exports = { createClaimData };
