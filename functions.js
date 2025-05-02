function formatarDados(furiaData, comando) {
    let resultado = "";

    
    if (comando == "!time") {
        const time = furiaData["!time"][0];
        resultado += `🏆 *Time: ${time.nome}*\n`;
        resultado += `📅 Fundação: ${time.fundacao}\n`;
        resultado += `👨‍💼 Fundadores: ${time.fundadores}\n`;
        resultado += `🌍 País: ${time.pais}\n\n`;
        resultado += `📜 História:\n${time.historico}\n\n`;
    }

    
    if (comando == "!lineup") {
        resultado += "🔥 *Lineup Atual:*\n";
        furiaData["!lineup"].forEach(jogador => {
            resultado += `👤 Nome: ${jogador.nome}\n`;
            resultado += `🎭 Função: ${jogador.funcao}\n`;
            resultado += `🗓️ Entrada: ${jogador.entrada}\n\n`;
        });
    }

    
    if (comando == "!premios") {
        resultado += "🏅 *Prêmios e Conquistas:*\n";
        furiaData["!premios"].forEach(premio => {
            resultado += `🏆 Torneio: ${premio.torneio}\n`;
            resultado += `📅 Ano: ${premio.ano}\n`;
            resultado += `📊 Posição: ${premio.posicao}\n`;
            resultado += `💰 Prêmio: ${premio.premio}\n\n`;
        });
    }

    return resultado.trim();
}



module.exports = {formatarDados};

