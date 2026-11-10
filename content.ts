// ============================================================
//  EDIT THIS FILE — every word, number and link comes from here.
//
//  Known about you from your old site's metadata: name (M Umar), role
//  (Web Developer & UI/UX Designer), React/frontend focus.
//  Everything marked TODO is a placeholder to replace with your real info.
//
//  Images (all in /public/images):
//    portrait.png  -> your hero photo (rendered as a dithered portrait;
//                     works best: dark background, face lit from one side)
//    speaking.png  -> wide photo for the "speaking" section
//  Projects can take  image: "/images/your-shot.png"  (otherwise a
//  generated wireframe is shown).
// ============================================================

export const site = {
  name: "M Umar",
  first: "M",
  last: "Umar",
  title: "M Umar | Web Developer & UI/UX Designer",
  description:
    "Professional portfolio of M Umar, a web developer and UI/UX designer building responsive, user-friendly websites.",
  url: "https://itsumar.is-a.dev", // TODO
  email: "you@example.com", // TODO
  themeColor: "#030303",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Content", href: "#content" },
  { label: "Speaking", href: "#speaking" },
];

export const hero = {
  badge: "Developer. Designer. Builder.",
  location: "Based in — Thinking beyond", // TODO: your location
  rail: { label: "01 / Presence", items: ["Development", "Design", "Collaboration"] },
  kicker: "A human perspective on the web",
  sub: ["I build websites people enjoy using,", "design interfaces that feel effortless, and ship ideas fast."],
  portrait: "/images/portrait.png",
  primary: { label: "Explore my work", href: "#work" },
  secondary: { label: "Start a conversation", href: "#contact" },
  bar: { left: "Scroll to discover", center: "Building for the web since 2021", right: "An ongoing exploration" }, // TODO year
};

// TODO: replace with your real numbers
export const stats = [
  { value: "20", suffix: "+", label: "projects designed & shipped" },
  { value: "3", suffix: "+", label: "years building for the web" },
  { value: "10", suffix: "+", label: "happy clients served" },
];
export const statsCta = { lines: ["The work.", "The real-world impact."], href: "#impact" };

export const about = {
  num: "01",
  label: "The person behind the work",
  aside: "A connected perspective",
  intro: "Three disciplines. One perspective.",
  heading: ["Design is how it looks.", "Craft is how it works."],
  lead: "I connect design, engineering and people.",
  body: [
    "Since 2021, I've been designing and building for the web — working across ",
    "the interface, the code, and the experience behind it.",
  ],
  link: { label: "Read my story", href: "#journey" },
  note: "Engineering mind · Designer's eye · Builder's pace",
  tabs: [
    { name: "Build", mode: "structure", caption: "Structure", title: "Give an idea structure.", text: "Responsive websites and interfaces that turn real needs into working software.", link: "Explore the products", href: "#work" },
    { name: "Design", mode: "ripples", caption: "Ripples", title: "Make it clear first.", text: "UI/UX that removes friction: clear flows, calm layouts, details that feel right.", link: "See the design work", href: "#work" },
    { name: "Connect", mode: "connect", caption: "Network", title: "Build with people who care.", text: "Collaboration that keeps goals shared, feedback fast and shipping steady.", link: "Start a conversation", href: "#contact" },
  ],
};

export const work = {
  num: "02",
  label: "Selected work",
  aside: "Built. Designed. Put into the world.",
  heading: ["Ideas are cheap.", "Shipping is the work."],
  blurb: ["From a first sketch to a live product.", "A few things I've helped bring to life."],
  // TODO: replace with your real projects. `image` is optional.
  featured: [
    { n: "01", cat: "E-commerce · Technology", title: "Tech Store", text: "An online technology storefront that brings electronics and accessories into a clean, easy-to-explore shopping experience.", link: "View live project", href: "https://tech-store-zeta-ten.vercel.app/", url: "tech-store-zeta-ten.vercel.app", caption: "Technology storefront", hue: 195, image: "/images/tech-store.avif" },
    { n: "02", cat: "E-commerce · Beauty", title: "Resore Beauty", text: "A beauty storefront with a polished product presentation and a simple, approachable browsing experience.", link: "View live project", href: "https://resore-beauty.vercel.app/", url: "resore-beauty.vercel.app", caption: "Beauty storefront", hue: 330, image: "/images/resore-beauty.avif" },
  ],
  pair: [
    { n: "03", cat: "Automotive · Web experience", title: "Car Alpha", text: "An automotive showcase that puts vehicle imagery and key details at the center of a straightforward browsing experience.", link: "View live project", href: "https://car-alpha-mauve.vercel.app/", url: "car-alpha-mauve.vercel.app", caption: "Automotive showcase", hue: 25, image: "/images/car-alpha-mauve.vercel.app-2026-11-10-0110.avif" },
    { n: "04", cat: "Frontend · Web experience", title: "Offkit", text: "Explore the Offkit web experience on its live deployment.", link: "View live project", href: "https://offkit.vercel.app/", url: "offkit.vercel.app", caption: "Offkit web experience", hue: 265 },
  ],
  moreLabel: "More ways I build",
  more: [
    { n: "05", cat: "Engineering exploration", title: "Side Project A", badge: "MVP", note: "Inside the project", detail: "A few sentences about this side project: what you built, what you learned.", href: "#" },
    { n: "06", cat: "Application development", title: "Side Project B", badge: "", note: "Inside the project", detail: "A few sentences about this side project: what you built, what you learned.", href: "#" },
  ],
  all: { label: "Explore all work", href: "#" },
  links: [
    { label: "All work", href: "#" },
    { label: "Design & UI/UX", href: "#" },
    { label: "Content & conversations", href: "#content" },
    { label: "Speaking profile", href: "#speaking" },
  ],
};

export const process = {
  num: "03",
  label: "How I think & work",
  aside: "Open every perspective",
  heading: ["How I work.", "From sketch to shipped."],
  intro: "Choose a discipline. Follow the thinking.",
  items: [
    {
      n: "01", cat: "Product & engineering", title: "Build with perspective.",
      text: "I connect what users need with what the technology can do — from the first requirement to the interface people use.",
      tags: ["JavaScript", "React", "Frontend architecture", "Responsive websites", "UI/UX"],
      link: { label: "Background & full capabilities", href: "#" },
      steps: ["Understand the need", "Shape the experience", "Build the product"],
      stepLink: { label: "Explore the engineering", href: "#work" },
    },
    {
      n: "02", cat: "Design & communication", title: "Make complexity click.",
      text: "Good design makes hard things feel obvious. I turn messy requirements into clear flows and calm, usable screens.",
      tags: ["UI design", "UX research", "Prototyping", "Design systems"],
      link: { label: "See the design work", href: "#" },
      steps: ["Listen and research", "Sketch and prototype", "Refine with feedback"],
      stepLink: { label: "Explore the design", href: "#work" },
    },
    {
      n: "03", cat: "Leadership & collaboration", title: "Bring people forward.",
      text: "The best work happens together. I share early, give clear feedback and keep teams moving in one direction.",
      tags: ["Collaboration", "Communication", "Mentoring"],
      link: { label: "How I collaborate", href: "#" },
      steps: ["Align on goals", "Share work early", "Launch and learn"],
      stepLink: { label: "Start a conversation", href: "#contact" },
    },
  ],
};

export const impact = {
  num: "04",
  label: "The work, multiplied",
  aside: "People. Products. Possibility.",
  heading: ["Numbers are a start.", "Quality is personal."],
  blurb: ["Every page, product and interface", "is a chance to help someone do more."],
  // TODO: real numbers
  big: { value: "20", suffix: "+", title: ["Projects shipped.", "Problems solved."], text: ["Websites, apps and interfaces for real people.", "Built to be fast, clear and responsive."], link: { label: "The work behind the number", href: "#work" } },
  small: [
    { value: "3", suffix: "×", label: "Faster page loads", text: "Typical improvement after performance and accessibility work." },
    { value: "10", suffix: "+", label: "Clients served", text: "Translating business needs into digital products, interfaces and experiences." },
  ],
  thread: { label: "The common thread", lines: ["Build something useful.", "Make it easy to use."], italic: "Give it room to grow." },
  story: {
    kicker: "My story / part of the building path",
    heading: ["From a first site.", "To a craft I love."],
    body: ["Since 2021, I've designed and built for the web alongside ", "learning, clients and collaborators", ". Building interfaces. Sharing what I learn. Helping ideas become real."],
    link: { label: "My part in the story", href: "#journey" },
    timeline: [
      { year: "2021", lead: "Started the journey.", text: "First websites, first lessons, first clients.", link: null },
      { year: "2024", lead: "A new chapter of growth.", text: "Bigger projects, deeper design practice and stronger collaboration.", link: { label: "See the milestone", href: "#" } },
      { year: "Today", lead: "Building for what comes next.", text: "Products, interfaces and an independent voice in web design.", link: null },
    ],
  },
  travels: {
    label: "How the impact travels",
    tabs: [
      { name: "Build", title: "20+ products. One clear approach.", text: "From landing pages to full applications, I build what people actually need.", link: "See the products", href: "#work" },
      { name: "Design", title: "Interfaces that feel obvious.", text: "I move people from confusion to clarity with calm layouts and thoughtful details.", link: "See the design work", href: "#work" },
      { name: "Connect", title: "Work that opens conversations.", text: "Sharing process, lessons and ideas so others can build too.", link: "Connect with me", href: "#contact" },
    ],
  },
  platform: {
    lines: ["A shared platform.", "A lasting contribution."],
    text: ["Part of the community", "behind the work."],
    stats: [
      { value: "5K", suffix: "+", label: "Followers across platforms" },
      { value: "2K", suffix: "+", label: "Community members" },
    ],
    note: "Placeholder figures — replace with your own, verified numbers.",
  },
};

export const content = {
  num: "05",
  label: "Ideas that travel",
  aside: "On camera. In conversation. In your corner.",
  heading: ["A voice", "with something to say."],
  blurb: ["Videos, walkthroughs and conversations", "that open doors."],
  channel: { label: "My independent channel", href: "#" },
  filters: ["All films", "My channel", "Collaborations"],
  // youtubeId: the part after v= in a YouTube URL. Leave "" to show a generated thumbnail.
  films: [
    { title: "Video title one", sub: "A short subtitle for this video", by: "Your channel / Topic", tag: "My channel", youtubeId: "" },
    { title: "Video title two", sub: "A short subtitle for this video", by: "Collaboration / Topic", tag: "Collaborations", youtubeId: "" },
    { title: "Video title three", sub: "A short subtitle for this video", by: "Your channel / Topic", tag: "My channel", youtubeId: "" },
    { title: "Video title four", sub: "A short subtitle for this video", by: "Your channel / Topic", tag: "My channel", youtubeId: "" },
    { title: "Video title five", sub: "A short subtitle for this video", by: "Collaboration / Topic", tag: "Collaborations", youtubeId: "" },
    { title: "Video title six", sub: "A short subtitle for this video", by: "Your channel / Topic", tag: "My channel", youtubeId: "" },
  ],
  social: {
    kicker: "The conversation continues",
    heading: ["Different places.", "One curious person."],
    cards: [
      { icon: "instagram", meta: "Instagram / @itsumar", title: ["Ideas, in", "the everyday."], text: "Short-form content, design and the person behind the work.", link: "Explore my Instagram", href: "https://instagram.com/" }, // TODO handle
      { icon: "linkedin", meta: "LinkedIn / M Umar", title: ["The thinking", "behind the work."], text: "Product, design and the people building the web.", link: "Connect on LinkedIn", href: "https://linkedin.com/" }, // TODO
    ],
    more: { label: "More of my content and tutorials", href: "#" },
  },
};

export const speaking = {
  num: "06",
  label: "From ideas to people",
  aside: "From the classroom to the stage",
  image: "/images/speaking.png",
  alt: "Speaking on stage",
  kicker: "A significant kind of reach",
  heading: ["Explain it well.", "Make it stick."],
  cta: { label: "Invite me to speak", href: "mailto:you@example.com" }, // TODO
  caption: "Real people. Real conversations.",
  title: ["Sharing what I learn.", "Opening what comes next."],
  text: "Technical talks, workshops and conversations about building for the web and the careers beyond the obvious. Add the events, colleges or communities you've spoken at here.",
  tags: ["Frontend", "Design thinking", "Product building", "Developer education"],
  series: [
    { cap: "Talk series / 2026", title: "Talk title one", text: "A one-line description of this talk or workshop series.", href: "#" },
    { cap: "Workshop / 2025", title: "Talk title two", text: "A one-line description of this talk or workshop series.", href: "#" },
  ],
};

export const journey = {
  kicker: "Still becoming",
  heading: ["Started with curiosity.", "Kept building."],
  // TODO: your real timeline
  items: [
    { n: "01", mark: "", title: "Learning by building", text: "Started with small projects and grew through curiosity, practice and shipping." },
    { n: "02", mark: "", title: "A first real client.", text: "Turned a skill into a service: responsive websites for people who needed them." },
    { n: "03", mark: "Today", title: "Connecting the whole picture.", text: "Designing, building and collaborating, and developing an independent voice." },
    { n: "04", mark: "Next", title: "More useful things. Greater reach.", text: "Working with ambitious people to build products and experiences that open new possibilities." },
  ],
};

export const contact = {
  num: "07",
  label: "The next chapter",
  aside: "Let's make it matter",
  badge: "Open to meaningful conversations",
  heading: ["Something great", "starts with"],
  italic: "a hello.",
  cta: { label: "Let's connect", href: "mailto:you@example.com" }, // TODO
  text: ["Websites, design, collaborations and ideas.", "If our worlds overlap, I'd love to hear from you."],
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "X", href: "https://x.com/" },
  ],
  fine: ["© 2026 M Umar", "Portfolio — designed & built by me", "Made with care, curiosity and code"],
};
