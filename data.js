const GAME_DATA = {
  levels: ["Desa", "Kecamatan", "Kota", "Kabupaten", "Provinsi", "Regional", "Kementerian", "BUMN", "Nasional", "Mega Kasus"],
  startFunds: 5000,
  startCorruption: 75,
  cases: [
    {
      id: 1, level: 0, name: "Laporan Penyelenggaraan: Pembangunan Jalan Desa Sukamakmur", region: "Desa Sukamakmur, Jawa Barat",
      category: "Infrastruktur - Jalan", isCorrupt: true,
      budget: 500000000, spent: 480000000, completion: 45, estDuration: 6, actDuration: 10,
      vendor: { name: "CV Maju Jaya", projects: 4, avgOverrun: 35 },
      personnel: [{ name: "Harto, S.E.", role: "Kepala Desa" }, { name: "Budi Santoso", role: "Pejabat Pembuat Komitmen (PPK)" }],
      briefing: "Selamat datang di divisi ini. Kasus pertamamu adalah pembangunan jalan di Desa Sukamakmur. Anggaran sudah hampir habis, tapi secara kasat mata, pembangunannya belum juga selesai. Periksa semua lembar dokumen dengan teliti. Ingat, pelaku korupsi sering kali bersembunyi di balik kwitansi dan laporan fiktif. Jangan lupa cek omongan warga di media sosial.",
      description: "Dokumen ini merupakan laporan status proyek pembangunan jalan aspal pedesaan sepanjang 2 kilometer. Proyek ini bertujuan untuk meningkatkan konektivitas antar dusun dan memfasilitasi jalur distribusi pertanian masyarakat setempat. <span class='clickable-evidence' data-id='e1-1' data-type='timeline' data-strength='0.7' data-validity='0.9'>Berdasarkan laporan lapangan terkini, fase pengerjaan telah memasuki bulan ke-10 sejak penandatanganan kontrak awal, padahal target awalnya adalah 6 bulan.</span>",
      budgetBreakdown: [
        { item: "<span class='clickable-evidence' data-id='e1-2' data-type='financial' data-strength='0.8' data-validity='0.9'>Pengadaan Material Alam (Batu, Pasir)</span>", allocated: 250000000, spent: 300000000 },
        { item: "Upah Tenaga Kerja Padat Karya", allocated: 150000000, spent: 120000000 },
        { item: "Sewa Alat Berat & Mesin", allocated: 70000000, spent: 40000000 },
        { item: "Biaya Administrasi & Sertifikasi", allocated: 30000000, spent: 20000000 }
      ],
      fieldNotes: "Inspeksi lapangan pada tanggal 12 bulan lalu menunjukkan bahwa pelapisan aspal baru mencapai segmen pertama (900m). <span class='clickable-evidence' data-id='e1-3' data-type='timeline' data-strength='0.85' data-validity='0.9'>Mandor proyek melaporkan adanya penundaan pengiriman material sekunder dari supplier utama yang beralasan cuaca buruk.</span>",
      visualEvidence: [
        { id: "v1-1", type: "visual", desc: "Foto Lapangan: Tumpukan material batu pecah yang dibiarkan kehujanan, mengeras menjadi gundukan tak terpakai.", validity: 0.8, strength: 0.6 },
        { id: "v1-2", type: "visual", desc: "Foto Ketebalan Aspal: Potongan sampel aspal menunjukkan ketebalan hanya 3cm, tidak sesuai standar 5cm.", validity: 0.9, strength: 0.9 }
      ],
      profiles: {
        "@pakdarto": { name: "Warga Desa (Pak Darto)", avatar: "👤", followers: 112, following: 145, posts: 340, bio: "Petani asli Sukamakmur. Suka ngopi." },
        "@majujaya_official": { name: "CV Maju Jaya", avatar: "🏗", followers: 45, following: 2, posts: 12, bio: "Membangun negeri dengan integritas." },
        "@kades_harto": { name: "Harto, S.E.", avatar: "👔", followers: 2300, following: 150, posts: 1200, bio: "Melayani masyarakat Sukamakmur dengan sepenuh hati." },
        "@whistleblow99": { name: "Anonim", avatar: "🎭", followers: 12, following: 5, posts: 4, bio: "Mencari kebenaran di balik bayangan." },
        "@kabardesanews": { name: "Kabar Desa News", avatar: "📰", followers: 15400, following: 400, posts: 8900, bio: "Portal berita independen seputar pedesaan." },
        "@info_update123": { name: "Desa Hebat", avatar: "🤖", followers: 3, following: 800, posts: 4500, bio: "Dukung terus pemerintah! #NKRIHargaMati" },
        "@budi_santoso_ppk": { name: "Budi Santoso", avatar: "👨‍💼", followers: 450, following: 300, posts: 560, bio: "Aparatur Sipil Negara." }
      },
      posts: [
        {
          id: "p1-1", type: "social", author: "Warga Desa (Pak Darto)", handle: "@pakdarto", avatar: "👤",
          body: "Jalan di desa kami baru setengah jadi, banyak batu berserakan. Pekerja cuma kelihatan beberapa hari saja dalam seminggu.",
          validity: 0.8, strength: 0.7, time: "2 jam lalu", keywords: ["jalan", "pekerja", "warga", "sukamakmur"],
          likes: 45, reposts: 12, replies: 2,
          comments: [
            { id: "c1-1-1", type: "social", author: "Ibu Ani", handle: "@ani_warung", avatar: "👩", body: "Iya pak, debunya juga masuk ke warung saya terus.", validity: 0.8, strength: 0.4, time: "1 jam lalu" },
            { id: "c1-1-2", type: "social", author: "Desa Hebat", handle: "@info_update123", avatar: "🤖", body: "Jangan nyinyir! Pembangunan butuh proses!", validity: 0.1, strength: 0.1, time: "30 menit lalu" }
          ]
        },
        {
          id: "p1-2", type: "social", author: "CV Maju Jaya", handle: "@majujaya_official", avatar: "🏗",
          body: "Proyek berjalan sesuai standar teknis. Penundaan murni akibat curah hujan tinggi yang menghalangi pengaspalan optimal.",
          validity: 0.3, strength: 0.4, time: "5 jam lalu", keywords: ["maju jaya", "cuaca", "hujan", "kontraktor"],
          likes: 12, reposts: 2, replies: 1,
          comments: [
            { id: "c1-2-1", type: "social", author: "Budi Santoso", handle: "@budi_santoso_ppk", avatar: "👨‍💼", body: "Pastikan laporannya sesuai dengan kondisi lapangan ya.", validity: 0.5, strength: 0.3, time: "4 jam lalu" }
          ]
        },
        {
          id: "p1-3", type: "social", author: "Harto, S.E.", handle: "@kades_harto", avatar: "👔",
          body: "Laporan pertanggungjawaban proyek jalan sudah diserahkan ke kecamatan. Semua sesuai prosedur baku.",
          validity: 0.3, strength: 0.3, time: "1 hari lalu", keywords: ["harto", "kades", "prosedur", "laporan"],
          likes: 340, reposts: 45, replies: 3,
          comments: [
            { id: "c1-3-1", type: "social", author: "Desa Hebat", handle: "@info_update123", avatar: "🤖", body: "Mantap Pak Kades! Lanjutkan 2 periode!", validity: 0.05, strength: 0.05, time: "23 jam lalu" },
            { id: "c1-3-2", type: "social", author: "Desa Hebat", handle: "@info_update123", avatar: "🤖", body: "Pemimpin yang bersih dan transparan!", validity: 0.05, strength: 0.05, time: "22 jam lalu" },
            { id: "c1-3-3", type: "social", author: "Warga Biasa", handle: "@warga01", avatar: "👤", body: "Transparan apanya, papan proyek aja nggak ada.", validity: 0.8, strength: 0.6, time: "20 jam lalu" }
          ]
        },
        {
          id: "p1-4", type: "vendor", author: "Anonim", handle: "@whistleblow99", avatar: "🎭",
          body: "Coba cek akta pendirian CV Maju Jaya. Pemilik aslinya punya hubungan darah dengan perangkat desa. Selalu menang tender.",
          validity: 0.9, strength: 0.9, time: "3 jam lalu", keywords: ["maju jaya", "tender", "nepotisme", "keluarga", "kades"],
          likes: 890, reposts: 450, replies: 1,
          comments: [
            { id: "c1-4-1", type: "vendor", author: "Kabar Desa News", handle: "@kabardesanews", avatar: "📰", body: "Bisa DM kami untuk data lebih lanjut? Kami sedang investigasi hal serupa.", validity: 0.7, strength: 0.5, time: "2 jam lalu" }
          ]
        },
        {
          id: "p1-5", type: "financial", author: "Kabar Desa News", handle: "@kabardesanews", avatar: "📰",
          body: "Audit reguler menemukan adanya selisih harga material jalan di beberapa proyek infrastruktur di kecamatan kita.",
          validity: 0.7, strength: 0.5, time: "6 jam lalu", keywords: ["audit", "harga", "material", "berita"],
          likes: 1200, reposts: 340, replies: 0,
          comments: []
        },
        {
          id: "p1-6", type: "social", author: "Desa Hebat", handle: "@info_update123", avatar: "🤖",
          body: "Pembangunan desa makin maju! Dukung terus program infrastruktur pemerintah desa. #desahebat",
          validity: 0.1, strength: 0.1, time: "30 menit lalu", keywords: ["maju", "hebat", "dukung"],
          likes: 5, reposts: 1, replies: 0,
          comments: []
        }
      ],
      defenses: [
        { trigger: "financial", text: "Terdapat fluktuasi harga aspal curah di pasar lokal pada kuartal ketiga yang menyebabkan eskalasi biaya material.", strength: 0.4 },
        { trigger: "timeline", text: "Kondisi hidrologis dan cuaca ekstrem memaksa penghentian sementara pekerjaan untuk menjaga kualitas jalan.", strength: 0.5 },
        { trigger: "vendor", text: "CV Maju Jaya adalah satu-satunya peserta tender yang memenuhi syarat kualifikasi administrasi teknis di tingkat kecamatan.", strength: 0.5 },
        { trigger: "social", text: "Keluhan di media sosial bersifat anekdotal, digerakkan oleh oposisi politik, dan tidak mewakili laporan teknis pengawas lapangan.", strength: 0.5 },
        { trigger: "visual", text: "Foto lapangan tersebut diambil di luar jam kerja konstruksi, sehingga wajar tidak terlihat ada aktivitas pekerja atau penataan material.", strength: 0.6 }
      ]
    },
    {
      id: 2, level: 1, name: "Laporan Pelaksanaan: Renovasi Gedung Utama RSUD", region: "Kota Pratama, Jawa Tengah",
      category: "Fasilitas Kesehatan", isCorrupt: true,
      budget: 3200000000, spent: 3100000000, completion: 62, estDuration: 12, actDuration: 18,
      vendor: { name: "PT Graha Konstruksi", projects: 7, avgOverrun: 28 },
      personnel: [{ name: "Dr. Hendro, M.Kes", role: "Direktur RSUD" }, { name: "Ir. Susilo", role: "Kepala Dinas PU Kota" }],
      briefing: "Kerja bagus di kasus sebelumnya. Kali ini skala yang kita hadapi lebih besar: RSUD Kota Pratama. Proyek renovasi molor jauh dari target dan dana sudah menipis. Coba periksa detail material yang digunakan. Terkadang spesifikasi tinggi di atas kertas, tapi kenyataan di lapangan berkata lain. Baca seluruh lembar halaman laporan dan pantau siapa saja yang menangani proyek ini.",
      description: "Dokumen laporan teknis terkait proyek renovasi struktural dan arsitektural gedung utama RSUD Kota Pratama. Ruang lingkup pekerjaan mencakup modernisasi area Instalasi Gawat Darurat (IGD) dan pembaruan fasilitas sterilisasi ruang operasi utama. Proyek ini dijadwalkan selesai dalam 1 tahun anggaran berjalan.",
      budgetBreakdown: [
        { item: "Pekerjaan Struktural & Arsitektural", allocated: 1800000000, spent: 2000000000 },
        { item: "Instalasi Gas Medis & Tata Udara", allocated: 800000000, spent: 700000000 },
        { item: "<span class='clickable-evidence' data-id='e2-1' data-type='financial' data-strength='0.8' data-validity='0.9'>Pekerjaan Interior & Fasad (termasuk marmer impor)</span>", allocated: 400000000, spent: 300000000 },
        { item: "Jasa Konsultan Pengawas & Perencana", allocated: 200000000, spent: 100000000 }
      ],
      fieldNotes: "Laporan harian mencatat pemindahan layanan IGD ke tenda sementara di area parkir sejak bulan ke-2. Hingga bulan ke-18, sebagian lantai 2 masih dalam tahap pemasangan keramik. <span class='clickable-evidence' data-id='e2-2' data-type='vendor' data-strength='0.9' data-validity='0.9'>Catatan inventaris menunjukkan penerimaan material marmer dengan kode berbeda dari spesifikasi kontrak awal.</span>",
      visualEvidence: [
        { id: "v2-1", type: "visual", desc: "Foto Tenda IGD: Pasien dirawat di lorong sempit dekat area parkir. Kondisi sangat tidak higienis untuk layanan darurat.", validity: 0.9, strength: 0.7 },
        { id: "v2-2", type: "visual", desc: "Foto Material Fasad: Keramik lantai yang diklaim sebagai marmer Italia terlihat memiliki watermark merek produsen lokal kelas bawah.", validity: 0.95, strength: 0.9 }
      ],
      profiles: {
        "@suster_ani": { name: "Suster Ani", avatar: "👤", followers: 850, following: 300, posts: 1200, bio: "Perawat IGD. Capek tapi semangat." },
        "@grahakonstruksi": { name: "PT Graha", avatar: "🏗", followers: 120, following: 10, posts: 45, bio: "Membangun masa depan kota." },
        "@deepthroat_ptm": { name: "Anonim", avatar: "🎭", followers: 8, following: 0, posts: 2, bio: "Bocor alus Pratama." },
        "@mamahrina": { name: "Mamah Rina", avatar: "👩", followers: 340, following: 200, posts: 560, bio: "Ibu rumah tangga." },
        "@kadis_susilo": { name: "Ir. Susilo", avatar: "👔", followers: 15000, following: 400, posts: 3200, bio: "Kadis PU. Membangun infrastruktur demi kesejahteraan." },
        "@pratama_pos": { name: "Pos Pratama", avatar: "📰", followers: 45000, following: 100, posts: 15000, bio: "Berita aktual kota Pratama." },
        "@dr_hendro": { name: "Dr. Hendro", avatar: "👨‍⚕️", followers: 5000, following: 500, posts: 800, bio: "Direktur RSUD Pratama." }
      },
      posts: [
        {
          id: "p2-1", type: "timeline", author: "Suster Ani", handle: "@suster_ani", avatar: "👤",
          body: "Sudah 18 bulan kami melayani pasien di tenda darurat. AC sering mati, pasien komplain panas. Katanya bulan lalu sudah selesai?",
          validity: 0.85, strength: 0.75, time: "1 jam lalu", keywords: ["rsud", "tenda", "igd", "perawat", "pasien"],
          likes: 1200, reposts: 450, replies: 1,
          comments: [
            { id: "c2-1-1", type: "timeline", author: "Dr. Hendro", handle: "@dr_hendro", avatar: "👨‍⚕️", body: "Sabar ya Suster, sedang kita percepat prosesnya bersama pihak PU.", validity: 0.6, strength: 0.4, time: "45 menit lalu" }
          ]
        },
        {
          id: "p2-2", type: "social", author: "PT Graha", handle: "@grahakonstruksi", avatar: "🏗",
          body: "Renovasi fasilitas medis memiliki standar K3 yang ketat. Kami memastikan tidak ada debu konstruksi yang masuk ke area pasien.",
          validity: 0.4, strength: 0.4, time: "4 jam lalu", keywords: ["graha", "k3", "konstruksi", "keselamatan"],
          likes: 45, reposts: 5, replies: 0,
          comments: []
        },
        {
          id: "p2-3", type: "financial", author: "Anonim", handle: "@deepthroat_ptm", avatar: "🎭",
          body: "Dokumen spek material diubah di tengah jalan. Marmer Italia yang ditagihkan, tapi yang dipasang marmer lokal grade bawah.",
          validity: 0.85, strength: 0.85, time: "2 jam lalu", keywords: ["material", "marmer", "spesifikasi", "ubah"],
          likes: 3400, reposts: 1200, replies: 2,
          comments: [
            { id: "c2-3-1", type: "social", author: "Pos Pratama", handle: "@pratama_pos", avatar: "📰", body: "Ada bukti kwitansinya kak?", validity: 0.7, strength: 0.3, time: "1 jam lalu" },
            { id: "c2-3-2", type: "vendor", author: "Anonim", handle: "@deepthroat_ptm", avatar: "🎭", body: "Cek file BAP pengiriman tgl 14. Vendornya beda dari RAB awal.", validity: 0.9, strength: 0.9, time: "30 menit lalu" }
          ]
        },
        {
          id: "p2-4", type: "social", author: "Mamah Rina", handle: "@mamahrina", avatar: "👩",
          body: "Mau operasi usus buntu disuruh rujuk ke RS lain karena ruang operasi masih ditutup. Parah betul pelayanannya.",
          validity: 0.7, strength: 0.6, time: "5 jam lalu", keywords: ["operasi", "rujuk", "pelayanan", "warga"],
          likes: 89, reposts: 12, replies: 0,
          comments: []
        },
        {
          id: "p2-5", type: "timeline", author: "Ir. Susilo", handle: "@kadis_susilo", avatar: "👔",
          body: "Progres fisik mencapai 62%. Keterlambatan terjadi karena proses sterilisasi ruangan pasca-konstruksi butuh waktu lebih lama.",
          validity: 0.3, strength: 0.3, time: "8 jam lalu", keywords: ["susilo", "progres", "sterilisasi", "kadis"],
          likes: 890, reposts: 120, replies: 0,
          comments: []
        },
        {
          id: "p2-6", type: "vendor", author: "Pos Pratama", handle: "@pratama_pos", avatar: "📰",
          body: "Analisis redaksi: PT Graha Konstruksi berturut-turut memenangkan 7 tender infrastruktur bernilai miliaran di kota ini.",
          validity: 0.8, strength: 0.7, time: "12 jam lalu", keywords: ["tender", "monopoli", "berita", "graha"],
          likes: 5600, reposts: 2300, replies: 0,
          comments: []
        }
      ],
      defenses: [
        { trigger: "financial", text: "Pekerjaan di fasilitas medis aktif mengharuskan shift malam, yang meningkatkan biaya overhead dan lembur pekerja.", strength: 0.5 },
        { trigger: "timeline", text: "Pembatasan area kerja (zoning) demi mencegah infeksi nosokomial pasien menyebabkan ritme kerja menjadi lebih lambat.", strength: 0.6 },
        { trigger: "vendor", text: "PT Graha Konstruksi adalah satu-satunya entitas dengan sertifikat keahlian spesifik pembangunan Rumah Sakit di area ini.", strength: 0.6 },
        { trigger: "visual", text: "Bukti foto tidak menggambarkan kondisi keseluruhan dan bisa jadi diambil sebelum inspeksi akhir K3.", strength: 0.5 },
        { trigger: "social", text: "Klaim tentang kualitas material di internet tidak sah tanpa disertai uji laboratorium material yang independen.", strength: 0.6 }
      ]
    },
    {
      id: 3, level: 2, name: "Laporan Pengadaan: Tablet Sekolah Digital", region: "Kabupaten Wanasari, DI Yogyakarta",
      category: "Pendidikan - Perangkat TIK", isCorrupt: true,
      budget: 1850000000, spent: 1760000000, completion: 58, estDuration: 4, actDuration: 9,
      vendor: { name: "PT Cakra EduTech", projects: 5, avgOverrun: 31 },
      personnel: [{ name: "Maya Prameswari", role: "Kepala Dinas Pendidikan" }, { name: "R. Aditya", role: "PPK Pengadaan TIK" }],
      briefing: "Pengadaan tablet sekolah tampak modern di poster, tapi laporan distribusinya berlubang. Perhatikan spesifikasi, jumlah unit, dan testimoni guru.",
      description: "Program digitalisasi kelas untuk 18 sekolah menengah. <span class='clickable-evidence' data-id='e3-1' data-type='financial' data-strength='0.8' data-validity='0.9'>Harga satuan tablet dalam invoice tercatat 42% lebih tinggi dari harga katalog nasional pada bulan yang sama.</span>",
      budgetBreakdown: [
        { item: "<span class='clickable-evidence' data-id='e3-2' data-type='vendor' data-strength='0.75' data-validity='0.85'>Tablet edukasi 2.400 unit dari PT Cakra EduTech</span>", allocated: 1400000000, spent: 1540000000 },
        { item: "Pelatihan guru", allocated: 180000000, spent: 90000000 },
        { item: "Aplikasi pembelajaran", allocated: 170000000, spent: 100000000 },
        { item: "Distribusi dan garansi", allocated: 100000000, spent: 30000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e3-3' data-type='timeline' data-strength='0.7' data-validity='0.9'>Berita acara serah terima ditandatangani sebelum semua sekolah menerima perangkat.</span>",
      visualEvidence: [
        { id: "v3-1", type: "visual", desc: "Foto gudang sekolah: kardus tablet masih tersegel padahal laporan menyebut sudah dipakai belajar.", validity: 0.9, strength: 0.8 },
        { id: "v3-2", type: "visual", desc: "Foto spesifikasi: RAM perangkat lebih rendah dari kontrak pengadaan.", validity: 0.85, strength: 0.75 }
      ],
      profiles: {
        "@guru_lina": { name: "Bu Lina", avatar: "GL", followers: 920, following: 210, posts: 412, bio: "Guru IPA dan wali kelas." },
        "@cakraedutech": { name: "Cakra EduTech", avatar: "CE", followers: 310, following: 16, posts: 80, bio: "Solusi belajar digital." },
        "@auditkelas": { name: "Audit Kelas", avatar: "AK", followers: 1800, following: 45, posts: 130, bio: "Catatan warga soal pendidikan." }
      },
      posts: [
        { id: "p3-1", type: "timeline", author: "Bu Lina", handle: "@guru_lina", avatar: "GL", body: "Tablet baru datang separuh, tapi kami diminta foto seolah semua kelas sudah pakai.", validity: 0.85, strength: 0.8, time: "3 jam lalu", keywords: ["tablet", "sekolah", "guru", "kelas"], likes: 540, reposts: 120, replies: 0, comments: [] },
        { id: "p3-2", type: "vendor", author: "Audit Kelas", handle: "@auditkelas", avatar: "AK", body: "Cakra EduTech baru berdiri 8 bulan sebelum menang tender TIK kabupaten.", validity: 0.8, strength: 0.7, time: "7 jam lalu", keywords: ["cakra", "tender", "vendor", "edutech"], likes: 870, reposts: 260, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Harga naik karena paket sudah termasuk garansi, casing, dan lisensi aplikasi.", strength: 0.55 },
        { trigger: "timeline", text: "Dokumen serah terima dibuat kolektif untuk efisiensi administrasi sekolah.", strength: 0.55 },
        { trigger: "vendor", text: "Perusahaan baru tetap sah selama memenuhi kualifikasi tender.", strength: 0.5 },
        { trigger: "visual", text: "Foto gudang tidak membuktikan perangkat belum didistribusikan ke semua sekolah.", strength: 0.45 },
        { trigger: "social", text: "Keluhan guru belum diverifikasi oleh pengawas resmi.", strength: 0.5 }
      ]
    },
    {
      id: 4, level: 3, name: "Laporan Revitalisasi: Pasar Induk Sembada", region: "Kabupaten Sembada, Jawa Timur",
      category: "Perdagangan - Revitalisasi Pasar", isCorrupt: true,
      budget: 4100000000, spent: 3950000000, completion: 51, estDuration: 10, actDuration: 16,
      vendor: { name: "PT Ruko Prima", projects: 9, avgOverrun: 37 },
      personnel: [{ name: "Teguh Wardana", role: "Kepala Dinas Perdagangan" }, { name: "Sinta Lestari", role: "Konsultan Pengawas" }],
      briefing: "Pedagang mengeluh lapak belum siap, tapi pembayaran hampir penuh. Cek pekerjaan fisik dan perubahan desain.",
      description: "Revitalisasi pasar meliputi kios, drainase, dan area bongkar muat. <span class='clickable-evidence' data-id='e4-1' data-type='financial' data-strength='0.8' data-validity='0.9'>Pembayaran tahap akhir dicairkan saat progres fisik baru 51%.</span>",
      budgetBreakdown: [
        { item: "Pembangunan kios permanen", allocated: 2100000000, spent: 2300000000 },
        { item: "<span class='clickable-evidence' data-id='e4-2' data-type='financial' data-strength='0.75' data-validity='0.85'>Pekerjaan drainase pasar</span>", allocated: 900000000, spent: 1100000000 },
        { item: "Area bongkar muat", allocated: 700000000, spent: 400000000 },
        { item: "Manajemen relokasi pedagang", allocated: 400000000, spent: 150000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e4-3' data-type='visual' data-strength='0.75' data-validity='0.9'>Drainase utama belum tersambung ke saluran kota sehingga air menggenang di blok basah.</span>",
      visualEvidence: [
        { id: "v4-1", type: "visual", desc: "Foto kios: deretan kios tanpa rolling door meski masuk item pembayaran.", validity: 0.9, strength: 0.8 },
        { id: "v4-2", type: "visual", desc: "Foto genangan: area ikan tergenang setelah hujan ringan.", validity: 0.85, strength: 0.7 }
      ],
      profiles: {
        "@pedagang_sari": { name: "Sari Pedagang", avatar: "SP", followers: 640, following: 190, posts: 302, bio: "Pedagang sayur Pasar Sembada." },
        "@rukoprima": { name: "PT Ruko Prima", avatar: "RP", followers: 220, following: 8, posts: 55, bio: "Kontraktor bangunan komersial." }
      },
      posts: [
        { id: "p4-1", type: "social", author: "Sari Pedagang", handle: "@pedagang_sari", avatar: "SP", body: "Kami masih jualan di tenda. Kios katanya selesai, padahal pintunya saja belum ada.", validity: 0.85, strength: 0.75, time: "1 jam lalu", keywords: ["pasar", "kios", "pedagang", "tenda"], likes: 430, reposts: 90, replies: 0, comments: [] },
        { id: "p4-2", type: "vendor", author: "Forum Pasar", handle: "@forum_pasar", avatar: "FP", body: "Vendor pasar ini pernah kena blacklist di kota sebelah tapi muncul lagi dengan paket berbeda.", validity: 0.75, strength: 0.7, time: "5 jam lalu", keywords: ["vendor", "blacklist", "ruko", "prima"], likes: 980, reposts: 310, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Pencairan dilakukan untuk menjaga arus kas proyek agar pekerjaan tidak berhenti.", strength: 0.6 },
        { trigger: "visual", text: "Foto diambil sebelum pemasangan tahap akhir dan belum mewakili kondisi final.", strength: 0.55 },
        { trigger: "vendor", text: "Tidak ada sanksi aktif pada vendor saat tender berjalan.", strength: 0.55 },
        { trigger: "social", text: "Keluhan pedagang adalah dampak sementara proses relokasi.", strength: 0.5 },
        { trigger: "timeline", text: "Cuaca dan relokasi pedagang memperlambat pekerjaan lapangan.", strength: 0.5 }
      ]
    },
    {
      id: 5, level: 4, name: "Laporan Bantuan: Pupuk Subsidi Musim Tanam", region: "Provinsi Lestari",
      category: "Pertanian - Distribusi Subsidi", isCorrupt: true,
      budget: 6200000000, spent: 6100000000, completion: 64, estDuration: 5, actDuration: 8,
      vendor: { name: "Koperasi Tani Makmur", projects: 6, avgOverrun: 24 },
      personnel: [{ name: "Ir. Damar", role: "Kepala Bidang Sarana Pertanian" }, { name: "Nur Aini", role: "Koordinator Distribusi" }],
      briefing: "Subsidi pupuk menyentuh banyak warga. Periksa selisih kuota, daftar penerima, dan laporan stok gudang.",
      description: "Distribusi pupuk subsidi untuk 12 kecamatan. <span class='clickable-evidence' data-id='e5-1' data-type='financial' data-strength='0.85' data-validity='0.9'>Realisasi anggaran penuh tidak sebanding dengan stok pupuk yang diterima kelompok tani.</span>",
      budgetBreakdown: [
        { item: "Pembelian pupuk urea", allocated: 3600000000, spent: 3800000000 },
        { item: "<span class='clickable-evidence' data-id='e5-2' data-type='vendor' data-strength='0.8' data-validity='0.85'>Jasa distribusi Koperasi Tani Makmur</span>", allocated: 1200000000, spent: 1500000000 },
        { item: "Verifikasi penerima", allocated: 800000000, spent: 500000000 },
        { item: "Operasional gudang", allocated: 600000000, spent: 300000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e5-3' data-type='timeline' data-strength='0.7' data-validity='0.88'>Pengiriman tercatat selesai dua minggu sebelum gudang kecamatan menerima barang.</span>",
      visualEvidence: [
        { id: "v5-1", type: "visual", desc: "Foto gudang pupuk: rak kosong dan karung tersisa jauh di bawah laporan stok.", validity: 0.9, strength: 0.8 },
        { id: "v5-2", type: "visual", desc: "Foto daftar penerima: nama penerima ganda muncul di dua kecamatan.", validity: 0.85, strength: 0.75 }
      ],
      profiles: {
        "@petani_raka": { name: "Raka Petani", avatar: "RK", followers: 510, following: 140, posts: 211, bio: "Petani padi." },
        "@stokpupuk": { name: "Pantau Pupuk", avatar: "PP", followers: 2300, following: 60, posts: 322, bio: "Pantauan distribusi pupuk." }
      },
      posts: [
        { id: "p5-1", type: "social", author: "Raka Petani", handle: "@petani_raka", avatar: "RK", body: "Kuota pupuk di kartu tani ada, tapi kios bilang stok habis dari minggu lalu.", validity: 0.85, strength: 0.75, time: "2 jam lalu", keywords: ["pupuk", "kartu tani", "stok", "kios"], likes: 720, reposts: 200, replies: 0, comments: [] },
        { id: "p5-2", type: "financial", author: "Pantau Pupuk", handle: "@stokpupuk", avatar: "PP", body: "Ada pola penerima ganda di daftar subsidi. NIK berbeda, alamat dan nama kepala keluarga sama.", validity: 0.82, strength: 0.82, time: "6 jam lalu", keywords: ["subsidi", "penerima", "ganda", "nik"], likes: 1500, reposts: 620, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Perbedaan stok muncul karena sebagian pupuk masih dalam perjalanan antar gudang.", strength: 0.55 },
        { trigger: "vendor", text: "Koperasi dipilih karena memiliki jaringan kios paling luas.", strength: 0.55 },
        { trigger: "timeline", text: "Tanggal administrasi dan tanggal fisik pengiriman bisa berbeda karena sistem input terpusat.", strength: 0.5 },
        { trigger: "visual", text: "Foto gudang hanya menunjukkan satu lokasi, bukan keseluruhan distribusi.", strength: 0.5 },
        { trigger: "social", text: "Keluhan petani bersifat kasuistik dan perlu verifikasi lapangan.", strength: 0.45 }
      ]
    },
    {
      id: 6, level: 5, name: "Laporan Proyek: Jembatan Sungai Merah", region: "Regional Timur",
      category: "Infrastruktur - Jembatan", isCorrupt: true,
      budget: 9800000000, spent: 9400000000, completion: 48, estDuration: 14, actDuration: 22,
      vendor: { name: "PT Pilar Beton Raya", projects: 11, avgOverrun: 41 },
      personnel: [{ name: "H. Rahman", role: "Koordinator Proyek Regional" }, { name: "Ir. Bagas", role: "Konsultan Struktur" }],
      briefing: "Jembatan ini vital, tapi progres lambat dan biaya melonjak. Fokus pada kualitas pondasi dan alasan addendum.",
      description: "<span class='clickable-evidence' data-id='e6-1' data-type='timeline' data-strength='0.8' data-validity='0.9'>Addendum waktu diterbitkan tiga kali tanpa laporan force majeure yang lengkap.</span>",
      budgetBreakdown: [
        { item: "<span class='clickable-evidence' data-id='e6-2' data-type='financial' data-strength='0.85' data-validity='0.9'>Pondasi bore pile dan beton utama</span>", allocated: 4800000000, spent: 5900000000 },
        { item: "Rangka baja", allocated: 2600000000, spent: 2100000000 },
        { item: "Akses jalan sementara", allocated: 1400000000, spent: 900000000 },
        { item: "Pengawasan teknis", allocated: 1000000000, spent: 500000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e6-3' data-type='visual' data-strength='0.85' data-validity='0.9'>Retakan rambut tampak pada beberapa titik pile cap yang baru dicor.</span>",
      visualEvidence: [
        { id: "v6-1", type: "visual", desc: "Foto pile cap: retakan menyebar sebelum beban struktur dipasang.", validity: 0.92, strength: 0.85 },
        { id: "v6-2", type: "visual", desc: "Foto lokasi: alat berat tidak aktif selama inspeksi tiga hari berturut-turut.", validity: 0.8, strength: 0.65 }
      ],
      profiles: {
        "@warga_sungai": { name: "Warga Sungai", avatar: "WS", followers: 750, following: 170, posts: 412, bio: "Pantau akses desa." },
        "@struktur_bocor": { name: "Struktur Bocor", avatar: "SB", followers: 1200, following: 34, posts: 64, bio: "Catatan proyek konstruksi." }
      },
      posts: [
        { id: "p6-1", type: "visual", author: "Struktur Bocor", handle: "@struktur_bocor", avatar: "SB", body: "Foto retak pile cap Sungai Merah tidak wajar untuk umur beton semuda itu.", validity: 0.86, strength: 0.86, time: "4 jam lalu", keywords: ["jembatan", "retak", "beton", "pile"], likes: 2100, reposts: 760, replies: 0, comments: [] },
        { id: "p6-2", type: "timeline", author: "Warga Sungai", handle: "@warga_sungai", avatar: "WS", body: "Sudah dua bulan rangka baja belum datang. Penyeberangan masih pakai perahu.", validity: 0.8, strength: 0.72, time: "1 hari lalu", keywords: ["rangka", "baja", "perahu", "sungai"], likes: 980, reposts: 330, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Kenaikan biaya pondasi terjadi karena kondisi tanah lebih buruk dari survei awal.", strength: 0.65 },
        { trigger: "timeline", text: "Addendum dilakukan untuk menjaga keamanan konstruksi.", strength: 0.6 },
        { trigger: "visual", text: "Retakan rambut masih dalam batas toleransi dan akan diuji laboratorium.", strength: 0.6 },
        { trigger: "social", text: "Laporan warga tidak memuat data teknis proyek.", strength: 0.5 },
        { trigger: "vendor", text: "Vendor memiliki pengalaman jembatan regional.", strength: 0.55 }
      ]
    },
    {
      id: 7, level: 6, name: "Laporan Kementerian: Sistem Antrian Layanan Publik", region: "Kementerian Pelayanan Publik",
      category: "Teknologi - Sistem Informasi", isCorrupt: true,
      budget: 14500000000, spent: 13900000000, completion: 55, estDuration: 8, actDuration: 15,
      vendor: { name: "PT Nusa Solusi Digital", projects: 13, avgOverrun: 44 },
      personnel: [{ name: "Dewi Arum", role: "Direktur Transformasi Digital" }, { name: "Fajar Nugroho", role: "Ketua Tim Implementasi" }],
      briefing: "Sistem digital mahal, tapi loket masih antre manual. Cari pola vendor, source code, dan lisensi yang dobel.",
      description: "<span class='clickable-evidence' data-id='e7-1' data-type='financial' data-strength='0.85' data-validity='0.9'>Biaya lisensi tahunan ditagihkan penuh sebelum sistem aktif di kantor daerah.</span>",
      budgetBreakdown: [
        { item: "Pengembangan aplikasi inti", allocated: 5200000000, spent: 4900000000 },
        { item: "<span class='clickable-evidence' data-id='e7-2' data-type='vendor' data-strength='0.85' data-validity='0.88'>Lisensi middleware dan cloud</span>", allocated: 4800000000, spent: 5600000000 },
        { item: "Integrasi kantor daerah", allocated: 3000000000, spent: 2200000000 },
        { item: "Pelatihan operator", allocated: 1500000000, spent: 1200000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e7-3' data-type='timeline' data-strength='0.78' data-validity='0.9'>Uji coba nasional gagal dua kali, tetapi berita acara kelayakan tetap diterbitkan.</span>",
      visualEvidence: [
        { id: "v7-1", type: "visual", desc: "Screenshot dashboard error 503 saat jam layanan aktif.", validity: 0.9, strength: 0.78 },
        { id: "v7-2", type: "visual", desc: "Foto kantor daerah: nomor antrean masih ditulis manual di papan tulis.", validity: 0.85, strength: 0.72 }
      ],
      profiles: {
        "@operator_loket": { name: "Operator Loket", avatar: "OL", followers: 1400, following: 300, posts: 700, bio: "Petugas layanan." },
        "@kodepublik": { name: "Kode Publik", avatar: "KP", followers: 5300, following: 110, posts: 240, bio: "Audit teknologi publik." }
      },
      posts: [
        { id: "p7-1", type: "timeline", author: "Operator Loket", handle: "@operator_loket", avatar: "OL", body: "Aplikasi antrean down lagi, warga tetap ambil nomor kertas. Tapi pusat bilang sistem sukses.", validity: 0.85, strength: 0.8, time: "2 jam lalu", keywords: ["antrean", "aplikasi", "down", "loket"], likes: 3400, reposts: 1100, replies: 0, comments: [] },
        { id: "p7-2", type: "vendor", author: "Kode Publik", handle: "@kodepublik", avatar: "KP", body: "Nusa Solusi Digital punya relasi direksi dengan subkontraktor cloud yang muncul di invoice.", validity: 0.8, strength: 0.78, time: "8 jam lalu", keywords: ["nusa", "cloud", "subkontraktor", "invoice"], likes: 5200, reposts: 1800, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Lisensi dibayar di awal sesuai model langganan enterprise.", strength: 0.65 },
        { trigger: "timeline", text: "Kegagalan uji coba adalah bagian normal dari iterasi sistem besar.", strength: 0.6 },
        { trigger: "vendor", text: "Subkontraktor cloud dipilih karena kompetensi teknis khusus.", strength: 0.58 },
        { trigger: "visual", text: "Screenshot error bisa terjadi karena jaringan lokal, bukan aplikasi pusat.", strength: 0.55 },
        { trigger: "social", text: "Keluhan operator belum tentu mewakili seluruh kantor daerah.", strength: 0.5 }
      ]
    },
    {
      id: 8, level: 7, name: "Laporan BUMN: Modernisasi Depo Logistik", region: "BUMN Logistik Nusantara",
      category: "BUMN - Gudang dan Rantai Pasok", isCorrupt: true,
      budget: 22000000000, spent: 21100000000, completion: 57, estDuration: 12, actDuration: 20,
      vendor: { name: "Konsorsium Delta Pergudangan", projects: 15, avgOverrun: 39 },
      personnel: [{ name: "M. Farhan", role: "Direktur Operasi" }, { name: "Ika Mahendra", role: "Manajer Proyek Depo" }],
      briefing: "Skala BUMN berarti uang besar dan dokumen panjang. Periksa mesin sortir, gudang dingin, dan perubahan kontrak konsorsium.",
      description: "<span class='clickable-evidence' data-id='e8-1' data-type='financial' data-strength='0.9' data-validity='0.9'>Pembayaran mesin sortir otomatis mencapai 92%, namun unit belum lulus uji operasional.</span>",
      budgetBreakdown: [
        { item: "<span class='clickable-evidence' data-id='e8-2' data-type='vendor' data-strength='0.86' data-validity='0.88'>Mesin sortir otomatis impor</span>", allocated: 9800000000, spent: 10300000000 },
        { item: "Gudang dingin", allocated: 6200000000, spent: 5400000000 },
        { item: "Sistem manajemen stok", allocated: 3900000000, spent: 3500000000 },
        { item: "Pelatihan operator", allocated: 2100000000, spent: 1900000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e8-3' data-type='visual' data-strength='0.82' data-validity='0.9'>Label mesin menunjukkan tahun produksi lebih lama dari spesifikasi kontrak.</span>",
      visualEvidence: [
        { id: "v8-1", type: "visual", desc: "Foto mesin: label produksi menunjukkan unit refurbished.", validity: 0.9, strength: 0.86 },
        { id: "v8-2", type: "visual", desc: "Foto gudang dingin: sensor suhu mati dan stok dipindah manual.", validity: 0.85, strength: 0.76 }
      ],
      profiles: {
        "@buruh_depo": { name: "Buruh Depo", avatar: "BD", followers: 2100, following: 380, posts: 830, bio: "Pekerja logistik." },
        "@rantai_pantau": { name: "Rantai Pantau", avatar: "RP", followers: 6400, following: 130, posts: 390, bio: "Pantau logistik publik." }
      },
      posts: [
        { id: "p8-1", type: "visual", author: "Buruh Depo", handle: "@buruh_depo", avatar: "BD", body: "Mesin sortir baru sering mati. Kami tetap sortir paket manual sampai malam.", validity: 0.84, strength: 0.8, time: "3 jam lalu", keywords: ["depo", "mesin", "sortir", "manual"], likes: 4100, reposts: 1500, replies: 0, comments: [] },
        { id: "p8-2", type: "vendor", author: "Rantai Pantau", handle: "@rantai_pantau", avatar: "RP", body: "Konsorsium Delta mengganti anggota teknis setelah kontrak, tapi nilai paket tidak turun.", validity: 0.8, strength: 0.78, time: "10 jam lalu", keywords: ["konsorsium", "delta", "kontrak", "depo"], likes: 6200, reposts: 2100, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Pembayaran mengikuti milestone pengiriman, bukan kelulusan uji penuh.", strength: 0.68 },
        { trigger: "vendor", text: "Perubahan anggota konsorsium diperbolehkan selama tanggung jawab kontrak tetap.", strength: 0.62 },
        { trigger: "visual", text: "Label produksi tidak otomatis membuktikan barang refurbished.", strength: 0.6 },
        { trigger: "timeline", text: "Uji operasional tertunda karena integrasi sistem stok lama.", strength: 0.55 },
        { trigger: "social", text: "Keluhan pekerja perlu diverifikasi dengan log mesin resmi.", strength: 0.52 }
      ]
    },
    {
      id: 9, level: 8, name: "Laporan Nasional: Pusat Data Cadangan", region: "Nasional",
      category: "Teknologi - Infrastruktur Data", isCorrupt: true,
      budget: 48000000000, spent: 46200000000, completion: 44, estDuration: 18, actDuration: 30,
      vendor: { name: "PT Garda Data Semesta", projects: 18, avgOverrun: 46 },
      personnel: [{ name: "Y. Wiratma", role: "Sekretaris Program Nasional" }, { name: "Tari Kencana", role: "Lead Procurement" }],
      briefing: "Ini kasus nasional. Nilai kontrak besar, pembela kuat, dan bukti harus benar-benar saling menguatkan.",
      description: "<span class='clickable-evidence' data-id='e9-1' data-type='financial' data-strength='0.9' data-validity='0.92'>Tagihan perangkat keamanan data dibayar penuh meski sertifikasi pusat data belum keluar.</span>",
      budgetBreakdown: [
        { item: "Konstruksi gedung data", allocated: 18000000000, spent: 17100000000 },
        { item: "<span class='clickable-evidence' data-id='e9-2' data-type='vendor' data-strength='0.88' data-validity='0.9'>Perangkat keamanan dan server</span>", allocated: 19000000000, spent: 20500000000 },
        { item: "Sistem pendingin redundan", allocated: 7000000000, spent: 5200000000 },
        { item: "Audit keamanan", allocated: 4000000000, spent: 3400000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e9-3' data-type='timeline' data-strength='0.84' data-validity='0.9'>Sertifikasi tier ditunda karena sistem listrik cadangan gagal uji beban.</span>",
      visualEvidence: [
        { id: "v9-1", type: "visual", desc: "Foto ruang server: beberapa rack kosong namun tercatat sudah terpasang di laporan.", validity: 0.9, strength: 0.86 },
        { id: "v9-2", type: "visual", desc: "Foto genset: indikator error saat uji beban listrik cadangan.", validity: 0.88, strength: 0.82 }
      ],
      profiles: {
        "@admin_dc": { name: "Admin DC", avatar: "DC", followers: 5200, following: 220, posts: 190, bio: "Teknisi data center." },
        "@siberpublik": { name: "Siber Publik", avatar: "SP", followers: 23000, following: 400, posts: 900, bio: "Keamanan digital publik." }
      },
      posts: [
        { id: "p9-1", type: "visual", author: "Admin DC", handle: "@admin_dc", avatar: "DC", body: "Rack kosong difoto dari sisi yang tidak masuk kunjungan media. Labelnya sudah ditempel semua.", validity: 0.86, strength: 0.85, time: "2 jam lalu", keywords: ["rack", "server", "kosong", "data"], likes: 9200, reposts: 3400, replies: 0, comments: [] },
        { id: "p9-2", type: "timeline", author: "Siber Publik", handle: "@siberpublik", avatar: "SP", body: "Sertifikasi pusat data cadangan mundur lagi. Dokumen pembayaran justru sudah rampung.", validity: 0.84, strength: 0.8, time: "12 jam lalu", keywords: ["sertifikasi", "pusat data", "pembayaran", "tier"], likes: 14000, reposts: 5100, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Perangkat sudah dibayar karena kepemilikan berpindah setelah pengiriman.", strength: 0.72 },
        { trigger: "vendor", text: "Vendor memegang sertifikasi keamanan internasional.", strength: 0.68 },
        { trigger: "timeline", text: "Sertifikasi tertunda oleh prosedur auditor independen, bukan kegagalan proyek.", strength: 0.66 },
        { trigger: "visual", text: "Rack kosong adalah cadangan ekspansi sesuai desain kapasitas.", strength: 0.62 },
        { trigger: "social", text: "Unggahan anonim teknisi rentan bias internal.", strength: 0.58 }
      ]
    },
    {
      id: 10, level: 9, name: "Mega Kasus: Konsorsium Transportasi Terpadu", region: "Lintas Nasional",
      category: "Mega Proyek - Transportasi", isCorrupt: true,
      budget: 125000000000, spent: 119000000000, completion: 39, estDuration: 30, actDuration: 48,
      vendor: { name: "Konsorsium Garuda Transit", projects: 24, avgOverrun: 52 },
      personnel: [{ name: "A. Mahendra", role: "Ketua Komite Proyek" }, { name: "Retno Wibawa", role: "Direktur Kontrak Strategis" }],
      briefing: "Ini puncaknya. Banyak pihak berkepentingan dan pembela sangat kuat. Menangkan dengan rantai bukti lintas dokumen, vendor, visual, dan jejak digital.",
      description: "<span class='clickable-evidence' data-id='e10-1' data-type='financial' data-strength='0.95' data-validity='0.93'>Nilai eskalasi kontrak naik 28% tanpa perubahan volume pekerjaan utama yang sepadan.</span>",
      budgetBreakdown: [
        { item: "Pembangunan koridor utama", allocated: 62000000000, spent: 69000000000 },
        { item: "<span class='clickable-evidence' data-id='e10-2' data-type='vendor' data-strength='0.92' data-validity='0.9'>Sinyal dan sistem kendali transit</span>", allocated: 31000000000, spent: 33000000000 },
        { item: "Pembebasan lahan pendukung", allocated: 21000000000, spent: 12000000000 },
        { item: "Konsultan internasional", allocated: 11000000000, spent: 5000000000 }
      ],
      fieldNotes: "<span class='clickable-evidence' data-id='e10-3' data-type='timeline' data-strength='0.9' data-validity='0.92'>Uji operasi tertunda satu tahun, namun bonus percepatan tetap dibayarkan kepada konsorsium.</span>",
      visualEvidence: [
        { id: "v10-1", type: "visual", desc: "Foto depo transit: rangkaian kereta belum datang, jalur uji masih kosong.", validity: 0.92, strength: 0.88 },
        { id: "v10-2", type: "visual", desc: "Foto panel sinyal: perangkat tidak sesuai merek yang tercantum dalam kontrak strategis.", validity: 0.9, strength: 0.9 }
      ],
      profiles: {
        "@transit_watch": { name: "Transit Watch", avatar: "TW", followers: 80000, following: 600, posts: 3200, bio: "Pantau transportasi publik." },
        "@insider_rel": { name: "Insider Rel", avatar: "IR", followers: 9000, following: 20, posts: 34, bio: "Catatan dari balik proyek rel." }
      },
      posts: [
        { id: "p10-1", type: "financial", author: "Transit Watch", handle: "@transit_watch", avatar: "TW", body: "Bonus percepatan dibayar, tapi uji operasi mundur. Ini bukan keterlambatan biasa.", validity: 0.9, strength: 0.9, time: "1 jam lalu", keywords: ["bonus", "percepatan", "transit", "uji operasi"], likes: 62000, reposts: 24000, replies: 0, comments: [] },
        { id: "p10-2", type: "vendor", author: "Insider Rel", handle: "@insider_rel", avatar: "IR", body: "Subkontraktor sinyal berubah setelah addendum. Perangkat di lapangan bukan yang dipresentasikan ke DPR.", validity: 0.88, strength: 0.9, time: "3 jam lalu", keywords: ["sinyal", "subkontraktor", "addendum", "dpr"], likes: 32000, reposts: 14000, replies: 0, comments: [] }
      ],
      defenses: [
        { trigger: "financial", text: "Eskalasi kontrak terjadi karena perubahan kurs, inflasi material, dan risiko proyek strategis.", strength: 0.8 },
        { trigger: "vendor", text: "Penggantian subkontraktor adalah keputusan teknis konsorsium yang tetap memenuhi standar.", strength: 0.76 },
        { trigger: "timeline", text: "Bonus dibayarkan berdasarkan milestone administratif, bukan uji operasi penuh.", strength: 0.74 },
        { trigger: "visual", text: "Foto lapangan tidak menunjukkan seluruh progres sistem yang berada di fasilitas tertutup.", strength: 0.72 },
        { trigger: "social", text: "Narasi publik soal mega proyek sering dipolitisasi dan perlu bukti formal.", strength: 0.68 }
      ]
    }
  ],
  endings: [
    { id: "negative", minCorruption: 61, maxRep: 29, icon: "🔴", title: "Korupsi Merajalela", subtitle: "Kegagalan Sistemik", narrative: "Upaya investigasi Anda gagal total. Salah tangkap dan kurangnya bukti membuat para pelaku semakin leluasa merampok uang negara. Institusi Anda kehilangan kepercayaan publik dan anggaran akhirnya dihentikan. Dokumen-dokumen proyek kini hanya menjadi tumpukan kertas tanpa makna." },
    { id: "neutral", minCorruption: 31, maxRep: 100, icon: "🟡", title: "Status Quo", subtitle: "Perubahan Terbatas", narrative: "Beberapa kasus berhasil Anda bawa ke meja hijau, namun korupsi sistemik masih mengakar. Pemeriksaan dokumen formal belum cukup untuk mengungkap dalang sebenarnya. Sistem pengadaan barang dan jasa masih rentan manipulasi." },
    { id: "positive", minCorruption: 11, maxRep: 100, icon: "🟢", title: "Reformasi Berjalan", subtitle: "Langkah Maju Pemberantasan", narrative: "Ketelitian Anda dalam membedah dokumen dan kelihaian melacak jejak digital membuahkan hasil nyata. Beberapa pejabat tinggi dan kartel proyek berhasil dipenjarakan. Kebocoran anggaran negara berhasil ditekan secara signifikan." },
    { id: "perfect", minCorruption: 0, maxRep: 90, icon: "🌟", title: "Era Baru Transparansi", subtitle: "Investigator Legendaris", narrative: "Insting investigasi Anda luar biasa sempurna. Tidak ada celah dokumen yang terlewat, dan taktik penangkapan langsung Anda membuat para mafia proyek gentar. Anda telah membersihkan birokrasi, mencetak sejarah baru dalam pemberantasan korupsi di tanah air." }
  ]
};

const LEVEL_QUEST_TEMPLATES = [
  ["Tandai bukti waktu proyek", "Kumpulkan minimal 2 bukti", "Buka Analisis Bukti"],
  ["Cari jejak vendor", "Simpan bukti dari Chirp", "Kumpulkan bukti visual"],
  ["Bandingkan nilai anggaran", "Kumpulkan 3 bukti valid", "Cek percakapan publik"],
  ["Kumpulkan bukti visual", "Temukan bukti keuangan", "Buka Analisis Bukti"],
  ["Cari suara warga asli", "Temukan bukti daftar penerima", "Kumpulkan 4 bukti"],
  ["Temukan bukti struktur", "Gabungkan bukti dokumen dan visual", "Bawa ke sidang"],
  ["Telusuri vendor digital", "Simpan bukti dari sosial media", "Kumpulkan skor bukti 2.5"],
  ["Audit aset fisik", "Bedakan pekerja asli dan buzzer", "Kumpulkan 4 bukti"],
  ["Cari bukti sertifikasi", "Kumpulkan skor bukti 3.0", "Buka Analisis Bukti"],
  ["Bangun rantai bukti mega proyek", "Simpan bukti vendor dan finansial", "Menangkan keputusan akhir"]
];

const CLEAN_CASE_IDS = [3, 5, 8];

GAME_DATA.cases.forEach((c, idx) => {
  if (CLEAN_CASE_IDS.includes(c.id)) {
    c.isCorrupt = false;
    c.briefing += " Catatan: tidak semua laporan janggal berarti korupsi. Uji apakah bukti benar-benar menunjukkan niat jahat atau hanya masalah administrasi.";
  }

  const questLabels = LEVEL_QUEST_TEMPLATES[idx] || LEVEL_QUEST_TEMPLATES[0];
  c.quests = [
    { id: `case-${c.id}-q1`, title: questLabels[0], condition: idx % 3 === 0 ? "type_timeline" : idx % 3 === 1 ? "type_vendor" : "type_financial" },
    { id: `case-${c.id}-q2`, title: questLabels[1], condition: idx % 2 === 0 ? "evidence_count_3" : "phone_evidence" },
    { id: `case-${c.id}-q3`, title: questLabels[2], condition: idx >= 5 ? "score_25" : idx % 2 === 0 ? "analysis" : "type_visual" }
  ];

  c.posts.push(
    {
      id: `buzz-${c.id}`,
      type: "social",
      author: "Info Proyek Maju",
      handle: `@buzzer_proyek${c.id}`,
      avatar: "BZ",
      body: `Proyek ${c.region} sudah paling transparan. Yang kritik pasti tidak paham proses pembangunan. #DukungProyek`,
      validity: 0.08,
      strength: 0.12,
      time: "15 menit lalu",
      keywords: ["buzzer", "dukung", "proyek", "maju", c.vendor.name.toLowerCase().split(" ")[0]],
      likes: 12,
      reposts: 2,
      replies: 0,
      comments: []
    },
    {
      id: `real-${c.id}`,
      type: c.isCorrupt ? "social" : "timeline",
      author: c.isCorrupt ? "Saksi Lapangan" : "Petugas Administrasi",
      handle: c.isCorrupt ? `@saksi_lapangan${c.id}` : `@admin_lapangan${c.id}`,
      avatar: c.isCorrupt ? "SL" : "AL",
      body: c.isCorrupt
        ? `Saya melihat laporan ${c.category.toLowerCase()} tidak sesuai dengan kondisi di lapangan. Ada bagian yang ditulis selesai padahal belum terlihat dikerjakan.`
        : `Ada keterlambatan administrasi di ${c.region}, tapi dokumen pendukungnya lengkap dan barang/jasa akhirnya diterima sesuai spesifikasi.`,
      validity: c.isCorrupt ? 0.82 : 0.75,
      strength: c.isCorrupt ? 0.7 : 0.45,
      time: "1 jam lalu",
      keywords: ["saksi", "lapangan", "asli", "warga", "administrasi", c.region.toLowerCase()],
      likes: c.isCorrupt ? 680 : 240,
      reposts: c.isCorrupt ? 180 : 40,
      replies: 0,
      comments: []
    }
  );
});
