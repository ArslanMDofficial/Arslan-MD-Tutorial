const fs = require('fs');
const path = require('path');

// 🔐 File path for config
const configPath = path.join(__dirname, '../data/autoStatus.json');

// 📌 Initialize config if missing
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ 
        enabled: false,
        reactEmoji: "❤️", // Default reaction emoji
        notifyOwner: true, // Notify owner when status is viewed
        blacklist: [] // Users to ignore
    }, null, 2));
}

// 🔄 Enhanced Auto Status Command
async function autoStatusCommand(sock, chatId, msg, args) {
    try {
        const isOwner = msg.key.fromMe;
        if (!isOwner) {
            return await sock.sendMessage(chatId, {
                text: '🚫 Only *Bot Owner* can use this command!',
                react: { text: "❌", key: msg.key }
            });
        }

        let config = JSON.parse(fs.readFileSync(configPath));

        // Show current settings
        if (!args || args.length === 0) {
            const status = config.enabled ? '🟢 Enabled' : '🔴 Disabled';
            const reaction = config.reactEmoji || 'Not set';
            return await sock.sendMessage(chatId, {
                text: `🧠 *Auto Status Settings*\n\n` +
                      `Status: ${status}\n` +
                      `Reaction: ${reaction}\n` +
                      `Notify Owner: ${config.notifyOwner ? 'Yes' : 'No'}\n` +
                      `Blacklisted Users: ${config.blacklist.length}\n\n` +
                      `📌 Commands:\n` +
                      `.autostatus on/off - Toggle feature\n` +
                      `.autostatus react ❤️ - Set reaction emoji\n` +
                      `.autostatus notify on/off - Toggle owner notifications\n` +
                      `.autostatus blacklist add/remove @user - Manage blacklist`
            });
        }

        const subCommand = args[0].toLowerCase();
        
        // Toggle main feature
        if (subCommand === 'on' || subCommand === 'off') {
            config.enabled = subCommand === 'on';
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            return await sock.sendMessage(chatId, {
                text: `✅ *Auto status ${subCommand === 'on' ? 'ENABLED' : 'DISABLED'}!*`,
                react: { text: subCommand === 'on' ? "✅" : "❌", key: msg.key }
            });
        }
        
        // Set reaction emoji
        else if (subCommand === 'react' && args[1]) {
            config.reactEmoji = args[1];
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            return await sock.sendMessage(chatId, {
                text: `🎭 Reaction set to: ${args[1]}`,
                react: { text: args[1], key: msg.key }
            });
        }
        
        // Toggle owner notifications
        else if (subCommand === 'notify' && args[1]) {
            if (args[1] === 'on' || args[1] === 'off') {
                config.notifyOwner = args[1] === 'on';
                fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
                return await sock.sendMessage(chatId, {
                    text: `📢 Owner notifications ${args[1] === 'on' ? 'ENABLED' : 'DISABLED'}`,
                    react: { text: "🔔", key: msg.key }
                });
            }
        }
        
        // Blacklist management
        else if (subCommand === 'blacklist' && args[1] && args[2]) {
            const action = args[1].toLowerCase();
            const userJid = args[2].replace('@', '') + '@s.whatsapp.net';
            
            if (action === 'add') {
                if (!config.blacklist.includes(userJid)) {
                    config.blacklist.push(userJid);
                    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
                    return await sock.sendMessage(chatId, {
                        text: `🚷 Added ${userJid} to blacklist`,
                        react: { text: "➕", key: msg.key }
                    });
                }
            } 
            else if (action === 'remove') {
                config.blacklist = config.blacklist.filter(jid => jid !== userJid);
                fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
                return await sock.sendMessage(chatId, {
                    text: `✅ Removed ${userJid} from blacklist`,
                    react: { text: "➖", key: msg.key }
                });
            }
        }

        return await sock.sendMessage(chatId, {
            text: '⚠️ Invalid command! Use `.autostatus` to see all options',
            react: { text: "❓", key: msg.key }
        });

    } catch (error) {
        console.error('❌ AutoStatus Error:', error);
        await sock.sendMessage(chatId, {
            text: `❌ Error: ${error.message}`,
            react: { text: "⚠️", key: msg.key }
        });
    }
}

// 👁️ Enhanced Status Update Handler
async function handleStatusUpdate(sock, status) {
    try {
        const config = JSON.parse(fs.readFileSync(configPath));
        if (!config.enabled) return;

        const key = status.key || status.messages?.[0]?.key;
        if (!key || key.remoteJid !== 'status@broadcast') return;

        const sender = key.participant || key.remoteJid;
        
        // Check blacklist
        if (config.blacklist.includes(sender)) {
            console.log(`⚫ Ignoring blacklisted user: ${sender.split('@')[0]}`);
            return;
        }

        // View status
        await new Promise(resolve => setTimeout(resolve, 1000));
        await sock.readMessages([key]);

        // Add reaction if set
        if (config.reactEmoji) {
            await sock.sendMessage(key.remoteJid, {
                react: { text: config.reactEmoji, key: key }
            });
        }

        // Notify owner if enabled
        if (config.notifyOwner && sock.user?.id) {
            await sock.sendMessage(sock.user.id, {
                text: `👁️ Viewed status from: ${sender.split('@')[0]}\n` +
                      `🕒 ${new Date().toLocaleString()}`
            });
        }

        console.log(`👁️ Viewed + reacted to status from: ${sender.split('@')[0]}`);

    } catch (err) {
        if (err.message?.includes('rate-overlimit')) {
            console.warn('⚠️ Rate limit hit! Retrying...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return handleStatusUpdate(sock, status);
        }
        console.error('❌ Status Handler Error:', err.message);
    }
}

module.exports = {
    autoStatusCommand,
    handleStatusUpdate
};
