import { renderSearchMusic, renderSongs } from "./ui.js";
//* Inputa girilen veriye göre aratacağımızapi'nin keyi.
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b68b1970f9mshe36bbbd9583b3fep167494jsn692b5a8bed0c',
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
	}
};
//* Populer müzikleri getireceğimi api key.
const optionsTop = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b68b1970f9mshe36bbbd9583b3fep167494jsn692b5a8bed0c',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
	}
};

export class API {
constructor(){
this.songs =[];
}

//*Inpta girilen veriye göre api'den cevabı getirir.
async searchMusic(query){
  try{
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}=&locale=tr-TR&limit=5`,
    options
    );
     const data = await res.json();
  let newData = data.tracks.hits;
  newData = newData.map((song) => ({...song.track}));
  this.songs =newData;
  //*Ekrana apiden gelen her bir şarkıyı yazdıracağımız method
  renderSearchMusic(this.songs);
  }catch(err){
    console.log(err)
  }
}

async topPopular(){
const url = 
"https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry"
try {
  //*api'ye fetch isteği at
  const response = await fetch(url, optionsTop);
  //*veriyi json formatına çevir
  const result = await response.json();
  //* tanımladığımız song dizisine gelen evabı aktar.
 this.songs = result.tracks;
 renderSongs(this.songs);
} catch (error) {
  console.log(error);
}
}
}

