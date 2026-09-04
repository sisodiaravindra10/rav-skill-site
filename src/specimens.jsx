// Rendered fragments, not screenshots. Each pair is the same idea in two states,
// drawn from the same handful of primitives so sixteen demos read as one system.
// They are diagrams of a transformation, labelled WAS and NOW, never a claim that
// any of this is a shipping product.

const Btn = ({ children, tone = "solid" }) => (
  <span
    className={
      "inline-flex items-center justify-center rounded px-2.5 py-1 text-[10px] leading-none " +
      { solid: "bg-white text-ink font-medium",
        accent: "bg-accent text-ink font-medium",
        ghost: "border border-white/20 text-white/70",
        flat: "border border-white/15 text-white/60" }[tone]
    }
  >
    {children}
  </span>
);

const Bar = ({ w, tone = "dim", h = 6 }) => (
  <span
    className={
      "block rounded-full " +
      { dim: "bg-white/22", mid: "bg-white/40", bright: "bg-white/80", accent: "bg-accent" }[tone]
    }
    style={{ width: w, height: h }}
  />
);

const Box = ({ children, tone = "line", className = "" }) => (
  <div
    className={
      "rounded-md p-2.5 " +
      { line: "border border-white/12",
        loud: "border border-red-500/70 bg-red-500/25 shadow-[0_10px_30px_-6px_rgba(239,68,68,0.5)]",
        calm: "border border-red-400/25 bg-red-400/10" }[tone] +
      " " + className
    }
  >
    {children}
  </div>
);

const Label = ({ children, tone = "dim" }) => (
  <span className={"font-mono text-[10px] uppercase tracking-[0.14em] " + (tone === "accent" ? "text-accent/90" : "text-white/65")}>
    {children}
  </span>
);

const Stack = ({ children, gap = 8 }) => (
  <div className="flex flex-col" style={{ gap }}>{children}</div>
);
const Row = ({ children, gap = 6, wrap = true }) => (
  <div className={"flex items-center " + (wrap ? "flex-wrap " : "")} style={{ gap }}>{children}</div>
);

const Curve = ({ d, tone }) => (
  <svg viewBox="0 0 80 40" className="h-12 w-24" fill="none" aria-hidden="true">
    <path d="M0 40 H80" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
    <path d={d} stroke={tone} strokeWidth="1.5" />
  </svg>
);

// was / now for every verb
export const SPECIMENS = {
  polish: {
    was: <Stack><Label>one state</Label><Row><Btn>Save</Btn></Row></Stack>,
    now: (
      <Stack>
        <Label tone="accent">seven states</Label>
        <Row><Btn>Save</Btn><Btn tone="ghost">Save</Btn><Btn tone="accent">Save</Btn><Btn tone="flat">Save</Btn></Row>
        <Row><Bar w={34} tone="mid" h={4} /><Bar w={34} tone="mid" h={4} /><Bar w={34} tone="dim" h={4} /></Row>
      </Stack>
    ),
  },
  bolder: {
    was: <Stack gap={6}><Bar w={90} tone="dim" h={9} /><Bar w={130} tone="dim" h={5} /></Stack>,
    now: <Stack gap={8}><Bar w={150} tone="bright" h={20} /><Bar w={104} tone="bright" h={20} /><Bar w={120} tone="dim" h={5} /></Stack>,
  },
  quieter: {
    was: <Box tone="loud"><Stack gap={6}><Bar w={64} tone="bright" h={6} /><Bar w={110} tone="bright" h={4} /></Stack></Box>,
    now: <Box tone="calm"><Stack gap={6}><Bar w={64} tone="mid" h={6} /><Bar w={110} tone="dim" h={4} /></Stack></Box>,
  },
  distill: {
    was: <Row gap={5}>{["Save","Send","Share","Export","Copy","More"].map(t => <Btn key={t} tone="ghost">{t}</Btn>)}</Row>,
    now: <Row gap={6}><Btn tone="accent">Send</Btn><Btn tone="ghost">Save</Btn></Row>,
  },
  harden: {
    was: (
      <Stack gap={6}>
        <div className="w-[92px] overflow-hidden rounded border border-white/12 px-2 py-1">
          <span className="block whitespace-nowrap font-mono text-[10px] text-white/70">Großherzogin</span>
        </div>
        <Label>clipped</Label>
      </Stack>
    ),
    now: (
      <Stack gap={6}>
        <div className="w-[130px] rounded border border-white/20 px-2 py-1">
          <span className="block break-words font-mono text-[10px] leading-snug text-white/85">Großherzogin Anna Amalia</span>
        </div>
        <Label tone="accent">wraps, min-w-0</Label>
      </Stack>
    ),
  },
  onboard: {
    was: <Box className="grid h-20 w-40 place-items-center"><span className="font-mono text-[10px] text-white/60">No data</span></Box>,
    now: (
      <Box className="w-48"><Stack gap={7}>
        <Bar w={96} tone="bright" h={7} /><Bar w={132} tone="dim" h={4} /><Bar w={108} tone="dim" h={4} />
        <Row><Btn tone="accent">Submit a case</Btn></Row>
      </Stack></Box>
    ),
  },
  animate: {
    was: <Stack gap={4}><Curve d="M0 40 L80 8" tone="rgba(255,255,255,0.35)" /><Label>linear, all 0.3s</Label></Stack>,
    now: <Stack gap={4}><Curve d="M0 40 C 12 8, 30 4, 80 4" tone="#f58549" /><Label tone="accent">ease-out, transform</Label></Stack>,
  },
  colorize: {
    was: <Row gap={6}>{[0,1,2,3].map(i => <Btn key={i} tone="flat">item</Btn>)}</Row>,
    now: (
      <Stack gap={8}>
        <Row gap={6}><Btn tone="accent">action</Btn><Btn tone="ghost">item</Btn><Btn tone="flat">done</Btn></Row>
        <Row gap={6}><Label tone="accent">accent = action</Label></Row>
      </Stack>
    ),
  },
  typeset: {
    was: <Stack gap={6}>{[110,120,96].map((w,i) => <Bar key={i} w={w} tone="mid" h={7} />)}</Stack>,
    now: (
      <Stack gap={7}>
        <Bar w={132} tone="bright" h={14} />
        <Bar w={150} tone="dim" h={5} /><Bar w={138} tone="dim" h={5} />
        <span className="font-mono text-[10px] tabular-nums text-white/45">1,204 . 0,981 . 1,377</span>
      </Stack>
    ),
  },
  layout: {
    was: <Stack gap={7}>{[0,1,2,3].map(i => <Bar key={i} w={140} tone="dim" h={9} />)}</Stack>,
    now: (
      <Stack gap={16}>
        <Stack gap={4}><Bar w={140} tone="bright" h={9} /><Bar w={112} tone="dim" h={6} /></Stack>
        <Stack gap={4}><Bar w={126} tone="mid" h={9} /><Bar w={96} tone="dim" h={6} /></Stack>
      </Stack>
    ),
  },
  delight: {
    was: <Row><Btn tone="flat">Copied</Btn></Row>,
    now: (
      <Row gap={8}>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-accent/60">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#f58549" strokeWidth="3" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <Label tone="accent">copied</Label>
      </Row>
    ),
  },
  overdrive: {
    was: <Stack gap={6}>{[0,1,2].map(i => <Bar key={i} w={140} tone="dim" h={8} />)}</Stack>,
    now: (
      <Stack gap={2}>
        {Array.from({ length: 14 }).map((_, i) => (
          <Bar key={i} w={140 - (i % 5) * 12} tone={i === 3 ? "accent" : "dim"} h={3} />
        ))}
      </Stack>
    ),
  },
  clarify: {
    was: <Box tone="calm"><span className="font-mono text-[10px] text-white/55">Error 422: unprocessable entity</span></Box>,
    now: (
      <Box tone="calm"><Stack gap={5}>
        <span className="font-mono text-[10px] leading-snug text-white/90">That date is in the past.</span>
        <span className="font-mono text-[10px] leading-snug text-accent/85">Pick a later one.</span>
      </Stack></Box>
    ),
  },
  adapt: {
    was: <div className="grid grid-cols-4 gap-1.5">{Array.from({length:8}).map((_,i)=><span key={i} className="h-6 w-8 rounded-sm bg-white/12" />)}</div>,
    now: (
      <Stack gap={5}>
        {Array.from({length:3}).map((_,i)=><span key={i} className="block h-6 w-[136px] rounded-sm bg-white/25" />)}
        <Label tone="accent">1 col at 375</Label>
      </Stack>
    ),
  },
  optimize: {
    was: <Stack gap={6}><span className="block h-9 w-[150px] rounded bg-white/25" /><Label>7.3 MB</Label></Stack>,
    now: <Stack gap={6}><span className="block h-9 w-[14px] rounded bg-accent" /><Label tone="accent">677 KB</Label></Stack>,
  },
  "review-motion": {
    was: <Row gap={5}>{Array.from({length:12}).map((_,i)=><span key={i} className="h-2.5 w-2.5 rounded-full bg-white/25" />)}</Row>,
    now: <Row gap={8}><span className="h-4 w-4 rounded-full bg-accent" /><Label tone="accent">one authored moment</Label></Row>,
  },
};
