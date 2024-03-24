import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import copyToClipboard from '../helpers/util';

export default function Home() {
  const [content, setContent] = useState("");
  const [showGuidBox, setShowGuidBox] = useState(false);
  const [guid, setGuid] = useState("");

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
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div style={{ marginTop: "24px" }} />
          <button
            onClick={() => {
              console.log({ content });

              const apiUrl =
                process.env.NEXT_PUBLIC_SERVICE_HOST ?? "http://localhost:5000";

              axios
                .post(apiUrl + "/save_paste", { content })
                .then((response) => {
                  setGuid(response.data);
                  setShowGuidBox(true);
                })
                .catch((error) => {
                  console.error(
                    "There was a problem with the axios request:",
                    error
                  );
                });
            }}
          >
            Save & Generate link
          </button>
          {showGuidBox && (
            <>
              <div style={{ margin: "24px", display: "inline" }} />
              <input
                type="text"
                disabled={true}
                value={document.location.origin + "/" + guid}
                style={{ width: "400px" }}
              />
              <button onClick={() => copyToClipboard(document.location.origin + "/" + guid)}>Copy URL</button>
              <button onClick={() => window.open(document.location.origin + "/" + guid, '_blank')}>Open Link</button>
            </>
          )}
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
