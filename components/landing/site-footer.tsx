import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-magenta rounded flex items-center justify-center font-black text-sm">
            ◆
          </div>
          <span className="text-sm font-black tracking-wider">NEXUS GAMING</span>
        </div>
        <p className="text-xs text-text-muted">© 2026 Nexus Gaming. Play beyond the limit.</p>
        <div className="flex gap-6 text-xs text-text-muted font-semibold">
          <Link href="#" className="hover:text-accent-purple transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-accent-purple transition-colors">
            Privacy
          </Link>
          <Link href="/login" className="hover:text-accent-purple transition-colors">
            Join
          </Link>
        </div>
      </div>
    </footer>
  )
}
