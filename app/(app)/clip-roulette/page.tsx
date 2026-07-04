'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Box,
  ChevronDown,
  DollarSign,
  Key,
  Lock,
  Sparkles,
  Star,
  Trophy,
  Wallet,
  Skull,
} from 'lucide-react'

const mockClips = [
  {
    id: '1',
    title: 'Epic CS2 Ace',
    game: 'Counter-Strike 2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip1',
    price: 125.5,
    views: '2.3M',
    duration: '0:42',
    rarity: 'legendary' as const,
  },
  {
    id: '2',
    title: 'Insane Clutch',
    game: 'CS2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip2',
    price: 89.99,
    views: '1.8M',
    duration: '1:05',
    rarity: 'epic' as const,
  },
  {
    id: '3',
    title: 'Smoke Grenade Play',
    game: 'Counter-Strike 2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip3',
    price: 45.0,
    views: '892K',
    duration: '0:38',
    rarity: 'rare' as const,
  },
  {
    id: '4',
    title: 'Wallbang Shot',
    game: 'CS2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip4',
    price: 156.25,
    views: '3.1M',
    duration: '0:25',
    rarity: 'legendary' as const,
  },
]

const wheelSegments = [
  { id: 'lock', label: 'Lock', Icon: Lock },
  { id: 'coins', label: 'Coins', Icon: DollarSign },
  { id: 'key', label: 'Key', Icon: Key },
  { id: 'bag', label: 'Bag', Icon: Wallet },
  { id: 'trophy', label: 'Trophy', Icon: Trophy },
  { id: 'star', label: 'Star', Icon: Star },
  { id: 'chest', label: 'Chest', Icon: Box },
  { id: 'skull', label: 'Skull', Icon: Skull },
]

const betPanels = [
  {
    id: 'panel-1',
    label: '2x',
    accent: 'from-accent-magenta to-accent-purple',
    title: 'Place Bet',
    bets: [
      { user: 'n0b0dy', amount: '$540' },
      { user: 'PartyBoy69', amount: '$20' },
      { user: 'S1mpleeex', amount: '$350' },
    ],
    betCount: 5,
  },
  {
    id: 'panel-2',
    label: '14x',
    accent: 'from-accent-purple to-accent-neon',
    title: 'Place Bet',
    bets: [
      { user: 'Getscoped', amount: '$100' },
      { user: 'PartyBoy69', amount: '$200' },
      { user: 'angelxx15', amount: '$200' },
    ],
    betCount: 3,
  },
  {
    id: 'panel-3',
    label: '2x',
    accent: 'from-accent-blue to-accent-purple',
    title: 'Place Bet',
    bets: [
      { user: 'angelxx15', amount: '$20' },
      { user: 'S1mpleeex', amount: '$350' },
      { user: 'FlowRr', amount: '$540' },
    ],
    betCount: 4,
  },
  {
    id: 'panel-4',
    label: '7x',
    accent: 'from-white/20 to-accent-magenta',
    title: 'Place Bet',
    bets: [{ user: 'Getscoped', amount: '$540' }],
    betCount: 1,
  },
]

const prizePools = [
  { title: 'Daily Race - 24 Hours', amount: '100,000' },
  { title: 'Weekly Race', amount: '1,000,000' },
]

export default function ClipRoulettePage() {
  const [quantity, setQuantity] = useState(1)
  const [betAmount, setBetAmount] = useState('250')
  const [spinState, setSpinState] = useState<'ready' | 'countdown' | 'spinning' | 'landed'>('countdown')
  const [spinTarget, setSpinTarget] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [countdown, setCountdown] = useState(6 * 60 + 12)
  const [hasLanded, setHasLanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const countdownRef = useRef<number | null>(null)

  const winningSegment = wheelSegments[spinTarget]
  const segmentsWithColor = wheelSegments.map((segment, index) => {
    const palette = index % 3 === 0 ? 'bg-gradient-to-br from-accent-magenta to-accent-purple' : index % 3 === 1 ? 'bg-gradient-to-br from-accent-purple to-accent-blue' : 'bg-gradient-to-br from-accent-blue to-accent-magenta'
    return { ...segment, palette }
  })

  useEffect(() => {
    if (spinState === 'spinning') return
    if (countdownRef.current) window.clearInterval(countdownRef.current)

    countdownRef.current = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(countdownRef.current!)
          setSpinState('ready')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => {
      if (countdownRef.current) window.clearInterval(countdownRef.current)
    }
  }, [spinState])

  const formattedCountdown = useMemo(() => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, [countdown])

  const startSpin = () => {
    if (spinState === 'spinning') return

    const target = Math.floor(Math.random() * wheelSegments.length)
    const rounds = 6 + Math.floor(Math.random() * 3)
    const offset = 22.5
    const finalRotation = -(target * 45 + offset + rounds * 360)
    setSpinTarget(target)
    setSpinState('spinning')
    setHasLanded(false)
    setRotation((prev) => prev + finalRotation)

    window.setTimeout(() => {
      setSpinState('landed')
      setHasLanded(true)
      setTimeout(() => {
        setSpinState('ready')
      }, 2600)
    }, prefersReducedMotion ? 600 : 4200)
  }

  const quickActions = [
    { label: 'Clear', value: '0' },
    { label: '+1', value: (Number(betAmount) + 1).toString() },
    { label: '+10', value: (Number(betAmount) + 10).toString() },
    { label: '+100', value: (Number(betAmount) + 100).toString() },
    { label: '1/2', value: Math.floor(Number(betAmount) / 2).toString() },
    { label: '2x', value: (Number(betAmount) * 2).toString() },
    { label: 'MAX', value: '9999' },
  ]

  return (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Clip-Roulette</h1>
        <p className="text-text-muted mt-2">Discover amazing gaming clips and earn rewards</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-dark-panel p-6 shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-accent-purple/80">Clip spin</p>
                <h2 className="text-3xl font-bold text-text-primary">Spin the wheel to win clip rewards</h2>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-[#11121d] px-4 py-3 border border-white/10 text-sm text-text-muted">
                <Sparkles className="text-accent-magenta" size={18} />
                <span>Physical wheel depth + animated spin</span>
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[3rem] border border-white/10 bg-[#07070f] p-6">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent-magenta/10 to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent-purple/10 to-transparent opacity-80" />

              <div className="relative mx-auto w-full max-w-[520px]">
                <div className="absolute inset-x-0 top-0 flex justify-center z-10">
                  <div className="relative top-[-14px] h-12 w-12 rounded-b-2xl bg-accent-magenta text-dark-base shadow-[0_20px_40px_rgba(255,45,109,0.14)]">
                    <ChevronDown className="mx-auto mt-3" size={20} />
                  </div>
                </div>

                <motion.div
                  animate={{ rotateZ: rotation, rotateX: spinState === 'spinning' ? [18, 12, 16, 14, 15] : 15 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.6 : 4.2,
                    ease: prefersReducedMotion ? 'linear' : [0.33, 1, 0.68, 1],
                  }}
                  className="relative mx-auto aspect-square w-full rounded-full bg-[#090915] shadow-[inset_0_30px_55px_rgba(0,0,0,0.55)] overflow-hidden"
                >
                  <div className="absolute inset-6 rounded-full border border-white/5 bg-[#0b0b16] shadow-[inset_0_0_70px_rgba(0,0,0,0.4)]" />
                  <div className="absolute inset-14 rounded-full border border-white/5 bg-[#0c0c18] shadow-[inset_0_0_40px_rgba(0,0,0,0.25)]" />

                  {segmentsWithColor.map((segment, index) => {
                    const SegmentIcon = segment.Icon
                    return (
                      <div
                        key={segment.id}
                        className="absolute inset-0 origin-center"
                        style={{ transform: `rotate(${index * 45}deg)` }}
                      >
                        <div
                          className={`absolute right-0 top-1/2 h-[50%] w-1/2 -translate-y-1/2 rounded-bl-full rounded-tl-full ${segment.palette} shadow-[inset_0_0_20px_rgba(0,0,0,0.25)]`}
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }}
                        />
                        <div className="absolute right-1/2 top-1/2 flex h-16 w-16 -translate-y-1/2 translate-x-8 items-center justify-center rounded-full border border-white/10 bg-black/30 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                          <SegmentIcon className="text-white" size={20} />
                        </div>
                      </div>
                    )
                  })}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-dark-panel border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-magenta/10 blur-2xl opacity-70" />
                      <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
                        <span className="text-xs uppercase tracking-[0.35em] text-text-muted">{spinState === 'ready' ? 'Spin Ready' : 'Next Spin'}</span>
                        {spinState === 'ready' ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={startSpin}
                            className="rounded-full bg-accent-magenta px-6 py-3 text-sm font-bold text-white shadow-[0_15px_40px_rgba(255,45,109,0.35)]"
                          >
                            SPIN
                          </motion.button>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-3xl font-bold text-text-primary">{formattedCountdown}</span>
                            <span className="text-xs uppercase tracking-[0.35em] text-accent-purple/70">until next spin</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {hasLanded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      >
                        <div className="absolute h-72 w-72 rounded-full bg-accent-magenta/10 blur-3xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                  {hasLanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="absolute inset-x-0 bottom-6 mx-auto flex max-w-2xl justify-center px-4"
                    >
                      <div className="rounded-3xl border border-accent-magenta/30 bg-[#120f1f] px-5 py-3 text-center text-sm text-text-primary shadow-[0_20px_60px_rgba(255,45,109,0.12)]">
                        <span className="font-semibold text-accent-magenta">{winningSegment.label}</span> segment landed! Reward unlocked.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#090915] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] min-h-[220px]">
                  <p className="text-sm uppercase tracking-[0.35em] text-accent-purple/70">Spin status</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-text-primary">
                    <div className="rounded-3xl bg-[#0c0c18] px-4 py-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.25)]">
                      <span className="block text-xs text-text-muted">Segment</span>
                      <span className="mt-1 block text-lg font-semibold">{winningSegment.label}</span>
                    </div>
                    <div className="rounded-3xl bg-[#0c0c18] px-4 py-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.25)]">
                      <span className="block text-xs text-text-muted">State</span>
                      <span className="mt-1 block text-lg font-semibold capitalize">{spinState}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#090915] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                  <p className="text-sm uppercase tracking-[0.35em] text-accent-purple/70">Potential reward</p>
                  <div className="mt-4 grid gap-3 text-text-muted">
                    <div className="rounded-2xl bg-[#0c0c18] p-4">High-tier clip odds increase with multiplier.</div>
                    <div className="rounded-2xl bg-[#0c0c18] p-4">Landing on Trophy or Chest yields bonus drops.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-dark-panel p-6 shadow-[0_30px_70px_rgba(0,0,0,0.15)]">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Bet amount</h3>
                  <p className="text-sm text-text-muted">Adjust your wager before placing a bet.</p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(event) => setBetAmount(event.target.value)}
                    placeholder="Enter bet amount..."
                    className="w-full min-w-[160px] rounded-2xl border border-white/10 bg-[#090915] px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-accent-magenta/70"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => setBetAmount(action.value)}
                    className="rounded-full border border-white/10 bg-[#0b0b14] px-4 py-2 text-xs font-semibold text-text-muted transition-all hover:border-accent-purple/40 hover:text-text-primary"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-w-[1150px]">
                {betPanels.map((panel) => (
                  <motion.div
                    key={panel.id}
                    whileHover={{ y: -6, scale: 1.035 }}
                    className="group w-full min-h-[440px] w-[400px] rounded-[2.5rem] border border-white/10 bg-[#0a0a12] p-10 shadow-[0_35px_90px_rgba(0,0,0,0.22)] transition-transform"
                  >
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${panel.accent} text-xs font-semibold text-white shadow-[0_12px_30px_rgba(124,58,237,0.3)]`}>
                      {panel.label}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-text-primary">{panel.title}</p>
                      <span className="text-xs text-text-muted">{panel.betCount} Bets</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {panel.bets.map((bet) => (
                        <div key={bet.user} className="rounded-3xl border border-white/10 bg-[#0b0b16]/80 px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all group-hover:-translate-y-0.5">
                          <div className="flex items-center justify-between gap-3 text-sm text-text-primary">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-text-primary">{bet.user.charAt(0)}</span>
                                <span className="truncate">{bet.user}</span>
                              </div>
                            </div>
                            <span className="ml-3 flex-shrink-0 font-semibold text-accent-magenta truncate">{bet.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid gap-4">
                <div className="grid gap-6 sm:grid-cols-2">
                  {prizePools.map((pool) => (
                    <motion.div
                      key={pool.title}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="rounded-3xl border border-white/10 bg-[#090915] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-transform w-full"
                    >
                      <p className="text-xs uppercase tracking-[0.35em] text-text-muted">{pool.title}</p>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="text-sm text-text-muted">Prize pool</span>
                        <span className="rounded-full bg-accent-purple/10 px-3 py-1 text-xs text-accent-purple">Top</span>
                      </div>
                      <p className="mt-6 text-3xl font-bold text-text-primary">{pool.amount}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#090915] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-3">
                    <Trophy className="text-accent-magenta" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Race Leaderboard</p>
                      <p className="text-xs text-text-muted">Top players and wagered prizes</p>
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-3xl bg-[#090915]/50 border border-white/5">
                    <table className="min-w-full border-collapse text-sm">
                      <colgroup>
                        <col style={{ width: '60px' }} />
                        <col style={{ width: '40%' }} />
                        <col style={{ width: '1fr' }} />
                        <col style={{ width: '1fr' }} />
                      </colgroup>
                      <thead>
                        <tr className="border-b border-white/10 bg-[#0d0d18]">
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.04em] text-text-muted">Rank</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.04em] text-text-muted">User</th>
                          <th className="px-4 py-3 text-right text-xs uppercase tracking-[0.04em] text-text-muted">Wagered</th>
                          <th className="px-4 py-3 text-right text-xs uppercase tracking-[0.04em] text-text-muted">Prize</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { rank: 1, user: 'DizzyD', wagered: '22,089,888.84', prize: '25,000.00', highlight: true },
                          { rank: 2, user: 'Fluxy', wagered: '18,430,211.00', prize: '12,500.00' },
                          { rank: 3, user: 'Nova', wagered: '12,700,340.50', prize: '9,000.00' },
                        ].map((row) => (
                          <tr
                            key={row.rank}
                            className={`${row.highlight ? 'bg-accent-magenta/10 shadow-[0_20px_60px_rgba(255,45,109,0.08)]' : ''}`}
                          >
                            <td className="border-t border-white/10 px-4 py-4 font-semibold text-text-primary">{row.rank}</td>
                            <td className="border-t border-white/10 px-4 py-4">
                              <div className="flex min-w-0 items-center gap-2">
                                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-text-primary">{row.user.charAt(0)}</span>
                                <span className="truncate text-text-primary">{row.user}</span>
                              </div>
                            </td>
                            <td className="border-t border-white/10 px-4 py-4 text-right text-text-muted">
                              <span className="inline-block min-w-0 truncate">{row.wagered}</span>
                            </td>
                            <td className="border-t border-white/10 px-4 py-4 text-right font-semibold text-text-primary">
                              <span className="inline-block min-w-0 truncate">{row.prize}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4">
            <h3 className="font-bold text-text-primary">How It Works</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-accent-magenta font-bold">1</span>
                <span>Spin to get random clips</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-magenta font-bold">2</span>
                <span>Earn rewards based on rarity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-magenta font-bold">3</span>
                <span>Save clips to your collection</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-2">
            <p className="text-sm text-text-muted">Curated from top players</p>
            <p className="text-xs text-text-muted">
              All clips are verified authentic and feature legendary plays from competitive gaming.
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
