import { ImageResponse } from "next/og";

export const alt = "Takeru — Developer & Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#fcfdfb",
          color: "#161a24",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "68px 76px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", fontSize: 28, letterSpacing: "0.08em" }}>
          <span style={{ background: "#254ee8", borderRadius: 12, color: "white", display: "flex", fontSize: 42, fontWeight: 700, height: 70, justifyContent: "center", marginRight: 24, paddingTop: 9, width: 70 }}>T</span>
          TAKERU / TOKYO, JP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#254ee8", fontSize: 26, letterSpacing: "0.12em" }}>INDEPENDENT DEVELOPER &amp; PRODUCT BUILDER</span>
          <span style={{ fontSize: 86, fontWeight: 700, letterSpacing: "-0.06em", marginTop: 18 }}>Curiosity, made useful.</span>
        </div>
        <div style={{ borderTop: "2px solid #d9dcd7", display: "flex", fontSize: 28, justifyContent: "space-between", paddingTop: 24 }}>
          <span>Web · Mobile · AI</span>
          <span>takeruf.com</span>
        </div>
      </div>
    ),
    size,
  );
}
