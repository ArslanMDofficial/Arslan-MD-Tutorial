const arslanMDInfo = {
  contextInfo: {
    forwardingScore: 999, // Max forwarding score
    isForwarded: true,
    externalAdReply: {
      title: "ARSLAN-MD ULTRA PRO",
      body: "Official WhatsApp Bot",
      thumbnailUrl: "https://i.imgur.com/arslan-md-logo.jpg", // Your logo URL
      mediaType: 1,
      mediaUrl: "https://github.com/Arslan-MD",
      sourceUrl: "https://github.com/Arslan-MD",
      showAdAttribution: true
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "arslan-md-official@newsletter", // Custom newsletter ID
      newsletterName: "Arslan-MD Official",
      serverMessageId: -1
    }
  }
};

// Premium features metadata
const premiumFeatures = {
  version: "2.0",
  developer: "Arslan-MD",
  releaseDate: "2024-06-01",
  special: "ULTRA PRO MAX EDITION"
};

module.exports = {
  channelInfo: arslanMDInfo,
  premiumData: premiumFeatures,
  botTag: () => {
    return `\n\n*🔰 ARSLAN-MD BOT • ULTRA PRO MAX*`
  }
};
