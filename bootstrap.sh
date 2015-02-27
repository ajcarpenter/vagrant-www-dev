#!/usr/bin/env bash

wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
wget -qO - https://deb.nodesource.com/setup | sudo bash -
echo "deb http://packages.elasticsearch.org/elasticsearch/1.4/debian stable main" | sudo tee -a /etc/apt/sources.list

sudo apt-get update
sudo apt-get install -y git nodejs mongodb elasticsearch make g++ openjdk-7-jre unzip

ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone git@github.com:arsnexus/arsnexus.git ~/auctionclub
cp /vagrant_data/config.js ~/auctionclub

npm config set registry http://registry.npmjs.org/
sudo npm install -g forever grunt-cli bower node-inspector nodemon --unsafe-perm
sudo chown -R $(whoami) ~/.npm

pushd .
cd ~/auctionclub && npm install && bower install && grunt build 
popd

sudo /usr/share/elasticsearch/bin/plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.4.0.10/elasticsearch-river-jdbc-1.4.0.10.zip

wget -qO mysql-connector-java-5.1.33.zip 'http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.33.zip/from/http://cdn.mysql.com/'
unzip mysql-connector-java-5.1.33.zip
sudo cp mysql-connector-java-5.1.33/mysql-connector-java-5.1.33-bin.jar /usr/share/elasticsearch/plugins/jdbc/
sudo chmod 644 /usr/share/elasticsearch/plugins/jdbc/*
sudo update-rc.d elasticsearch defaults 95 10
sudo /etc/init.d/elasticsearch start

mongo auctionclub /vagrant_data/mongo_init.js

while [ -z "$status" ]
 do
  status=$(wget -q -O - http://127.0.0.1:9200)
  echo "$status"
  sleep 5
done

node ~/auctionclub/jobs/create_river.js
node ~/auctionclub/jobs/fetch_exchange_rates.js

sudo mkdir /etc/elasticsearch/scripts
sudo find ~/auctionclub -name \*.groovy -exec cp {} /etc/elasticsearch/scripts \;

mkdir -p ~/auctionclub/logs
touch ~/auctionclub/logs/db.log

pushd .
cd  ~/auctionclub
touch logs/debug.log logs/error.log
node-inspector >/dev/null 2>&1 & nodemon --debug app.js > logs/debug.log 2> logs/error.log &
popd