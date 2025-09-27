(function(){
  const K = {
    isLoggedIn: 'isLoggedIn',
    user: 'user',
    loginAt: 'loginAt'
    // ❌ Bỏ sessionId (không dùng cookie nữa)
  };

  async function ajaxLogin(url, payload){
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Đăng nhập lỗi');
    return res.json();
  }

  document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('#loginForm');
    if (!form) return;
    const remember = form.querySelector('input[name="remember"]');

    form.addEventListener('submit', async function(ev){
      ev.preventDefault(); // ✅ xử lý bằng fetch
      const username = form.querySelector('input[name="username"]').value.trim();
      const password = form.querySelector('input[name="password"]').value;

      try {
        const data = await ajaxLogin('/auth/login.php', { username, password });
        if (!data.success) throw new Error(data.message || 'Sai tài khoản/mật khẩu');

        const user = data.user || { username };
        const logged = { id: user.id, username: user.username };

        // ✅ Lưu vào LocalStorage (hoặc SessionStorage nếu tick "remember")
        AppStorage.set(K.isLoggedIn, true, !remember?.checked);
        AppStorage.set(K.user, logged, !remember?.checked);
        AppStorage.set(K.loginAt, new Date().toISOString(), !remember?.checked);

        // ❌ Đoạn lấy PHPSESSID bị bỏ vì không còn cookie
        // const phpsessid = getCookie('PHPSESSID');
        // if (phpsessid) AppStorage.set(K.sessionId, phpsessid, true);

        window.location.href = '/sources/list_users.php';
      } catch (e){
        alert('Đăng nhập thất bại: '+ e.message);
      }
    });
  });

  window.AppAuth = {
    markLoggedIn(user){
      AppStorage.set('isLoggedIn', true);
      AppStorage.set('user', user || {});
      AppStorage.set('loginAt', new Date().toISOString());
      // ❌ Bỏ lưu sessionId
    },
    logout(){
      AppStorage.clearAll();
      window.location.href = '/sources/login.php';
    }
  };
})();
