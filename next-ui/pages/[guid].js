import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

function GetPastePage() {
  const router = useRouter();
  const { guid } = router.query;

  const [content, setContent] = useState("");

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_SERVICE_HOST ?? "http://localhost:5000";

    guid !== undefined &&
      axios
        .get(apiUrl + "/get_paste/" + guid)
        .then((response) => {
          setContent(response.data);
        })
        .catch((error) => {
          if (error?.code === "ERR_NETWORK") {
            window.alert(error?.message);
          } else if (error?.response?.status === 404) {
            window.alert(error?.response?.data?.Error);
          }
          console.error("There was a problem with the axios request:", error);
        });
  }, [guid]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Saads PasteBin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Welcome to PasteBin Clone!</h1>
        <div>
          <textarea
            style={{ width: "800px", height: "480px" }}
            value={content?.content}
            disabled={true}
          />
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default GetPastePage;
