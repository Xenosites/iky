const fs = require('fs')

/*============== CHANGELOG ==============*/
global.changelog = (`
   /)   /)  ❀ 
 („• ֊ •„)   
─O─O──────────
››〔 *CHANGELOG* 〕
📝 Note : SC ini hanya untuk mengelola grup, buat sticker dan downloader, jangan berharap lebih....

››〔 *VERSI 1.3.1* 〕
• *[remove]* fitur (!afk)
• *[remove]* fungsi (global.tagme) karena error
• *[improve]* mengubah tampilan semua menu memiliki quoted : ikykun (nama, ucapan, tanggal, jam)
• *[improve]* mengubah beberapa perintah hanya bisa di gunakan di grup
• *[improve]* perubahan pada setiap perintah, setiap kali gagal akan ter cetak di console error
• *[misc]* banyak perubahan dan perbaikan agar bot lebih stabil 
• *[info]* masih dalam projek *[stabil]* , dan penghapusan fitur (!afk) karena database yang belum sempurna

››〔 *VERSI 1.3.0* 〕
• *[remove]* !menufun
• *[remove]* !asupan
• *[improve]* merubah quoted : m menjadi quoted : ikykun
• *[improve]* fitur !facebook !tiktok !instagram !twitter !get kini hanya bisa di gunakan di grup
• *[improve]* perubahan pada menu
• *[improve]* merubah thumbnail agar bisa di ganti satu satu menggunakan link
• *[add]* menambahkan limit ke semua perintah 
• *[misc]* dan banyak perubahan dan perbaikan
• *[info]* untuk versi 1.2.8, 1.2.9 & 1.3.0 masih belum stabil


››〔 *VERSI 1.2.9* 〕
• *[add]* fitur (!tiktokkayes)
• *[add]* fitur (!tiktokgirl)
• *[add]* fitur (!tiktokghea)
• *[add]* fitur (!tiktokbocil)
• *[add]* fitur (!tiktokukhty)
• *[add]* fitur (!tiktoksantuy)
• *[add]* fitur (!tiktokpanrika)
• *[add]* fitur (!tiktoknotnot)
• *[add]* fitur (!tiktokgabagtha)
• *[add]* fungsi tagme
• *[misc]* beberapa perubahan dan perbaikan pada menu

››〔 *VERSI 1.2.8* 〕
• *[add]* fitur (!totalfitur)
• *[add]* menambahkan fungsi limit dan premium
• *[add]* menambahkan fungsi afk
• *[add]* fitur (!afk)
• *[add]* fitur (!addprem)
• *[add]* fitur (!delprem)
• *[add]* fitur (!listprem)
• *[add]* fitur (!ceklimit)
• *[add]* fitur (!antitoxic2)
• *[add]* fitur (!adddonatur)/(!addd)
• *[add]* fitur (!deldonatur)/(!deld)
• *[add]* fitur (!listdonatur)/(!listd)
• *[add]* fitur (!buyprem)
• *[add]* kini yang mengirim link grup ke private chat akan di respon untuk sewa terlebih dahulu
• *[misc]* banyak perbaikan dan perubahan tentunya 

• *[add]* fungsi auto bio 


››〔 *VERSI 1.2.7* 〕
• *[add]* fitur (!antitoxic)
• *[improve]* with prefix menjadi no prefix
• *[add]* fungsi autoread
• *[add]* fungsi anti virtex
• *[improve]* mengubah beberapa tampilan list dan (!menu)
• *[info]* kini bot jauh lebih simple dan mudah di gunakan
• *[misc]* dan banyak perubahan dan perbaikan kecil lainnya 

››〔 *VERSI 1.2.6* 〕
• *[add]* fitur (!antilink2)
• *[add]* fitur (!play)
• *[add]* fitur (!milf)
• *[add]* fitur (!cecan)
• *[add]* fitur (!quotesagama)
• *[fixed]* fungsi antilink sekarang sudah di perbaiki
• *[improve]* perubahan pada semua antilink 
• *[improve]* memindahkan .json ke GitHub repository
• *[improve]* mengganti nama (!menualat) ke (!menurandom)
• *[misc]* banyak perubahan pada tampilan 

››〔 *VERSI 1.2.5* 〕
• *[add]* fitur (!idgrup)
• *[add]* fitur (!listpc)
• *[add]* fitur (!listgrup)
• *[add]* fitur database sticker
• *[improve]* menambahkan audio ke setiap (!menu×××) 
• *[misc]* perubahan dan perbaikan di respon teks

››〔 *VERSI 1.2.4* 〕
• *[fixed]* memperbaiki (!ai)
• *[improve]* merubah beberapa tampilan teks respons
• *[remove]* fitur (!mediafire) kini tidak tersedia
• *[misc]* beberapa perubahan dan perbaikan

››〔 *VERSI 1.2.3* 〕
• *[add]* fitur download (!instagram)
• *[add]* fitur download (!facebook)
• *[add]* fitur download (!twitter)
• *[add]* fitur downloader video (!get)
• *[add]* fitur (!ppcouple)
• *[add]* fitur (!lirik)
• *[remove]* menghapus pesan tunggu
• *[improve]* mengganti semua pesan tunggu dengan react (simbolll)
• *[misc]* beberapa perubahan dan perbaikan
• *[info]* downloader sekarang hanya tersedia untuk video

››〔 *VERSI 1.2.2* 〕
• *[improve]* (!ping) kini menampilkan kecepatan, ram, dan cpu server
• *[improve]* perbaikan pada audio (!menu) yang muncul diawal teks (!menu)
• *[fixed]* memperbaiki (!ytmp3)
• *[improve]* menambahkan (global.simbolll) untuk reaksi chat
• *[improve]* perubahan pada beberapa fitur
• *[misc]* banyak perubahan perubahan kecil pada (!menu)

››〔 *VERSI 1.2.1* 〕
• *[remove]* semua perintah dan fungsi premium dihapus
• *[improve]* memperbaiki tampilan pada (!ytmp4) 
• *[add]* menambahkan fitur (!quotesanime)
• *[improve]* mengubah tampilan quotes pada (!menu)
• *[fixed]* memperbaiki fitur (!ai) menggunakan apikey (itsrose)
• *[improve]* perubahan pada tampilan (settings.js) agar mudah di edit
• *[misc]* beberapa perubahan dan perbaikan pada teks respon dan simbol
• *[info]* (!pantun) akan segera menyusul!
• *[info]* fitur (!ai) akan segera diperbaiki tanpa menggunakan apikey

››〔 *VERSI 1.2.0* 〕
• *[fixed]* memperbaiki perintah (!ichigyoururi) yang tidak muncul
• *[improve]* perbaiki tampilan (antilink) yang salah variabel
• *[add]* menambahkan lebih banyak quotes di database
• *[improve]* menambahkan (!menufun) dan memindahkan perintah (!quotes) dan (!pantun) kedalamnya
• *[remove]* menghapus fungsi dan variabel yang tidak di gunakan

››〔 *VERSI 1.1.9* 〕
• *[improve]* membatasi penggunaan (!add), (!promote) dan (!demote) karena beresiko banned!
• *[improve]* perubahan pada semua respon perintah diawali (simboll) di (settings.js)
• *[improve]* perubahan pada semua respon list diawali (simbol) di (settings.js)
• *[remove]* menghapus fitur (!viral) karena melanggar kode etik dan kebijakan whatsapp
• *[misc]* kami menghapus semua tombol dan mengubah tampilan respon
• *[info]* kami membatalkan pemindahan teks respon ke (settings.js) agar mempermudah pembacaan

››〔 *VERSI 1.1.8* 〕
• *[improve]* perubahan pada tampilan !menu dan respon teks
• *[add]* menambahkan (simbol) dan (simbolI) pada (settings.js)
• *[fixed]* memperbaiki kesalahan respon pada (!listpremium) dan fungsi premium nya
• *[add]* menambahkan fitur (!viral)
• *[misc]* menambahkan beberapa detail kecil
• *[info]* dalam tahap memindahkan semua teks respon ke (settings.js)

››〔 *VERSI 1.1.7* 〕
• *[remove]* menghapus semua tombol pada (!menu)
• *[remove]* menghapus tombol pada (!tiktok)
• *[remove]* menghapus fitur (!play)
• *[improve]* perubahan pada semua (!menu)
• *[misc]* memindahkan!menu teks ke (settings.js)
• *[info]* whatsapp menghapus semua aksi tombol untuk bailleys

››〔 *VERSI 1.1.6* 〕
• *[remove]* menghapus broadcast menggunakan media
• *[improve]* mengubah respon (!menutools) menjadi (!menualat)
• *[add]* menambahkan khusus premium user ke semua perintah 
• *[improve]* mengubah tampilan (!menu), (runtime) dan (prefix) di tiadakan
• *[remove]* fitur (!attp) dan (!ttp) di hapus
• *[remove]* menghapus fitur (!instagram)
• *[improve]* perubahan pada tampilan tombol fitur (!play)
• *[misc]* dan beberapa perubahan pada (settings.js)

››〔 *VERSI 1.1.5* 〕
• *[remove]* menghapus fitur (!menugame)
• *[improve]* perubahan pada tampilan dan tombol
• *[improve]* perubahan (!menudatabase) menjadi (!menufile)
• *[improve]* memindahkan (!menueffect) kedalam (!menutools)
• *[add]* menambahkan fitur (!changelog) untuk melihat perubahan pada bot ichigyou 
• *[misc]* lebih ringan untuk sebuah program

››〔 *VERSI 1.1.4* 〕
• *[improve]* tampilan console berubah
• *[misc]* beberapa perbaikan dan perubahan

››〔 *VERSI 1.1.3* 〕
• *[remove]* menghapus fitur (!jadikartun)
• *[remove]* menghapus fitur (!remini)
• *[improve]* menangani banned whatsapp pada fitur (!add)

››〔 *VERSI 1.1.2* 〕
• *[fixed]* perbaikan pada (!antilink) yang salah merespon
• *[improve]* tampilan teks berubah pada (!menu)
• *[add]* menambahkan (getRamdomKata) dan menambah (submenu)

››〔 *VERSI 1.1.1* 〕
• *[fixed]* memperbaiki bug di tampilan tombol
• *[fixed]* memperbaiki bug pada fitur (!ai)
• *[improve]* perubahan tampilan (!menu)

››〔 *VERSI 1.1.0* 〕
• *[add]* menambahkan fitur (!jadikartun)
• *[add]* menambah fitur (!remini)
• *[improve]* perubahan pada fitur (!antilink)

››〔 *VERSI 1.0.0 - 1.0.9* 〕
• *[add]* menambahkan semua fitur yang tersedia sekarang 
• *[misc]* beberapa perbaikan dan perubahan 

©2023 ɪᴄʜɪɢʏᴏᴜ ʙʏ ɪᴋʏ`)