module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Menampilkan daftar fitur dan cara penggunaannya',
  async execute(message) {
    const helpText = `
📚 **RawrBot - Pusat Bantuan Command**

🔧 **Moderasi**
- \`rban @user [alasan]\` : Ban user dari server
- \`rkick @user [alasan]\` : Kick user dari server
- \`rwarn @user [alasan]\` : Beri peringatan ke user
- \`rpurge <jumlah>\` : Hapus pesan dalam jumlah tertentu

👥 **Role Management**
- \`rmassrole @RoleBaru @TargetUserRole\` : Tambahkan role ke semua user yang punya role tertentu
- \`rmassroleremove @RoleTarget @TargetUserRole\` : Hapus role dari semua user yang punya role tertentu

🎶 **Musik**
- \`rplay <lagu/url>\` : Putar lagu dari YouTube/Spotify/SoundCloud
- \`rskip\`, \`rstop\`, \`rpause\`, \`rresume\` : Kontrol musik
- Otomatis muncul kontrol tombol Play/Pause/Next/Loop/Autoplay

🎉 **Giveaway**
- \`rga <durasi> <jumlah_pemenang> <hadiah>\` : Mulai giveaway

📢 **Verifikasi Reaction**
- \`rsetverify @Role Deskripsi\` : Atur sistem verifikasi klik ✅

🔗 **Anti-Link**
- \`raddlink <url>\` : Tambahkan link ke whitelist
- \`rremovelink <url>\` : Hapus link dari whitelist

🎛️ **Auto Voice Channel**
- Join akan buat channel otomatis
- Kosong = channel terhapus otomatis
- Menu setting tersedia (nama, limit, lock/unlock, hidden)

⚙️ **Config**
- \`rsetprefix <prefix>\` : Ganti prefix bot
- Prefix saat ini: \`r\`

Ketik command di atas sesuai format untuk menggunakan fitur. Hanya pengurus bisa akses command sensitif.`;

    message.channel.send(helpText);
  }
};