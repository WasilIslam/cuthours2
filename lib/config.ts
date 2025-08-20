export const navigationConfig = {
  brand: "Cuthours",
  pages: [
    { href: "/", label: "Home", id: "home" },
    { href: "/services", label: "Services", id: "services" },
    { href: "/chat", label: "Cuthours.ai", id: "chat" },
    { href: "/contact", label: "Contact", id: "contact" },
    { href: "/login", label: "Log in", id: "login" },
  ],
  cta: {
    label: "Try Cuthours for Free",
    href: "/chat"
  }
};

export const siteConfig = {
  name: "Cuthours",
  description: "Best-in-class personalized AI automation. Trained to think like you do.",
  tagline: "Automating businesses with AI and building modern websites",
  stats: [
    { value: "50+", label: "Projects Automated" },
    { value: "95%", label: "Time Saved" },
    { value: "24/7", label: "AI Operations" }
  ],
  investors: ["NEA", "Pear", "AFORE", "INVEST"],
  services: [
    {
      title: "AI Automation",
      description: "Intelligent workflows that handle repetitive tasks, analyze data, and make decisions automatically.",
      features: ["Process Automation", "Data Analysis & Insights", "Custom AI Solutions"],
      timeSaved: "6 hrs"
    },
    {
      title: "Modern Websites", 
      description: "Beautiful, fast, and scalable web applications built with the latest technologies.",
      features: ["Responsive Design", "Performance Optimized", "SEO Ready"],
      timeSaved: "4 hrs"
    }
  ]
};
