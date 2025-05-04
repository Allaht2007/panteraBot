function formatarDados(furiaData, comando, client, message, MessageMedia) {
    let resultado = "";
    let media = null;
    
    if (comando == "!time") {

        
        const time = furiaData["!time"][0];
        media = MessageMedia.fromFilePath(time.foto);
        resultado += `🏆 *Time: ${time.nome}*\n`;
        resultado += `📅 Fundação: ${time.fundacao}\n`;
        resultado += `👨‍💼 Fundadores: ${time.fundadores}\n`;
        resultado += `🌍 País: ${time.pais}\n\n`;
        resultado += `📜 História:\n${time.historico}\n\n`;
        resultado +="↩️ !voltar\n\n";
    }

    else if(comando == "!lineup") {
        media = MessageMedia.fromFilePath("./src/fotoLineup.jpg")
        resultado += "🔥 *Lineup Atual:*\n";
        furiaData["!lineup"].forEach(jogador => {
            resultado += `👤 Nome: ${jogador.nome}\n`;
            resultado += `🎭 Função: ${jogador.funcao}\n`;
            resultado += `🗓️ Entrada: ${jogador.entrada}\n\n`;
            resultado +="↩️ !voltar\n\n";
        });
    }
    else if(comando =="!jogos"){

        resultado += "🎮 *Próximos Jogos:*\n";
        furiaData["!jogos"].forEach(jogo => {

            resultado += `🏆 Torneio: ${jogo.torneio}\n`;
            resultado += `📅 Data: ${jogo.data}\n`;
            resultado += `⚔️ Oponente: ${jogo.oponente}\n\n`;
            resultado +="↩️ !voltar\n\n";

        });
    }

    else if(comando == "!premios") {
        resultado += "🏅 *Prêmios e Conquistas:*\n\n";
        furiaData["!premios"].forEach(premio => {
            resultado += `🏆 Torneio: ${premio.torneio}\n`;
            resultado += `📅 Ano: ${premio.ano}\n`;
            resultado += `📊 Posição: ${premio.posicao}\n`;
            resultado += `💰 Prêmio: ${premio.premio}\n\n`;
            resultado +="↩️!voltar\n\n";
        });
    }

    return {msgFormatada:resultado.trim(),media};
}



module.exports = {formatarDados};

