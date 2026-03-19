// update-news.js
const fs = require('fs');

// دالة لجلب الأخبار من مصدر خارجي (API أو RSS)
async function fetchNews() {
  // مثال: جلب من API وهمي - يمكنك استبداله بأي مصدر
  const sources = [
    {
      title: "الجيش السيبراني اليمني",
      description: "هجمات جديدة على منشآت حيوية",
      tags: ["تهديد عالي", "APT"]
    },
    {
      title: "مجموعة أشباح غزة",
      description: "اختراق قواعد عسكرية إسرائيلية",
      tags: ["ساخن", "اختراق"]
    }
    // ... يمكنك إضافة مصادر حقيقية لاحقاً
  ];
  
  return sources.map((item, index) => ({
    id: index + 1,
    title: item.title,
    date: new Date().toISOString().split('T')[0],
    description: item.description,
    tags: item.tags,
    icon: "skull"
  }));
}

// تحديث ملف JSON
async function updateData() {
  try {
    const news = await fetchNews();
    
    // قراءة الملف الحالي (إذا وجد)
    let existingData = { news: [] };
    if (fs.existsSync('data.json')) {
      existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    }
    
    // دمج الأخبار القديمة مع الجديدة (مع تجنب التكرار)
    const allNews = [...news, ...existingData.news];
    
    // حفظ الملف
    fs.writeFileSync('data.json', JSON.stringify({ news: allNews }, null, 2));
    console.log('✅ تم تحديث الأخبار بنجاح');
  } catch (error) {
    console.error('❌ خطأ:', error);
    process.exit(1);
  }
}

updateData();
