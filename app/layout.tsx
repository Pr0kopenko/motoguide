import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ВИРАЖ — мотомаршруты из Москвы",
  description:
    "Десять мотомаршрутов из Москвы: короткие кольца, два уикенда, характер дороги, риски, еда и ночёвки.",
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
