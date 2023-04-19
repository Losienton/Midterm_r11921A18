// 檢查是否已登入，若已登入則顯示相應的頁面元素
function checkLogin() {
    const username = getCookie('username');
    if (username) {
        // 已登入
        document.querySelector('nav ul li:nth-child(2)').style.display = 'none'; // 隱藏註冊連結
        document.querySelector('nav ul li:nth-child(3)').style.display = 'none'; // 隱藏登入連結
        document.querySelector('nav ul li.upload').style.display = 'block'; // 顯示上傳頭像連結
        document.querySelector('nav ul li.message-board').style.display = 'block'; // 顯示留言板連結
    } else {
        // 未登入
        document.querySelector('nav ul li:nth-child(2)').style.display = 'block'; // 顯示註冊連結
        document.querySelector('nav ul li:nth-child(3)').style.display = 'block'; // 顯示登入連結
        document.querySelector('nav ul li.upload').style.display = 'none'; // 隱藏上傳頭像連結
        document.querySelector('nav ul li.message-board').style.display = 'none'; // 隱藏留言板連結
    }
}

// 當頁面加載完成後執行檢查登入狀態的函數
document.addEventListener('DOMContentLoaded', checkLogin);

// 登入功能
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = this.elements.username.value;
        const password = this.elements.password.value;
        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }
        // 模擬登入，實際應該向後端發送登入請求
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(function (u) {
            return u.username === username && u.password === password;
        });
        if (user) {
            setCookie('username', username);
            alert('Login successful.');
            checkLogin(); // 更新頁面元素顯示
        } else {
            alert('Username or password is incorrect.');
        }
    });
}

// 註冊功能
const registerForm = document.querySelector('#register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = this.elements.username.value;
        const password = this.elements.password.value;
        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }
        // 模擬註冊，實際應該向後端發送註冊請求
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(function (u) {
            return u.username === username;
        });
        if (existingUser) {
            alert('Username already exists.');
        } else {
            const newUser = { username: username, password: password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Register successful.');
            location.href = 'login.html';
        }
    });
}// 上傳頭像功能
const avatarForm = document.querySelector('#avatar-form');
if (avatarForm) {
    avatarForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = getCookie('username');
        if (!username) {
            alert('Please login to upload avatar.');
            return;
        }
        const avatarFile = this.elements.avatar.files[0];
        if (!avatarFile) {
            alert('Please select a file to upload.');
            return;
        }
        // 模擬上傳頭像，實際應該向後端發送上傳請求
        alert('Avatar uploaded successfully.');
    });
}

// 留言功能
const commentForm = document.querySelector('#comment-form');
if (commentForm) {
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = getCookie('username');
        if (!username) {
            alert('Please login to leave a comment.');
            return;
        }
        const comment = this.elements.comment.value;
        if (comment === '') {
            alert('Please enter a comment.');
            return;
        }
        const commentsDiv = document.querySelector('.comments');
        const newCommentDiv = document.createElement('div');
        newCommentDiv.classList.add('comment');
        const avatarImg = document.createElement('img');
        avatarImg.src = getCookie('avatar') || 'default-avatar.png';
        newCommentDiv.appendChild(avatarImg);
        const commentP = document.createElement('p');
        commentP.textContent = username + ': ' + comment;
        newCommentDiv.appendChild(commentP);
        commentsDiv.appendChild(newCommentDiv);
        this.reset();
    });
}

// 登出功能
const logoutLink = document.querySelector('#logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        deleteCookie('username');
        deleteCookie('avatar');
        alert('Logout successful.');
        checkLogin(); // 更新頁面元素顯示
    });
}

// 設置cookie
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires + ';path=/';
}

// 獲取cookie
function getCookie(name) {
    const cookieStr = document.cookie;
    if (cookieStr) {
        const cookies = cookieStr.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
    }
    return null;
}

// 刪除cookie
function deleteCookie(name) {
    setCookie(name, '', -1);
}