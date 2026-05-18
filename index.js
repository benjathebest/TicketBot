require("dotenv").config();

const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder,
ButtonBuilder,
ButtonStyle,
PermissionFlagsBits,
ChannelType
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers
]
});

client.once("ready", () => {
console.log(`✅ ${client.user.tag} conectado`);
});


// BIENVENIDAS
client.on("guildMemberAdd", async (member) => {

const canal = member.guild.channels.cache.get(
process.env.WELCOME_CHANNEL
);

if (!canal) return;

const bienvenida = new EmbedBuilder()
.setColor("#22c55e")
.setTitle("🎉 ¡Nuevo miembro!")
.setDescription(`
Bienvenido/a ${member} a **CydraxMC**

📜 Lee las reglas
🎫 Ve a \`Tickets\` si necesitas ayuda
💬 Disfruta de la comunidad

👥 Miembro número:
**${member.guild.memberCount}**
`);

canal.send({
embeds: [bienvenida]
});

});


// COMANDO !tickets
client.on("messageCreate", async (message) => {

if (message.author.bot) return;

if (message.content === "!tickets") {

const panel = new EmbedBuilder()
.setColor("#22c55e")
.setTitle("🎫 ¿NECESITAS AYUDA?")
.setDescription(`
Selecciona una categoría para recibir soporte.

⚠️ RECUERDA

• No menciones al Staff
• No hagas spam
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
emoji: "🔧",
description: "Resolver dudas",
value: "soporte"
},
{
label: "Reportar Usuario",
emoji: "📜",
description: "Reportar jugadores",
value: "reporte"
},
{
label: "Reporte de Bug",
emoji: "⚠️",
description: "Reportar errores",
value: "bug"
},
{
label: "Sanciones",
emoji: "💻",
description: "Apelar sanciones",
value: "sanciones"
},
{
label: "Pagos Tienda",
emoji: "💰",
description: "Problemas de pagos",
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


// CREAR TICKETS + CERRAR
client.on("interactionCreate", async (interaction) => {

if (interaction.isStringSelectMenu()) {

if (interaction.customId !== "tickets")
return;

const categoria = interaction.values[0];

const canal = await interaction.guild.channels.create({
name: `ticket-${interaction.user.username}`,
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

const ticketEmbed = new EmbedBuilder()
.setColor("#22c55e")
.setTitle("🎫 Ticket Creado")
.setDescription(`
Hola ${interaction.user}

Tu ticket fue creado correctamente.

📂 Categoría:
**${categoria}**

⏳ Estado:
**Abierto**

⚠️ RECUERDA

• Explica tu problema
• No hagas spam
• Espera al Staff
`)
.setFooter({
text: "CydraxMC Support"
});

const botones = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setCustomId("cerrar")
.setLabel("Cerrar Ticket")
.setEmoji("🔒")
.setStyle(ButtonStyle.Danger)
);

await canal.send({
embeds: [ticketEmbed],
components: [botones]
});

await interaction.reply({
content: `✅ Ticket creado: ${canal}`,
ephemeral: true
});

}


if (interaction.isButton()) {

if (interaction.customId === "cerrar") {

await interaction.reply({
content: "🔒 Ticket cerrándose en 5 segundos...",
ephemeral: false
});

setTimeout(async () => {
await interaction.channel.delete();
}, 5000);

}

}

});

client.login(process.env.TOKEN);
