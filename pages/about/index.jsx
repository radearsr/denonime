import Head from "next/head";
import Layout from "../../components/shared/Layout";
import config from "../../package.json";

const About = () => (
  <>
    <Head>
      <title>DenoNime - About</title>
    </Head>
    <Layout addonClass="bg-orange sticky-top mb-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <h1 className="about-title text-center">About</h1>
            <span className="about-title-underline d-block rounded-pill mx-auto w-25">{" "}</span>
            <p className="fs-6 my-3 text-center">Denonime adalah aplikasi website yang ditujukan untuk para pecinta anime. Kami menyediakan konten dari berbagai sumber untuk saat ini kami hanya mengambil dari dua sumber yaitu otakudesu dan animeindo, dengan cara menscraping website tersebut, lalu diolah agar video dapat diputar diwebsite kami, dan juga dengan cara mendownload ulang koten yang mereka sediakan lalu upload ulang ke server kami. Perlu diketahui bahwa kami tidak ada hubungan kerja sama antara situs penyedia konten tersebut.</p>
            <span className="about-copyright text-center d-block">{`© ${new Date().getFullYear()} DenoNime. All rights reserved.`}</span>
            <span className="about-copyright text-center d-block">{`v${config.version}`}</span>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default About;
