let express = require("express");
let app = express();
const fs = require ("fs-extra")
let {
    toBuffer
} = require("qrcode");
const CryptoJS = require("crypto-js");
const JSZip = require("jszip");
const file = require("fs");
const zip = new JSZip();

const {
    delay,
    useMultiFileAuthState,
    BufferJSON,
    fetchLatestBaileysVersion,
    Browsers,
    default: makeWASocket
    } = require("@whiskeysockets/baileys")
    const pino = require("pino");
    let PORT = process.env.PORT || 3030;
    const PastebinAPI = require("pastebin-js"),
    pastebin = new PastebinAPI("h4cO2gJEMwmgmBoteYufW6_weLvBYCqT");

    app.use("/", (req, res) => {

        async function bot() {

            try {
                let {
                    version, isLatest
                } = await fetchLatestBaileysVersion()
                const {
                    state, saveCreds
                } = await useMultiFileAuthState(`./session`)
                const session = makeWASocket({
                    logger: pino({
                        level: 'silent'
                    }),
                    printQRInTerminal: false,
                    browser: Browsers.macOS("Desktop"),
                    auth: state,
                    version
                })
                //------------------------------------------------------

                session.ev.on("connection.update", async (s) => {
                    if (s.qr) {
                        res.end(await toBuffer(s.qr));
                    }
                    const {
                        connection,
                        lastDisconnect
                    } = s
                    if (connection == "open") {
                        const authfile = (`./session/creds.json`)
                        await delay(1000 * 10)

                        let link = await pastebin.createPasteFromFile(
                            authfile,
                            "x-asena",
                            null,
                            0,
                            "N"
                        );
                        let data = link.replace("https://pastebin.com/", "");
                        let code = btoa(data);
                        var words = code.split("");
                        var ress = words[Math.floor(words.length / 2)];
                        let c = code.split(ress).join(ress + "_HANNA_XO_");
                        await session.sendMessage(session.user.id, {text:`${c}`})
                        await session.sendMessage(session.user.id, {text:`
                       
                       ✮ 𝐇𝐀𝐍𝐍𝐀-𝐌𝐃-𝐖𝐀 𝐁𝐎𝐓 ✮                         \n\n𝗧𝗵𝗮𝗻𝗸 𝗬𝗼𝘂 𝗙𝗼𝗿 𝗦𝗰𝗮𝗻𝗻𝗶𝗻𝗴 𝗛𝗮𝗻𝗻𝗮 𝗠𝗱.           𝗧𝗵𝗶𝘀 𝗜𝘀 𝗬𝗼𝘂𝗿 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 𝗜’𝗱 𝗗𝗼𝗻’𝘁 𝗦𝗵𝗮𝗿𝗲 𝗔𝗻𝗼𝘁𝗵𝗲𝗿 𝗣𝗲𝗿𝘀𝗼𝗻.                                  \n\n𝘎𝘪𝘵𝘏𝘶𝘣 : _https://github.com/Abhiiiyh/HANNA-XO-MD_                    \n\n𝘋𝘦𝘱𝘰𝘭𝘺 : _https://heroku.com/deploy?template=https://github.com/Abhiiiyh/HANNA-XO-MD_                                                           \n\n𝘚𝘶𝘱𝘱𝘰𝘳𝘵 : _https://chat.whatsapp.com/IZAC43MRvbfClp1nctIOA9_\n\n\n©️ 𝐀ʙʜɪɪꪗ
                      
                      `})
     


          await delay(3000 * 10);
          process.send("reset");
                        
                       
                    }
                    if (
                        connection === "close" &&
                        lastDisconnect &&
                        lastDisconnect.error &&
                        lastDisconnect.error.output.statusCode != 401
                    ) {
                        bot()
                    }
                })
                session.ev.on('creds.update',
                    saveCreds)
                await delay(3000 * 10);
                session.ev.on("messages.upsert",
                    () => {})

            }catch(err) {
                console.log(
                    err + "Unknown Error Occured Please report to Owner and Stay tuned"
                );
            }


        }
       bot()

    })

    app.listen(PORT, () => console.log("App listened on port", PORT));
