const fs = require("fs");
const path = require("path");

const newBlock = `
## Donations are always welcome

[paypal]: https://paypal.me/GerdNaschenweng

🍻 **Support my work**  
All my software is free and built in my personal time. If it helps you or your business, please consider a small donation via [PayPal][paypal] — it keeps the coffee ☕ and ideas flowing!

💸 **Crypto Donations**  
You can also send crypto to one of the addresses below:

\`\`\`
(CRO)   0xb83c3Fe378F5224fAdD7a0f8a7dD33a6C96C422C (Cronos)  
(USDC)  0xb83c3Fe378F5224fAdD7a0f8a7dD33a6C96C422C (ERC20)  
(ETH)   0xfc316ba7d8dc325250f1adfafafc320ad75d87c0  
(BNB)   0xfc316ba7d8dc325250f1adfafafc320ad75d87c0
(BTC)   bc1q24fuw84l6whm20umlr56nvqjn908sec8pavk3z  
Crypto.com PayString: magicdude$paystring.crypto.com
\`\`\`

🧾 **Recommended Platforms**  
- 👉 [Curve.com](https://www.curve.com/join#DWPXKG6E): Add your Crypto.com card to Apple Pay  
- 🔐 [Crypto.com](https://crypto.com/app/ref6ayzqvp): Stake and get your free Crypto Visa card  
- 📈 [Binance](https://accounts.binance.com/register?ref=13896895): Trade altcoins easily  
`.trim();

function updateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("## Donations are always welcome")) {
    console.log(`ℹ️ No donation section found in ${filePath}. Skipping.`);
    return;
  }

  const updated = content.replace(
    /## Donations are always welcome[\s\S]*?(?=\n##|\n#|$)/,
    newBlock
  );

  if (updated === content) {
    console.log(`✅ Donation block already up to date in ${filePath}`);
  } else {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Updated donation block in ${filePath}`);
  }
}

function walkAndUpdate(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkAndUpdate(fullPath);
    } else if (entry.name === "README.md") {
      updateFile(fullPath);
    }
  }
}

walkAndUpdate(".");
