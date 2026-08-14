import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "AIONEX — we place people who move companies forward. Agency-led recruiting with private, curated matching.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const markBytes = await readFile(join(process.cwd(), "public/brand/aionex-mark.png"));
  const markSrc = `data:image/png;base64,${markBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0a0e14 0%, #121826 55%, #1a3050 100%)",
          color: "#eef3fa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markSrc}
            width={88}
            height={88}
            alt=""
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
            }}
          />
          <div
            style={{
              fontSize: "42px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#7eb6e8",
            }}
          >
            AIONEX
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              color: "#eef3fa",
            }}
          >
            We place people who move companies forward.
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.45,
              color: "#93a0b5",
              maxWidth: "820px",
            }}
          >
            Agency-led recruiting with private, curated matching for open roles and hard-to-find
            talent.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "#7eb6e8",
          }}
        >
          <span>Jobs · Hire · Services</span>
          <span>aionexoutsourcing.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
