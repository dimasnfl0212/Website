// Vercel Serverless Function
const axios = require('axios');

export default async function handler(req, res) {
  // Cek metode
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Pakai WhatsApp Business API (perlu setup dulu)
    // Atau pakai service pihak ketiga
    
    // CONTOH: Pake CallMeBot (GRATIS TAPI LIMITED)
    const phoneNumber = "0895611127740";
    const message = "🚨 PACAR UDAH MAAPIN DIMAS! 😍💖\nPacar cantiknya dimas telah memaafkan\nWaktu: " + new Date().toLocaleString();
    
    // Encode message
    const encodedMessage = encodeURIComponent(message);
    
    // CallMeBot WhatsApp API (GRATIS)
    const callmebotURL = `https://api.textmebot.com/addphone.php?apikey=8UAy46kU4GdV&phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Kirim request
    const response = await axios.get(callmebotURL);
    
    // Kalo sukses
    if (response.data.includes("Message sent")) {
      return res.status(200).json({ 
        success: true, 
        message: "WhatsApp notification sent!" 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        error: "Failed to send" 
      });
    }
    
  } catch (error) {
    console.error("Error sending WhatsApp:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// No need for separate exports
export const config = {
  api: {
    bodyParser: true,
  },
};