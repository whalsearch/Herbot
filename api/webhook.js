const TOKEN = process.env.BALE_BOT_TOKEN;
const USDA_KEY = process.env.USDA_API_KEY || "DEMO_KEY";

// ==========================================
// دسته‌بندی‌ها
// ==========================================
const CATEGORIES = {
  "گوارش": "🌿 گیاهان مفید برای گوارش",
  "قلب": "❤️ گیاهان مفید برای قلب و عروق",
  "اعصاب": "🧠 گیاهان آرام‌بخش و اعصاب",
  "تنفسی": "🫁 گیاهان مفید برای تنفس",
  "پوست": "✨ گیاهان مفید برای پوست و مو",
  "مفاصل": "🦴 گیاهان مفید برای مفاصل",
  "ایمنی": "🛡️ گیاهان تقویت‌کننده ایمنی",
  "کبد": "🫀 گیاهان مفید برای کبد",
  "کلیه": "💧 گیاهان مفید برای کلیه",
  "زنان": "🌸 گیاهان مفید برای بانوان",
  "دیابت": "🩸 گیاهان مفید برای قند خون",
  "چشم": "👁️ گیاهان مفید برای چشم"
};

// ==========================================
// دیتابیس گیاهان (با دسته‌بندی)
// ==========================================
const HERBS = {
  // ============ گوارش ============
  "زنجبیل": { en: "ginger", cat: "گوارش", props: "ضد تهوع، ضد التهاب، بهبود هضم، تقویت ایمنی، کاهش درد مفاصل" },
  "نعنا": { en: "mint", cat: "گوارش", props: "بهبود هضم، تسکین سردرد، رفع نفخ، ضد تهوع" },
  "رازیانه": { en: "fennel", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، تقویت ایمنی، کاهش اشتها" },
  "شوید": { en: "dill", cat: "گوارش", props: "بهبود گوارش، آرام‌بخش، ضد نفخ، کاهش کلسترول" },
  "زیره": { en: "cumin", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، تقویت ایمنی، کاهش قند خون" },
  "هل": { en: "cardamom", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، خوشبوکننده دهان، تقویت قلب" },
  "زردچوبه": { en: "turmeric", cat: "گوارش", props: "ضد التهاب قوی، آنتی‌اکسیدان، سلامت کبد، بهبود گوارش" },
  "بابونه": { en: "chamomile", cat: "گوارش", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب، درمان گوارشی" },
  "خاکشیر": { en: "plantain", cat: "گوارش", props: "بهبود گوارش، خنک‌کننده، ضد یبوست، سلامت کبد" },
  "بارهنگ": { en: "psyllium", cat: "گوارش", props: "بهبود گوارش، ضد یبوست، کاهش کلسترول، سلامت روده" },
  "انیسون": { en: "anise", cat: "گوارش", props: "ضد نفخ، بهبود گوارش، ضد سرفه، آرام‌بخش" },
  "بادرنجبویه": { en: "lemon balm", cat: "گوارش", props: "آرام‌بخش، بهبود گوارش، ضد اضطراب، بهبود خواب" },
  "سنا": { en: "senna", cat: "گوارش", props: "ملین طبیعی، ضد یبوست، پاکسازی روده" },
  "گل ختمی": { en: "marshmallow", cat: "گوارش", props: "ضد التهاب گوارشی، بهبود زخم معده، ضد سرفه" },

  // ============ قلب و عروق ============
  "سیر": { en: "garlic", cat: "قلب", props: "کاهش فشار خون، کاهش کلسترول، ضد سرطان، تقویت ایمنی" },
  "زالزالک": { en: "hawthorn", cat: "قلب", props: "سلامت قلب، کاهش فشار خون، آرام‌بخش، تقویت ایمنی" },
  "دارچین": { en: "cinnamon", cat: "قلب", props: "کاهش قند خون، ضد التهاب، آنتی‌اکسیدان، بهبود گوارش" },
  "زعفران": { en: "saffron", cat: "قلب", props: "ضد افسردگی، تقویت ایمنی، سلامت قلب، بهبود خلق" },
  "انار": { en: "pomegranate", cat: "قلب", props: "سلامت قلب، کاهش فشار خون، ضد التهاب، پیشگیری از سرطان" },
  "چغندر": { en: "beet", cat: "قلب", props: "کاهش فشار خون، تقویت ورزشکاری، سم‌زدایی کبد، تقویت ایمنی" },
  "گوجه": { en: "tomato", cat: "قلب", props: "پیشگیری از سرطان پروستات، سلامت قلب، کاهش التهاب" },
  "انگور": { en: "grape", cat: "قلب", props: "آنتی‌اکسیدان، سلامت قلب، کاهش فشار خون، تقویت ایمنی" },
  "زیتون": { en: "olive", cat: "قلب", props: "سلامت قلب، کاهش التهاب، آنتی‌اکسیدان، کاهش کلسترول" },
  "کنگر فرنگی": { en: "artichoke", cat: "قلب", props: "کاهش کلسترول، سلامت کبد، بهبود گوارش، آنتی‌اکسیدان" },
  "قره قاط": { en: "bilberry", cat: "قلب", props: "سلامت قلب، بهبود گردش خون، سلامت چشم، آنتی‌اکسیدان" },
  "شنبلیله": { en: "fenugreek", cat: "قلب", props: "کاهش قند خون، کاهش کلسترول، تقویت ایمنی، افزایش شیر مادران" },

  // ============ اعصاب و روان ============
  "اسطوخودوس": { en: "lavender", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب، ضد التهاب" },
  "سنبل الطیب": { en: "valerian", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب، ضد اسپاسم" },
  "گل گاوزبان": { en: "borage", cat: "اعصاب", props: "آرام‌بخش، ضد التهاب، سلامت کبد، تقویت ایمنی" },
  "رزماری": { en: "rosemary", cat: "اعصاب", props: "تقویت حافظه، آنتی‌اکسیدان، ضد التهاب، بهبود گردش خون" },
  "مریم گلی": { en: "sage", cat: "اعصاب", props: "آرام‌بخش، بهبود گوارش، ضد التهاب، سلامت دهان" },
  "بادرنجبویه": { en: "lemon balm", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، ضد اضطراب، بهبود گوارش" },
  "جینسینگ": { en: "ginseng", cat: "اعصاب", props: "تقویت انرژی، بهبود تمرکز، تقویت ایمنی، ضد خستگی" },
  "گل راعی": { en: "st johns wort", cat: "اعصاب", props: "ضد افسردگی، آرام‌بخش، بهبود خلق، ضد التهاب" },

  // ============ تنفسی ============
  "آویشن": { en: "thyme", cat: "تنفسی", props: "ضد باکتری، ضد سرفه، تقویت ایمنی، سلامت ریه" },
  "پونه": { en: "oregano", cat: "تنفسی", props: "ضد باکتری، ضد ویروس، تقویت ایمنی، سلامت ریه" },
  "زوفا": { en: "hyssop", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، بهبود تنفس، ضد التهاب" },
  "پرسیاوشان": { en: "maidenhair", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، بهبود تنفس، ضد التهاب" },
  "اکالیپتوس": { en: "eucalyptus", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، ضد احتقان، ضد باکتری" },
  "پیاز": { en: "onion", cat: "تنفسی", props: "ضد التهاب، ضد باکتری، تقویت ایمنی، سلامت قلب" },

  // ============ پوست و مو ============
  "گل محمدی": { en: "rose", cat: "پوست", props: "آرام‌بخش، سلامت پوست، بهبود گوارش، ضد التهاب" },
  "آلوئه ورا": { en: "aloe vera", cat: "پوست", props: "سلامت پوست، بهبود سوختگی، تقویت ایمنی، بهبود گوارش" },
  "گزنه": { en: "nettle", cat: "پوست", props: "سلامت پوست، تقویت مو، ضد التهاب، سلامت پروستات" },
  "جعفری": { en: "parsley", cat: "پوست", props: "سم‌زدایی، تقویت ایمنی، سلامت کلیه، سلامت پوست" },
  "همیشه بهار": { en: "calendula", cat: "پوست", props: "بهبود زخم، ضد التهاب پوستی، سلامت پوست، ضد قارچ" },
  "دم اسب": { en: "horsetail", cat: "پوست", props: "تقویت مو، تقویت ناخن، سلامت استخوان، سلامت پوست" },

  // ============ مفاصل و استخوان ============
  "پنجه گربه": { en: "cat's claw", cat: "مفاصل", props: "ضد التهاب مفاصل، تقویت ایمنی، سلامت گوارش، ضد ویروس" },
  "بید": { en: "willow", cat: "مفاصل", props: "ضد درد، ضد التهاب، کاهش تب، سلامت مفاصل" },
  "کنجد": { en: "sesame", cat: "مفاصل", props: "سلامت استخوان، تقویت مو، سلامت پوست، کاهش کلسترول" },

  // ============ ایمنی ============
  "سیاه دانه": { en: "black seed", cat: "ایمنی", props: "تقویت ایمنی، ضد التهاب، سلامت کبد، ضد حساسیت" },
  "اکیناسه": { en: "echinacea", cat: "ایمنی", props: "تقویت ایمنی، پیشگیری از سرماخوردگی، ضد التهاب" },
  "شیرین بیان": { en: "licorice", cat: "ایمنی", props: "تقویت ایمنی، بهبود گوارش، ضد التهاب، ضد ویروس" },
  "پرتقال": { en: "orange", cat: "ایمنی", props: "پیشگیری از سرماخوردگی، کاهش فشار خون، ضد التهاب، سلامت پوست" },
  "لیمو": { en: "lemon", cat: "ایمنی", props: "کمک به هضم، ضد سنگ کلیه، سلامت پوست، تقویت ایمنی" },

  // ============ کبد ============
  "خار مریم": { en: "milk thistle", cat: "کبد", props: "سلامت کبد، سم‌زدایی، آنتی‌اکسیدان، تقویت ایمنی" },
  "قاصدک": { en: "dandelion", cat: "کبد", props: "سم‌زدایی کبد، بهبود گوارش، سلامت کلیه، تقویت ایمنی" },
  "چای سبز": { en: "green tea", cat: "کبد", props: "آنتی‌اکسیدان قوی، سلامت کبد، کاهش وزن، پیشگیری از سرطان" },
  "زرشک": { en: "barberry", cat: "کبد", props: "سلامت کبد، کاهش قند خون، بهبود گوارش، تقویت ایمنی" },

  // ============ کلیه ============
  "دم اسب": { en: "horsetail", cat: "کلیه", props: "سلامت کلیه، ضد سنگ کلیه، مدر طبیعی، سلامت استخوان" },
  "خارخاسک": { en: "tribulus", cat: "کلیه", props: "سلامت کلیه، ضد سنگ کلیه، تقویت قوای جسمانی" },
  "هندوانه": { en: "watermelon", cat: "کلیه", props: "آبرسانی، سلامت کلیه، سلامت قلب، ضد التهاب" },

  // ============ زنان ============
  "پنج انگشت": { en: "chasteberry", cat: "زنان", props: "تعادل هورمونی، سلامت بانوان، کاهش علائم PMS" },
  "گل راعی": { en: "st johns wort", cat: "زنان", props: "ضد افسردگی، آرام‌بخش، بهبود خلق، ضد التهاب" },
  "شنبلیله": { en: "fenugreek", cat: "زنان", props: "افزایش شیر مادران، کاهش قند خون، تقویت ایمنی" },

  // ============ دیابت ============
  "دارچین": { en: "cinnamon", cat: "دیابت", props: "کاهش قند خون، بهبود حساسیت انسولین، ضد التهاب" },
  "خرفه": { en: "purslane", cat: "دیابت", props: "کاهش قند خون، سلامت قلب، آنتی‌اکسیدان، ضد التهاب" },
  "برگ گردو": { en: "walnut leaf", cat: "دیابت", props: "کاهش قند خون، سلامت کبد، ضد التهاب، تقویت ایمنی" },
  "گیمنما": { en: "gymnema", cat: "دیابت", props: "کاهش قند خون، کاهش اشتها، سلامت پانکراس" },

  // ============ چشم ============
  "بلوبری": { en: "blueberry", cat: "چشم", props: "آنتی‌اکسیدان قوی، سلامت چشم، سلامت مغز، بهبود حافظه" },
  "هویج": { en: "carrot", cat: "چشم", props: "تقویت بینایی، آنتی‌اکسیدان، سلامت قلب، سلامت پوست" },
  "اسفناج": { en: "spinach", cat: "چشم", props: "سلامت چشم، پیشگیری از کم‌خونی، تقویت استخوان" },

  // ============ میوه‌ها ============
  "سیب": { en: "apple", cat: "میوه", props: "تقویت ایمنی، کاهش التهاب، سلامت قلب، پیشگیری از دیابت نوع ۲" },
  "موز": { en: "banana", cat: "میوه", props: "تنظیم فشار خون، کاهش افسردگی، سلامت قلب، انرژی‌بخش" },
  "توت‌فرنگی": { en: "strawberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، تنظیم قند خون، سلامت پوست" },
  "کیوی": { en: "kiwi", cat: "میوه", props: "بهبود خواب، سلامت پوست، ضد آسم، تقویت ایمنی" },
  "انبه": { en: "mango", cat: "میوه", props: "تقویت ایمنی، سلامت پوست، بهبود گوارش، سلامت چشم" },
  "آناناس": { en: "pineapple", cat: "میوه", props: "ضد التهاب، بهبود گوارش، تقویت ایمنی، سلامت استخوان" },
  "گیلاس": { en: "cherry", cat: "میوه", props: "ضد التهاب، بهبود خواب، کاهش درد عضلات، آنتی‌اکسیدان" },
  "هلو": { en: "peach", cat: "میوه", props: "سلامت پوست، بهبود گوارش، تقویت ایمنی، سلامت چشم" },
  "زردآلو": { en: "apricot", cat: "میوه", props: "سلامت چشم، سلامت پوست، آنتی‌اکسیدان، بهبود گوارش" },
  "گلابی": { en: "pear", cat: "میوه", props: "بهبود گوارش، کاهش التهاب، سلامت قلب، تقویت ایمنی" },
  "آلو": { en: "plum", cat: "میوه", props: "بهبود گوارش، آنتی‌اکسیدان، سلامت استخوان، تقویت ایمنی" },
  "انجیر": { en: "fig", cat: "میوه", props: "بهبود گوارش، تقویت استخوان، تنظیم قند خون، سلامت قلب" },
  "خرما": { en: "date", cat: "میوه", props: "انرژی‌بخش، تقویت گوارش، سلامت قلب، تقویت استخوان" },
  "نارگیل": { en: "coconut", cat: "میوه", props: "انرژی‌بخش، تقویت ایمنی، سلامت پوست، سلامت قلب" },
  "گریپ‌فروت": { en: "grapefruit", cat: "میوه", props: "کاهش وزن، تقویت ایمنی، سلامت قلب، تنظیم قند خون" },
  "تمشک": { en: "raspberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، ضد التهاب، تقویت ایمنی" },
  "زغال‌اخته": { en: "cranberry", cat: "میوه", props: "سلامت کلیه، تقویت ایمنی، سلامت قلب، ضد التهاب" },
  "خرمالو": { en: "persimmon", cat: "میوه", props: "تقویت ایمنی، سلامت قلب، بهبود گوارش، سلامت چشم" },
  "به": { en: "quince", cat: "میوه", props: "بهبود گوارش، ضد التهاب، تقویت ایمنی، سلامت قلب" },
  "ازگیل": { en: "medlar", cat: "میوه", props: "ضد التهاب، تقویت ایمنی، سلامت گوارش، سلامت قلب" },
  "کنار": { en: "jujube", cat: "میوه", props: "تقویت ایمنی، سلامت کبد، ضد التهاب، بهبود خواب" },

  // ============ سبزیجات ============
  "کلم": { en: "cabbage", cat: "سبزیجات", props: "ضد سرطان، سلامت گوارش، تقویت ایمنی، کاهش التهاب" },
  "کرفس": { en: "celery", cat: "سبزیجات", props: "کاهش فشار خون، ضد التهاب، سم‌زدایی، سلامت کلیه" },
  "فلفل دلمه": { en: "bell pepper", cat: "سبزیجات", props: "تقویت ایمنی، سلامت چشم، آنتی‌اکسیدان، سلامت پوست" },
  "بادمجان": { en: "eggplant", cat: "سبزیجات", props: "سلامت قلب، کاهش کلسترول، آنتی‌اکسیدان، بهبود گوارش" },
  "کدو سبز": { en: "zucchini", cat: "سبزیجات", props: "کم‌کالری، سلامت قلب، بهبود گوارش، تقویت ایمنی" },
  "کدو تنبل": { en: "pumpkin", cat: "سبزیجات", props: "تقویت بینایی، سلامت پوست، تقویت ایمنی، بهبود خواب" },
  "بروکلی": { en: "broccoli", cat: "سبزیجات", props: "ضد سرطان، تقویت ایمنی، سلامت استخوان، سم‌زدایی" },
  "گل کلم": { en: "cauliflower", cat: "سبزیجات", props: "ضد سرطان، سلامت قلب، تقویت ایمنی، کاهش التهاب" },
  "کاهو": { en: "lettuce", cat: "سبزیجات", props: "آبرسانی، بهبود خواب، سلامت چشم، آرام‌بخش" },
  "سیب زمینی": { en: "potato", cat: "سبزیجات", props: "انرژی‌بخش، سلامت گوارش، تقویت ایمنی، سلامت پوست" },
  "قارچ": { en: "mushroom", cat: "سبزیجات", props: "تقویت ایمنی، سلامت استخوان، آنتی‌اکسیدان، ضد سرطان" },
  "ذرت": { en: "corn", cat: "سبزیجات", props: "انرژی‌بخش، سلامت چشم، تقویت ایمنی، سلامت قلب" },
  "خیار": { en: "cucumber", cat: "سبزیجات", props: "ضد التهاب، کاهش فشار خون، سم‌زدایی، آبرسانی" }
};

// ==========================================
// ترجمه واحدها و مواد مغذی
// ==========================================
const UNITS = { "G": "گرم", "MG": "میلی‌گرم", "UG": "میکروگرم", "KCAL": "کیلوکالری", "kJ": "کیلوژول", "IU": "واحد" };

const NUTRIENTS = {
  "Energy": "انرژی",
  "Protein": "پروتئین",
  "Total lipid (fat)": "چربی",
  "Carbohydrate, by difference": "کربوهیدرات",
  "Fiber, total dietary": "فیبر",
  "Potassium, K": "پتاسیم",
  "Calcium, Ca": "کلسیم",
  "Iron, Fe": "آهن",
  "Vitamin C, total ascorbic acid": "ویتامین C",
  "Vitamin A, RAE": "ویتامین A"
};

// ==========================================
// منوی اصلی
// ==========================================
const MAIN_MENU = {
  keyboard: [
    [{ text: "🌿 جستجوی گیاه" }],
    [{ text: "📂 دسته‌بندی‌ها" }, { text: "❓ راهنما" }]
  ],
  resize_keyboard: true
};

// ==========================================
// جستجو در USDA
// ==========================================
async function searchUSDA(name) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_KEY}&query=${encodeURIComponent(name)}&pageSize=3&dataType=Foundation,SR%20Legacy`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) return null;
    const d = await r.json();
    const foods = d.foods || [];
    if (foods.length === 0) return null;
    const valid = foods.filter(f =>
      f.foodCategory && (
        f.foodCategory.includes("Fruits") ||
        f.foodCategory.includes("Vegetables") ||
        f.foodCategory.includes("Spices") ||
        f.foodCategory.includes("Legumes")
      )
    );
    return valid.length > 0 ? valid[0] : foods[0];
  } catch {
    return null;
  }
}

// ==========================================
// ساخت متن مواد مغذی
// ==========================================
function formatNutrients(food) {
  if (!food || !food.foodNutrients) return "اطلاعات مواد مغذی موجود نیست.";
  const map = {};
  food.foodNutrients.forEach(n => { map[n.nutrientName] = n; });

  let text = "";
  Object.keys(NUTRIENTS).forEach(key => {
    if (map[key]) {
      let val = map[key].value;
      let unit = UNITS[map[key].unitName] || map[key].unitName;
      if (key === "Energy" && map[key].unitName === "kJ") {
        val = (val / 4.184).toFixed(1);
        unit = "کیلوکالری";
      }
      text += `• ${NUTRIENTS[key]}: ${val} ${unit}\n`;
    }
  });
  return text || "اطلاعات مواد مغذی موجود نیست.";
}

// ==========================================
// Webhook اصلی
// ==========================================
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(200).send("OK");

  try {
    const update = req.body;
    const message = update.message || update.edited_message;
    if (!message) return res.status(200).send("OK");

    const chatId = message.chat.id;
    const text = (message.text || "").trim();
    const firstName = message.from?.first_name || "دوست عزیز";

    // /start
    if (text === "/start") {
      await sendMessage(chatId,
        `سلام ${firstName} 👋\n\n` +
        `🌿 به ربات دانشنامه گیاهان خوش آمدی!\n\n` +
        `کافیه اسم یه گیاه یا میوه رو بنویسی\n` +
        `یا از دسته‌بندی‌ها استفاده کنی.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // راهنما
    if (text === "❓ راهنما" || text === "/help") {
      await sendMessage(chatId,
        `📖 راهنما:\n\n` +
        `🌿 جستجوی گیاه — اسم گیاه رو بزن\n` +
        `📂 دسته‌بندی‌ها — گیاهان بر اساس مشکل\n\n` +
        `💡 مثال: «زنجبیل»، «بابونه»\n` +
        `📂 مثال: «گوارش»، «قلب»، «اعصاب»\n\n` +
        `⚠️ محتوای آموزشی — جایگزین پزشک نیست.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // دسته‌بندی‌ها
    if (text === "📂 دسته‌بندی‌ها" || text === "/cats") {
      const cats = Object.keys(CATEGORIES);
      let catText = `📂 دسته‌بندی‌ها:\n\n`;
      cats.forEach(c => {
        const count = Object.values(HERBS).filter(h => h.cat === c).length;
        catText += `${CATEGORIES[c]}\n   (${count} گیاه)\n\n`;
      });
      catText += `💡 اسم دسته رو بنویس تا گیاهانش رو ببینی.`;
      await sendMessage(chatId, catText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // جستجوی گیاه
    if (text === "🌿 جستجوی گیاه") {
      await sendMessage(chatId, "🌿 اسم گیاه یا میوه رو بنویس:", MAIN_MENU);
      return res.status(200).send("OK");
    }

    // چک کردن دسته‌بندی
    const catMatch = Object.keys(CATEGORIES).find(c =>
      text === c || text.includes(c) || c.includes(text)
    );
    if (catMatch) {
      const herbs = Object.entries(HERBS).filter(([k, v]) => v.cat === catMatch);
      let listText = `${CATEGORIES[catMatch]}:\n\n`;
      herbs.forEach(([name, data]) => {
        listText += `🌿 ${name}\n   ${data.props}\n\n`;
      });
      await sendMessage(chatId, listText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // جستجوی گیاه
    const key = Object.keys(HERBS).find(k =>
      text === k || text.includes(k) || k.includes(text)
    );

    if (!key) {
      await sendMessage(chatId,
        `❌ «${text}» پیدا نشد.\n\n` +
        `💡 می‌تونی از «📂 دسته‌بندی‌ها» استفاده کنی.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    const herb = HERBS[key];
    await sendMessage(chatId, `🔎 در حال جستجوی «${key}»...`);

    const food = await searchUSDA(herb.en);
    const nutrients = formatNutrients(food);

    const result =
      `🌿 ${key}\n` +
      `📂 دسته: ${herb.cat}\n\n` +
      `💊 خواص:\n${herb.props}\n\n` +
      `📊 مواد مغذی (در ۱۰۰ گرم):\n${nutrients}\n` +
      `⚠️ محتوای آموزشی — جایگزین پزشک نیست.`;

    await sendMessage(chatId, result, MAIN_MENU);

  } catch (e) {
    console.error("❌ Error:", e.message);
  }

  return res.status(200).send("OK");
};

// ==========================================
// ارسال پیام
// ==========================================
async function sendMessage(chatId, text, keyboard) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/sendMessage`,
    `https://botapi.bale.ai/bot${TOKEN}/sendMessage`
  ];

  const body = { chat_id: chatId, text };
  if (keyboard) body.reply_markup = keyboard;

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000)
      });
      const d = await r.json();
      if (d.ok) return true;
    } catch (e) {
      console.error(`❌ Send error:`, e.message);
    }
  }
  return false;
}
