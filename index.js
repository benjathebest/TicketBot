const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

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

channel.send({
    embeds: [panel],
    components: [menu]
});
