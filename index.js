const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
console.log(`${client.user.tag} conectado`);

const channel = await client.channels.fetch("1465171315156844574");

const panel = new EmbedBuilder()
.setColor("#22c55e")
.setTitle("🎫 ¿NECESITAS AYUDA?")
.setDescription(`
Selecciona una categoría para recibir soporte del equipo de **CydraxMC**

⚠️ **Recuerda**
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
description: "En esta categoría responderemos tus dudas",
emoji: "🔧",
value: "soporte"
},
{
label: "Reporta a un jugador",
description: "En esta categoría podrás reportar un jugador",
emoji: "📜",
value: "reporte"
},
{
label: "Reporte de un bug",
description: "Reporta cualquier bug del servidor",
emoji: "⚠️",
value: "bug"
},
{
label: "Sanciones & Anticheat",
description: "Podrás apelar tu sanción aquí",
emoji: "💻",
value: "sancion"
},
{
label: "Pagos tienda",
description: "Si tienes un problema con la tienda",
emoji: "💰",
value: "tienda"
},
{
label: "Solicitar revive",
description: "Solicita revisión de objetos perdidos",
emoji: "💀",
value: "revive"
}
])
);

await channel.send({
embeds: [panel],
components: [menu]
});

});

client.login("MTUwNTI0NTk4NjU4MTEyMzI5NA.GQUKBD.IXT6J6Yn9WyVkNgnSHXpZvw4cIyYQdeWYRHWH4");
