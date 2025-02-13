function BackgroundLayout({ theme }: { theme: string }) {
  const isLight = theme === 'emerald';

  return isLight ? (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
  ) : (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
  )

}

export default BackgroundLayout;