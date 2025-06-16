console.log('⚡ .menu command activated!');
console.log('📥 .menu command triggered');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

async function menuCommand(sock, m, command, prefix, from, pushName) {
    const time = moment().tz('Asia/Karachi').format('hh:mm A');
    const date = moment().tz('Asia/Karachi').format('dddd, MMMM Do YYYY');

    const menuText = `
╭[ *Arslan-MD Bot Menu* ]━⬣
┃ 👤 *User:* ${pushName}
┃ 📆 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ 🧩 *Prefix:* ${prefix}
╰━━━━━━━━━━━━━━━━━━⬣

> Arslan-MD MENU     

╭──·๏[📥 *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ*📥]
┆ ◦ 
┆ ◦  🟦 facebook
┆ ◦  📁 mediafire
┆ ◦  🎵 tiktok
┆ ◦  🐦 twitter
┆ ◦  📷 insta
┆ ◦  📦 apk
┆ ◦  🖼️ img
┆ ◦  ▶️ tt2
┆ ◦  📌 pins
┆ ◦  🔵 fb2
┆ ◦  📍 pinterest
┆ ◦  🎶 spotify
┆ ◦  🎧 play
┆ ◦  🎧 song
┆ ◦  🔉 audio
┆ ◦  🎬 video
┆ ◦  🎵 ytmp3
┆ ◦  📹 ytmp4
┆ ◦  🎶 song
┆ ◦  🎬 darama
┆ ◦  ☁️ gdrive
┆ ◦  🌐 ssweb
┆ ◦  🎵 tiks
┆ ◦ 
╰────┈⊷

╭──·๏[👥 *ɢʀᴏᴜᴘ ᴍᴇɴᴜ* 👥]
┆ ◦ 
┆ ◦  🔗 grouplink
┆ ◦  🚪 kickall
┆ ◦  🚷 kickall2
┆ ◦  🚫 kickall3
┆ ◦  ➕ add
┆ ◦  ➖ remove
┆ ◦  👢 kick
┆ ◦  ⬆️ promote
┆ ◦  ⬇️ demote
┆ ◦  🚮 dismiss
┆ ◦  🔄 revoke
┆ ◦  👋 setgoodbye
┆ ◦  🎉 setwelcome
┆ ◦  🗑️ delete
┆ ◦  🖼️ getpic
┆ ◦  ℹ️ ginfo
┆ ◦  ⏳ disappear on
┆ ◦  ⏳ disappear off
┆ ◦  ⏳ disappear
┆ ◦  📝 allreq
┆ ◦  ✏️ updategname
┆ ◦  📝 updategdesc
┆ ◦  📩 joinrequests
┆ ◦  📨 senddm
┆ ◦  🏃 nikal
┆ ◦  🔇 mute
┆ ◦  🔊 unmute
┆ ◦  🔒 lockgc
┆ ◦  🔓 unlockgc
┆ ◦  📩 invite
┆ ◦  #️⃣ tag
┆ ◦  🏷️ hidetag
┆ ◦  @️⃣ tagall
┆ ◦  👔 tagadmins
╰───┈⊷

╭──·๏[🎭 *ʀᴇᴀᴄᴛɪᴏɴ ᴍᴇɴᴜ* 🎭]
┆ ◦ 
┆ ◦  👊 bully @tag
┆ ◦  🤗 cuddle @tag
┆ ◦  😢 cry @tag
┆ ◦  🤗 hug @tag
┆ ◦  🐺 awoo @tag
┆ ◦  💋 kiss @tag
┆ ◦  👅 lick @tag
┆ ◦  🖐️ pat @tag
┆ ◦  😏 smug @tag
┆ ◦  🔨 bonk @tag
┆ ◦  🚀 yeet @tag
┆ ◦  😊 blush @tag
┆ ◦  😄 smile @tag
┆ ◦  👋 wave @tag
┆ ◦  ✋ highfive @tag
┆ ◦  🤝 handhold @tag
┆ ◦  🍜 nom @tag
┆ ◦  🦷 bite @tag
┆ ◦  🤗 glomp @tag
┆ ◦  👋 slap @tag
┆ ◦  💀 kill @tag
┆ ◦  😊 happy @tag
┆ ◦  😉 wink @tag
┆ ◦  👉 poke @tag
┆ ◦  💃 dance @tag
┆ ◦  😬 cringe @tag
┆ ◦ 
╰─┈⊷

╭──·๏[🎨 *ʟᴏɢᴏ ᴍᴀᴋᴇʀ* 🎨]
┆ ◦
┆ ◦  💡 neonlight
┆ ◦  🎀 blackpink
┆ ◦  🐉 dragonball
┆ ◦  🎭 3dcomic
┆ ◦  🇺🇸 america
┆ ◦  🍥 naruto
┆ ◦  😢 sadgirl
┆ ◦  ☁️ clouds
┆ ◦  🚀 futuristic
┆ ◦  📜 3dpaper
┆ ◦  ✏️ eraser
┆ ◦  🌇 sunset
┆ ◦  🍃 leaf
┆ ◦  🌌 galaxy
┆ ◦  💀 sans
┆ ◦  💥 boom
┆ ◦  💻 hacker
┆ ◦  😈 devilwings
┆ ◦  🇳🇬 nigeria
┆ ◦  💡 bulb
┆ ◦  👼 angelwings
┆ ◦  ♈ zodiac
┆ ◦  💎 luxury
┆ ◦  🎨 paint
┆ ◦  ❄️ frozen
┆ ◦  🏰 castle
┆ ◦  🖋️ tatoo
┆ ◦  🔫 valorant
┆ ◦  🐻 bear
┆ ◦  🔠 typography
┆ ◦  🎂 birthday
┆ ◦ 
╰─┈⊷

╭──·๏[👑 *ᴏᴡɴᴇʀ ᴍᴇɴᴜ* 👑]
┆ ◦ 
┆ ◦  👑 owner
┆ ◦  📜 menu
┆ ◦  📜 menu2
┆ ◦  📊 vv
┆ ◦  📋 listcmd
┆ ◦  📚 allmenu
┆ ◦  📦 repo
┆ ◦  🚫 block
┆ ◦  ✅ unblock
┆ ◦  🖼️ fullpp
┆ ◦  🖼️ setpp
┆ ◦  🔄 restart
┆ ◦  ⏹️ shutdown
┆ ◦  🔄 updatecmd
┆ ◦  💚 alive
┆ ◦  🏓 ping
┆ ◦  🆔 gjid
┆ ◦  🆔 jid
┆ ◦  📖 bible
┆ ◦  📖 biblelist /blist
┆ ◦ 
╰─┈⊷

╭──·๏[🎉 *ғᴜɴ ᴍᴇɴᴜ* 🎉]
┆ ◦ 
┆ ◦  🤪 shapar
┆ ◦  ⭐ rate
┆ ◦  🤬 insult
┆ ◦  💻 hack
┆ ◦  💘 ship
┆ ◦  🎭 character
┆ ◦  💌 pickup
┆ ◦  😆 joke
┆ ◦  ❤️ hrt
┆ ◦  😊 hpy
┆ ◦  😔 syd
┆ ◦  😠 anger
┆ ◦  😳 shy
┆ ◦  💋 kiss
┆ ◦  🧐 mon
┆ ◦  😕 cunfuzed
┆ ◦  🖼️ setpp
┆ ◦  ✋ hand
┆ ◦  🏃 nikal
┆ ◦  🤲 hold
┆ ◦  🤗 hug
┆ ◦  🏃 nikal
┆ ◦  🎵 hifi
┆ ◦  👉 poke
┆ ◦ 
╰─┈⊷

╭──·๏[🔄 *ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ* 🔄]
┆ ◦ 
┆ ◦  🏷️ sticker
┆ ◦  🏷️ sticker2
┆ ◦  😀 emojimix
┆ ◦  ✨ fancy
┆ ◦  🖼️ take
┆ ◦  🎵 tomp3
┆ ◦  🗣️ tts
┆ ◦  🌐 trt
┆ ◦  🔢 base64
┆ ◦  🔠 unbase64
┆ ◦  010 binary
┆ ◦  🔤 dbinary
┆ ◦  🔗 tinyurl
┆ ◦  🌐 urldecode
┆ ◦  🌐 urlencode
┆ ◦  🌐 url
┆ ◦  🔁 repeat
┆ ◦  ❓ ask
┆ ◦  📖 readmore
┆ ◦  💚 help
┆ ◦  💚 support
┆ ◦ 
╰─┈⊷

╭──·๏[🤖 *ᴀɪ ᴍᴇɴᴜ*🤖]
┆ ◦ 
┆ ◦  🧠 ai
┆ ◦  🤖 gpt3
┆ ◦  🤖 gpt2
┆ ◦  🤖 gptmini
┆ ◦  🤖 gpt
┆ ◦  🔵 meta
┆ ◦  📦 blackbox
┆ ◦  🌈 luma
┆ ◦  🎧 dj
┆ ◦  🧠 gpt4
┆ ◦  🔍 bing
┆ ◦  🎨 imagine
┆ ◦  🖼️ imagine2
┆ ◦  🤖 copilot
┆ ◦ 
╰─┈⊷

╭──·๏[⚡*ᴍᴀɪɴ ᴍᴇɴᴜ* ⚡]
┆ ◦ 
┆ ◦  🏓 ping
┆ ◦  🚀 speed
┆ ◦  📡 live
┆ ◦  💚 alive
┆ ◦  ⏱️ runtime
┆ ◦  ⏳ uptime
┆ ◦  📦 repo
┆ ◦  👑 owner
┆ ◦  📜 menu
┆ ◦  📜 menu2
┆ ◦  🔄 restart
┆ ◦ 
╰─┈⊷

╭──·๏[🎎 *ᴀɴɪᴍᴇ ᴍᴇɴᴜ* 🎎] 
┆ ◦ 
┆ ◦  🤬 fack
┆ ◦  ✅ truth
┆ ◦  😨 dare
┆ ◦  🐶 dog
┆ ◦  🐺 awoo
┆ ◦  👧 garl
┆ ◦  👰 waifu
┆ ◦  🐱 neko
┆ ◦  🧙 megnumin
┆ ◦  🐱 neko
┆ ◦  👗 maid
┆ ◦  👧 loli
┆ ◦  📰 animenews
┆ ◦  🦊 foxgirl
┆ ◦  🍥 naruto
┆ ◦ 
╰─┈⊷

╭──·๏[ℹ️*ᴏᴛʜᴇʀ ᴍᴇɴᴜ* ℹ️]
┆ ◦ 
┆ ◦  🕒 timenow
┆ ◦  📅 date
┆ ◦  🔢 count
┆ ◦  🧮 calculate
┆ ◦  🔢 countx
┆ ◦  🎲 flip
┆ ◦  🪙 coinflip
┆ ◦  🎨 rcolor
┆ ◦  🎲 roll
┆ ◦  ℹ️ fact
┆ ◦  💻 cpp
┆ ◦  🎲 rw
┆ ◦  💑 pair
┆ ◦  💑 pair2
┆ ◦  ✨ fancy
┆ ◦  🎨 logo <text>
┆ ◦  📖 define
┆ ◦  📰 news
┆ ◦  🎬 movie
┆ ◦  ☀️ weather
┆ ◦  📦 srepo
┆ ◦  🤬 insult
┆ ◦  💾 save
┆ ◦  🌐 wikipedia
┆ ◦  🔑 gpass
┆ ◦  👤 githubstalk
┆ ◦  🔍 yts
┆ ◦  📹 ytv
┆ ◦ 
╰━[ *Arslan-MD v2.0* ]━━⬣
`;

    try {
        const videoPath = path.resolve('ArslanMedia/media/gang.mp4');
        const voicePath = path.resolve('ArslanMedia/audio/marco.mp3');

        // 🎬 Send Video
        if (fs.existsSync(videoPath)) {
            await sock.sendMessage(from, {
                video: fs.readFileSync(videoPath),
                mimetype: 'video/mp4',
                caption: menuText
            }, { quoted: m });
            console.log("✅ menu.mp4 sent");
        } else {
            console.warn("⚠️ menu.mp4 not found");
            await sock.sendMessage(from, {
                text: menuText
            }, { quoted: m });
        }

        // 🔊 Send Voice
        if (fs.existsSync(voicePath)) {
            await sock.sendMessage(from, {
                audio: fs.readFileSync(voicePath),
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: m });
            console.log("✅ welcome.mp3 sent");
        } else {
            console.warn("⚠️ welcome.mp3 not found");
        }

    } catch (err) {
        console.error('❌ Error in menuCommand:', err);
        await sock.sendMessage(from, {
            text: `❌ Menu error: ${err.message}`
        }, { quoted: m });
    }
} // ✅ This was missing!

module.exports = menuCommand;
