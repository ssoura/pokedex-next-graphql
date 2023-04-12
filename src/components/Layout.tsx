import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Nunito } from "next/font/google";

const font = Nunito({
  subsets: ["latin"],
});
const Layout = ({ children, title, number }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={font.className}>
        <header className="bg-slate-800 py-6 mb-6">
          {number && (
            <div className="flex flex-col justify-center items-center">
              <span className="sm:absolute text-3xl sm:text-7xl font-bold text-slate-500 right-0 mr-4">
                #{number}
              </span>
              <Link href="/">
                <h1 className="text-6xl text-center text-amber-400">{title}</h1>
              </Link>
            </div>
          )}
          {!number && (
            <Link href="/">
              <h1 className="text-6xl text-center text-amber-400">{title}</h1>
            </Link>
          )}
        </header>

        <main className="container mx-auto">{children}</main>

        {/* <footer className="flex text-slate-900 justify-center items-center mt-10 mb-5 text-l font-semibold">
          <a
            className="flex flex-col"
            href="https://sourabhshukla.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourabh Shukla
          </a>
        </footer> */}
      </div>
    </>
  );
};

export default Layout;
