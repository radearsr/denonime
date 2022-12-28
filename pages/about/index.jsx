import Layout from "../../components/Layout";

const About = () => (
  <Layout>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h1 className="about-title text-center">About</h1>
          <span className="about-title-underline d-block rounded-pill mx-auto w-25">{" "}</span>
          <p className="fs-6 my-3 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, vel a cumque quos non enim optio molestiae hic voluptatibus ab sed error quaerat harum accusantium quidem soluta maxime maiores et laudantium ratione aut nesciunt, reprehenderit doloremque! Soluta enim dolores, voluptas alias quia neque vel natus iure sed saepe sint. Dignissimos?</p>
          <span className="about-copyright text-center d-block">© 2022 DenoNime. All rights reserved.</span>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
