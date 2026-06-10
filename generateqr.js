const QRCode = require('qrcode');

QRCode.toFile(
  'vasasi-qr.png',
  'https://your-vercel-link.vercel.app',
  function (err) {
    if (err) throw err;
    console.log('QR generated');
  }
);