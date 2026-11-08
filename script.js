// Embedded Inline SVG Visuals (No external URL dependency)
  const mediaEras = {
    print: {
      title: "PRINT REVOLUTION (15TH CENTURY)",
      keyDev: "Gutenberg's movable type (c. 1450) enabled mass reproduction of books cheap and identical.",
      impact: "Spread ideas like the Reformation and science; 'Print Capitalism' helped people imagine one nation (Anderson, 1983). Limited by language and literacy.",
      svg: `<svg viewBox="0 0 200 150" width="100%" height="160" style="background:#0b1329; border-radius:0.6rem;">
              <rect x="30" y="20" width="140" height="110" rx="4" fill="none" stroke="#00e5ff" stroke-width="2"/>
              <line x1="45" y1="40" x2="155" y2="40" stroke="#00e5ff" stroke-width="3"/>
              <line x1="45" y1="55" x2="155" y2="55" stroke="#94a3b8" stroke-width="2"/>
              <line x1="45" y1="70" x2="135" y2="70" stroke="#94a3b8" stroke-width="2"/>
              <line x1="45" y1="85" x2="150" y2="85" stroke="#94a3b8" stroke-width="2"/>
              <line x1="45" y1="100" x2="110" y2="100" stroke="#00ff9d" stroke-width="2"/>
              <text x="100" y="123" fill="#00e5ff" font-size="10" font-family="sans-serif" text-anchor="middle">PRINT PRESS ERA</text>
            </svg>`
    },
    telegraph: {
      title: "TELEGRAPH & SUBSEA CABLES (1800S)",
      keyDev: "Transatlantic and subsea telegraph cables allowed near-instant message transmission across oceans.",
      impact: "Separated communication from physical transport speed, transforming international trade, diplomacy, and news reporting.",
      svg: `<svg viewBox="0 0 200 150" width="100%" height="160" style="background:#0b1329; border-radius:0.6rem;">
              <path d="M 20 80 Q 60 30 100 80 T 180 80" fill="none" stroke="#00e5ff" stroke-width="3" stroke-dasharray="4 4"/>
              <circle cx="20" cy="80" r="6" fill="#00ff9d"/>
              <circle cx="100" cy="80" r="6" fill="#00ff9d"/>
              <circle cx="180" cy="80" r="6" fill="#00ff9d"/>
              <text x="100" y="125" fill="#00e5ff" font-size="10" font-family="sans-serif" text-anchor="middle">SUBSEA TELEGRAPH CABLE</text>
            </svg>`
    },
    broadcast: {
      title: "RADIO & TELEVISION (1900S)",
      keyDev: "Mass electronic broadcasting delivered synchronized audio and video to millions of households simultaneously.",
      impact: "Created shared global cultural moments, national identities, and commercial mass media networks.",
      svg: `<svg viewBox="0 0 200 150" width="100%" height="160" style="background:#0b1329; border-radius:0.6rem;">
              <rect x="40" y="35" width="120" height="80" rx="8" fill="none" stroke="#00e5ff" stroke-width="2"/>
              <rect x="50" y="45" width="80" height="60" rx="4" fill="#00e5ff" opacity="0.15"/>
              <circle cx="145" cy="55" r="5" fill="#00ff9d"/>
              <circle cx="145" cy="70" r="5" fill="#00e5ff"/>
              <line x1="70" y1="35" x2="50" y2="15" stroke="#00e5ff" stroke-width="2"/>
              <line x1="130" y1="35" x2="150" y2="15" stroke="#00e5ff" stroke-width="2"/>
              <text x="100" y="133" fill="#00e5ff" font-size="10" font-family="sans-serif" text-anchor="middle">MASS BROADCASTING</text>
            </svg>`
    },
    satellite: {
      title: "SATELLITE COMMUNICATIONS (1960S)",
      keyDev: "Orbital communications satellites enabled real-time global television signals and international phone calls.",
      impact: "Gave rise to Marshall McLuhan's 'Global Village' concept as people watched world events live together.",
      svg: `<svg viewBox="0 0 200 150" width="100%" height="160" style="background:#0b1329; border-radius:0.6rem;">
              <circle cx="100" cy="110" r="45" fill="none" stroke="#00e5ff" stroke-width="2"/>
              <polygon points="90,30 110,30 100,20" fill="#00ff9d"/>
              <line x1="70" y1="35" x2="130" y2="35" stroke="#00e5ff" stroke-width="3"/>
              <line x1="100" y1="35" x2="100" y2="65" stroke="#00e5ff" stroke-width="2" stroke-dasharray="2 2"/>
              <text x="100" y="142" fill="#00e5ff" font-size="10" font-family="sans-serif" text-anchor="middle">ORBITAL SATELLITE BEAM</text>
            </svg>`
    },
    digital: {
      title: "DIGITAL & ALGORITHMIC MEDIA (1990S-NOW)",
      keyDev: "The Internet, smartphone proliferation, social platforms, and AI recommendation engines.",
      impact: "Decentralized information control, enabling instant global peer-to-peer creation, algorithmic curation, and hyper-connectivity.",
      svg: `<svg viewBox="0 0 200 150" width="100%" height="160" style="background:#0b1329; border-radius:0.6rem;">
              <circle cx="100" cy="70" r="15" fill="none" stroke="#00e5ff" stroke-width="2"/>
              <circle cx="50" cy="40" r="10" fill="none" stroke="#00ff9d" stroke-width="2"/>
              <circle cx="150" cy="40" r="10" fill="none" stroke="#00ff9d" stroke-width="2"/>
              <circle cx="50" cy="100" r="10" fill="none" stroke="#00ff9d" stroke-width="2"/>
              <circle cx="150" cy="100" r="10" fill="none" stroke="#00ff9d" stroke-width="2"/>
              <line x1="60" y1="45" x2="87" y2="62" stroke="#00e5ff" stroke-width="1.5"/>
              <line x1="140" y1="45" x2="113" y2="62" stroke="#00e5ff" stroke-width="1.5"/>
              <line x1="60" y1="95" x2="87" y2="78" stroke="#00e5ff" stroke-width="1.5"/>
              <line x1="140" y1="95" x2="113" y2="78" stroke="#00e5ff" stroke-width="1.5"/>
              <text x="100" y="133" fill="#00e5ff" font-size="10" font-family="sans-serif" text-anchor="middle">GLOBAL DIGITAL NETWORK</text>
            </svg>`
    }
  };

  function loadMediaEra(key) {
    const era = mediaEras[key];
    document.getElementById('mediaEraCard').innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 280px; gap: 1.5rem; align-items: center;">
        <div>
          <h3 style="color:var(--accent-cyan); font-family:'Oswald', sans-serif; font-size: 1.4rem; margin-bottom: 1rem;">${era.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.8rem;">
            <strong style="color: #ffffff;">Key Developments:</strong> ${era.keyDev}
          </p>
          <p style="font-size: 0.95rem; color: var(--text-main);">
            <strong style="color: #ffffff;">Global Reach &amp; Impact:</strong> ${era.impact}
          </p>
        </div>
        <div style="border-radius: 0.6rem; overflow: hidden; border: 1px solid var(--accent-cyan); box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);">
          ${era.svg}
        </div>
      </div>
    `;

    document.querySelectorAll('#media .tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(key));
    });
  }
const conceptData = [
    {
      title: "GLOBAL VILLAGE",
      author: "McLuhan",
      idea: "Electronic media connect people so closely the world acts like one village.",
      example: "TV and internet show faraway crises in real time.",
      critique: "Shared info is not shared understanding; access is unequal."
    },
    {
      title: "CULTURAL IMPERIALISM",
      author: "Schiller",
      idea: "Powerful Western (mainly U.S.) media spread their values and make weaker countries dependent.",
      example: "Hollywood, American TV, global advertising campaigns.",
      critique: "Audiences are active and often prefer local content (Tomlinson; Straubhaar)."
    },
    {
      title: "GLOCALIZATION",
      author: "Robertson",
      idea: "Global products are adjusted to local tastes, so global and local work together.",
      example: "Pinoy Big Brother, regional MTV broadcasts.",
      critique: "May be mostly for commercial sales, not real cultural exchange."
    },
    {
      title: "HYBRIDIZATION",
      author: "Pieterse",
      idea: "Globalization mixes different cultures together into completely new cultural forms.",
      example: "K-pop, P-pop (SB19).",
      critique: "Global power imbalances still shape the final cultural mix."
    },
    {
      title: "TIME-SPACE COMPRESSION",
      author: "Harvey",
      idea: "Technology and capitalism speed up life and shrink physical distance.",
      example: "Video calls, live streaming, real-time global financial markets.",
      critique: "Can be disorienting; information arrives faster than humans can process."
    }
  ];

  let currentCardIndex = 0;

  function renderCard(index) {
    const item = conceptData[index];
    const card = document.getElementById('floatingConceptCard');
    
    if (!card) return;

    card.style.opacity = '0.3';

    setTimeout(() => {
      document.getElementById('conceptTitle').innerText = item.title;
      document.getElementById('conceptAuthor').innerText = item.author;
      document.getElementById('conceptIdea').innerText = item.idea;
      document.getElementById('conceptExample').innerText = item.example;
      document.getElementById('conceptCritique').innerText = item.critique;
      
      card.style.opacity = '1';
      lucide.createIcons();
    }, 100);

    updateDots();
  }

  function changeCard(direction) {
    currentCardIndex += direction;
    if (currentCardIndex < 0) currentCardIndex = conceptData.length - 1;
    if (currentCardIndex >= conceptData.length) currentCardIndex = 0;
    renderCard(currentCardIndex);
  }

  function updateDots() {
    const dotsContainer = document.getElementById('dotIndicators');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    conceptData.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.style.width = idx === currentCardIndex ? '24px' : '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '999px';
      dot.style.background = idx === currentCardIndex ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)';
      dot.style.cursor = 'pointer';
      dot.style.transition = 'all 0.3s ease';
      dot.onclick = () => {
        currentCardIndex = idx;
        renderCard(currentCardIndex);
      };
      dotsContainer.appendChild(dot);
    });
  }

  // Load first card when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    renderCard(0);
  });

  // Filter Function for Subtopic 03
  window.filterEffects = function(type) {
    const posCards = document.querySelectorAll('.positive-effect');
    const negCards = document.querySelectorAll('.negative-effect');

    document.querySelectorAll('#media-effects .tab-btn').forEach(btn => btn.classList.remove('active'));

    if (type === 'all') {
      document.getElementById('tabAllEffects').classList.add('active');
      posCards.forEach(card => card.style.display = 'block');
      negCards.forEach(card => card.style.display = 'block');
    } else if (type === 'positive') {
      document.getElementById('tabPosEffects').classList.add('active');
      posCards.forEach(card => card.style.display = 'block');
      negCards.forEach(card => card.style.display = 'none');
    } else if (type === 'negative') {
      document.getElementById('tabNegEffects').classList.add('active');
      posCards.forEach(card => card.style.display = 'none');
      negCards.forEach(card => card.style.display = 'block');
    }
  };

// Subtopic 04: Contra-Flow Data
  const regionData = {
    korea: {
      title: "KOREA: K-POP & CINEMA",
      tag: "Global Cultural Wave",
      items: [
        {
          label: "K-Pop Industry",
          desc: "Groups like BTS and BLACKPINK built worldwide fan bases through YouTube and social media algorithms <span style='color: var(--accent-cyan); font-size: 0.8rem;'>(Jin, 2016)</span>."
        },
        {
          label: "Film & TV Series",
          desc: "K-dramas (<i>Crash Landing on You</i>) and <i>Squid Game</i> achieved global streaming peaks. <i>Parasite</i> made history as the first non-English film to win Best Picture (2020)."
        }
      ]
    },
    japan: {
      title: "JAPAN: ANIME & ENTERTAINMENT",
      tag: "Transnational Fandom",
      items: [
        {
          label: "Global Anime Franchises",
          desc: "Titles like <i>Demon Slayer</i>, <i>Jujutsu Kaisen</i>, and <i>One Piece</i> break international box office records and dominate global streaming catalogs."
        }
      ]
    },
    india: {
      title: "INDIA: CINEMATIC RECOGNITION",
      tag: "Global Breakthrough",
      items: [
        {
          label: "RRR & Music Recognition",
          desc: "Indian cinema achieved historic mainstream global success when <i>'Naatu Naatu'</i> from <i>RRR</i> won Best Original Song at the Academy Awards (2023)."
        }
      ]
    },
    nigeria: {
      title: "NIGERIA: NOLLYWOOD",
      tag: "Regional & Diaspora Giant",
      items: [
        {
          label: "African Film Powerhouse",
          desc: "One of the world's largest film industries by output, commanding immense popularity across Africa and its global diaspora <span style='color: var(--accent-cyan); font-size: 0.8rem;'>(Larkin, 2008)</span>."
        }
      ]
    },
    china: {
      title: "CHINA: DIGITAL PLATFORMS & GAMING",
      tag: "Tech & Entertainment",
      items: [
        {
          label: "Global Digital Products",
          desc: "Platforms like TikTok and gaming hits such as <i>Genshin Impact</i> have become widely used daily entertainment across every continent."
        }
      ]
    }
  };

  window.showRegion = function(key) {
    const data = regionData[key];
    if (!data) return;

    // Toggle Tab Active State
    document.querySelectorAll('#contra-flow .tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(key));
    });

    // Update Header
    document.getElementById('regionTitle').innerText = data.title;
    document.getElementById('regionTag').innerText = data.tag;

    // Render Items
    const container = document.getElementById('regionContent');
    container.innerHTML = data.items.map(item => `
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1rem; border-radius: 0.6rem;">
        <h4 style="color: var(--accent-green); font-size: 0.95rem; margin-bottom: 0.4rem; font-family: 'Oswald', sans-serif;">
          ${item.label}
        </h4>
        <p style="font-size: 0.88rem; color: var(--text-main); font-family: 'Playfair Display', Georgia, serif;">
          ${item.desc}
        </p>
      </div>
    `).join('');

    lucide.createIcons();
  };

  // Initialize First Region on Load
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof showRegion === 'function') {
      showRegion('korea');
    }
  });

// ===== Table content: edit text here =====
const T={
evo:[["Stage","Period","Key developments","Global reach"],
["Print","15th century on","Gutenberg’s movable type (c. 1450) made books cheap and identical","Spread ideas like the Reformation and science; “print capitalism” helped people imagine one nation (Anderson, 1983). Limited by language and literacy"],
["Telegraph and press agencies","1800s","Telegraph lines, undersea cables, Reuters, Havas","News moved faster than people; first global news flows (Standage, 1998)"],
["Radio, film, TV","1900s","Broadcast radio, cinema, household TV","No literacy needed, so bigger audiences; Hollywood spread shared entertainment (Herman & McChesney, 1997)"],
["Satellites and cable","1960s–80s","Telstar (1962), cable, CNN","Live global events; “CNN effect” (Robinson, 2002); supports McLuhan’s “global village”"],
["Internet, mobile, social media","1990s–now","Web, smartphones, Facebook, YouTube, TikTok","Anyone can publish globally (“mass self-communication,” Castells, 2009), but algorithms shape what you see"]],
theory:[["Theory","Core idea","Example","Critique"],
["Global village (McLuhan)","Electronic media connect people so closely the world acts like one village","TV and internet show faraway crises in real time","Shared info is not shared understanding; access is unequal"],
["Cultural imperialism (Schiller)","Powerful Western (mainly U.S.) media spread their values and make weaker countries dependent","Hollywood, American TV, global ads","Audiences are active and often prefer local content (Tomlinson; Straubhaar)"],
["Glocalization (Robertson)","Global products are adjusted to local tastes, so global and local work together","Pinoy Big Brother, regional MTV","May be mostly for sales, not real cultural exchange"],
["Hybridization (Pieterse)","Globalization mixes cultures into new forms","K-pop, P-pop (SB19)","Power imbalances still shape the mix"],
["Time-space compression (Harvey)","Technology and capitalism speed up life and shrink distance","Video calls, live streaming, real-time markets","Can be disorienting; info arrives faster than we can process"]],
ethics:[["Issue","What it means","Examples"],
["Algorithmic bias and echo chambers","Algorithms decide what we see. They can repeat prejudice or show only what we already agree with (Pariser, 2011)","Biased search results (Noble, 2018); facial analysis with more errors for darker-skinned women (Buolamwini & Gebru, 2018); “filter bubbles”"],
["Data ownership by big tech","A few companies collect and profit from billions of users’ data, often without users fully understanding it (“surveillance capitalism,” Zuboff, 2019)","Cambridge Analytica scandal (2018)"],
["Misinformation, disinformation, and harmful content","False or manipulated content can cause real harm (Wardle & Derakhshan, 2017)","COVID-19 “infodemic”; Facebook and hate speech against the Rohingya; paid trolls in the Philippines; AI deepfakes"],
["Digital literacy and responsible use","Since anyone can publish, users must be able to access, evaluate, and create media responsibly (Livingstone, 2004)","Check sources, spot manipulated images, protect personal info, avoid cyberbullying"],
["Regulation across national laws","Platforms work across borders, but laws differ by country, so it is unclear whose rules apply","EU GDPR; Philippines Data Privacy Act of 2012"]],
examples:[["Domain","Key example","Impact"],
["Social media","Facebook, Instagram, TikTok, Zoom","Instant worldwide sharing of news, trends, and movements"],
["Education","Online platforms, digital libraries","Global courses, certificates, and research from anywhere"],
["Finance","Fintech, mobile banking, e-wallets, blockchain","Instant cross-border payments; access for the unbanked"],
["Commerce","Amazon, Shopee, eBay","Small businesses export without stores abroad"],
["Employment","Remote work tools","Companies hire talent anywhere, no relocation needed"]],
bc:[["Dimension","Key benefits","Major challenges"],
["Economy","Faster trade, new markets, lower costs, global talent","Job loss from automation; tougher competition for local industries"],
["Education","Knowledge for more people; global learning and remote degrees","Digital divide: people without internet or devices fall further behind"],
["Culture","Cultural exchange and appreciation of global traditions","Homogenization: dominant media can overshadow local languages and identities"],
["Communication","Instant collaboration and family connection","Misinformation, fake news, extremism, social fragmentation"],
["Security","Global threat monitoring and regulatory cooperation","Cybersecurity risks: ransomware, cyberattacks, vulnerable data"]],
conn:[["Dimension","Core impact and mechanism"],
["Cross-border reach","News, culture, and social movements spread across borders within minutes."],
["Mobile-first inclusion","Smartphone adoption in developing regions lets users skip legacy desktop setups and join networks directly on mobile."],
["Regional ecosystems","Localized platforms such as WeChat (China) and VK (Eastern Europe) adapt to local culture, language, payment systems, and regulation."]],
hist:[["Period","Milestone","Why it matters"],
["1960s–1980s","ARPANET (1969), email added 1971; PLATO (1973); Usenet (1979)","Packet-switched networking, early multi-user chat and message boards, and distributed newsgroups with threaded discussion and basic moderation."],
["1990s","World Wide Web (public from 1991); CompuServe, Prodigy, AOL; SixDegrees.com (1997)","Online services brought chat rooms, instant messaging, and forums to a mass audience. SixDegrees paired profiles with a friends list, the core pattern of social network sites."],
["2002–2004","Friendster (2002); Myspace and LinkedIn (2003); Facebook (2004)","Web 2.0 turned users from readers into content creators. Facebook began in university networks before expanding globally."],
["2005–2007","YouTube (2005); Twitter and News Feed (2006); Facebook Platform and first iPhone (2007)","Video sharing, short public posts, a real-time feed, and developer tools made social networking part of daily life."],
["2010–present","Instagram (2010); TikTok international launch (2017–2018)","Mobile-first, image- and video-centered platforms with recommendation algorithms."]],
ba:[["Characteristic","Before: social network","Now: consumer media"],
["Primary architecture","Social graph: who you know and follow","Interest graph: what holds your attention"],
["Content distribution","Reverse-chronological feed from personal connections","Algorithmic curation optimized for watch time and engagement"],
["Role of the user","Active peer-to-peer participant and creator","Audience member in an entertainment stream, with a smaller group of professional creators"],
["Monetization","Display ads and targeted user profiles","Integrated e-commerce, live shopping, creator partnerships, and advertising"]],
fut:[["Trend","What is changing","Main challenge"],
["AI integration and hyper-personalization","Generative content tools, real-time translation, more precise recommendation","Synthetic media, deepfakes, and algorithmic bias"],
["Spatial and AR/VR environments","3D social spaces and embodied avatars beyond the flat screen","Cost, hardware access, and privacy in immersive spaces"],
["Decentralization and open standards","Federated protocols and greater user control over data","Moderation, usability, and interoperability across servers"]]};

// ===== Build tables from the data above =====
document.querySelectorAll("[data-t]").forEach(el=>{
  const d=T[el.dataset.t];
  const cell=s=>{const e=document.createElement("td");e.textContent=s;return e};
  const t=document.createElement("table"),h=document.createElement("thead"),b=document.createElement("tbody");
  const hr=document.createElement("tr");
  d[0].forEach(x=>{const th=document.createElement("th");th.textContent=x;hr.append(th)});
  h.append(hr);
  d.slice(1).forEach(r=>{const tr=document.createElement("tr");r.forEach(x=>tr.append(cell(x)));b.append(tr)});
  t.append(h,b);el.append(t);
});

// ===== Scroll reveal =====
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.05});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));

// ===== Reading progress bar =====
const bar=document.getElementById("bar");
addEventListener("scroll",()=>{
  const m=document.documentElement.scrollHeight-innerHeight;
  bar.style.width=(m>0?scrollY/m*100:0)+"%";
},{passive:true});


