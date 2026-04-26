import type { Metadata } from "next";
import Link from "next/link";

import { getProjectBySlug } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { OriginBlock } from "@/components/project/origin-block";
import { JsonLd } from "@/components/seo/json-ld";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("maglock")!;

export const metadata: Metadata = buildMetadata({
  title: "MagLock Protocol — Cyberpunk IoT smart lock",
  description:
    "MagLock Protocol is a dual-door smart lock with live ESP32-CAM video and an optional Hinglish voice assistant. Flutter app, two ESP32s, no cloud servers.",
  path: "/projects/maglock",
  ogImage: "/og/projects/maglock.png",
  ogImageAlt: "MagLock Protocol — neon dual-door smart lock UI",
  ogType: "article",
  publishedTime: `${project.year}-11-20T00:00:00.000Z`,
  keywords: ["MagLock", "ESP32", "IoT", "Smart lock", "Flutter", "Voice assistant"],
});

export default function MagLockPage() {
  return (
    <div
      data-maglock-scanline
      className="relative mx-auto w-full max-w-[1400px] overflow-hidden px-6 pt-16 pb-16 sm:pt-20"
    >
      <JsonLd data={projectJsonLd("maglock")} />
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Project
          </p>
          <p className="font-mono text-sm font-medium">03 / {project.name}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Status
          </p>
          <p
            data-maglock-state="connecting"
            className="font-mono text-sm font-medium text-[var(--color-primary)]"
          >
            <span
              data-maglock-pulse
              className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] align-middle"
            ></span>
            {project.statusLabel}
          </p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/projects" className="hover:text-[var(--color-primary)]">
              ← projects
            </Link>
          </p>
        </div>
      </header>

      {/* § 01 — HEADLINE + PITCH */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div data-maglock-section-label className="col-span-12 md:col-span-2">
          <span>§ 01</span>
          <span>Pitch</span>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div
            data-maglock-brackets
            data-maglock-neon-card
            className="flex flex-col gap-8 p-8 md:p-10"
          >
            <h1
              data-maglock-hud-heading
              className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.name}
            </h1>
            <p
              data-maglock-hud-heading
              className="max-w-3xl text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium text-[var(--color-fg)]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              {project.tagline}.
            </p>
            <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
              {project.description}
            </p>

            {/* Interactive Door Control Panel — hoisted above the fold so the
                first thing past the headline is something the visitor can
                actually click. State + countdown + activity log all run on
                the client; no network. */}
            <div className="mt-2">
              <MagLockControlPanel />
            </div>
          </div>
        </div>
      </section>

      <div data-maglock-double-rule className="mb-10"></div>

      {/* § 02 — ACCESS — dual-device HUD topology */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div data-maglock-section-label className="col-span-12 md:col-span-2">
          <span>§ 02</span>
          <span>Access</span>
        </div>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
          {/* Two HUD panels — lock controller + camera */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Card 1 — LOCK CONTROLLER */}
            <div
              data-maglock-brackets
              data-maglock-state="unlocked"
              className="flex flex-col gap-4 border-2 p-5"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 60%), var(--color-surface)",
                boxShadow:
                  "0 0 18px color-mix(in srgb, var(--color-primary) 18%, transparent), inset 0 0 32px color-mix(in srgb, var(--color-primary) 6%, transparent)",
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p
                  style={{
                    fontFamily: "var(--font-orbitron), var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--color-primary)",
                  }}
                >
                  ESP32 Lock Controller
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-vt323), var(--font-mono)",
                    fontSize: "13px",
                    color: "color-mix(in srgb, var(--color-primary) 70%, var(--color-muted))",
                    letterSpacing: "0.05em",
                  }}
                >
                  PORT 80
                </span>
              </div>
              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-orbitron), var(--font-display)",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                }}
              >
                <span
                  data-maglock-pulse
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: "var(--color-primary)",
                    boxShadow: "0 0 8px var(--color-primary)",
                  }}
                />
                ONLINE · 192.168.4.100
              </p>
              {/* Endpoint chips */}
              <ul className="flex flex-wrap gap-2">
                {(
                  [
                    ["GET", "/status"],
                    ["POST", "/lock"],
                    ["POST", "/unlock"],
                    ["POST", "/timer"],
                  ] as const
                ).map(([verb, path]) => (
                  <li
                    key={verb + path}
                    data-maglock-brackets
                    className="flex items-baseline gap-1.5 px-2.5 py-1"
                    style={{
                      border:
                        "1px solid color-mix(in srgb, var(--color-primary) 35%, var(--color-border))",
                      background:
                        "color-mix(in srgb, var(--color-primary) 4%, var(--color-surface-2))",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-orbitron), var(--font-display)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-secondary)",
                      }}
                    >
                      {verb}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-vt323), var(--font-mono)",
                        fontSize: "13px",
                        color: "var(--color-primary)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {path}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 — CAMERA */}
            <div
              data-maglock-brackets
              data-maglock-state="unlocked"
              className="flex flex-col gap-4 border-2 p-5"
              style={{
                background:
                  "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--color-secondary) 8%, transparent), transparent 60%), var(--color-surface)",
                borderColor: "color-mix(in srgb, var(--color-secondary) 60%, var(--color-primary))",
                boxShadow:
                  "0 0 18px color-mix(in srgb, var(--color-secondary) 18%, transparent), inset 0 0 32px color-mix(in srgb, var(--color-secondary) 6%, transparent)",
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p
                  style={{
                    fontFamily: "var(--font-orbitron), var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--color-secondary)",
                  }}
                >
                  ESP32-CAM AI-Thinker
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-vt323), var(--font-mono)",
                    fontSize: "13px",
                    color: "color-mix(in srgb, var(--color-secondary) 70%, var(--color-muted))",
                    letterSpacing: "0.05em",
                  }}
                >
                  PORT 80
                </span>
              </div>
              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-orbitron), var(--font-display)",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-secondary)",
                }}
              >
                <span
                  data-maglock-pulse
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: "var(--color-secondary)",
                    boxShadow: "0 0 8px var(--color-secondary)",
                  }}
                />
                ONLINE · 192.168.4.101
              </p>
              {/* Endpoint chips */}
              <ul className="flex flex-wrap gap-2">
                {(
                  [
                    ["GET", "/stream"],
                    ["GET", "/capture"],
                    ["GET", "/led"],
                  ] as const
                ).map(([verb, path]) => (
                  <li
                    key={verb + path}
                    data-maglock-brackets
                    className="flex items-baseline gap-1.5 px-2.5 py-1"
                    style={{
                      border:
                        "1px solid color-mix(in srgb, var(--color-secondary) 35%, var(--color-border))",
                      background:
                        "color-mix(in srgb, var(--color-secondary) 4%, var(--color-surface-2))",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-orbitron), var(--font-display)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-primary)",
                      }}
                    >
                      {verb}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-vt323), var(--font-mono)",
                        fontSize: "13px",
                        color: "var(--color-secondary)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {path}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Source link — kept as a smaller third panel */}
          <div
            data-maglock-brackets
            className="flex flex-wrap items-center justify-between gap-3 border-2 p-4"
            style={{
              borderColor: "color-mix(in srgb, var(--color-primary) 30%, var(--color-border))",
              background: "var(--color-surface-2)",
            }}
          >
            <p data-maglock-uppercase-label data-size="sm">
              Source · Flutter · Dart · ESP32 · Arduino C++
            </p>
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-baseline gap-2 font-medium text-[var(--color-primary)] hover:opacity-80"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              github.com/aliarbab2009/MagLock-Protocol <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <div data-maglock-double-rule className="mb-10"></div>

      {/* § 03 — STACK */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div data-maglock-section-label className="col-span-12 md:col-span-2">
          <span>§ 03</span>
          <span>Stack</span>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div
            data-maglock-brackets
            className="border-2 border-[color-mix(in_srgb,var(--color-primary)_30%,var(--color-border))] p-6"
          >
            <ul className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <li key={tech} data-maglock-stack-pill>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div data-maglock-double-rule className="mb-10"></div>

      {/* § 04 — ORIGIN (problem · why me · learned + pull-quote) */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div data-maglock-section-label className="col-span-12 md:col-span-2">
          <span>§ 04</span>
          <span>Origin</span>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div
            data-maglock-brackets
            className="border-2 border-[color-mix(in_srgb,var(--color-primary)_30%,var(--color-border))] p-8"
          >
            <OriginBlock slug="maglock" />
          </div>
        </div>
      </section>

      <div data-maglock-double-rule className="mb-10"></div>

      {/* § 05 — ARCHITECTURE */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div data-maglock-section-label className="col-span-12 md:col-span-2">
          <span>§ 05</span>
          <span>Architecture</span>
        </div>
        <div
          data-maglock-brackets
          className="col-span-12 flex flex-col gap-6 border-2 border-[color-mix(in_srgb,var(--color-primary)_30%,var(--color-border))] p-8 md:col-span-10"
        >
          <h2
            data-maglock-hud-heading
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three independent components on one closed network.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">ESP32 lock controller</strong> — station-mode WiFi with
            a fixed IP (<code className="font-mono text-sm">192.168.4.100</code>), holding two
            relays and serving a tiny synchronous HTTP API on port 80. Routes:{" "}
            <code className="font-mono text-sm">GET /status</code>,{" "}
            <code className="font-mono text-sm">{`POST /lock?relay={1|2|all}`}</code>,{" "}
            <code className="font-mono text-sm">{`POST /unlock?relay={1|2|all}`}</code>,{" "}
            <code className="font-mono text-sm">POST /timer</code> (JSON body{" "}
            <code className="font-mono text-sm">{`{"seconds":N}`}</code>). Auto-lock duration
            persists in NVS under the namespace{" "}
            <code className="font-mono text-sm">&quot;nexus&quot;</code>. Door state is
            intentionally NOT persisted — a brown-out reboot mid-unlock comes back with both relays
            driven LOW (locked) before the radio is even started.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">ESP32-CAM (AI-Thinker)</strong> — a separate fixed-IP
            device (<code className="font-mono text-sm">192.168.4.101</code>) running its own HTTP
            server. <code className="font-mono text-sm">GET /stream</code> returns a{" "}
            <code className="font-mono text-sm">multipart/x-mixed-replace; boundary=frame</code>{" "}
            MJPEG at SVGA 800×600 ~25fps; <code className="font-mono text-sm">GET /capture</code>{" "}
            returns a single QXGA 2048×1536 JPEG at quality 1. Streaming runs in a FreeRTOS task
            pinned to core 1 (8KB stack), leaving core 0 free for the WebServer + WiFi stack.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Flutter app</strong> — a single{" "}
            <code className="font-mono text-sm">LockProvider</code> (ChangeNotifier, ~280 lines) is
            the only orchestrator. Two services hang off it:{" "}
            <code className="font-mono text-sm">Esp32Service</code> (HTTP control plane, returns{" "}
            <code className="font-mono text-sm">{`ServiceResult<T>`}</code> instead of throwing) and{" "}
            <code className="font-mono text-sm">StorageService</code> (a thin{" "}
            <code className="font-mono text-sm">shared_preferences</code> wrapper). The MJPEG
            consumer lives directly in <code className="font-mono text-sm">CameraFeedWidget</code>,
            parsing JPEG SOI/EOI markers out of the raw byte stream.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Transport.</strong> Plain HTTP. No TLS. No WebSocket. No
            MQTT. No bearer token, HMAC, or pre-shared key. CORS is permissive (
            <code className="font-mono text-sm">*</code>). This is a deliberate scope choice: the
            trust boundary is the AP itself — the device pair lives on a SoftAP-style subnet
            that&apos;s not bridged to the home WiFi or the internet, and the only client expected
            to talk to it is a phone the owner has paired by typing the IP into a settings screen.
            Adding HMAC-signed POSTs with a shared secret in NVS is the natural v2 step.
          </p>
        </div>
      </section>

      <div data-maglock-double-rule className="mb-10"></div>

      {/* § 06 — LOCK FIRMWARE */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div data-maglock-section-header className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 06
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Lock fw
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            246 lines. One sketch. Locks before WiFi.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            A single Arduino sketch — no PlatformIO, no separate translation units. Pin defines,
            route handlers, state machine, <code className="font-mono text-sm">setup()</code>,{" "}
            <code className="font-mono text-sm">loop()</code> all in one file. Anyone with the
            Arduino IDE and the ESP32 board package can flash it.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Polarity-agnostic relay control.</strong> A single{" "}
            <code className="font-mono text-sm">#define</code> retargets the firmware between
            active-low opto-isolated relay boards (the typical case) and active-high MOSFET drivers,
            without touching call sites:
          </p>
          <pre
            data-maglock-code-block
            className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed"
          >
            {`#define RELAY1_PIN       26     // Door 1 magnetic lock
#define RELAY2_PIN       27     // Door 2 magnetic lock
#define STATUS_LED_PIN    2     // Onboard blue LED
#define RELAY_ACTIVE_HIGH false // Active-LOW relay modules

#define RELAY_ON  (RELAY_ACTIVE_HIGH ? HIGH : LOW)
#define RELAY_OFF (RELAY_ACTIVE_HIGH ? LOW  : HIGH)`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Boot ordering — fail-secure by construction.</strong>{" "}
            The most important detail in the firmware: both relays are commanded LOCK before the
            radio is started. A brown-out reboot mid-unlock can never come back with a door open.
            Door state is deliberately NOT persisted to NVS — the device always boots with both
            doors locked.
          </p>
          <pre
            data-maglock-brackets
            data-maglock-code-block
            className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed"
          >
            {`void setup() {
  Serial.begin(115200);
  pinMode(RELAY1_PIN, OUTPUT);
  pinMode(RELAY2_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);
  relayLock(RELAY1_PIN);   // <-- doors locked before WiFi exists
  relayLock(RELAY2_PIN);

  prefs.begin("nexus", true);
  autoLockSeconds = prefs.getInt("timer", 10);
  prefs.end();
  // ...WiFi.begin() comes only after this...
}`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Cooperative loop.</strong> No{" "}
            <code className="font-mono text-sm">xTaskCreate</code>, no semaphores, no FreeRTOS
            tasks. Three concurrent jobs share <code className="font-mono text-sm">loop()</code> via
            the <code className="font-mono text-sm">millis() - last &gt;= interval</code> idiom:
            HTTP request handling, auto-lock countdown, and a 15-second WiFi watchdog. The only{" "}
            <code className="font-mono text-sm">delay()</code> in steady state is a 500ms gap
            between staggered dual-relay unlock pulses (intentional inrush mitigation).
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            All timing uses unsigned-arithmetic-wraparound-safe comparisons, so the ~49.7-day{" "}
            <code className="font-mono text-sm">millis()</code> rollover is handled correctly. There
            is no reed switch, no door-position sensor, no buzzer, no keypad, no RFID — the
            firmware&apos;s notion of &ldquo;locked&rdquo; is purely the commanded relay state.
            Closed-loop verification is a v2 hook.
          </p>
        </div>
      </section>

      <div data-maglock-double-rule className="my-6"></div>

      {/* § 07 — CAMERA FIRMWARE */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div data-maglock-section-header className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 07
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Cam fw
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Init large, drop small. Three flags coordinate stream + snapshot.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">The init-large-then-shrink trick.</strong> The camera
            driver allocates PSRAM buffers based on the framesize at{" "}
            <code className="font-mono text-sm">esp_camera_init</code>. Initialising at the largest
            mode the firmware will ever use — QXGA 2048×1536 at JPEG quality 1 — guarantees the
            buffers fit any subsequent mode change. The firmware then immediately drops the sensor
            to streaming mode (SVGA 800×600 at quality 12). Switching to QXGA on{" "}
            <code className="font-mono text-sm">/capture</code> later doesn&apos;t have to
            reallocate. No fragmentation, no contiguous-PSRAM gambling.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Streaming protocol.</strong> Plain{" "}
            <code className="font-mono text-sm">multipart/x-mixed-replace; boundary=frame</code>{" "}
            MJPEG over HTTP/1.1. The OV2640 hardware-encodes JPEG itself — the ESP32 just shovels
            bytes from PSRAM to the network, which is why a $7 camera module can stream at 25fps
            from a 240MHz chip. The streaming task is pinned to core 1 with an 8KB stack, leaving
            core 0 free for the WebServer:
          </p>
          <pre
            data-maglock-brackets
            data-maglock-code-block
            className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed"
          >
            {`void streamTask(void* arg) {
  WiFiClient* client = (WiFiClient*)arg;
  client->print("HTTP/1.1 200 OK\\r\\nContent-Type: "
                "multipart/x-mixed-replace; boundary=frame\\r\\n\\r\\n");
  _streaming = true;

  while (client->connected() && !_stopStream) {
    if (_snapPending) { vTaskDelay(10 / portTICK_PERIOD_MS); continue; }
    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) break;
    // write boundary + headers + frame bytes...
    esp_camera_fb_return(fb);
    vTaskDelay(STREAM_DELAY / portTICK_PERIOD_MS);
    esp_task_wdt_reset();    // feed the watchdog every frame
  }
  // cleanup, vTaskDelete(NULL)...
}`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <code className="font-mono text-sm">esp_task_wdt_reset()</code> per frame prevents a
            slow client (a dropped TCP connection that hasn&apos;t FIN&apos;d yet) from blocking{" "}
            <code className="font-mono text-sm">client-&gt;write</code> long enough to trip the
            watchdog and reboot the chip.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Stream/snap coordination.</strong> Three volatile flags
            and a 2-second timeout, no mutexes:{" "}
            <code className="font-mono text-sm">_streaming</code> (set by the streaming task while
            alive), <code className="font-mono text-sm">_stopStream</code> (set by{" "}
            <code className="font-mono text-sm">/capture</code> to ask the loop to exit),{" "}
            <code className="font-mono text-sm">_snapPending</code> (causes the loop to spin instead
            of grab while a snapshot is in flight, so the stream resumes immediately afterward
            without re-spawning the task). The capture handler waits up to 2 seconds for the
            streaming loop to acknowledge, switches the sensor to QXGA + q=1, settles 300ms, flushes
            3 stale frames, grabs one fresh frame, returns it as{" "}
            <code className="font-mono text-sm">image/jpeg</code>, then drops the sensor back to
            SVGA. <code className="font-mono text-sm">fb_count = 2</code> paired with{" "}
            <code className="font-mono text-sm">CAMERA_GRAB_LATEST</code> means frames are dropped,
            never queued — no accumulated latency.
          </p>
        </div>
      </section>

      <div data-maglock-double-rule className="my-6"></div>

      {/* § 08 — FLUTTER APP */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div data-maglock-section-header className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 08
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Flutter
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MJPEG decoder, by hand. Optimistic UI. 800ms cooldown.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">MJPEG decoder, by hand.</strong>{" "}
            <code className="font-mono text-sm">CameraFeedWidget</code> opens the stream as{" "}
            <code className="font-mono text-sm">{`http.Request('GET').send()`}</code> and parses raw
            JPEG markers out of the byte chunks — it deliberately ignores the{" "}
            <code className="font-mono text-sm">multipart/x-mixed-replace</code> boundary headers
            entirely. A 500KB runaway-buffer guard trims to the last 200KB if no frame is found, so
            a corrupt stream can&apos;t OOM the app. A 66ms{" "}
            <code className="font-mono text-sm">_frameInterval</code> throttles display to ~15fps
            regardless of incoming rate, keeping <code className="font-mono text-sm">setState</code>{" "}
            calls cheap.{" "}
            <code className="font-mono text-sm">
              Image.memory(_currentFrame!, gaplessPlayback: true)
            </code>{" "}
            is the critical render call — without{" "}
            <code className="font-mono text-sm">gaplessPlayback: true</code>, Flutter would flash a
            blank frame between bytes.
          </p>
          <pre
            data-maglock-brackets
            data-maglock-code-block
            className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed"
          >
            {`List<int> buf = [];
_streamSub = res.stream.listen((chunk) {
  buf.addAll(chunk);
  int start = -1;
  for (int i = 0; i < buf.length - 1; i++) {
    if (buf[i] == 0xFF && buf[i+1] == 0xD8) start = i;            // JPEG SOI
    if (start != -1 && buf[i] == 0xFF && buf[i+1] == 0xD9) {     // JPEG EOI
      final frame = Uint8List.fromList(buf.sublist(start, i + 2));
      buf = buf.sublist(i + 2);
      // throttle to ~15 fps + setState if mounted
      break;
    }
  }
  if (buf.length > 500000) buf = buf.sublist(buf.length - 200000); // OOM guard
});`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">The snapshot dance.</strong> The ESP32-CAM cannot stream
            and capture high-res simultaneously (shared DMA buffer), so a snapshot is six steps with
            empirically-tuned delays: disconnect the MJPEG stream, wait 300ms; turn the LED flash
            on, wait 200ms; <code className="font-mono text-sm">GET /capture</code> with a 20-second
            timeout — firmware switches to QXGA internally; turn the flash off; write the bytes to
            disk in the snapshots folder with a millisecond-stamped filename; wait 500ms, then
            re-open the stream. The 300/200/500ms delays are empirical — the kind of timings you
            only land on after a few rounds of &ldquo;why is my snapshot half green and half
            correct.&rdquo;
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Optimistic UI corrected by polling.</strong> On a
            successful HTTP response, the provider sets{" "}
            <code className="font-mono text-sm">door.state = DoorState.locked</code> immediately
            rather than waiting for the next 2-second poll. The poll is the eventual reconciler — if
            the relay didn&apos;t actually click, the next poll corrects the UI visibly. This is
            what makes the controls feel snappy on a 2-second polling cadence without ever lying
            about hardware state. Every action is gated by an{" "}
            <strong className="font-medium">800ms refractory period</strong> — hardware relay
            debounce expressed at the application layer, protecting against double-tap from the user
            AND from the voice assistant firing two actions in quick succession.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Auto-lock as a visible 1-second-tick countdown.</strong>{" "}
            Rather than{" "}
            <code className="font-mono text-sm">{`Timer(Duration(seconds: N), …)`}</code>, the
            provider uses{" "}
            <code className="font-mono text-sm">{`Timer.periodic(Duration(seconds: 1))`}</code> and
            decrements <code className="font-mono text-sm">_autoLockCountdown</code> on every tick,
            calling <code className="font-mono text-sm">notifyListeners()</code> so the status
            banner renders <code className="font-mono text-sm">⏱ 7s … 6s … 5s …</code>. Sacrifices
            the cleaner fire-once timer for tighter UX feedback.
          </p>
        </div>
      </section>

      <div data-maglock-double-rule className="my-6"></div>

      {/* § 09 — MAGGY VOICE ASSISTANT */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div data-maglock-section-header className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 09
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Maggy
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <div data-maglock-double-rule className="my-6"></div>
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The lock is the system. The AI is icing.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Status: staged, mid-integration.</strong> Maggy lives in
            a sibling <code className="font-mono text-sm">maggy raw/</code> folder, not yet
            relocated into <code className="font-mono text-sm">lib/services/</code>. A real
            state-of-the-repo finding worth disclosing rather than papering over.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Speech I/O is OS-native, not on-device ML. STT is{" "}
            <code className="font-mono text-sm">package:speech_to_text</code> — a thin wrapper over
            Android <code className="font-mono text-sm">SpeechRecognizer</code> / iOS{" "}
            <code className="font-mono text-sm">SFSpeechRecognizer</code>. TTS is{" "}
            <code className="font-mono text-sm">package:flutter_tts</code>. No Whisper, no Vosk, no
            tflite. Reasoning happens in the cloud via Grok-3 (
            <code className="font-mono text-sm">https://api.x.ai/v1/chat/completions</code>), with{" "}
            <code className="font-mono text-sm">temperature: 0.85</code>,{" "}
            <code className="font-mono text-sm">max_tokens: 1024</code>, 15-second timeout. Hinglish
            is handled at the prompt layer, not the speech layer.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">
              Offline keyword fallback — the resilience layer.
            </strong>{" "}
            When Grok is unreachable, a regex/keyword detector still understands the lock vocabulary
            and dispatches the right relay:
          </p>
          <pre
            data-maglock-code-block
            className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed"
          >
            {`String _detectOfflineLockIntent(String lower) {
  if (lower.contains('open') || lower.contains('khol') || lower.contains('unlock')) {
    if (lower.contains('top') || lower.contains('1') || lower.contains('ek')) return 'unlock_door1';
    if (lower.contains('bottom') || lower.contains('2') || lower.contains('do')) return 'unlock_door2';
    return 'unlock_all';
  }
  // ... mirror for lock/close/band ...
}`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The principle: the lock is the system, the AI is icing — never let the icing break the
            cake.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Five-layer persistent memory engine.</strong> All on{" "}
            <code className="font-mono text-sm">shared_preferences</code>. No vector DB, no
            embeddings, no LangChain. Eight keys:{" "}
            <code className="font-mono text-sm">today_log</code>,{" "}
            <code className="font-mono text-sm">today_date</code>,{" "}
            <code className="font-mono text-sm">episodes</code>,{" "}
            <code className="font-mono text-sm">notes</code>,{" "}
            <code className="font-mono text-sm">profile</code>,{" "}
            <code className="font-mono text-sm">recent_history</code>,{" "}
            <code className="font-mono text-sm">activity_log</code>,{" "}
            <code className="font-mono text-sm">stats</code>. When{" "}
            <code className="font-mono text-sm">today_log</code> exceeds 50 message exchanges, the
            oldest 50 are folded into a new Episode with auto-extracted keywords + quotes flagged
            &ldquo;notable.&rdquo; Time-proximity scoring weights episodes within ±2 days of a
            target +3, within ±7 days +1. ~40 lines of regex + scoring instead of a vector DB. Works
            because the dataset is one conversation.
          </p>
        </div>
      </section>

      {/* § 10 — LIMITATIONS */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div data-maglock-section-header className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 10
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Honest limits
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-3 md:col-span-10">
          <ul className="ml-6 max-w-prose list-disc space-y-3 text-base leading-relaxed text-[var(--color-fg)]">
            <li>
              <strong className="font-medium">Brand mid-rename.</strong>{" "}
              <code className="font-mono text-sm">pubspec.yaml</code> says{" "}
              <code className="font-mono text-sm">MagLock_Protocol</code>; the Android manifest
              launcher label says <code className="font-mono text-sm">NEXUS LOCK</code>; the README
              still uses the old <code className="font-mono text-sm">nexus_lock/</code> folder
              structure. The repo shows the seams of an in-progress rename.
            </li>
            <li>
              <strong className="font-medium">Hardcoded WiFi credentials in firmware.</strong> Both{" "}
              <code className="font-mono text-sm">lock_controller.ino</code> and{" "}
              <code className="font-mono text-sm">cam_firmware.ino</code> carry literals; they must
              be redacted in any quoted snippet. The v2 path is provisioning via NVS or a one-time
              SoftAP captive portal.
            </li>
            <li>
              <strong className="font-medium">No TLS, no auth on the lock REST endpoints.</strong>{" "}
              Anyone reachable on the closed subnet can{" "}
              <code className="font-mono text-sm">curl -X POST .../unlock?relay=all</code>.
              Deliberate — the trust boundary is the AP. The natural v2 step is HMAC-signed requests
              with a shared secret in NVS.
            </li>
            <li>
              <strong className="font-medium">Default app passcode 1234.</strong>{" "}
              Settings-configurable, but it ships as a placeholder and gates only the UI, not the
              network protocol.
            </li>
            <li>
              <strong className="font-medium">Only Android is realistically tested.</strong> iOS /
              macOS / Windows / Linux / Web platform builds are stock{" "}
              <code className="font-mono text-sm">flutter create</code> scaffolds. No Podfile for
              iOS, no <code className="font-mono text-sm">NSMicrophoneUsageDescription</code>, no
              ATS exception for HTTP-to-LAN-IP.
            </li>
            <li>
              <strong className="font-medium">Web is architecturally non-viable.</strong> A
              LAN-control app cannot run in a browser: the ESP32 doesn&apos;t send CORS headers; an
              HTTPS-hosted build hits mixed-content blocking on HTTP-to-LAN-IP requests. The case
              study&apos;s &ldquo;I learned the browser&apos;s security model says no&rdquo; beat.
            </li>
            <li>
              <strong className="font-medium">Tests are zero-meaningful.</strong>{" "}
              <code className="font-mono text-sm">test/widget_test.dart</code> is the unmodified{" "}
              <code className="font-mono text-sm">flutter create</code> counter smoke test. The case
              study should not claim test coverage.
            </li>
          </ul>
        </div>
      </section>

      {/* § 11 — NUMBERS */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div data-maglock-section-header className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 11
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Numbers
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div data-maglock-double-rule className="my-6"></div>
          <ul
            data-maglock-brackets
            className="grid grid-cols-2 gap-0 border-2 border-[var(--color-border)] md:grid-cols-4"
          >
            {(
              [
                ["800ms", "relay-fire cooldown", "green"],
                ["~15fps", "MJPEG display throttle", "cyan"],
                ["500/200KB", "buffer guard / trim", "cyan"],
                ["2000ms", "status poll interval", "green"],
                ["3000ms", "stream reconnect backoff", "green"],
                ["20s", "GET /capture timeout", "green"],
                ["2048×1536", "QXGA snapshot @ q=1", "cyan"],
                ["800×600", "SVGA stream @ ~25fps", "cyan"],
                ["8KB", "FreeRTOS streaming stack", "cyan"],
                ["246 / 297", "lines (lock fw / cam fw)", "purple"],
                ["~280", "lines in LockProvider", "purple"],
                ["49.7 days", "millis() rollover safe", "purple"],
              ] as const
            ).map(([num, label, glow], i) => (
              <li
                key={label}
                {...{ "data-maglock-glow": glow }}
                className={
                  "border-[var(--color-border)] p-5 " +
                  (i % 2 === 0 ? "border-r-2" : "") +
                  (i < 10 ? "border-b-2" : "") +
                  "md:border-r-2" +
                  (i < 8 ? "md:border-b-2" : "")
                }
              >
                <p className="font-mono text-2xl font-medium text-[var(--color-primary)] tabular-nums">
                  {num}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
