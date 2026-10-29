// Picks Turkish or English: ?lang= in the address wins, then the last choice, then the browser language.
(function () {
  var param = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('playmoon-lang'); } catch (e) {}
  var lang = param === 'tr' || param === 'en' ? param : saved || ((navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en');
  try { localStorage.setItem('playmoon-lang', lang); } catch (e) {}
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.lang = lang;

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.langs a').forEach(function (a) {
      a.setAttribute('aria-current', String(a.dataset.set === lang));
    });
    // keep the chosen language when moving between pages
    document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
      var url = new URL(a.getAttribute('href'), location.href);
      url.searchParams.set('lang', lang);
      a.setAttribute('href', url.pathname + url.search);
    });
    var title = document.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.content;
  });
})();
