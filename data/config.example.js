'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/auctionclub'
};

exports.mysql = {
  host: '10.0.2.2',
  database: 'mydb',
  credentials: {
    user: 'myuser',
    password: 'mypass'
  }
};

exports.mysql_historic = {
  host: '10.0.2.2',
  database: 'mydb',
  credentials: {
    user: 'myuser',
    password: 'mypass'
  }
};

exports.elasticsearch = {
  host: 'http://localhost:9200',
  jdbcRiverName: 'auctionclub'
};

exports.s3 = {
  accessKeyId: "",
  secretAccessKey: "",
};

exports.companyName = 'Acme, Inc.';
exports.projectName = 'Drywall';
exports.systemEmail = 'your@email.addy';
exports.baseUrl = 'http://localhost:3001';
exports.supportEmail = 'support@email.addy';
exports.cryptoKey = 'k3yb0ardc4t';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.requireActiveSubscription = true;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'your@email.addy'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'your@email.addy',
    password: process.env.SMTP_PASSWORD || 'bl4rg!',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};

exports.repopulateArtistNames = false;

exports.houseBlacklist = [];

exports.stripe = {
  publishableKey: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
  secretKey: 'sk_test_QAvX4JDu7NF5oTjb4l3Fzqfp'
};

exports.openExchangeRates = {
  appId: 'MYKEY'
};

exports.mixpanel = {
  token: 'asdjaoskdjoasds8a09d90as'
};