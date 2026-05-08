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

// フェードインアニメーション
(function () {
  const els = document.querySelectorAll('.note-card, .profile-grid, .notify-box');
  els.forEach(el => el.classList.add('fade-up'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('is-visible'), i * 80); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
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
