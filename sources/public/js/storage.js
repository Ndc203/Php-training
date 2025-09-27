(function(){
  const NS = 'app.'; // prefix để tránh trùng key

  function set(key, value, useSession=false){
    const store = useSession ? sessionStorage : localStorage;
    try {
      store.setItem(NS+key, JSON.stringify(value));
    } catch (e) {
      console.warn('Lưu Storage thất bại', e);
    }
  }

  function get(key, useSession=false){
    const store = useSession ? sessionStorage : localStorage;
    try {
      const raw = store.getItem(NS+key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Đọc Storage thất bại', e);
      return null;
    }
  }

  function remove(key){
    try { localStorage.removeItem(NS+key); } catch(e){}
    try { sessionStorage.removeItem(NS+key); } catch(e){}
  }

  function clearAll(){
    // tốt hơn: copy danh sách key rồi mới xoá
    const lsKeys = [];
    for (let i = 0; i < localStorage.length; i++){
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) lsKeys.push(k);
    }
    lsKeys.forEach(k => { try{ localStorage.removeItem(k); }catch(e){} });

    const ssKeys = [];
    for (let i = 0; i < sessionStorage.length; i++){
      const k = sessionStorage.key(i);
      if (k && k.startsWith(NS)) ssKeys.push(k);
    }
    ssKeys.forEach(k => { try{ sessionStorage.removeItem(k); }catch(e){} });
  }

  window.AppStorage = { set, get, remove, clearAll };
})();
