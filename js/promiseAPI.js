const output = document.getElementById('output');

const getData = url => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      resolve(response); // принято
    } else {
      reject(request.statusText); // отказано
    }
  });
  request.send();
});

const outputPhotos = data => {

  data.forEach(item => {
    output.insertAdjacentHTML('beforebegin',
      `<h4>${item.title}</h4>
      <img src="${item.thumbnailUrl}" alt=item.title}">`);
  });

};

//const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1');
const twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

// получаю url фото с сайта
Promise.all([oneImg, twoImg])
  .then(outputPhotos)
  .catch(error => console.error(error));
