'use strict';

const vidCont = document.querySelector('.app');
const errorCont = vidCont.querySelector('#error-message');
const controls = vidCont.querySelector('.controls');
const vid = document.createElement('video');
const audio = document.createElement('audio');
const canvas = document.createElement('canvas');

if (!navigator.mediaDevices) {
  errorCont.textContent = 'API not support';
}

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(stream => {
    controls.firstElementChild.addEventListener('click', takePhoto);
    controls.classList.toggle('visible');
    vidCont.insertBefore(vid, controls);
    vid.width = vidCont.clientWidth;
    vid.height = vidCont.clientHeight;
    vid.src = URL.createObjectURL(stream);
    audio.src = 'audio/click.mp3';
    audio.pause();

  })
  .catch(err => {
    errorCont.textContent = 'Нет доступа к камере';
    errorCont.classList.toggle('visible');
    console.log(err);
  });

function takePhoto(e) {
  audio.play();
  canvas.width = vid.videoWidth;
  canvas.height = vid.videoHeight;
  vid.style.display = 'none';
  vidCont.insertBefore(canvas, controls);
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  ctx.drawImage(vid, 0, 0);
  let src = canvas.toDataURL();

  const imgNodeProps = {
    name: 'figure',
    childs: [
      {
        name: 'img',
        props: {
          src: `${src}`
        }
      },
      {
        name: 'figcaption',
        childs: [
          {
            name: 'a',
            props: {
              href: `${src}`,
              download: 'snapshot.png'
            },
            childs: [
              {
                name: 'i',
                props: {
                  class: 'material-icons'
                },
                childs: ['file_download']
              }
            ]
          },
          {
            name: 'a',
            childs: [
              {
                name: 'i',
                props: {
                  class: 'material-icons'
                },
                childs: ['file_upload']
              }
            ]
          },
          {
            name: 'a',
            childs: [
              {
                name: 'i',
                props: {
                  class: 'material-icons'
                },
                childs: ['delete']
              }
            ]
          }
        ]
      }
    ]
  };

  const list = document.querySelector('.list');
  const imgNode = createElement(imgNodeProps);
  list.insertBefore(imgNode, list.firstElementChild);
  list.addEventListener('click', listAction);

  function listAction(e) {
    e.stopPropagation();
    let curListItem = e.target.parentElement.parentElement.parentElement;
    if (e.target.textContent === 'delete') {
      list.removeChild(curListItem);

    } else if (e.target.textContent === 'file_upload') {
      const curImg = curListItem.firstElementChild;
      const listCanvas = document.createElement('canvas');
      listCanvas.width = curImg.naturalWidth;
      listCanvas.height = curImg.naturalHeight;
      const listCtx = listCanvas.getContext('2d');
      listCtx.drawImage(curImg, 0, 0);

      const data = new FormData();
      listCanvas.toBlob((blob) => {
        data.append('image', blob);
        fetch('https://neto-api.herokuapp.com/photo-booth', {
          method: 'POST',
          body: data
        })
          .then(res => {
            return res.text()
          })
          .then(res => {
            console.log(res);
            e.target.parentNode.style.display = 'none';
          })
          .catch(err => console.log(err));
      });
    }
  }

  function createElement(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const element = document.createElement(node.name);
    if (typeof node.props === 'object' && node.props !== null) {
      Object.keys(node.props).forEach(i => element.setAttribute(i, node.props[i]));
    }
    if (node.childs) {
      node.childs.forEach(child => {
        if (typeof child === 'string') {
          element.textContent = child;
        } else {
          element.appendChild(createElement(child));
        }
      });
    }
    return element;
  }
}
