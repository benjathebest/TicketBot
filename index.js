require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    PermissionsBitField,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// BIENVENIDAS
client.on("guildMemberAdd", member => {

    const canal = member.guild.channels.cache.find(
        c => c.name === "👑︱ʙɪᴇɴᴠᴇɴɪᴅᴀꜱ"
    );

    if (!canal) return;

    const bienvenida = new EmbedBuilder()
        .setTitle("👋 Bienvenido")
        .setDescription(`Bienvenido ${member} a **${member.guild.name}**`)
        .setColor("Purple")
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

    canal.send({ embeds: [bienvenida] });

});

// PANEL DE TICKETS
client.on("messageCreate", async message => {

    if (message.author.bot) return;

    if (message.content === "!panel") {

        const embed = new EmbedBuilder()
            .setTitle("🎫 CydraxMC Soporte")
            .setDescription(`
📩 Presiona el botón para abrir un ticket

⏳ El staff responderá pronto
`)
            .setColor("Purple")
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("ticket")
                    .setLabel("Abrir Ticket")
                    .setStyle(ButtonStyle.Primary)
            );

        message.channel.send({
            embeds: [embed],
            components: [row]
        });

    }

});

// TICKETS
client.on("interactionCreate", async interaction => {

    if (!interaction.isButton()) return;

    // CREAR TICKET
    if (interaction.customId === "ticket") {

        const ticketExistente = interaction.guild.channels.cache.find(
            canal => canal.name === `ticket-${interaction.user.username}`
        );

        if (ticketExistente) {
            return interaction.reply({
                content: `❌ Ya tienes un ticket abierto: ${ticketExistente}`,
                ephemeral: true
            });
        }

        const staffRole = interaction.guild.roles.cache.find(
            role => role.name === "Staff"
        );

        const canal = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,

            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages
                    ]
                },
                ...(staffRole ? [{
                    id: staffRole.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages
                    ]
                }] : [])
            ]
        });

        const cerrar = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cerrar")
                    .setLabel("🔒 Cerrar Ticket")
                    .setStyle(ButtonStyle.Danger)
            );

        const ticketEmbed = new EmbedBuilder()
            .setTitle("🎫 Sistema de Tickets")
            .setDescription(`
📌 Explica tu problema
⏳ Un staff responderá pronto
`)
            .setColor("Green")
            .setImage("https://i.imgur.com/4myqfzJ.jpeg")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp();

        canal.send({
            embeds: [ticketEmbed],
            components: [cerrar]
        });

        interaction.reply({
            content: `✅ Tu ticket fue creado: ${canal}`,
            ephemeral: true
        });
    }

    // CERRAR TICKET
    if (interaction.customId === "cerrar") {

        await interaction.reply({
            content: "🔒 Cerrando ticket en 3 segundos..."
        });

        setTimeout(() => {
            interaction.channel.delete();
        }, 3000);
    }

});

client.login(process.env.TOKEN);
