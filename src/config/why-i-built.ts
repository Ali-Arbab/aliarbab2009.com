/**
 * Why-I-built — surfaced in /about § 06 as three first-person essays
 * explaining motivation behind each of the three projects.
 *
 * Structure per entry: problem (what's wrong with the status quo),
 * why-me (how Ali specifically came to it), learned (what shipping
 * actually taught him). Each block runs ~150-200 words. The
 * pull-quote is the line worth a reader pausing on.
 *
 * Privacy hard-rule: no city, no school, no peer/teacher names. Talk
 * about audiences (Indian teenagers, Hindi-first shopkeepers, the
 * household network) — those are product facts. Don't talk about
 * institutions Ali specifically attended.
 *
 * Linked to PROJECTS by slug. If a project gets added/removed, this
 * file silently follows; missing entries just don't render.
 */

export type WhyIBuiltEntry = {
  /** Matches Project.slug. */
  slug: string;
  /** ~60-80 words. What's wrong with the status quo. */
  problem: string;
  /** ~60-80 words. Why Ali specifically. */
  why: string;
  /** ~60-80 words. What shipping actually taught him. */
  learned: string;
  /** Optional one-line resonant quote. Pulled out in editorial type. */
  pullQuote?: string;
};

export const WHY_I_BUILT: readonly WhyIBuiltEntry[] = [
  {
    slug: "stocksaathi",
    problem:
      "Indian high-school curricula teach the mechanics of money — compound interest, GST, simple budgeting — and skip behavioral finance entirely. Teenagers leave school with formulas but no instinct for how their own brain will sabotage them once real rupees are involved. The market education materials that exist are written for adults, in English, by full-time investors. They read like job training, not learning.",
    why: "I'm 17. I've watched the kids around me get their first taste of investing through whatever influencer's reel showed up that morning. The advice ranges from technically wrong to actively harmful. I'm one peer group away from the audience that needs this — not a finance professional translating down, but someone who started where they're starting now.",
    learned:
      "Coaches that give buy/sell advice teach dependence; coaches that ask 'what's your thesis on this?' teach reasoning. I rewrote the system prompt seven times before the AI stopped trying to be a tip service. The hardest part of an AI investing tool turned out to be writing down everything the AI is NOT allowed to say.",
    pullQuote:
      "The hardest part of an AI investing tool turned out to be writing down everything the AI is NOT allowed to say.",
  },
  {
    slug: "bolhisaab",
    problem:
      "The shopkeeper at the corner store knows their books down to the rupee, in their head. To get that knowledge into accounting software they have to translate it twice — into English, then into the app's mental model of what counts as a credit vs a debit. The translation tax means most don't bother; the books stay in a paper notebook that doesn't survive a flood.",
    why: "I grew up listening to shopkeepers settle accounts in Hindi mixed with two or three other languages, naming customers and amounts in a flow no software product manager has ever sat down and observed for an afternoon. The voice path felt obvious once I noticed nobody had built it.",
    learned:
      "STT accuracy and intent parsing are different problems with different solutions. Whisper v3-turbo at 95%+ word-accuracy on Hindi is the easy win; the hard win is getting Llama to extract 'Ram took 500 on credit yesterday' from 'Ram ne kal panch sau udhaar liya' without inventing a 'yesterday' timestamp that's actually today. Few-shot prompting beat fine-tuning every single time at this scale.",
    pullQuote: "Few-shot prompting beat fine-tuning every single time at this scale.",
  },
  {
    slug: "maglock",
    problem:
      "Every consumer smart lock I looked at routed door-state data through a server in some other country, behind a vendor account that could be canceled, throttled, or monetized at will. A locked door is the most basic privacy primitive a home has. It shouldn't be conditional on a third party's business model.",
    why: "I had two ESP32 boards left over from another project, a recurring household problem where someone always forgot to lock up, and a stubborn objection to any 'smart home' architecture that reaches outside the local network to do its job. The hardware was lying around. The principle wasn't.",
    learned:
      "Two ESP32s talking REST over a household WiFi network is harder than two ESP32s talking REST in a controlled testbed. Power-cycle resilience, cooldown debouncing, and 'what happens when the WiFi router reboots at 3am' turned out to be 70% of the firmware. Also: hardcoded credentials are the easiest mistake to make and the hardest to walk back from in public — that became its own post-mortem.",
    pullQuote:
      "A locked door is the most basic privacy primitive a home has — it shouldn't be conditional on a third party's business model.",
  },
];
