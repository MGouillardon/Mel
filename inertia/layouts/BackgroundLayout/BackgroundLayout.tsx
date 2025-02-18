function BackgroundLayout({ theme }: { theme: string }) {
  const isLight = theme === 'lemonade';

  return isLight ? (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-base-100" />
  ) : (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-base-100" />
  )

}

export default BackgroundLayout;