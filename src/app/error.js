"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ textAlign: "center", padding: 40 }}>
          <h2>Bir şeyler ters gitti.</h2>
          <button onClick={() => reset()}>Tekrar dene</button>
        </div>
      </body>
    </html>
  );
}
