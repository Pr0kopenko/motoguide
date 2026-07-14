import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ВИРАЖ — мотомаршруты одного дня из Москвы",
  description:
    "Девять кольцевых мотомаршрутов из Москвы: короткие и длинные поездки, проверенные точки, риски и места для еды.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
