// Use environment variables to override demo credentials without editing tests.
const users = {
  claimant: {
    email: process.env.CLAIMANT_EMAIL || 'claimant@demo.com',
    password: process.env.CLAIMANT_PASSWORD || 'Claimant123!',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@demo.com',
    password: process.env.ADMIN_PASSWORD || 'Admin123!',
  },
};

module.exports = { users };
