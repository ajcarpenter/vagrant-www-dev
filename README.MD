Modify `data/mongo_init.js` to create the admin user with a valid email address.

User password 'dev'

Mongodb name: auctionclub

Project files mounted under `project_data` in this directory

Use guest default gateway in mysql config if mysql on host machine. Probably `10.0.2.2`

Check the jdbc river schedule in `jobs/create_river.js` to determine when the index will be populated. If you require immediate population, comment out the `schedule` property, rerun `jobs/create_river.js` and restart elasticsearch (`sudo /etc/init.d/elasticsearch restart`).

See `Vagrantfile` for forwarded ports

http://localhost:3001
node-inspector: http://localhost:8081/debug?port=5858