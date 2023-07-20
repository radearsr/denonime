import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { initFirebase } from "../firebase/firebaseApp";
import styles from "../styles/SignIn.module.css";

const signIn = () => {
  initFirebase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const signInHandler = async () => {
    await signInWithPopup(auth, provider);
  };

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const pushTo = !router.query.reffer ? "/" : router.query.reffer;
    if (!user) return () => {};
    router.push(pushTo);
    return () => {};
  }, [user, loading]);

  return (
    <>
      <Head>
        <title>Log In | Denonime</title>
      </Head>
      <div className="container-fluid">
        <div className={`${styles.wrapper__signin} row align-items-center vh-100`}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto h-50">
            <div className="card text-center h-100">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <Image
                  src="/icon.png"
                  width="50"
                  height="50"
                  quality="70"
                  priority
                />
                <h1 className="fs-2 fw-bold">Denonime</h1>
                <p className="fs-6">Continue to login or create a new account</p>
                <button className={`btn ${styles.btn_login_google} mt-4`} onClick={signInHandler}>
                  <i className="bi bi-google">{" "}</i>
                  Continue With Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default signIn;
