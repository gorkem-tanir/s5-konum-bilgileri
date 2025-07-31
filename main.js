import axios from "axios";

// Aşağıdaki Fonksiyonu değiştirmeyin.
async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

const ipAdresim = await ipAdresimiAl();
console.log(ipAdresim);

/*
  AMAÇ:
  - location_card.png dosyasındakine benzer dinamik bir card oluşturmak.
  - HTML ve CSS hazır, önce IP adresini, sonra bunu kullanarak diğer bilgileri alacağız.

	ADIM 1: IP kullanarak verileri almak
  getData fonskiyonunda axios kullanarak şu adrese GET sorgusu atacağız: https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen datayı geri dönmeli.

  Not: Request sonucu gelen datayı browserda network tabından inceleyin.
  İpucu: Network tabıından inceleyemezseniz GET isteklerini gönderdiğiniz URL'i direkt browserda açabildiğinizi unutmayın. 😉

  Bu fonksiyonda return ettiğiniz veri, Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor. Bu yüzden, veride hangi key-value çiftleri olduğunu inceleyin.
*/

async function getData() {
  return await axios
    .get("https://apis.ergineer.com/ipgeoapi/212.252.116.104")
    .then((response) => {
      return response.data;
    });
}

/*
	ADIM 2: Alınan veriyi sayfada gösterecek componentı oluşturmak
  getData ile aldığımız konum bazlı veriyi sayfada göstermek için cardOlustur fonskiyonu kullanılacak. DOM metodlarını ve özelliklerini kullanarak aşağıdaki yapıyı oluşturun ve dönün (return edin).

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';

	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

function cardOlustur(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = "https://flaglog.com/codes/standardized-rectangle-120px/TR.png";

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const header = document.createElement("h3");
  header.classList.add("ip");
  header.textContent = data.sorgu;

  const paragraph1 = document.createElement("p");
  paragraph1.classList.add("ulke");
  paragraph1.textContent = `${data.ülke} (${data.ülkeKodu})`;

  const paragraph2 = document.createElement("p");
  paragraph2.textContent = `Enlem: ${data.enlem} - Boylam: ${data.boylam}`;

  const paragraph3 = document.createElement("p");
  paragraph3.textContent = `Şehir: ${data.şehir}`;

  const paragraph4 = document.createElement("p");
  paragraph4.textContent = `Saat dilimi: ${data.saatdilimi}`;

  const paragraph5 = document.createElement("p");
  paragraph5.textContent = `Para birimi: ${data.parabirimi}`;

  const paragraph6 = document.createElement("p");
  paragraph6.textContent = `ISP: ${data.isp}`;

  cardInfo.appendChild(header);
  cardInfo.appendChild(paragraph1);
  cardInfo.appendChild(paragraph2);
  cardInfo.appendChild(paragraph3);
  cardInfo.appendChild(paragraph4);
  cardInfo.appendChild(paragraph5);
  cardInfo.appendChild(paragraph6);

  card.appendChild(image);
  card.appendChild(cardInfo);

  return card;
}

// Buradan sonrasını değiştirmeyin, burası yazdığınız kodu sayfaya uyguluyor.
getData().then((response) => {
  const cardContent = cardOlustur(response);
  const container = document.querySelector(".container");
  container.appendChild(cardContent);
});
