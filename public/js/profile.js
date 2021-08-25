const user = {
    id: getCookie('userid')
};

if(user.id === null){
    window.location = '/';
}

fetch(`/api/user/${user.id}`)
.then(res => res.json())
.then(res => {
    user.username = res.name;
    user.nbrLikes = res.likesNbr;
    user.nbrDislikes = res.dislikesNbr;
    
    document.getElementById('username').textContent = user.username;
    document.getElementById('nbrLikes').textContent = user.nbrLikes;
    document.getElementById('nbrDislikes').textContent = user.nbrDislikes;
})


document.getElementById('btnDisconnect').addEventListener('click', () => {
    document.cookie = 'userid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC';
    window.location = '/';
})