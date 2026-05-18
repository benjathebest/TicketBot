require("dotenv").config();

const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder,
PermissionFlagsBits,
ChannelType
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
`);

const menu = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId("tickets")
.setPlaceholder("Selecciona una categoría")
.addOptions([
{
label: "Soporte Técnico",
emoji: "🔧",
description: "Resolvemos tus dudas",
value: "soporte"
},
{
label: "Reporta a un jugador",
emoji: "📜",
description: "Reporta jugadores",
value: "reporte"
},
{
label: "Reporte de Bug",
emoji: "⚠️",
description: "Reporta errores",
value: "bug"
},
{
label: "Sanciones & Anticheat",
emoji: "💻",
description: "Apela sanciones",
value: "sanciones"
},
{
label: "Pagos Tienda",
emoji: "💰",
description: "Problemas con pagos",
value: "tienda"
},
{
label: "Solicitar Revive",
emoji: "💀",
description: "Recuperar objetos",
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

client.on("interactionCreate", async (interaction) => {

if (!interaction.isStringSelectMenu()) return;
if (interaction.customId !== "tickets") return;

const categoria = interaction.values[0];

const canal = await interaction.guild.channels.create({
name: `ticket-${categoria}`,
type: ChannelType.GuildText,
permissionOverwrites: [
{
id: interaction.guild.id,
deny: [PermissionFlagsBits.ViewChannel]
},
{
id: interaction.user.id,
allow: [
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory
]
}
]
});

await canal.send(`
🎫 Hola ${interaction.user}

Tu ticket fue creado correctamente.
Un miembro del staff te responderá pronto.
`);

await interaction.reply({
content: `✅ Tu ticket fue creado: ${canal}`,
ephemeral: true
});

});

client.login(process.env.TOKEN);
