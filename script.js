(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const app = document.getElementById('app');
  const dictionary = {
    en: {
      navHome: 'Home',
      navAbout: 'About',
      navBlog: 'Writing',
      navContact: 'Contact',
      hello: "Hey there, I'm",
      tagline: 'he/they. Torontonian.',
      intro:
        "I build software, solve problems, and occasionally write about things I find interesting. Currently pursuing my Master's at the University of Waterloo and working with the City of Toronto.",
      work: 'Explore my work',
      resume: 'View résumé',
      base: 'Based in Toronto, Canada',
      aboutTitle: 'A little bit about me.',
      about1:
        "I'm a software developer passionate about backend engineering, data systems, and building things that make a difference. I enjoy turning messy, real-world problems into simple, practical solutions.",
      about2:
        'Outside of code, I enjoy skiing, cycling, and rock climbing.',
      experienceTitle: "Things I've worked on.",
      fullResume: 'Full résumé',
      expCity:
        'Building data pipelines, automation workflows, and analytical tools to improve operational systems.',
      expWaterloo: 'Master of Engineering in Electrical and Computer Engineering.',
      expBeijing: 'Developed backend services and asynchronous messaging systems.',
      writingTitle: 'Notes & thoughts.',
      allWriting: 'All writing',
      connect: 'LET’S CONNECT',
      contactTitle: 'Have something in mind?',
      contactBlurb:
        "Whether it's a project, an opportunity, or just a hello — I'd love to hear from you.",
      sayHello: 'Say hello',
      aboutPage: 'About me',
      aboutIntro:
        'I’m Zed, a software developer based in Toronto. I care about practical engineering, clear communication, and thoughtful design.',
      aboutJourney: 'My path',
      aboutJourneyText:
        'I studied computer science before continuing my education at the University of Waterloo, where I am pursuing a Master of Engineering in Electrical and Computer Engineering. My work spans backend development, data analysis, and automation.',
      aboutOutside: 'Beyond work',
      aboutOutsideText:
        'This website is also a place for personal notes, ideas, and observations from life in Canada. Expect the occasional post that has nothing to do with programming.',
      blogPage: 'Writing',
      blogIntro: 'Occasional notes on technology, life, and everything in between.',
      contactPage: 'Get in touch',
      contactIntro: 'Find me around the web or send me a message.',
      notConfigured: 'Not added yet',
      notFound: 'Page not found',
      notFoundText: "The page you're looking for doesn't exist.",
      goHome: 'Back to home',
      backBlog: '← Back to writing',
      draft: 'Draft',
      none: 'No posts yet.',
      resumeMissing: 'Add your résumé PDF path in config.js to enable this link.',
      emailMissing: 'Add your email address in config.js to enable email contact.',
      linkMissing: 'Add this social link in config.js to enable it.',
      projects: 'Selected work',
      project1:
        'Automated metadata ingestion for 240,000 attachment records via Python and REST APIs, with batch pacing to accommodate downstream ETL.',
      project2:
        'Developed matching rules to associate OCR service reports with equipment records using serial numbers, models, and asset tags.',
      project3:
        'Built a web-based campus utility bot using Spring Boot, React, and cloud deployment tooling.',
    },
    zh: {
      navHome: '首页',
      navAbout: '关于',
      navBlog: '文章',
      navContact: '联系',
      hello: '你好，我是',
      tagline: 'he/they. Torontonian.',
      intro:
        '我写代码、解决实际或不切实际的问题。偶尔写作，幻想成为陀思妥耶夫斯基。',
      work: '看看我的经历',
      resume: '查看简历',
      base: '加拿大, 多伦多',
      aboutTitle: '简单介绍一下自己。',
      about1: '尽量晚一点投降',
      about2: '',
      experienceTitle: '我做过的事情。',
      fullResume: '完整简历',
      expCity: '构建数据管道、自动化工作流和分析工具，提升业务系统的运行效率。',
      expWaterloo: '电气与计算机工程硕士在读。',
      expBeijing: '开发后端服务与异步消息处理系统。',
      writingTitle: '一些记录与思考。',
      allWriting: '全部文章',
      connect: '保持联系',
      contactTitle: '有什么想聊的吗？',
      contactBlurb: '无论是讨论项目、工作机会，还是简单聊聊天，都欢迎联系我。',
      sayHello: '联系我',
      aboutPage: '关于我',
      aboutIntro:
        '我是 Zed，一名生活在多伦多的软件开发者。我注重务实的工程实践、清晰的沟通和细致的设计。',
      aboutJourney: '我的经历',
      aboutJourneyText:
        '本科阶段学习计算机科学，之后来到滑铁卢大学攻读电气与计算机工程硕士。我的工作涉及后端开发、数据分析和自动化。',
      aboutOutside: '工作之外',
      aboutOutsideText:
        '这个网站也会记录我在加拿大的生活、想法和观察，偶尔分享一些与编程完全无关的内容。',
      blogPage: '文章',
      blogIntro: '偶尔记录技术、生活和一些零散的想法。',
      contactPage: '联系我',
      contactIntro: '你可以在这些平台找到我，或者发邮件联系。',
      notConfigured: '暂未添加',
      notFound: '找不到页面',
      notFoundText: '你访问的页面不存在。',
      goHome: '返回首页',
      backBlog: '← 返回文章列表',
      draft: '草稿',
      none: '还没有文章。',
      resumeMissing: '在 config.js 中填写简历 PDF 路径后即可使用。',
      emailMissing: '请在 config.js 中填写邮箱地址。',
      linkMissing: '请在 config.js 中填写对应的社交平台链接。',
      projects: '精选项目',
      project1:
        '使用 Python 和 REST API 批量处理 240,000 条附件元数据，并根据下游 ETL 吞吐量控制处理速率。',
      project2: '基于序列号、型号和资产标签构建设备匹配规则，将 OCR 服务报告与设备记录关联。',
      project3: '使用 Spring Boot、React 和云端部署工具开发校园实用机器人。',
    },
  };
  const getSaved = (key, fallback) => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  let lang = getSaved('zed-language', 'en') === 'zh' ? 'zh' : 'en';
  let theme = getSaved('zed-theme', 'light');
  const t = (key) => dictionary[lang][key] || key;
  const esc = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[x],
    );
  const allowedUrl = (value) => {
    const s = String(value || '').trim();
    return /^(https?:\/\/)/i.test(s) ? s : '';
  };
  const url = (value) => esc(allowedUrl(value));
  let noticeTimer;
  const notify = (message) => {
    const el = document.getElementById('notice');
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => el.classList.remove('visible'), 3000);
  };
  const button = (label, kind, cls = '') =>
    `<button class="button ${cls}" type="button" data-missing="${kind}">${label}</button>`;
  const resumeButton = (label, cls = '') =>
    (config.resume && /^(?!\/\/)(?!https?:)(?!javascript:)[\w./-]+$/i.test(config.resume)) ||
    allowedUrl(config.resume)
      ? `<a class="button ${cls}" href="${esc(config.resume)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`
      : button(`${label} ↗`, 'resume', cls);
  const social = (name, value) =>
    allowedUrl(value)
      ? `<a href="${url(value)}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`
      : `<a href="#/contact" data-missing="link">${name} ↗</a>`;
  const email = (label, cls = '') =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '')
      ? `<a class="button ${cls}" href="mailto:${esc(config.email)}">${label} ↗</a>`
      : button(`${label} ↗`, 'email', cls);
  const heroVisual = () =>
    `<div class="hero-visual" aria-label="Zed Li monogram">${config.photo && /^(?!javascript:)(?!\/\/)([\w./-]+|https?:\/\/[^\s]+)$/i.test(config.photo) ? `<img class="portrait" src="${esc(config.photo)}" alt="Portrait of Zed Li" loading="lazy">` : '<div class="monogram">Z<span>L</span></div><small>BUILD · LEARN · CREATE</small>'}</div>`;
  const postRows = (items) =>
    items.length
      ? `<div class="post-list">${items.map((p) => `<a class="post-row" href="#/blog/${encodeURIComponent(p.slug)}"><div><div class="kicker">${esc(p.category)} · ${esc(p.date)} ${p.draft ? `<span class="draft">${t('draft')}</span>` : ''}</div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></div><span class="right-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`
      : `<p class="empty-note">${t('none')}</p>`;
  const aboutSection = () =>
    `<section class="section" id="about"><div class="section-label"><b>01 /</b> ${lang === 'zh' ? '关于' : 'ABOUT'}</div><div><h2>${t('aboutTitle')}</h2><p>${t('about1')}</p>${dictionary[lang].about2 ? `<p>${t('about2')}</p>` : ''}<div class="tags">${['Python', 'Java', 'SQL', 'Backend', 'Data Engineering', 'Cloud'].map((x) => `<span>${x}</span>`).join('')}</div></div></section>`;
  const experienceSection = () =>
    `<section class="section" id="experience"><div class="section-label"><b>02 /</b> ${lang === 'zh' ? '经历' : 'EXPERIENCE'}</div><div><div class="section-head"><h2>${t('experienceTitle')}</h2><span>${resumeButton(t('fullResume'))}</span></div>${[
      ['2026 — 2026', 'IT Trainee', 'City of Toronto', t('expCity')],
      ['2025 — 2027', 'Master of Engineering', 'University of Waterloo · ECE', t('expWaterloo')],
      ['2024 — 2025', 'Backend Developer Intern', 'Beijing Ainfinit Technology', t('expBeijing')],
    ]
      .map(
        ([date, role, org, desc]) =>
          `<div class="timeline-item"><time>${date}</time><div><h3>${role}</h3><strong>${org}</strong><p>${desc}</p></div></div>`,
      )
      .join('')}</div></section>`;
  const writingSection = () =>
    `<section class="section" id="writing"><div class="section-label"><b>03 /</b> ${lang === 'zh' ? '文章' : 'WRITING'}</div><div><div class="section-head"><h2>${t('writingTitle')}</h2><a class="text-link" href="#/blog">${t('allWriting')} ↗</a></div>${postRows(posts.slice(0, 3))}</div></section>`;
  const contactPanel = () =>
    `<section class="cta"><span class="kicker">${t('connect')}</span><h2>${t('contactTitle')}</h2><p>${t('contactBlurb')}</p>${email(t('sayHello'), 'primary')}</section>`;
  function home() {
    return `<section class="hero"><div><div class="pill"><span class="pulse"></span>${t('base')}</div><p class="eyebrow">${t('hello')}</p><h1>Zed Li<span class="accent">.</span></h1><h2>${t('tagline')}</h2><p class="lead">${t('intro')}</p><div class="actions"><a class="button primary" href="#/about">${t('work')} ↗</a>${resumeButton(t('resume'))}</div><div class="socials">${social('GitHub', config.github)}${social('LinkedIn', config.linkedin)}</div></div>${heroVisual()}</section>${aboutSection()}${experienceSection()}${writingSection()}${contactPanel()}`;
  }
  function about() {
    return `<section class="page"><div class="overline">ABOUT / ZED LI</div><h1>${t('aboutPage')}<span class="accent">.</span></h1><p class="page-lead">${t('aboutIntro')}</p><div class="bio-card"><h3>${t('aboutJourney')}</h3><p>${t('aboutJourneyText')}</p></div><h2>${t('projects')}</h2><div class="timeline-item"><time>01</time><div><h3>Attachment Metadata Pipeline</h3><p>${t('project1')}</p></div></div><div class="timeline-item"><time>02</time><div><h3>Equipment Matching</h3><p>${t('project2')}</p></div></div><div class="timeline-item"><time>03</time><div><h3>Campus Utility Bot</h3><p>${t('project3')}</p></div></div><div class="bio-card"><h3>${t('aboutOutside')}</h3><p>${t('aboutOutsideText')}</p></div>${resumeButton(t('resume'), 'primary')}</section>`;
  }
  function blog() {
    return `<section class="page"><div class="overline">JOURNAL / BLOG</div><h1>${t('blogPage')}<span class="accent">.</span></h1><p class="page-lead">${t('blogIntro')}</p><div style="margin-top:38px">${postRows(posts)}</div></section>`;
  }
  function contact() {
    return `<section class="page"><div class="overline">SAY HELLO</div><h1>${t('contactPage')}<span class="accent">.</span></h1><p class="page-lead">${t('contactIntro')}</p><div class="contact-list">${[
      [
        'Email',
        config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)
          ? `mailto:${config.email}`
          : '',
      ],
      ['GitHub', config.github],
      ['LinkedIn', config.linkedin],
      ['Instagram', config.instagram],
      ['Threads', config.threads],
      [lang === 'zh' ? '小红书' : 'rednote', config.xiaohongshu],
      [lang === 'zh' ? '豆瓣' : 'Douban', config.douban],
    ]
      .map(([name, link]) => {
        const valid = link.startsWith('mailto:') || allowedUrl(link);
        return `<div class="contact-row"><span>${name}</span>${valid ? `<a href="${esc(link)}" ${link.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener noreferrer"'}>${link.startsWith('mailto:') ? esc(config.email) : `${name} ↗`}</a>` : `<span>${t('notConfigured')}</span>`}</div>`;
      })
      .join('')}</div></section>`;
  }
  function markdown(source) {
    const lines = String(source || '')
      .replace(/\r\n?/g, '\n')
      .split('\n');
    let out = '',
      inList = false,
      inCode = false,
      code = [],
      paragraph = [];
    const inline = (s) => {
      const codeSpans = [];
      let v = esc(s)
        .replace(/\u0000/g, '&#0;')
        .replace(/`([^`]+)`/g, (_, content) => {
          const index = codeSpans.push(`<code>${content}</code>`) - 1;
          return `\u0000${index}\u0000`;
        });
      v = v
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      v = v.replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)\u0000]+)\)/g,
        (_, label, href) =>
          `<a href="${href}" rel="noopener noreferrer" target="_blank">${label}</a>`,
      );
      return v.replace(/\u0000(\d+)\u0000/g, (_, index) => codeSpans[Number(index)]);
    };
    const flushParagraph = () => {
      if (!paragraph.length) return;
      out += `<p>${inline(paragraph.join('\n'))}</p>`;
      paragraph = [];
    };
    for (const line of lines) {
      if (/^```/.test(line)) {
        flushParagraph();
        if (inList) {
          out += '</ul>';
          inList = false;
        }
        if (inCode) {
          out += `<pre><code>${esc(code.join('\n'))}</code></pre>`;
          code = [];
          inCode = false;
        } else inCode = true;
        continue;
      }
      if (inCode) {
        code.push(line);
        continue;
      }
      if (/^\s*[-*] /.test(line)) {
        flushParagraph();
        if (!inList) {
          out += '<ul>';
          inList = true;
        }
        out += `<li>${inline(line.replace(/^\s*[-*] /, ''))}</li>`;
        continue;
      }
      if (inList) {
        out += '</ul>';
        inList = false;
      }
      if (!line.trim()) {
        flushParagraph();
        continue;
      }
      const match = /^(#{1,3})\s+(.*)$/.exec(line);
      if (match) {
        flushParagraph();
        const lvl = match[1].length;
        out += `<h${lvl}>${inline(match[2])}</h${lvl}>`;
      } else if (line.startsWith('> ')) {
        flushParagraph();
        out += `<blockquote><p>${inline(line.slice(2))}</p></blockquote>`;
      } else paragraph.push(line);
    }
    flushParagraph();
    if (inList) out += '</ul>';
    if (inCode) out += `<pre><code>${esc(code.join('\n'))}</code></pre>`;
    return out;
  }
  function article(slug) {
    const p = posts.find((p) => p.slug === slug);
    if (!p) return notFound();
    return `<article class="page article" lang="${esc(p.lang || lang)}"><a class="text-link" href="#/blog">${t('backBlog')}</a><div class="overline" style="margin-top:27px">${esc(p.category)} ${p.draft ? `<span class="draft">${t('draft')}</span>` : ''}</div><h1>${esc(p.title)}</h1><div class="article-meta">${esc(p.date)} · Zed Li</div><p class="page-lead">${esc(p.excerpt)}</p><div class="article-body">${markdown(p.body)}</div></article>`;
  }
  function notFound() {
    return `<section class="page"><div class="overline">404</div><h1>${t('notFound')}</h1><p>${t('notFoundText')}</p><a class="button primary" href="#/">${t('goHome')} ↗</a></section>`;
  }
  function render() {
    let route;
    try {
      route = decodeURIComponent(location.hash.replace(/^#\/?/, ''))
        .split('/')
        .filter(Boolean);
    } catch {
      route = ['not-found'];
    }
    const current = route[0] || 'home';
    app.innerHTML =
      current === 'home'
        ? home()
        : current === 'about'
          ? about()
          : current === 'blog'
            ? route[1]
              ? article(route[1])
              : blog()
            : current === 'contact'
              ? contact()
              : notFound();
    document.documentElement.lang = lang;
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('footer-location').textContent = config.location || 'Toronto, Canada';
    document.getElementById('language').textContent = lang === 'en' ? '中文' : 'EN';
    document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll('[data-nav]').forEach((a) => {
      const active = a.dataset.nav === current;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.title =
      route[0] === 'blog' && route[1]
        ? `${posts.find((p) => p.slug === route[1])?.title || 'Writing'} — Zed Li`
        : `${current === 'home' ? 'Zed Li' : t(current === 'blog' ? 'blogPage' : current === 'about' ? 'aboutPage' : current === 'contact' ? 'contactPage' : 'notFound')} — Zed Li`;
  }
  document.body.classList.toggle('dark', theme === 'dark');
  document.getElementById('theme').textContent = theme === 'dark' ? '☀' : '☾';
  document.getElementById('theme').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark', theme === 'dark');
    document.getElementById('theme').textContent = theme === 'dark' ? '☀' : '☾';
    save('zed-theme', theme);
  });
  document.getElementById('language').addEventListener('click', () => {
    lang = lang === 'en' ? 'zh' : 'en';
    save('zed-language', lang);
    render();
  });
  app.addEventListener('click', (event) => {
    const target = event.target.closest('[data-missing]');
    if (!target) return;
    if (target.tagName === 'A') event.preventDefault();
    notify(
      t(
        target.dataset.missing === 'resume'
          ? 'resumeMissing'
          : target.dataset.missing === 'email'
            ? 'emailMissing'
            : 'linkMissing',
      ),
    );
  });
  window.addEventListener('hashchange', () => {
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  render();
})();
