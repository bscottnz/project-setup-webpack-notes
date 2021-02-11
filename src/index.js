import './main.scss';
import source from './assets/cat3.jpeg';

const imgContainer = document.querySelector('.img3 .img-container');
const img = document.createElement('img');
img.src = source;
imgContainer.append(img);
