const fs = require("fs");

const file = "README.md";
if (!fs.existsSync(file)) {
  console.log("❌ No README.md found");
  process.exit(0);
}

const content = fs.readFileSync(file, "utf8");
if (!content.includes("## Donations are always welcome")) {
  console.log("ℹ️ No donation section found. Skipping.");
  process.exit(0);
}

const newBlock = `
## Donations are always welcome

[paypal]: https://paypal.me/GerdNaschenweng

🍻 **Support my work**  
All my software is free and built in my personal time. If it helps you or your business, please consider a small donation via [PayPal][paypal] — it keeps the coffee ☕ and ideas flowing!

💸 **Crypto Donations**  
You can also send crypto to one of the addresses below:

\`\`\`
(CRO)   0xBAdB43af444055c4031B79a76F74895469BA0CD7 (Cronos)  
(USDC)  0xBAdB43af444055c4031B79a76F74895469BA0CD7  
(ETH)   0xfc316ba7d8dc325250f1adfafafc320ad75d87c0  
(BNB)   0xfc316ba7d8dc325250f1adfafafc320ad75d87c0  
(BTC)   1Mhq9SY6DzPhs7PNDx7idXFDWsGtyn7GWM  
Crypto.com PayString: magicdude$paystring.crypto.com
\`\`\`

🧾 **Recommended Platforms**  
- 👉 [Curve.com](https://www.curve.com/join#DWPXKG6E): Add your Crypto.com card to Apple Pay  
- 🔐 [Crypto.com](https://crypto.com/app/ref6ayzqvp): Stake and get your free Crypto Visa card  
- 📈 [Binance](https://accounts.binance.com/register?ref=13896895): Trade altcoins easily  
`.trim();

const updated = content.replace(
  /## Donations are always welcome[\s\S]*?(?=\n##|\n#|$)/,
  newBlock
);

if (updated === content) {
  console.log("✅ Donation block already up to date.");
} else {
  fs.writeFileSync(file, updated, "utf8");
  console.log("✅ Donation block updated.");
}
