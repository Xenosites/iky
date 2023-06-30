require('./settings')
const { default: WADefault, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const axios = require('axios')
const fetch = require('node-fetch')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const moment = require('moment-timezone')
const path = require('path')
const { getSizeMedia } = require('./lib/myfunc')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, getBuffer, fetchJson } = require('./lib/simple')
const { isSetClose,
    addSetClose,
    removeSetClose,
    changeSetClose,
    getTextSetClose,
    isSetDone,
    addSetDone,
    removeSetDone,
    changeSetDone,
    getTextSetDone,
    isSetLeft,
    addSetLeft,
    removeSetLeft,
    changeSetLeft,
    getTextSetLeft,
    isSetOpen,
    addSetOpen,
    removeSetOpen,
    changeSetOpen,
    getTextSetOpen,
    isSetProses,
    addSetProses,
    removeSetProses,
    changeSetProses,
    getTextSetProses,
    isSetWelcome,
    addSetWelcome,
    removeSetWelcome,
    changeSetWelcome,
    getTextSetWelcome,
    addSewaGroup,
    getSewaExpired,
    getSewaPosition,
    expiredCheck,
    checkSewaGroup
} = require("./lib/store")

const {
	writeExif
} = require('./lib/exif')

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

global.db = JSON.parse(fs.readFileSync("./database/database.json"))
if (global.db) global.db.data = {
         users: {},
         chats: {},
         database: {},
         game: {},
         others: {},
         sticker: {},
         absen: {},
         cmd: {},
         settings: {},
         anonymous: {},
         menfess: {},
         ...(global.db.data || {})
      }

let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let _left = JSON.parse(fs.readFileSync('./database/left.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let set_open = JSON.parse(fs.readFileSync('./database/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./database/set_close.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let antilink2 = JSON.parse(fs.readFileSync('./database/antilink2.json'));
let antiwame2 = JSON.parse(fs.readFileSync('./database/antiwame2.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
	...query,
	...(apikeyqueryname ? {
		[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
		} : {})
		})) : '')
		
async function Botstarted() {
    const { state, saveCreds } = await useMultiFileAuthState(`./${sessionName}`)

    const iikyy = WADefault({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['egvu kun.','ᴇɢᴠᴜᴀxʀʟ.','1.2.2'],
        patchMessageBeforeSending: (message) => {

                const requiresPatch = !!(
                  message.buttonsMessage
              	  || message.templateMessage
              		|| message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }
                return message;
    },
        auth: state
    })

    store.bind(iikyy.ev)
    
    iikyy.ev.on('messages.upsert', async chatUpdate => {
       //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!iikyy.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(iikyy, mek, store)
        require("./ichigyou")(iikyy, m, chatUpdate, store, opengc, antilink, antiwame, antilink2, antiwame2, set_welcome_db, set_left_db, set_proses, set_done, set_open, set_close, sewa, _welcome, _left, db_respon_list)
        } catch (err) {
            console.log(err)
        }
    })
    
    iikyy.ev.on('groups.update', async anu => {
    try {
    for(let x of anu) {
       try {
       ppgc = await iikyy.profilePictureUrl(x.id, 'image')
       } catch {
       ppgc = 'https://telegra.ph/file/b17e57148993ee163509d.jpg'
       }
       let wm_fatih = { url : ppgc }
       if (x.announce == true) {
       iikyy.sendMessage(x.id, {image: {url: ppgc}, caption: `*「 Group Update Detected 」*\n\nGroup telah ditutup, Sekarang hanya admin yang dapat mengirim pesan !`})
       } else if (x.announce == false) {
       iikyy.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nGroup telah dibuka, Sekarang peserta dapat mengirim pesan !`})
       } else if (x.restrict == true) {
       iikyy.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`})
       } else if (x.restrict == false) {
       iikyy.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nInfogroup telah dibuka, Sekarang peserta dapat mengedit info group !`})
       } else {
       iikyy.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nNama Group telah diganti menjadi *${subject}*`})
     }
    }
    } catch (err){
    console.log(err)
    }
    })
    
    store.bind(iikyy.ev)
    iikyy.ev.on('call', async (celled) => {
    	if (global.anticall) {
    	console.log(celled)
    for (let kopel of celled) {
    	if (kopel.isGroup == false) {
    	if (kopel.status == "offer") {
    	let nomer = await iikyy.sendTextWithMentions(kopel.from, `*${iikyy.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner untuk membuka blok !`)
    iikyy.sendContact(kopel.from, owner, nomer)
    await sleep(5000)
    iikyy.updateBlockStatus(kopel.from, "block")
    }
    }
    }
    }
    })
    
    iikyy.ev.on('group-participants.update', async (anu) => {
        const isWelcome = _welcome.includes(anu.id)
        const isLeft = _left.includes(anu.id)
        try {
            let metadata = await iikyy.groupMetadata(anu.id)
            let participants = anu.participants
            const groupName = metadata.subject
  		      const groupDesc = metadata.desc
            for (let num of participants) {
                try {
                    ppuser = await iikyy.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://telegra.ph/file/b17e57148993ee163509d.jpg'
                }

                try {
                    ppgroup = await iikyy.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://telegra.ph/file/b17e57148993ee163509d.jpg'
                }
                if (anu.action == 'add' && (isWelcome || global.welcome)) {
                	console.log(anu)
                if (isSetWelcome(anu.id, set_welcome_db)) {               	
                var get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db)
                var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`))
                var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                iikyy.sendMessage(anu.id, {text: `${full_pesan}`})
                } else {
                	iikyy.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `*Haii Kak 👋🏻@${num.split("@")[0]} Welcome To ${metadata.subject}, Sering Sering Baca Deskripsi Ya Kak.* 
`})
                }
                } else if (anu.action == 'remove' && (isLeft || global.left)) {
                	console.log(anu)
                  if (isSetLeft(anu.id, set_left_db)) {            	
                        var get_teks_left = await getTextSetLeft(anu.id, set_left_db)
                        var replace_pesan = (get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                      iikyy.sendMessage(anu.id, {text: `${full_pesan}`})
                       } else {
                       	iikyy.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `*Pay Pay Kak* 👋🏻
                       	
*"Karna Setiap Ucapan Selamat Datang Akan Selalu Diakhiri Dengan Ucapan Selamat Tinggal"*

*Terima Kasih Kak @${num.split("@")[0]} Sampai Bertemu Kembali Di Group ${metadata.subject}*` })
                        }
                        } else if (anu.action == 'promote') {
                    iikyy.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} sekarang menjadi admin grup ${metadata.subject}` })
                } else if (anu.action == 'demote') {
                    iikyy.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} bukan admin grup ${metadata.subject} lagi` })
              }
            }
        } catch (err) {
            console.log(err)
        }
    })
	
    // SETTING
    iikyy.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    iikyy.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = iikyy.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    iikyy.getName = (jid, withoutContact  = false) => {
        id = iikyy.decodeJid(jid)
        withoutContact = iikyy.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = iikyy.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === iikyy.decodeJid(iikyy.user.id) ?
            iikyy.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    iikyy.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await iikyy.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await iikyy.getName(i + '@s.whatsapp.net')}\nFN:${await iikyy.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
	    })
	}
	iikyy.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    iikyy.public = true

    iikyy.serializeM = (m) => smsg(iikyy, m, store)

    iikyy.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); iikyy.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); Botstarted(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); Botstarted(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, reconnecting..."); Botstarted(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); iikyy.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); Botstarted(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); Botstarted(); }
            else if (reason === DisconnectReason.Multidevicemismatch) { console.log("Multi device mismatch, please scan again"); iikyy.logout(); }
            else iikyy.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
         await store.chats.all()
         console.log(`Connected to = ` + JSON.stringify(iikyy.user, null, 2))
         console.log('███▀──▀█████████████');
         console.log('█▀──██──▀▀▀▀▀▀▀─▀─▀█');
         console.log('█▄──██──▄▄▄▄▄▄▄─▄─▄█',);
         console.log('███▄──▄█████████████',);
         console.log('╭───╼[ ContactMe ]╾──➲',);
         console.log('│ + Instagram : @Riskynd__',);
         console.log('│ + Wa : +6281255104397',);
         console.log('│ + Youtube : Iky Mabuchi',);
         console.log('│ + Note : Jika terjadi error, hubungi wa diatas ',);
         console.log('│ + Bot masih dalam perkembangan!!! ',);
         console.log('│ + Jika terdapat seseorang menjual Sc ini',);
         console.log('│ + Silahkan Lapor ke nomor/IG di atas Thanks',);
         console.log('╰╾───────────────╼╯');
         console.log('[ Bot Sudah Online ]'), ('Bot Sudah Online!');
         //iikyy.sendMessage("77777777777" + "@s.whatsapp.net", {text:"", "contextInfo":{"expiration": 86400}})
      }
    })

    iikyy.ev.on('creds.update', saveCreds)

  iikyy.sendText = (jid, text, quoted = '', options) => iikyy.sendMessage(jid, { text: text, ...options }, { quoted, ...options })

iikyy.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
         buffer = Buffer.concat([buffer, chunk])
      }

      return buffer
   }
   
iikyy.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {

        let quoted = message.msg ? message.msg : message

        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    iikyy.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await iikyy.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
    iikyy.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
    	let types = await iikyy.getFile(path, true)
    let { mime, ext, res, data, filename } = types
    if (res && res.status !== 200 || file.length <= 65536) {
    	try { throw { json: JSON.parse(file.toString()) } }
    catch (e) { if (e.json) throw e.json }
    }
    let type = '', mimetype = mime, pathFile = filename
    if (options.asDocument) type = 'document'
    if (options.asSticker || /webp/.test(mime)) {
    	let { writeExif } = require('./lib/exif')
    let media = { mimetype: mime, data }
    pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
    await fs.promises.unlink(filename)
    type = 'sticker'
    mimetype = 'image/webp'
    }
    else if (/image/.test(mime)) type = 'image'
    else if (/video/.test(mime)) type = 'video'
    else if (/audio/.test(mime)) type = 'audio'
    else type = 'document'
    await iikyy.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
    return fs.promises.unlink(pathFile)
    }
    
    iikyy.getFile = async (PATH, returnAsFilename) => {
      let res, filename
      const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      const type = await FileType.fromBuffer(data) || {
         mime: 'application/octet-stream',
         ext: '.bin'
      }
      if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './media/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
      return {
         res,
         filename,
         ...type,
         data,
         deleteFile() {
            return filename && fs.promises.unlink(filename)
         }
     }
     }
     
    iikyy.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    	let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    	buffer = await writeExifVid(buff, options)
    } else {
    	buffer = await videoToWebp(buff)
    }
    
    await iikyy.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    }
    iikyy.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    	let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    	buffer = await writeExifImg(buff, options)
    } else {
    	buffer = await imageToWebp(buff)
    }
    
    await iikyy.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    }
    
    iikyy.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
    	let {
    	ext,
    mime,
    data
    } = await iikyy.getFile(path)
    let media = {}
    let buffer
    media.data = data
    media.mimetype = mime
    if (options && (options.packname || options.author)) {
    	buffer = await writeExif(media, options)
    } else {
    	buffer = /image/.test(mime) ? await imageToWebp(data) : /video/.test(mime) ? await videoToWebp(data) : ""
    }
    await iikyy.sendMessage(jid, {
    	sticker: {
    	url: buffer
    },
    ...options
    }, {
    	quoted
    })
    return buffer
    }
    
    iikyy.sendFakeLink = (jid, text, salam, pushname, quoted) => iikyy.sendMessage(jid, {
    	text: text,
    contextInfo: {
    	"externalAdReply": {
    	"title": `Hallo Kak 👋🏻 ${pushname}, Selamat ${salam}`,
    "body": `© ${namaowner}`,
    "previewType": "PHOTO",
    "thumbnailUrl": ``,
    "thumbnail": mAll,
    "sourceUrl": fakelink
    }
    }
    }, {
    quoted : quoted
    })
    
    iikyy.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    	let type = await iikyy.getFile(path, true)
    let {
    	res,
    data: file,
    filename: pathFile
    } = type
    if (res && res.status !== 200 || file.length <= 65536) {
    	try {
    	throw {
    	json: JSON.parse(file.toString())
    }
    }
    catch (e) {
    	if (e.json) throw e.json
    }
    }
    let opt = {
    	filename
    }
    if (quoted) opt.quoted = quoted
    if (!type) options.asDocument = true
    let mtype = '',
    mimetype = type.mime,
    convert
    if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
    else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
    else if (/video/.test(type.mime)) mtype = 'video'
    else if (/audio/.test(type.mime))(
    convert = await (ptt ? toPTT : toAudio)(file, type.ext),
    file = convert.data,
    pathFile = convert.filename,
    mtype = 'audio',
    mimetype = 'audio/ogg; codecs=opus'
    )
    else mtype = 'document'
    if (options.asDocument) mtype = 'document'
    
    delete options.asSticker
    delete options.asLocation
    delete options.asVideo
    delete options.asDocument
    delete options.asImage
    
    let message = {
    	...options,
    caption,
    ptt,
    [mtype]: {
    	url: pathFile
    },
    mimetype
    }
    let m
    try {
    	m = await iikyy.sendMessage(jid, message, {
    	...opt,
    ...options
    })
    }
    catch (e) {
    	//console.error(e)
    m = null
    }
    finally {
    	if (!m) m = await iikyy.sendMessage(jid, {
    	...message,
    [mtype]: file
    }, {
    	...opt,
    ...options
    })
    file = null
    return m
    }
    }
    
iikyy.sendTextWithMentions = async (jid, text, quoted, options = {}) => iikyy.sendMessage(jid, {
      text: text,
      mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
      ...options
   }, {
      quoted
   })

    return iikyy
}

Botstarted()