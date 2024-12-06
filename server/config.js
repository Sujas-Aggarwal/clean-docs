const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const env = dotenv.parse(fs.readFileSync(path.join(__dirname, ".env")));
const ACCESSTOKEN_SECRET = Math.random().toString(36).substring(2, 35) + Math.random().toString(36).substring(2, 35);
const REFRESHTOKEN_SECRET = Math.random().toString(36).substring(2, 35) + Math.random().toString(36).substring(2, 35);
env.ACCESSTOKEN_SECRET = ACCESSTOKEN_SECRET;
env.REFRESHTOKEN_SECRET = REFRESHTOKEN_SECRET;
let newEnv = "";
for (const key in env) {
    newEnv += `${key}="${env[key]}"\n`;
}
console.log(newEnv);
fs.writeFileSync(path.join(__dirname,".env"), newEnv);