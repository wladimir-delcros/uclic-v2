(function () {
  try {
    var t = localStorage.getItem('theme');
    var c = t === 'light' ? 'light' : 'dark';
    var r = document.documentElement;
    r.classList.add(c);
    r.style.colorScheme = c;
  } catch (e) {}
})();
