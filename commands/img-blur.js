const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp');

async function blurCommand(sock, chatId, message, quotedMessage) {
    try {
        // Get the image to blur
        let imageBuffer;
        
        if (quotedMessage) {
            // If replying to a message
            if (!quotedMessage.imageMessage) {
                await sock.sendMessage(chatId, { 
                    text: '❌ *Arslan-MD Says:* Reply to an image only!' 
                });
                return;
            }
            
            const quoted = {
                message: {
                    imageMessage: quotedMessage.imageMessage
                }
            };
            
            imageBuffer = await downloadMediaMessage(quoted, 'buffer', {}, {});
        } else if (message.message?.imageMessage) {
            // If image is in current message
            imageBuffer = await downloadMediaMessage(message, 'buffer', {}, {});
        } else {
            await sock.sendMessage(chatId, { 
                text: '❌ *Arslan-MD Says:* Use `.blur` on an image or reply to one!' 
            });
            return;
        }

        // Ultra Pro Max Blur Effect
        const blurredImage = await sharp(imageBuffer)
            .resize(800, 800, { 
                fit: 'inside',
                withoutEnlargement: true 
            })
            .blur(15) // Stronger blur effect
            .jpeg({ 
                quality: 90, 
                mozjpeg: true  // Better compression
            })
            .toBuffer();

        // Send with Arslan-MD Style
        await sock.sendMessage(chatId, {
            image: blurredImage,
            caption: '✨ *Blurred by Arslan-MD Pro Max!* ✨',
            contextInfo: {
                externalAdReply: {
                    title: 'ARSLAN-MD ULTRA',
                    body: 'Premium Blur Effect',
                    thumbnail: await sharp(imageBuffer)
                        .resize(100, 100)
                        .toBuffer(),
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: 'https://github.com/Arslan-Md'
                }
            }
        });

    } catch (error) {
        console.error('Arslan-MD Blur Error:', error);
        await sock.sendMessage(chatId, { 
            text: '⚠️ *Arslan-MD Failed:* Blur nahi ho paya! Owner ko batao.' 
        });
    }
}

module.exports = blurCommand;
