const fetch = require('node-fetch');

async function simpCommand(sock, chatId, quotedMsg, mentionedJid, sender) {
    try {
        // Determine the target user
        let who = quotedMsg 
            ? quotedMsg.sender 
            : mentionedJid && mentionedJid[0] 
                ? mentionedJid[0] 
                : sender;

        // Get the profile picture URL
        let avatarUrl;
        try {
            avatarUrl = await sock.profilePictureUrl(who, 'image');
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            avatarUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'; // Default Arslan-MD avatar
        }

        // Fetch the simp card from the API (Custom Arslan-MD API)
        const apiUrl = `https://some-random-api.com/canvas/misc/simpcard?avatar=${encodeURIComponent(avatarUrl)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        // Get the image buffer
        const imageBuffer = await response.buffer();

        // Send the image with Arslan-MD style
        await sock.sendMessage(chatId, {
            image: imageBuffer,
            caption: '🔥 *Arslan-MD Simp Card* 🔥\n_This user is officially a SIMP!_',
            contextInfo: {
                externalAdReply: {
                    title: 'ARSLAN-MD ULTRA',
                    body: 'Premium Simp Detector',
                    thumbnail: imageBuffer, // Simp card as thumbnail
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: 'https://github.com/Arslan-MD'
                }
            }
        });

    } catch (error) {
        console.error('Arslan-MD Simp Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ *Arslan-MD Failed:* Simp card generate nahi ho paya! Owner ko batao.' 
        });
    }
}

module.exports = { simpCommand };
