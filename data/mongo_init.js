db.admingroups.insert({ _id: 'root', name: 'Root' });

db.admins.insert({ 
	name: {
		first: 'Admin', 
		last: 'User', 
		full: 'Admin User'
	},
	groups: ['root'] 
});

db.accounts.insert({
    "name" : {
        "first" : "Admin",
        "last" : "User"
    },
    "freeAccount" : true
});

var rootAdmin = db.admins.findOne();
var rootAccount = db.accounts.findOne();

db.users.save({ 
	username: 'root', 
	isActive: 'yes', 
	email: 'andrew.carpenter@techtopia.com', 
	password: '$2a$10$rhAhNXils2VyD0zxYIkToe5EN4Ki2gts83THEmE4ZlJdSjQsSujdW',	// 'dev'
	roles: {
		admin: rootAdmin._id, 
		account: rootAccount._id
	} 
});

var rootUser = db.users.findOne();

rootAdmin.user = { id: rootUser._id, name: rootUser.username };
db.admins.save(rootAdmin);

rootAccount.user = { id: rootUser._id, name: rootUser.username };
db.accounts.save(rootAccount);