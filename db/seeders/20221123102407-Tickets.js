/* eslint-disable max-len */
'use strict';

const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {


  up: (queryInterface, Sequelize) => {
    const generateRand3Digit = () => {
      return '' + Math.floor(100 + Math.random() * 900);
    };
    const generateRand1Digit = () => {
      return '' + Math.floor(1 + Math.random() * 9);
    };
    const generateRandMinutes = () => {
      return Math.floor(30 + Math.random() * 90);
    };
    const IMG_PLACEHOLDER = 'https://res.cloudinary.com/dgjwtquka/image/upload/v1672666097/gosky/airplane_u2rj44.jpg';
    const cityList = [
      'JAKARTA', 'DENPASAR', 'YOGYAKARTA', 'SURABAYA',
      'MEDAN', 'SOLO', 'SEMARANG', 'PADANG', 'MAKASSAR',
      'PONTIANAK', 'BANJARMASIN', 'PALEMBANG',
      'BANDUNG', 'JAYAPURA',
    ];
    const cityDescPair = {
      'JAKARTA': 'Jakarta pernah dikenal dengan beberapa nama di antaranya Sunda Kelapa, Jayakarta, dan Batavia. Jakarta juga mempunyai julukan The Big Durian karena dianggap kota yang sebanding New York City (Big Apple) di Indonesia.',
      'DENPASAR': 'Denpasar adalah kota terbesar di Bali. Pertumbuhan pariwisata Bali mendorong Denpasar menjadi pusat kegiatan bisnis, dan menempatkan kota ini sebagai daerah yang memiliki pertumbuhan tinggi di Bali.',
      'YOGYAKARTA': 'Yogyakarta merupakan peleburan Negara Kesultanan Yogyakarta dan Negara Kadipaten Paku Alaman. Daerah Istimewa Yogyakarta terletak di bagian selatan Pulau Jawa, dan berbatasan dengan Provinsi Jawa Tengah dan Samudra Hindia.',
      'SURABAYA': 'Surabaya merupakan sebuah kota yang terletak di Provinsi Jawa Timur, Indonesia. Surabaya juga merupakan kota terbesar kedua di Indonesia setelah Jakarta.',
      'MEDAN': 'Medan merupakan kota terbesar ketiga di Indonesia dan merupakan pintu gerbang wilayah Indonesia barat. Berbatasan dengan Selat Malaka, Medan menjadi kota perdagangan, industri, dan bisnis yang sangat penting di Indonesia',
      'SOLO': 'Surakarta atau Solo merupakan kota yang dilewati sungai yang terabadikan dalam salah satu lagu keroncong, Bengawan Solo. Kota ini termasuk dalam kawasan Solo Raya, sebagai kota utama.',
      'SEMARANG': 'Semarang ditandai dengan munculnya beberapa gedung pencakar langit yang tersebar di penjuru kota dan penataan kota dengan dibangunnya tempat-tempat ramah pejalan kaki.',
      'PADANG': 'Padang tidak terlepas dari peranannya sebagai kawasan rantau Minangkabau, yang berawal dari perkampungan nelayan di muara Batang Arau lalu berkembang menjadi bandar pelabuhan yang ramai setelah masuknya Belanda.).',
      'MAKASSAR': 'Makassar dikenal secara resmi sebagai Ujung Pandang. Kota ini tergolong tipe multi etnik atau multi kultur dengan beragam suku bangsa yang menetap di dalamnya',
      'PONTIANAK': 'Pontianak dikenal luas sebagai Kota Khatulistiwa karena pusat kota yang kurang dari 3 km selatan khatulistiwa.',
      'BANJARMASIN': 'Banjarmasin yang dijuluki Kota Seribu Sungai ini merupakan kepulauan yang terdiri dari sekitar 25 buah pulau kecil (delta) yang dipisahkan oleh sungai-sungai.',
      'PALEMBANG': 'Palembang pernah menjadi ibu kota kerajaan bahari Buddha terbesar di Asia Tenggara pada saat itu, Kedatuan Sriwijaya, membuat kota ini dikenal dengan julukan "Bumi Sriwijaya".',
      'BANDUNG': 'Bandung atau Kota kembang sebutan lain untuk kota ini, dinilai sangat cantik dengan banyaknya pohon dan bunga-bunga yang tumbuh di sana. Selain itu Bandung dahulunya disebut juga dengan Paris van Java karena keindahannya.',
      'JAYAPURA': 'Jayapura merupakan ibu kota provinsi yang terletak paling Timur di Indonesia, dan berbatasan langsung dengan negara tetangga Papua Nugini, yang terletak di teluk Jayapura.',
    };
    const categoryList = ['ONE_WAY', 'ROUND_TRIP'];

    const ticketArr = [];
    categoryList.forEach((category) => {
      cityList.forEach((city) => {
        cityList.forEach((city2) => {
          if (city !== city2) {
            for (let i = 0; i < 2; i++) {
              const flightNumber =
                city.charAt(0) + city2.charAt(0) + generateRand3Digit();
              const now = dayjs().add(generateRand1Digit(), 'day');
              const returnTime =
                now.add(generateRand1Digit(), 'day').toISOString();
              ticketArr.push({
                category: category,
                from: city,
                to: city2,
                departureTime: now.toISOString(),
                returnTime: (category == 'ONE_WAY') ? null : returnTime,
                price: generateRand3Digit() + '000',
                duration: generateRandMinutes(),
                flightNumber,
                imageId: 'default',
                imageUrl: IMG_PLACEHOLDER,
                description: cityDescPair[city] + '\n\n' + cityDescPair[city2],
                createdBy: 1,
                updatedBy: 1,
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
              });
            }
          };
        });
      });
    });

    return queryInterface.bulkInsert('Tickets', ticketArr);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  },
};
