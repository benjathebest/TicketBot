require("dotenv").config();

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
    console.log(`✅ ${client.user.tag} conectado`);

    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        const panel = new EmbedBuilder()
            .setColor("#22c55e")
            .setTitle("🎫 ¿NECESITAS AYUDA?")
            .setDescription(`
Selecciona una categoría para recibir soporte del equipo de **CydraxMC**

⚠️ **RECUERDA**
• No menciones al Staff innecesariamente
• No crees tickets falsos
• Explica tu problema claramente
            `)
            .setFooter({
                text: "CydraxMC Support System"
            });

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
                            description: "Reporta jugadores",
                            emoji: "📜",
                            value: "reporte"
                        },
                        {
                            label: "Reporte de un bug",
                            description: "Reporta errores",
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
                            label: "Pagos tienda",
                            description: "Problemas con pagos",
                            emoji: "💰",
                            value: "tienda"
                        },
                        {
                            label: "Solicitar revive",
                            description: "Recuperar objetos",
                            emoji: "💀",
                            value: "revive"
                        }
                    ])
            );

        await channel.send({
            embeds: [panel],
            components: [menu]
        });

        console.log("✅ Panel enviado");

    } catch (err) {
        console.log("❌ Error:", err);
    }
});

client.login(process.env.TOKEN);
