const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// Import your models
const { User } = require('./src/models/User');
const { Donation } = require('./src/models/Donation');
const { Order } = require('./src/models/Order');

// Connect to your MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  dbName: 'IWL',
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Existing users data
const existingUsers = [
  {
    _id: "688763016611a204fd58115f",
    username: "judy",
    user_mobile_number: "+6599996666",
    user_email: "greer@gmail.com",
    user_round_up_pref: 1,
    user_discount_donate: 100,
    user_login_status: false,
    user_gender: "Female",
    password: "$2b$10$8idAswtdbC0bc.y6BZcF3ubD.PkYjECAh7yZWZfi0nXGRiyxQNOYa",
    tokens: 0,
    user_default_donation_method: "Round Up",
    default_charity: "0a9b3b9c-5f66-4d1e-a8dc-5f6a4210f1a2",
    user_id: 5857
  },
  {
    _id: "6887632c6611a204fd581163",
    username: "Aisha",
    user_mobile_number: "+6588886666",
    user_email: "tyler@gmail.com",
    user_round_up_pref: 0,
    user_discount_donate: 0,
    user_login_status: false,
    user_gender: "Female",
    password: "$2b$10$0IJa3sdkfygx6FfXpt6Dp.1JK4SxxqDak45XVeQcpANOafea.xIPq",
    tokens: 0,
    user_default_donation_method: "Round Up",
    default_charity: "0a9b3b9c-5f66-4d1e-a8dc-5f6a4210f1a2",
    user_id: 5146
  },
  {
    _id: "688764536611a204fd581167",
    username: "Lois",
    user_mobile_number: "+6588885555",
    user_email: "lane@gmail.com",
    user_round_up_pref: 0,
    user_discount_donate: 0,
    user_login_status: false,
    user_gender: "Female",
    password: "$2b$10$6Cx7ne5IEDXY1W9OBcAIMeK9WyAdCc4BTeVo/azFbtWlFBr/RUwKW",
    tokens: 0,
    user_default_donation_method: "Round Up",
    default_charity: "0a9b3b9c-5f66-4d1e-a8dc-5f6a4210f1a2",
    user_id: 8755
  },
  {
    _id: "688764bb6611a204fd58116b",
    username: "miriam",
    user_mobile_number: "+6599995555",
    user_email: "maisel@gmail.com",
    user_round_up_pref: 0,
    user_discount_donate: 0,
    user_login_status: false,
    user_gender: "Female",
    password: "$2b$10$wj.czBX/KWpmmSHBxnGgRumCpzOantjRcrTHB38kFJk.CR2JN9PxW",
    tokens: 0,
    user_default_donation_method: "Round Up",
    default_charity: "0a9b3b9c-5f66-4d1e-a8dc-5f6a4210f1a2",
    user_id: 5174
  },
  {
    _id: "688765026611a204fd58116f",
    username: "juila",
    user_mobile_number: "+6599994444",
    user_email: "louis@gmail.com",
    user_round_up_pref: 0,
    user_discount_donate: 0,
    user_login_status: false,
    user_gender: "Female",
    password: "$2b$10$8v56bn/NZlc7omllE33Sg.q3i33Yo.wgpLH2vrzEFLaUpi7A1R/Ha",
    tokens: 0,
    user_default_donation_method: "Round Up",
    default_charity: "0a9b3b9c-5f66-4d1e-a8dc-5f6a4210f1a2",
    user_id: 7643
  }
];

// Merchant data
const merchants = [
  { name: "Stall 12 Haha Family Hainan Food", location: "01-12" },
  { name: "Stall 14 Changi Village Fried Hokkien Mee", location: "01-14" },
  { name: "Stall 15 Ah Gong Teochew Noodle", location: "01-15" },
  { name: "Stall 23 Kopi Tan", location: "01-23" },
  { name: "Stall 26 Twenty6 Gusto House", location: "01-26" }
];

// Charity data
const charities = [
  { id: "19dcde42-f621-464f-932f-5c8f8f97fef3", cause: "365 Cancer Prevention Society" },
  { id: "ad888b0d-4e89-44b0-a7b0-4729cb260dc7", cause: "3Pumpkins Limited" },
  { id: "0a9b3b9c-5f66-4d1e-a8dc-5f6a4210f1a2", cause: "Abilities Beyond Limitations and Expectations Ltd" },
  { id: "3a7586ef-7f66-4b59-8933-2f0b071b9e33", cause: "ACCESS Health International Southeast Asia Limited" },
  { id: "d876d2a3-caf0-4e2d-a353-81c9643a55d4", cause: "ACRES" },
  { id: "7c34e3c9-5c6e-4b18-9c83-08a40c07c94f", cause: "All Saints Home" },
  { id: "0f11fc39-bac6-4a48-b45c-4cf354cd2c9e", cause: "CAHAYA COMMUNITY (LTD.)" },
  { id: "b3c17e0a-0b8e-49f2-8c5e-9c9c8f5ea2cb", cause: "Community Chest" }
];


// Merge all users
const allUsers = [
  ...existingUsers.map(u => ({ ...u, username: capitalize(u.username) })),
  ...newMaleUsers.map(u => ({ ...u, username: capitalize(u.username) }))
];

async function createAllUsers() {
  // Remove all users first
  await User.deleteMany({});
  const users = [];
  for (const userData of allUsers) {
    const user = new User(userData);
    const savedUser = await user.save();
    users.push(savedUser);
  }
  return users;
}

async function createNewMaleUsers() {
  const users = [];
  for (const userData of newMaleUsers) {
    const user = new User(userData);
    const savedUser = await user.save();
    users.push(savedUser);
  }
  return users;
}

// Helper to generate balanced donations/orders for a user group
async function generateBalancedDonationsAndOrders(users, totalDonations = 20) {
  const donationTypes = ['round_up', 'direct_donation', 'discount_donate'];
  const perCharity = Math.floor(totalDonations / charities.length);
  let donationsCreated = 0;

  // For each charity, distribute donation types as evenly as possible
  for (const charity of charities) {
    // For each donation type, distribute evenly
    for (let i = 0; i < perCharity; i++) {
      const donationType = donationTypes[i % donationTypes.length];
      const user = faker.helpers.arrayElement(users);
      const donation = await createRandomDonation(user, charity, donationType);
      await createRandomOrder(user, donation);
      donationsCreated++;
    }
  }
  // If not enough due to rounding, fill up to totalDonations
  while (donationsCreated < totalDonations) {
    const user = faker.helpers.arrayElement(users);
    const charity = faker.helpers.arrayElement(charities);
    const donationType = donationTypes[donationsCreated % donationTypes.length];
    const donation = await createRandomDonation(user, charity, donationType);
    await createRandomOrder(user, donation);
    donationsCreated++;
  }
}

// Update createRandomDonation to accept charity and donationType
async function createRandomDonation(user, charityOverride, donationTypeOverride) {
  const charity = charityOverride || faker.helpers.arrayElement(charities);
  const donationTypes = ['round_up', 'direct_donation', 'discount_donate'];
  const donationType = donationTypeOverride || faker.helpers.arrayElement(donationTypes);

  const donation = new Donation({
    donation_id: faker.number.int({ min: 1000, max: 9999 }),
    donation_datetime: faker.date.recent(),
    donation_dsgd_amt: faker.finance.amount({ min: 10, max: 100, dec: 2 }),
    charity_id: charity.id,
    donation_status: 'received',
    donation_amt: faker.finance.amount({ min: 1, max: 10, dec: 2 }),
    donation_type: donationType,
    donation_cause: charity.cause,
    user_id: user._id,
  });
  return donation.save();
}

async function createRandomOrder(user, donation) {
  const merchant = faker.helpers.arrayElement(merchants);
  const orderTypes = ['Dine-In', 'Takeaway'];
  const orderType = faker.helpers.arrayElement(orderTypes);
  
  const order = new Order({
    order_id: faker.number.int({ min: 1000, max: 9999 }),
    order_status: faker.helpers.arrayElement(['pending', 'paid', 'completed', 'cancelled']),
    order_cost: faker.finance.amount({ min: 10, max: 100, dec: 2 }),
    total_order_cost: faker.finance.amount({ min: 10, max: 120, dec: 2 }),
    order_type: orderType,
    merchant_name: merchant.name,
    merchant_location: merchant.location,
    donation_id: donation.donation_id,
    order_complete_datetime: faker.date.recent(),
    user_id: user.user_id,
    order_items: [
      {
        product_id: faker.string.uuid(),
        product_name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price_per_unit: faker.finance.amount({ min: 1, max: 20, dec: 2 }),
      },
    ],
    order_tokens: faker.number.int({ min: 0, max: 100 }),
  });
  return order.save();
}

async function seed() {
  // Insert all 10 users (original + new male users)
  const users = await createAllUsers();
  console.log(`Created or found ${users.length} users`);

  const maleUsers = users.filter(u => u.user_gender === 'Male');
  const femaleUsers = users.filter(u => u.user_gender === 'Female');

  // Balanced donations/orders for male users
  await generateBalancedDonationsAndOrders(maleUsers, 20);
  // Balanced donations/orders for female users
  await generateBalancedDonationsAndOrders(femaleUsers, 20);

  console.log('Seeding complete!');
  mongoose.disconnect();
}

seed();