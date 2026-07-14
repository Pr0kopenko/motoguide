import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ВИРАЖ — мотомаршруты одного дня из Москвы",
  description:
    "Шесть кольцевых мотомаршрутов из Москвы: километраж, нагрузка, покрытие, риски и готовые точки для навигатора.",
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
