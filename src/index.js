const Discord = require('discord.js');
const client = new Discord.Client();

// Importing NestBOT framework
const NestBOT = require('./NestBOT-Framework');

// Import commands
    NestBOT.addCommand(require('./NestBOT-Framework/Sample Files/sampleCommand'));

    // Economy Commands
    NestBOT.addCommand(require('./commands/economy/wallet.command'));
    NestBOT.addCommand(require('./commands/economy/daily.command'));

    // Community Commands
    NestBOT.addCommand(require('./commands/community/profile/profile.command'));

    // Administration Commands
    NestBOT.addCommand(require('./commands/administration/ban.command'));
    NestBOT.addCommand(require('./commands/administration/kick.command'));
    NestBOT.addCommand(require('./commands/administration/warn.command'));
    NestBOT.addCommand(require('./commands/administration/clear.commands'));

    // Fun Commands
    NestBOT.addCommand(require('./commands/fun/kiss.command'));
    NestBOT.addCommand(require('./commands/fun/hug.command'));
    NestBOT.addCommand(require('./commands/fun/slap.command'));
    NestBOT.addCommand(require('./commands/fun/anime.command'));
    NestBOT.addCommand(require('./commands/fun/covid.command'));

    // Music Commands
    //..........................

    // Other Category
    NestBOT.addCommand(require('./commands/others/pool.command'));


// Setting all to-work needed configurations
    NestBOT.language(require('./languages/pl_PL.json'));
    NestBOT.config(require('./config.json'));


// Initializing all NestBOT events
    NestBOT.init(client);


// Starting the bot
    NestBOT.login(client);
