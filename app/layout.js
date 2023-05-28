import "./globals.css";

export const metadata = {
  title: "Composición max-min",
  description:
    "Aplicación web para calcular la composición max-min de una matriz de 8x8 con ella misma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
