import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Play, Pause, BarChart3, Map, Table, FileText, CheckCircle2, Sparkles, Zap, Monitor } from "lucide-react";

/**
 * ✨ Ultra-polished presentation deck
 * FIX: Resolved unterminated string constant in Placeholder backgroundImage by removing the newline
 * and composing a single string value.
 * - Animated gradient background + subtle noise
 * - Glassmorphism slide cards
 * - Upgraded placeholders with grid texture
 * - Fancy buttons, progress bar, and keyboard hints
 * - Autoplay with animated indicator
 */

// ----- Decorative Background -----
const Bg = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
    {/* animated gradient blob */}
    <div className="absolute -top-1/3 -left-1/4 h-[70vh] w-[70vw] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-fuchsia-400 via-indigo-400 to-sky-400 animate-[pulse_10s_ease-in-out_infinite]" />
    <div className="absolute -bottom-1/3 -right-1/4 h-[70vh] w-[70vw] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-amber-300 via-rose-300 to-emerald-300 animate-[pulse_12s_ease-in-out_infinite]" />
    {/* noise overlay */}
    <div
      className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(0,0,0,.9) 1px, transparent 1px)",
        backgroundSize: "6px 6px",
      }}
    />
  </div>
);

// ----- Pretty code block -----
const Code = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-zinc-900/95 text-zinc-50 p-5 rounded-2xl overflow-auto text-sm leading-relaxed shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
    <code>{children}</code>
  </pre>
);

// ----- Luxe placeholder with grid pattern -----
const Placeholder = ({ label }: { label: string }) => (
  <div className="relative w-full h-60 rounded-3xl border border-zinc-200/60 bg-white/60 backdrop-blur-sm shadow-lg overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        // single-line value avoids unterminated string errors
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.8)), radial-gradient(circle at 25px 25px, rgba(0,0,0,.06) 1px, transparent 1px)",
        backgroundSize: "auto, 24px 24px",
      }}
    />
    <div className="relative h-full w-full flex items-center justify-center">
      <span className="px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs tracking-wide shadow">
        {label} • placeholder
      </span>
    </div>
  </div>
);

// ----- Slide frame with glass effect -----
const SlideFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-6xl w-full mx-auto p-6 md:p-10">
    <div className="bg-white/60 backdrop-blur-xl rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.25)] border border-white/60">
      <div className="p-7 md:p-10">{children}</div>
    </div>
  </div>
);

// ----- Dots + progress bar -----
const Dots = ({
  count,
  index,
  goto,
}: {
  count: number;
  index: number;
  goto: (i: number) => void;
}) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        aria-label={`Go to slide ${i + 1}`}
        onClick={() => goto(i)}
        className={`h-2.5 rounded-full transition-all ${
          i === index
            ? "bg-zinc-900 w-8"
            : "bg-zinc-400/50 w-2.5 hover:bg-zinc-500/70"
        }`}
      />
    ))}
  </div>
);

const Progress = ({ value }: { value: number }) => (
  <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
    <div
      className="h-full bg-zinc-900 rounded-full transition-all"
      style={{ width: `${value * 100}%` }}
    />
  </div>
);

// ----- Slides data -----
const useSlides = () =>
  useMemo(
    () => [
      {
        key: "title",
        el: (
          <SlideFrame>
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-zinc-700 text-sm">
                <Sparkles className="w-4 h-4" /> Tableau Prep + Tableau Desktop
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                Sales Performance Analysis
              </h1>
              <p className="text-zinc-700/90 max-w-2xl text-lg">
                A clean, actionable story covering data preparation, KPIs, dashboards, and recommendations to reduce category dependency and improve profitability.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Executive Overview", "Product Deep Dive", "Operations"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-800 text-xs shadow-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "objectives",
        el: (
          <SlideFrame>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl font-semibold">Objectives</h2>
                <ul className="list-disc pl-6 space-y-2 text-zinc-800">
                  <li>
                    Summarize key findings across revenue, margin, and seasonality.
                  </li>
                  <li>
                    Highlight risks: over-concentration in KURTA, underperforming categories.
                  </li>
                  <li>
                    Recommend actions: diversification, seasonal optimization, channel/market expansion.
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-sm">
                  <BarChart3 className="w-5 h-5 mb-2 text-indigo-600" /> Executive KPIs
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-sm">
                  <Table className="w-5 h-5 mb-2 text-emerald-600" /> Product Profitability
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 shadow-sm">
                  <Map className="w-5 h-5 mb-2 text-amber-600" /> Geo & Fulfillment
                </div>
              </div>
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "data",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Data Sources</h2>
            <div className="grid md:grid-cols-2 gap-6 text-zinc-800 mt-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Amazon Sales (Domestic): detailed orders (26+ fields)</li>
                <li>International Sales: compact schema (10+ fields)</li>
                <li>May-2022: product master (MRP by channel, TP/costs)</li>
                <li>Sales Report: attributes (Category, Color, Size, SKU)</li>
              </ul>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expense (optional): received / expense ledger</li>
                <li>Output: one Excel with multiple sheets</li>
                <li>Desktop model: Union + Relationships (Style, SKU)</li>
              </ul>
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "prep",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Prep Flow (Highlights)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-800 mt-3">
              <li>Normalize types; trim; remove empty columns.</li>
              <li>Convert text nulls ("Nill", "NA") to real NULLs.</li>
              <li>City cleanup: lowercase + Group by Pronunciation + manual pass.</li>
              <li>
                Rebuild SKU = <code>Style</code> + "-" + <code>Size</code>.
              </li>
              <li>
                Union Amazon + International; merge <code>Date/Date1</code>, <code>Style/Style1</code>, <code>Size/Size1</code>.
              </li>
              <li>
                Pivot May-2022 wide → long: <code>Sales Channel</code>, <code>MRP Price</code>.
              </li>
            </ol>
            <div className="pt-6">
              <Placeholder label="Prep flow diagram" />
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "calcs",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Calculated Fields</h2>
            <Code>{`// Revenue, Orders, AOV
[Total Revenue] := SUM([GROSS AMT])
[Total Orders]  := COUNTD([Order ID])
[AOV]           := [Total Revenue] / [Total Orders]

// Gross Profit (variant A: TP1/TP2)
[Gross Profit]        := SUM([GROSS AMT]) - SUM([TP1]) - SUM([TP2])
[Gross Profit Margin] := [Gross Profit] / [Total Revenue]

// Gross Profit (variant B: per-unit TP)
[Gross Profit]        := SUM([GROSS AMT]) - SUM([TP] * [PCS])
[Gross Profit Margin] := [Gross Profit] / [Total Revenue]

// Cancellation Rate
[Cancellation Rate] := COUNTD(IF [Status] = "Cancelled" THEN [Order ID] END) / COUNTD([Order ID])

// Profit per Unit / Stock-to-Sales
[Profit per Unit] := [Gross Profit] / NULLIF(SUM([PCS]),0)
[Stock-to-Sales]  := SUM([Stock]) / NULLIF(SUM([PCS]),0)

// Price Tier
IF [Rate] < 500 THEN "Budget (<500)"
ELSEIF [Rate] < 1500 THEN "Mid-Range (500-1500)"
ELSE "Premium (>1500)" END`}</Code>
          </SlideFrame>
        ),
      },
      {
        key: "dash1",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Dashboard 1 — Executive Overview</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-800">
              <li>KPIs: Total Revenue, Gross Profit Margin, AOV, Cancellation Rate</li>
              <li>Trend: Monthly Revenue (Area) + Gross Profit (Line, Dual Axis)</li>
              <li>Bars: Revenue by Sales Channel (colored by Margin)</li>
              <li>Map: State size = Revenue, color = Margin</li>
            </ul>
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <Placeholder label="Dual-axis trend" />
              <Placeholder label="Channel bar chart" />
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "dash2",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Dashboard 2 — Product Deep Dive</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-800">
              <li>Scatter: Margin vs Volume (by Style)</li>
              <li>Treemap: Revenue by Category</li>
              <li>Top-N table: SKU/Style, Category, Qty, Revenue, Profit, Profit/Unit</li>
            </ul>
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <Placeholder label="Scatter plot" />
              <Placeholder label="Treemap" />
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "dash3",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Dashboard 3 — Operations & Fulfillment</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-800">
              <li>Funnel: Order Status distribution</li>
              <li>Side-by-side bars: Fulfilled-By vs AOV & Margin</li>
              <li>Donut: Ship-Service-Level split</li>
            </ul>
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <Placeholder label="Status funnel" />
              <Placeholder label="Fulfillment bars" />
              <Placeholder label="Service-level donut" />
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "insights",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Insights & Risks</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-800">
              <li>~70–75% revenue concentration in KURTA → demand shock risk.</li>
              <li>SET/TOP underperform relative to potential; cross-sell is limited.</li>
              <li>Seasonal peaks predictable — plan inventory, ads, cash flow.</li>
              <li>Fulfillment & corridor costs can erode margin; optimize mix.</li>
            </ul>
          </SlideFrame>
        ),
      },
      {
        key: "recs",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Recommendations</h2>
            <div className="grid md:grid-cols-3 gap-6 text-zinc-800">
              <div className="p-5 rounded-2xl bg-white/70 border border-emerald-200 shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">Diversify Portfolio</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Targeted campaigns for SET/TOP</li>
                  <li>Cross-sell bundles anchored on KURTA</li>
                  <li>Loyalty tiers for multi-category baskets</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-white/70 border border-indigo-200 shadow-sm">
                <h3 className="font-semibold mb-2 text-indigo-700">Seasonal Optimization</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Premium editions in peak months</li>
                  <li>Off-peak clearance + evergreen SKUs</li>
                  <li>ROAS tuning, inventory buffers</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-white/70 border border-amber-200 shadow-sm">
                <h3 className="font-semibold mb-2 text-amber-700">Market & Channel</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Expand to regions with low KURTA, latent demand</li>
                  <li>Strengthen e-comm; explore exports</li>
                  <li>Fulfillment guardrails to protect margin</li>
                </ul>
              </div>
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "impact",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Expected Impact</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-left text-sm rounded-2xl overflow-hidden">
                <thead className="bg-white/70 border-b">
                  <tr>
                    <th className="py-3 px-4">Strategy</th>
                    <th className="py-3 px-4">Short-Term</th>
                    <th className="py-3 px-4">Long-Term</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4">Diversification</td>
                    <td className="py-3 px-4">+15–20% in smaller categories</td>
                    <td className="py-3 px-4">Lower dependency risk</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Seasonal Optimization</td>
                    <td className="py-3 px-4">+10–15% profit in peaks</td>
                    <td className="py-3 px-4">Smoother cash flow</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Market Expansion</td>
                    <td className="py-3 px-4">+5–10% total sales</td>
                    <td className="py-3 px-4">Higher resilience</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Risk Mitigation</td>
                    <td className="py-3 px-4">Limited immediate gain</td>
                    <td className="py-3 px-4">Protection vs downturns</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SlideFrame>
        ),
      },
      {
        key: "conclusion",
        el: (
          <SlideFrame>
            <h2 className="text-3xl font-semibold">Conclusion</h2>
            <div className="grid md:grid-cols-2 gap-6 text-zinc-800">
              <ul className="list-disc pl-6 space-y-2">
                <li>Strong core business; high category concentration risk.</li>
                <li>Clear levers: diversify, optimize seasons, expand markets.</li>
                <li>Implement fulfillment guardrails to protect margin.</li>
              </ul>
              <div className="p-5 rounded-2xl bg-white/70 border">
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-5 h-5" /> Next Steps
                </div>
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                  <li>Publish dashboards; set monthly review.</li>
                  <li>Launch diversification pilots; track Top-N SKUs.</li>
                  <li>Adjust fulfillment mix by corridor margins.</li>
                </ol>
              </div>
            </div>
          </SlideFrame>
        ),
      },
    ],
    []
  );

export default function Presentation() {
  const slides = useSlides();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);

  const goto = (i: number) =>
    setIndex(Math.max(0, Math.min(slides.length - 1, i)));
  const next = () => goto(index + 1);
  const prev = () => goto(index - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") next();
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [auto, slides.length]);

  const progress = (index + 1) / slides.length;

  return (
    <div className="min-h-screen w-full text-zinc-900">
      <Bg />
      <header className="sticky top-0 z-10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Monitor className="w-5 h-5" />
            Sales Performance — Web Presentation
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="px-3 py-1.5 rounded-xl border border-zinc-300/70 bg-white/70 hover:bg-white shadow-sm flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />Prev
            </button>
            <button
              onClick={() => setAuto((a) => !a)}
              className="px-3 py-1.5 rounded-xl border border-zinc-300/70 bg-white/70 hover:bg-white shadow-sm flex items-center gap-1"
            >
              {auto ? (
                <>
                  <Pause className="w-4 h-4" />Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />Auto
                </>
              )}
            </button>
            <button
              onClick={next}
              className="px-3 py-1.5 rounded-xl border border-zinc-300/70 bg-white/70 hover:bg-white shadow-sm flex items-center gap-1"
            >
              Next<ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-3">
          <Progress value={progress} />
        </div>
      </header>

      <main className="py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].key}
            initial={{ opacity: 0, y: 18, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.995 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {slides[index].el}
          </motion.div>
        </AnimatePresence>

        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between py-6">
          <div className="text-sm text-zinc-600">
            Slide {index + 1} / {slides.length} — Use ← → keys
          </div>
          <Dots count={slides.length} index={index} goto={goto} />
        </div>
      </main>

      <footer className="border-t border-white/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-zinc-600">
          Replace placeholders with exported PNG/JPG from Tableau. © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
