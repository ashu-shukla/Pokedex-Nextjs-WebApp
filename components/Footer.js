import Link from "next/link";

export default function Footer({ page }) {
  const col = page === "index" ? "color: red;" : "color: white;";
  return (
    <div>
      <style jsx>{`
        p {
          ${col}
          text-align: center;
          font-size: 0.9rem;
          font-family: "Archivo Black", sans-serif;
        }
        span {
          color: #000;
        }
      `}</style>
      <p>
        © Designed By{" "}
        <span>
          <Link href="http://www.ashutoshshukla.in/">
            <a>Ashutosh Shukla</a>
          </Link>
        </span>
      </p>
    </div>
  );
}
