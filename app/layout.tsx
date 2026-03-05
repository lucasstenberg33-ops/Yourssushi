export const runtime = 'edge';

export const metadata = {
  title: 'Yours Sushi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
<body>
  {/* <StructuredData /> */}
  {/* <Navbar /> */}
  <main>{children}</main>
  {/* <Footer /> */}
</body>
    </html >
  );
}
