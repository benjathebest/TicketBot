require("dotenv").config();

const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

client.once("ready", () => {
console.log(`✅ ${client.user.tag} conectado`);
});

client.on("messageCreate", async (message) => {

if (message.author.bot) return;

if (message.content === "!tickets") {

const panel = new EmbedBuilder()
.setColor("#22c55e")
.setTitle("🎫 ¿NECESITAS AYUDA?")
.setDescription(`
Selecciona una categoría para recibir soporte del equipo de **CydraxMC**

⚠️ RECUERDA
• No menciones al Staff innecesariamente
• No crees tickets falsos
• Explica tu problema claramente
`);

const menu = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId("tickets")
.setPlaceholder("Selecciona una categoría")
.addOptions([
{
label: "Soporte Técnico",
description: "Resolvemos tus dudas",
emoji: "🔧",
value: "soporte"
},
{
label: "Reporta a un jugador",
description: "Reportar jugadores",
emoji: "📜",
value: "reporte"
},
{
label: "Reporte de Bug",
description: "Reportar errores",
emoji: "⚠️",
value: "bug"
},
{
label: "Sanciones & Anticheat",
description: "Apela sanciones",
emoji: "💻",
value: "sanciones"
},
{
label: "Pagos Tienda",
description: "Problemas con pagos",
emoji: "💰",
value: "tienda"
},
{
label: "Solicitar Revive",
description: "Recuperar objetos",
emoji: "💀",
value: "revive"
}
])
);

await message.channel.send({
embeds: [panel],
components: [menu]
});

}

});

client.login(process.env.TOKEN);
