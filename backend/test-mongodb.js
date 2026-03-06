const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 MongoDB Bağlantı Testi\n');
console.log('Connection String:', process.env.MONGODB_URI);
console.log('\n⏳ Bağlanıyor...\n');

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000
})
  .then(() => {
    console.log('✅ MongoDB Atlas\'a başarıyla bağlandı!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('\n✨ Bağlantı başarılı! Backend çalışmaya hazır.\n');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB bağlantı hatası:\n');
    console.error('Hata Tipi:', err.name);
    console.error('Hata Mesajı:', err.message);
    console.error('\n📋 Kontrol Listesi:');
    console.error('1. MongoDB Atlas cluster\'ı "Active" durumda mı?');
    console.error('2. Network Access\'te 0.0.0.0/0 ekli mi?');
    console.error('3. Database user şifresi doğru mu?');
    console.error('4. Connection string doğru mu?');
    console.error('\nDetaylı bilgi için: MONGODB-CLUSTER-KONTROL.md\n');
    process.exit(1);
  });
