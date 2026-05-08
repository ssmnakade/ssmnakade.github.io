// ダークモード
(function () {
  const btn = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateIcon(theme);
  if (btn) btn.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', theme); updateIcon(theme); });
  function updateIcon(t) {
    if (!btn) return;
    btn.setAttribute('aria-label', t === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
    btn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// note RSS 自動取得（rss2json.com経由でCORSを回避）
(function () {
  const RSS_URL = 'https://note.com/ssmnakade/rss';
  const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(RSS_URL) + '&count=3';
  const container = document.getElementById('noteCards');
  const loading = document.getElementById('noteLoading');
  const allCard = document.getElementById('noteCardAll');

  if (!container) return;

  function formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
    } catch (e) {
      return '';
    }
  }

  fetch(API_URL)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (loading) loading.remove();
      if (!data.items || data.items.length === 0) return;

      data.items.forEach(function (item, i) {
        const card = document.createElement('a');
        card.href = item.link;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'note-card';
        card.innerHTML =
          '<div class="note-card-body">' +
            '<p class="note-card-label">' + (i === 0 ? '最新記事' : '記事') + '</p>' +
            '<h3>' + item.title + '</h3>' +
            '<p class="note-card-meta">中出進 · ' + formatDate(item.pubDate) + '</p>' +
          '</div>' +
          '<div class="note-card-arrow" aria-hidden="true">→</div>';
        container.insertBefore(card, allCard);
      });

      const newCards = container.querySelectorAll('.note-card:not(.note-card--all)');
      newCards.forEach(function (el) { el.classList.add('fade-up'); });
      applyFadeIn(newCards);
    })
    .catch(function () {
      if (loading) {
        loading.innerHTML = '<p><a href="https://note.com/ssmnakade" target="_blank" rel="noopener noreferrer">noteで最新記事を読む →</a></p>';
      }
    });
})();

// フェードインアニメーション
function applyFadeIn(els) {
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('is-visible'); }, i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { obs.observe(el); });
}

(function () {
  const els = document.querySelectorAll('.profile-grid, .notify-box');
  els.forEach(function (el) { el.classList.add('fade-up'); });
  applyFadeIn(els);
})();

// 登録フォーム（デモ）
(function () {
  const form = document.getElementById('notifyForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = '登録しました';
    btn.disabled = true;
    btn.style.background = '#437a22';
    btn.style.borderColor = '#437a22';
  });
})();
