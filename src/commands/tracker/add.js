const { SlashCommandBuilder } = require('discord.js');
const { addScammer } = require('../../scammerService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tracker')
        .setDescription('Manage scammer tracker')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a scammer to a list')
                .addStringOption(option =>
                    option.setName('list')
                        .setDescription('The ban list to add the scammer to')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Public', value: 'Public' },
                            { name: 'MyPersonalScammerList', value: 'MyPersonalScammerList' }
                        )
                )
                .addStringOption(option =>
                    option.setName('server')
                        .setDescription('Albion server of the scammer')
                        .setRequired(true)
                        .addChoices(
                            { name: 'West', value: 'West' },
                            { name: 'East', value: 'East' },
                            { name: 'Europe', value: 'Europe' }
                        )
                )
                .addStringOption(option =>
                    option.setName('ign')
                        .setDescription('In-game name of the scammer')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('Reason for banning this player')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const list = interaction.options.getString('list');
        const server = interaction.options.getString('server');
        const ign = interaction.options.getString('ign');
        const reason = interaction.options.getString('reason');
        const addedBy = interaction.user.id;

        try {
            const scammer = await addScammer(ign, server, reason, list, addedBy);
            await interaction.reply(`✅ Scammer \`${ign}\` has been added to the \`${list}\` list for the \`${server}\` server.`);
        } catch (error) {
            console.error('Error adding scammer:', error);
            await interaction.reply('❌ Failed to add scammer. Please try again later.');
        }
    },
};
