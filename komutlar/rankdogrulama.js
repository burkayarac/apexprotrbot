const Discord = require('discord.js');
const https = require('https');

exports.run = function(client,message,args) {
    var nick = args.join(' ');

    if(!nick) {
        message.channel.send('```Rank Doğrulamanın Doğru Kullanımı = !apex Nick```');
    } else {

    const options = new URL('https://public-api.tracker.gg/v2/apex/standard/profile/origin/' + nick + '?TRN-Api-Key=e3a23e3e-920a-4cca-b0ee-42fe3489abac');
    const req = https.get(options, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var dat = JSON.parse(data);
            var name = JSON.stringify(dat["data"]["platformInfo"]["platformUserId"]);
            var score = JSON.stringify(dat["data"]["segments"][0]["stats"]["rankScore"]["value"]);
            var kills = JSON.stringify(dat["data"]["segments"][0]["stats"]["kills"]["value"]);
            var level = JSON.stringify(dat["data"]["segments"][0]["stats"]["level"]["value"]);
            var rankSiralama = JSON.stringify(dat["data"]["segments"][0]["stats"]["rankScore"]["rank"]);
            const embed = {
                "color": 15158332,
                "author": {
                  "name": "Apex Legends Türkiye"
                },
                "fields": [
                  {
                    "name": name.replace(/\"/g, ""),
                    "value": "ApexTR Pro Tracker"
                  },
                  {
                    "name": "Level",
                    "value": level
                  },
                  {
                    "name": "Kill",
                    "value": kills
                  },
                  {
                    "name": "Rank Puanı",
                    "value": score
                  },
                  {
                    "name": "Rank Sıralaması",
                    "value": rankSiralama
                  }
                ]
              };
              message.channel.send({ embed });
              var ranks = ['660530174030250091','661247531690491904','660852933059149824','660848737215840297'];
            for(var i = 0;i<4;i++) {
               if(message.member.roles.has(ranks[i])) {
                   message.member.removeRole(ranks[i]);
               }
            }
            setTimeout( () => {
              switch(true)
              {
                case rankSiralama > 0 && rankSiralama < 100:
                  message.member.addRole('660530174030250091');
                  break;
                case rankSiralama > 100 && rankSiralama < 500:
                  message.member.addRole('661247531690491904');
                  break;
                case score < 10000:
                  message.member.addRole('660852933059149824');
                  break;
                case score >= 10000:
                  message.member.addRole('660848737215840297');
                  break;
              }
            }, 500);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
};

exports.conf = {
  enabled: true,
  aliases: ['apex']
};

exports.help = {
  name: 'ApexTracker',
  description: 'Rank Doğrulamayı Sağlar',
  usage: 'apex'
};
