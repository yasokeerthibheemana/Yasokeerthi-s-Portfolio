import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yasokeerthi Bheemana — AI & Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Yasokeerthi Bheemana — Computer Science undergraduate, AI & Software Developer, Generative AI enthusiast.",
      },
      { property: "og:title", content: "Yasokeerthi Bheemana — AI & Software Developer" },
      {
        property: "og:description",
        content: "Personal portfolio showcasing projects, experience, and skills in AI and software development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/portfolio.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#07080d", color: "#e6edf7", display: "grid", placeItems: "center", fontFamily: "system-ui" }}>
      Loading portfolio…
    </div>
  );
}
