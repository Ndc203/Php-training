(function(){
  function read(key){
    const NS = 'app.';
    try {
      const ls = localStorage.getItem(NS+key) || sessionStorage.getItem(NS+key);
      return ls ? JSON.parse(ls) : null;
    } catch(e){ return null; }
  }

  const ok = !!(read('isLoggedIn'));
  if (!ok){
    const back = encodeURIComponent(location.pathname + location.search);
    location.href = `/sources/login.php?next=${back}`;
  }
})();