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
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers
]
});

client.once("ready", () => {
console.log(`✅ ${client.user.tag} conectado`);
});


// BIENVENIDAS
client.on("guildMemberAdd", async (member) => {

const canal = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);

if (!canal) return;

canal.send(`
🎉 ¡Bienvenido/a ${member} a **CydraxMC**!

📜 Lee las reglas
🎫 Usa \`!tickets\` si necesitas ayuda
💬 Disfruta de la comunidad

👥 Miembro número: ${member.guild.memberCount}
`);
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
`);

const menu = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId("tickets")
.setPlaceholder("Selecciona una categoría")
.addOptions([
{
label: "Soporte Técnico",
description: "Resolvemos dudas",
emoji: "🔧",
value: "soporte"
},
{
label: "Reportar Usuario",
description: "Reporta jugadores",
emoji: "📜",
value: "reporte"
},
{
label: "Reporte de Bug",
description: "Reporta errores",
emoji: "⚠️",
value: "bug"
}
])
);

await message.channel.send({
embeds: [panel],
components: [menu]
});

}
});


// CREAR TICKET
client.on("interactionCreate", async (interaction) => {

if (!interaction.isStringSelectMenu()) return;
if (interaction.customId !== "tickets") return;

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

await canal.send(`
🎫 Hola ${interaction.user}

Tu ticket de **${categoria}** fue creado.
Un miembro del staff responderá pronto.
`);

await interaction.reply({
content: `✅ Ticket creado: ${canal}`,
ephemeral: true
});

});

client.login(process.env.TOKEN);
