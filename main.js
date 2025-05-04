const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const functions = require("./functions");

// Carrega respostas do JSON
const furiaData = JSON.parse(fs.readFileSync("furiaData.json", "utf-8"));

// Variável de estado para ativar/desativar o bot
var botAtivo = false;

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Bot está pronto!");
});

client.on("message_create", async (message) => {
    
    const comando = message.body;
    const contato = await message.getContact();
    // Ativar o bot apenas quando !entrar for enviado
    if (comando === "!entrar") {
        try{

            botAtivo = true;
            client.sendMessage(message.from, `Olá ${contato.pushname}, me chamo Pantera! Em que posso ajuda-lo?\nComandos: \n 🏆 - !time\n ⚔️ - !Jogos \n 🔥 - !lineup\n 🏅 - !premios\n ⭐ - !jogador#nickname`);
        
        }catch(error){

            client.sendMessage(message.from,"Desculpe, mas não foi possível ativar o bot");
            console.log("Erro ao enviar mensagem: ", error)

        }
        
        return
    }

    // Desativar o bot com !sair
    if (comando === "!sair") {

        try{

            botAtivo = false;
            client.sendMessage(message.from, "❌ Bot desativado! Não responderei mais.");

        }catch(error){

            client.sendMessage(message.from,"Desculpe, mas não foi possível desativar o bot");

            console.log("Erro ao enviar mensagem: ", error)

        }
        
        return
    }

    // Aqui o if irá verificar se existe a opção no JSON e se o bot está ativo
    if (furiaData[comando] && botAtivo) {
     

    const {msgFormatada, media} = functions.formatarDados(furiaData, comando, client, message, MessageMedia)
        
        try {

        if(media){
            client.sendMessage(message.from, media, {caption: msgFormatada});
        }else{
            client.sendMessage(message.from, msgFormatada)
        }
           
        } catch (error) {
            
            console.error("Erro ao enviar mensagem:", error);

        }

    }
    
    if(comando.startsWith("!jogador#") && botAtivo){

        const nomeJogador = comando.replace("!jogador#", "").trim().toLowerCase();
        
        if (furiaData["!jogador"][nomeJogador]) {
        
            const jogador = furiaData["!jogador"][nomeJogador];

            const resposta = `👤 *Nome:* ${jogador.nome}\n🌍 *País:* ${jogador.pais}\n📊 *Rating:* ${jogador.estatisticas.rating}\n💀 *K/D Ratio:* ${jogador.estatisticas.kd_ratio}\n🔥 *Impacto:* ${jogador.estatisticas.impacto}\n🛡️ *KAST:* ${jogador.estatisticas.kast}\n🔫 *Total de abates:* ${jogador.estatisticas.total_abates}\n💀 *Total de mortes:* ${jogador.estatisticas.total_mortes}\n⚔️ *Dano por round:* ${jogador.estatisticas.dano_por_round}\n🗺️ *Mapas jogados:* ${jogador.estatisticas.mapas_jogados}\n🔄 *Rounds jogados:* ${jogador.estatisticas.rounds_jogados}`;
            let fotoJogador = MessageMedia.fromFilePath(jogador.foto)

            if(fotoJogador){
                client.sendMessage(message.from, fotoJogador, {caption: resposta});
            }else{
                client.sendMessage(message.from, resposta);
            }

        } else {

            await client.sendMessage(message.from, "❌ Jogador não encontrado!");
                
        }
        return

    }
    
    
});
client.initialize();
