const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs")

const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', async (message) => {
	
    if (message.body ==="!entrar"){

        client.sendMessage (message.from, ("Olá tudo bem? Sou o Pantera BOT, como posso te ajudar? \n Comando possíveis: !time, !lineup, !premios, !fallen, !yuurih, !yekindar, !molodoy, !kscerato"))

    }
});

client.initialize();
