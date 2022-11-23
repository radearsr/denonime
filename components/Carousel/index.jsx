const Carousel = () => {
  return (
  <div className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="row slide-item p-3 justify-content-between g-0">
          <div className="bg-poster" style={{ backgroundImage: "url('https://185.224.82.193/img/78699.jpg')" }}>{" "}</div>
          <div className="col-3 poster">
            <img src="https://185.224.82.193/img/78699.jpg" alt="Title" className="img-fluid" />
          </div>
          <div className="col-8 col-lg-9 details">
            <h1 className="title-detail text">Battle Girl High School</h1>
            <p className="description-detail text">Dua tahun lalu, Tachibana Junichi hatinya rusak oleh seorang gadis yang tidak muncul untuk kencan pada malam Natal. Sekarang seorang mahasiswa tahun kedua di SMA, Junichi menghabiskan hari-harinya di dalam planetarium lemarinya, pergi ke sekolah dan berkumpul dengan temannya Tanamachi Kaoru dan Umehara Masayoshi. Setelah kesempatan bertemu dengan salah satu gadis tercantik di sekolah, siswi tahun ketiga Morishima Haruka, Junichi menghabiskan waktu dengannya, membawa buku untuknya atau tiba-tiba melompat di punggung dan bertindak sebagai joki dan kuda. Tak lama kemudian, Junichi menjadi romantis tertarik pada Haruka yang mengarah ke… Amagami SS didasarkan pada permainan kencan PS2 menampilkan enam gadis yang berbeda. Kisah anime akan diatur dalam format omnibus, dengan masing-masing mendapatkan tokoh versi sendiri dari cerita animasi. Setiap tokoh akan menyanyikan lagu versi sendiri dari lagu lagu penutup.</p>
            <a href="/" className="btn btn-watch">Watch</a>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="row slide-item p-3 justify-content-between g-0">
          <div className="bg-poster" style={{ backgroundImage: "url('https://185.224.82.193/img/26138.jpg')" }}>{" "}</div>
          <div className="col-3 poster">
            <img src="https://185.224.82.193/img/26138.jpg" alt="Title" className="img-fluid" />
          </div>
          <div className="col-8 col-lg-9 details">
            <h1 className="title-detail text">Battle Girl High School</h1>
            <p className="description-detail text">Dua tahun lalu, Tachibana Junichi hatinya rusak oleh seorang gadis yang tidak muncul untuk kencan pada malam Natal. Sekarang seorang mahasiswa tahun kedua di SMA, Junichi menghabiskan hari-harinya di dalam planetarium lemarinya, pergi ke sekolah dan berkumpul dengan temannya Tanamachi Kaoru dan Umehara Masayoshi. Setelah kesempatan bertemu dengan salah satu gadis tercantik di sekolah, siswi tahun ketiga Morishima Haruka, Junichi menghabiskan waktu dengannya, membawa buku untuknya atau tiba-tiba melompat di punggung dan bertindak sebagai joki dan kuda. Tak lama kemudian, Junichi menjadi romantis tertarik pada Haruka yang mengarah ke… Amagami SS didasarkan pada permainan kencan PS2 menampilkan enam gadis yang berbeda. Kisah anime akan diatur dalam format omnibus, dengan masing-masing mendapatkan tokoh versi sendiri dari cerita animasi. Setiap tokoh akan menyanyikan lagu versi sendiri dari lagu lagu penutup.</p>
            <a href="/" className="btn btn-watch">Watch</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)};

export default Carousel;
