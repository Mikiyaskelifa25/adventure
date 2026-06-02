import { ImageResponse } from "next/og"

export const alt = "Adventure in Abyssinie – Ethiopia Tours"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(153, 77, 51, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(153, 77, 51, 0.1)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            padding: "40px 60px",
          }}
        >
          <h1
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "72px",
              fontWeight: 700,
              color: "#e7e5e4",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Adventure in
            <br />
            Abyssinie
          </h1>
          <p
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: "24px",
              color: "rgb(191, 153, 108)",
              textAlign: "center",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Make every journey an adventure
          </p>
          <div
            style={{
              marginTop: "32px",
              height: "2px",
              width: "120px",
              background: "linear-gradient(to right, transparent, rgb(191, 153, 108), transparent)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
