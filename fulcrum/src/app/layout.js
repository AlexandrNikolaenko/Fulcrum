import { Montserrat } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import Header from "./components/header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const unbounded = localFont({
  src: [
    {
      path: '../../public/fonts/unbounded-v8-cyrillic_latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/unbounded-v8-cyrillic_latin-700.woff2',
      weight: '700',
      style: 'normal',
    }
  ]
});

// const montserrat = localFont({
//   src: '../../public/fonts/montserrat-v29-cyrillic_latin-regular.woff2'
// });

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.className} ${montserrat.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
