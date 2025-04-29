const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

// Carrega respostas do JSON
const respostas = JSON.parse(fs.readFileSync("respostas.json", "utf-8"));

// Variável de estado para ativar/desativar o bot
let botAtivo = false;

const client = new Client();

client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Bot está pronto!");
});

client.on("message_create", async (message) => {
    const comando = message.body.replace("!", "").toLowerCase();

    // Ativar o bot apenas quando !entrar for enviado
    if (comando === "entrar") {
        botAtivo = true;
        await client.sendMessage(message.from, "✅ Bot ativado! Agora posso responder seus comandos.");
        return;
    }

    // Desativar o bot com !sair
    if (comando === "sair") {
        botAtivo = false;
        await client.sendMessage(message.from, "❌ Bot desativado! Não responderei mais.");
        return;
    }

    // Se o bot não estiver ativo, ele não responde
    if (botAtivo) {

        if (respostas[comando]) {
            await client.sendMessage(message.from, respostas[comando]);
        }

    }

    
    
});
client.initialize();