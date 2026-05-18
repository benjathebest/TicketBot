require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    SlashCommandBuilder,
    REST,
    Routes,
    Events
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Registrar comando /tickets
const commands = [
    new SlashCommandBuilder()
        .setName("tickets")
        .setDescription("Enviar panel de tickets")
        .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.once("ready", async () => {
    console.log(`✅ ${client.user.tag} conectado`);

    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );

        console.log("✅ Comando /tickets registrado");
    } catch (err) {
        console.log(err);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "tickets") {

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
                        }
                    ])
            );

        await interaction.reply({
            embeds: [panel],
            components: [menu]
        });
    }
});

client.login(process.env.TOKEN);
