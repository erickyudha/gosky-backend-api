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
      'JAKARTA': 'Jakarta atau secara resmi bernama Daerah Khusus Ibukota Jakarta (disingkat DKI Jakarta) adalah ibu kota negara dan kota terbesar di Indonesia. Menurut sistem pembagian administratif Indonesia, Jakarta merupakan provinsi dengan status daerah khusus. Sementara menurut pengertian secara umum, Jakarta merupakan kota metropolitan. Jakarta terletak di pesisir bagian barat laut Pulau Jawa. Dahulu pernah dikenal dengan beberapa nama di antaranya Sunda Kelapa, Jayakarta, dan Batavia. Jakarta juga mempunyai julukan The Big Durian karena dianggap kota yang sebanding New York City (Big Apple) di Indonesia.',
      'DENPASAR': 'Denpasar adalah ibu kota Provinsi Bali yang sekaligus menjadi pusat pemerintahan dan perekonomian dari Provinsi Bali. Denpasar juga merupakan sebuah wilayah kota yang terletak di Provinsi Bali, Indonesia. Denpasar adalah kota terbesar di Kepulauan Nusa Tenggara dan kota terbesar kedua di wilayah Indonesia Timur setelah Kota Makassar. Pertumbuhan industri pariwisata di Pulau Bali mendorong kota Denpasar menjadi pusat kegiatan bisnis, dan menempatkan kota ini sebagai daerah yang memiliki pendapatan per kapita dan pertumbuhan tinggi di provinsi Bali.',
      'YOGYAKARTA': 'Daerah Istimewa Yogyakarta adalah Daerah Istimewa setingkat provinsi di Indonesia yang merupakan peleburan Negara Kesultanan Yogyakarta dan Negara Kadipaten Paku Alaman. Daerah Istimewa Yogyakarta terletak di bagian selatan Pulau Jawa, dan berbatasan dengan Provinsi Jawa Tengah dan Samudra Hindia.',
      'SURABAYA': 'Kota Surabaya adalah ibu kota Provinsi Jawa Timur yang menjadi pusat pemerintahan dan perekonomian dari Provinsi Jawa Timur sekaligus kota metropolitan terbesar di provinsi tersebut. Surabaya juga merupakan sebuah kota yang terletak di Provinsi Jawa Timur, Indonesia. Surabaya juga merupakan kota terbesar kedua di Indonesia setelah Jakarta.',
      'MEDAN': 'Medan adalah ibu kota provinsi Sumatra Utara, Indonesia. Kota ini merupakan kota terbesar ketiga di Indonesia setelah DKI Jakarta dan Surabaya serta kota terbesar di luar pulau Jawa, sekaligus terbesar di Pulau Sumatra. Kota Medan merupakan pintu gerbang wilayah Indonesia bagian barat dengan keberadaan Pelabuhan Belawan dan Bandar Udara Internasional Kualanamu yang merupakan bandara terbesar kedua di Indonesia. Akses dari pusat kota menuju pelabuhan dan bandara dilengkapi oleh jalan tol dan kereta api. Medan adalah kota pertama di Indonesia yang mengintegrasikan bandara dengan kereta api. Berbatasan dengan Selat Malaka, Medan menjadi kota perdagangan, industri, dan bisnis yang sangat penting di Indonesia',
      'SOLO': 'Surakarta atau Solo adalah kota di Jawa Tengah, Indonesia. Kota ini merupakan kota terbesar ketiga di pulau Jawa bagian Selatan setelah Bandung dan Malang menurut jumlah penduduk. Sisi Timur kota ini dilewati sungai yang terabadikan dalam salah satu lagu keroncong, Bengawan Solo. Kota ini termasuk dalam kawasan Solo Raya, sebagai kota utama.',
      'SEMARANG': 'Semarang adalah ibu kota Provinsi Jawa Tengah, Indonesia yang sekaligus menjadi pusat pemerintahan dan perekonomian dari Provinsi Jawa Tengah. Dalam beberapa tahun terakhir, perkembangan Semarang yang signifikan ditandai pula dengan munculnya beberapa gedung pencakar langit yang tersebar di penjuru kota dan penataan kota dengan dibangunnya tempat-tempat ramah pejalan kaki. Perkembangan regional ini menunjukan peran strategis Kota Semarang terhadap roda perekonomian nasional.',
      'PADANG': 'Padang adalah kota terbesar di pantai barat Pulau Sumatra sekaligus ibu kota Provinsi Sumatra Barat, Indonesia. Kota ini adalah pintu gerbang barat Indonesia dari Samudra Hindia. Sejarah Kota Padang tidak terlepas dari peranannya sebagai kawasan rantau Minangkabau, yang berawal dari perkampungan nelayan di muara Batang Arau lalu berkembang menjadi bandar pelabuhan yang ramai setelah masuknya Belanda di bawah bendera Vereenigde Oostindische Compagnie (VOC).',
      'MAKASSAR': 'Makassar adalah ibu kota provinsi Sulawesi Selatan, Indonesia. Kota yang sejak 1971 hingga 1999 dikenal secara resmi sebagai Ujung Pandang. Secara demografis, kota ini tergolong tipe multi etnik atau multi kultur dengan beragam suku bangsa yang menetap di dalamnya, di antaranya yang signifikan jumlahnya adalah Suku Makassar, Bugis, Toraja, Mandar, Buton, Jawa, dan Tionghoa. Makanan khas Makassar yang umum dijumpai di pelosok kota adalah Coto Makassar, Roti Maros, Jalangkote, Bassang, Kue Tori, Palubutung, Pisang Ijo, Sop Saudara dan Sop Konro.',
      'PONTIANAK': 'Pontianak adalah ibu kota Provinsi Kalimantan Barat, Indonesia yang sekaligus menjadi pusat pemerintahan dan perekonomian dari Provinsi Kalimantan Barat. Kota ini berada di garis khatulistiwa, sehingga dikenal luas sebagai Kota Khatulistiwa (Kota Khatulistiwa). Pusat kota kurang dari 3 km selatan khatulistiwa.',
      'BANJARMASIN': 'Banjarmasin adalah kota terbesar di Kalimantan Selatan, yang berada di Indonesia. Kota ini pernah menjadi ibu kota provinsi Kalimantan (1945–1956) dan provinsi Kalimantan Selatan (1956–2022). Kota Banjarmasin yang dijuluki Kota Seribu Sungai ini memiliki wilayah seluas 98,46 km² yang wilayahnya merupakan delta atau kepulauan yang terdiri dari sekitar 25 buah pulau kecil (delta) yang dipisahkan oleh sungai-sungai di antaranya Pulau Tatas, Pulau Kelayan, Pulau Rantauan Keliling, Pulau Insan, Pulau Kembang, Pulau Bromo dan lain-lain.',
      'PALEMBANG': 'Palembang adalah ibu kota provinsi Sumatra Selatan, Indonesia. Sejarah Palembang yang pernah menjadi ibu kota kerajaan bahari Buddha terbesar di Asia Tenggara pada saat itu, Kedatuan Sriwijaya, yang mendominasi Nusantara dan Semenanjung Malaya pada abad ke-9 membuat kota ini dikenal dengan julukan "Bumi Sriwijaya".',
      'BANDUNG': 'Bandung adalah ibu kota Provinsi Jawa Barat yang sekaligus menjadi pusat pemerintahan dan perekonomian dari Provinsi Jawa Barat, Indonesia. Kota Bandung juga merupakan kota terbesar ketiga di Indonesia setelah Jakarta dan Surabaya. Kota kembang merupakan sebutan lain untuk kota ini, karena pada zaman dahulu kota ini dinilai sangat cantik dengan banyaknya pohon dan bunga-bunga yang tumbuh di sana. Selain itu Bandung dahulunya disebut juga dengan Paris van Java karena keindahannya.',
      'JAYAPURA': 'Kota Jayapura adalah sebuah kota dan juga ibu kota dari provinsi Papua, Indonesia. Kota ini merupakan ibu kota provinsi yang terletak paling Timur di Indonesia, dan berbatasan langsung dengan negara tetangga Papua Nugini, yang terletak di teluk Jayapura. Kota ini didirikan oleh Kapten Infanteri F.J.P. Sachse dari kerajaan Belanda pada 7 Maret 1910.',
    };
    const categoryList = ['ONE_WAY', 'ROUND_TRIP'];

    const ticketArr = [];
    categoryList.forEach((category) => {
      cityList.forEach((city) => {
        cityList.forEach((city2) => {
          if (city !== city2) {
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
              description: cityDescPair[city] + '\n\n\n\n' + cityDescPair[city2],
              createdBy: 1,
              updatedBy: 1,
              createdAt: dayjs().toISOString(),
              updatedAt: dayjs().toISOString(),
            });
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
