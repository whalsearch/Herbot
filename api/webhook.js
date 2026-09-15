const TOKEN = process.env.BALE_BOT_TOKEN;
const PROVIDER_TOKEN = process.env.BALE_PROVIDER_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const USDA_KEY = process.env.USDA_API_KEY || "DEMO_KEY";

const booksConfig = require("../config/books");

// ==========================================
// سوالات مزاج‌شناسی
// ==========================================
const MIZAJ_QUESTIONS = [
  { q: "۱ از ۸\n\n🌡️ پوست شما معمولاً چگونه است؟",
    options: [{ text: "خشک و زبر", wc: 0, dm: 2 }, { text: "چرب و نرم", wc: 0, dm: -2 }, { text: "معمولی", wc: 0, dm: 0 }] },
  { q: "۲ از ۸\n\n😴 خواب شما معمولاً چگونه است؟",
    options: [{ text: "کم و سبک", wc: 1, dm: 1 }, { text: "زیاد و سنگین", wc: -1, dm: -1 }, { text: "متوسط", wc: 0, dm: 0 }] },
  { q: "۳ از ۸\n\n⚖️ وزن شما معمولاً چگونه است؟",
    options: [{ text: "لاغر و استخوانی", wc: 0, dm: 2 }, { text: "پرگوشت", wc: 0, dm: -2 }, { text: "متوسط", wc: 0, dm: 0 }] },
  { q: "۴ از ۸\n\n🚽 مدفوع شما معمولاً چگونه است؟",
    options: [{ text: "خشک و سفت", wc: 0, dm: 2 }, { text: "نرم", wc: 0, dm: -2 }, { text: "معمولی", wc: 0, dm: 0 }] },
  { q: "۵ از ۸\n\n🤲 دست و پای شما معمولاً چگونه است؟",
    options: [{ text: "گرم", wc: 2, dm: 0 }, { text: "سرد", wc: -2, dm: 0 }, { text: "معمولی", wc: 0, dm: 0 }] },
  { q: "۶ از ۸\n\n⚡ انرژی شما معمولاً چگونه است؟",
    options: [{ text: "زیاد و پرانرژی", wc: 2, dm: 0 }, { text: "کم و خسته", wc: -2, dm: 0 }, { text: "متغیر", wc: 0, dm: 0 }] },
  { q: "۷ از ۸\n\n😤 خلق و خوی شما معمولاً چگونه است؟",
    options: [{ text: "زودرنج و عصبی", wc: 2, dm: 0 }, { text: "آرام و صبور", wc: -2, dm: 0 }, { text: "معمولی", wc: 0, dm: 0 }] },
  { q: "۸ از ۸\n\n🍽️ هضم غذای شما معمولاً چگونه است؟",
    options: [{ text: "سریع", wc: 2, dm: 0 }, { text: "کند", wc: -2, dm: 0 }, { text: "متوسط", wc: 0, dm: 0 }] }
];

// ==========================================
// دسته‌بندی‌ها
// ==========================================
const CATEGORIES = {
  "گوارش": "🌿 گیاهان گوارشی",
  "قلب": "❤️ گیاهان قلب و عروق",
  "اعصاب": "🧠 گیاهان آرام‌بخش",
  "تنفسی": "🫁 گیاهان تنفسی",
  "پوست": "✨ گیاهان پوست و مو",
  "مفاصل": "🦴 گیاهان مفاصل",
  "ایمنی": "🛡️ گیاهان ایمنی",
  "کبد": "🫀 گیاهان کبد",
  "کلیه": "💧 گیاهان کلیه",
  "زنان": "🌸 گیاهان بانوان",
  "دیابت": "🩸 گیاهان قند خون",
  "چشم": "👁️ گیاهان چشم",
  "میوه": "🍎 میوه‌ها",
  "سبزیجات": "🥕 سبزیجات",
  "ادویه": "🌶️ ادویه‌جات",
  "مغزها": "🌰 مغزها و دانه‌ها"
};

const CAT_EN = {
  "گوارش": "Digestion", "قلب": "Heart", "اعصاب": "Nervous System",
  "تنفسی": "Respiratory", "پوست": "Skin & Hair", "مفاصل": "Joints",
  "ایمنی": "Immunity", "کبد": "Liver", "کلیه": "Kidney", "زنان": "Women",
  "دیابت": "Diabetes", "چشم": "Eyes", "میوه": "Fruits",
  "سبزیجات": "Vegetables", "ادویه": "Spices", "مغزها": "Nuts & Seeds"
};

// ==========================================
// دیتابیس گیاهان
// ==========================================
const HERBS = {
  "زنجبیل": { en: "Ginger", cat: "گوارش", props: "ضد تهوع، ضد التهاب، بهبود هضم، تقویت ایمنی" },
  "نعنا": { en: "Mint", cat: "گوارش", props: "بهبود هضم، تسکین سردرد، رفع نفخ، ضد تهوع" },
  "رازیانه": { en: "Fennel", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، تقویت ایمنی" },
  "شوید": { en: "Dill", cat: "گوارش", props: "بهبود گوارش، آرام‌بخش، ضد نفخ" },
  "زیره": { en: "Cumin", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، کاهش قند خون" },
  "هل": { en: "Cardamom", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، تقویت قلب" },
  "زردچوبه": { en: "Turmeric", cat: "گوارش", props: "ضد التهاب قوی، آنتی‌اکسیدان، سلامت کبد" },
  "بابونه": { en: "Chamomile", cat: "گوارش", props: "آرام‌بخش، بهبود خواب، درمان گوارشی" },
  "خاکشیر": { en: "Plantain", cat: "گوارش", props: "بهبود گوارش، ضد یبوست، سلامت کبد" },
  "بارهنگ": { en: "Psyllium", cat: "گوارش", props: "ضد یبوست، کاهش کلسترول، سلامت روده" },
  "انیسون": { en: "Anise", cat: "گوارش", props: "ضد نفخ، بهبود گوارش، ضد سرفه" },
  "بادرنجبویه": { en: "Lemon Balm", cat: "گوارش", props: "آرام‌بخش، بهبود گوارش، ضد اضطراب" },
  "سنا": { en: "Senna", cat: "گوارش", props: "ملین طبیعی، ضد یبوست" },
  "گل ختمی": { en: "Marshmallow", cat: "گوارش", props: "ضد التهاب گوارشی، بهبود زخم معده" },
  "شیرین بیان": { en: "Licorice", cat: "گوارش", props: "بهبود زخم معده، ضد التهاب، ضد ویروس" },
  "رازیانه کوهی": { en: "Caraway", cat: "گوارش", props: "ضد نفخ، بهبود گوارش، تقویت ایمنی" },
  "زوفا": { en: "Hyssop", cat: "گوارش", props: "بهبود گوارش، ضد سرفه، ضد التهاب" },
  "مرزنجوش": { en: "Marjoram", cat: "گوارش", props: "بهبود گوارش، آرام‌بخش، ضد نفخ" },
  "زنجبیل ترش": { en: "Galangal", cat: "گوارش", props: "بهبود گوارش، ضد تهوع، ضد التهاب" },
  "قرنفل": { en: "Clove", cat: "گوارش", props: "ضد نفخ، بهبود گوارش، ضد درد دندان" },
  "رازیانه رومی": { en: "Sweet Fennel", cat: "گوارش", props: "بهبود گوارش، ضد نفخ، آرام‌بخش" },
  "خرفه": { en: "Purslane", cat: "گوارش", props: "کاهش قند خون، سلامت قلب، ضد التهاب" },
  "کاسنی": { en: "Chicory", cat: "گوارش", props: "بهبود گوارش، سلامت کبد، تقویت ایمنی" },
  "شاه‌تره": { en: "Cress", cat: "گوارش", props: "بهبود گوارش، تقویت ایمنی، ضد التهاب" },
  "سیر": { en: "Garlic", cat: "قلب", props: "کاهش فشار خون، کاهش کلسترول، ضد سرطان" },
  "زالزالک": { en: "Hawthorn", cat: "قلب", props: "سلامت قلب، کاهش فشار خون، آرام‌بخش" },
  "دارچین": { en: "Cinnamon", cat: "قلب", props: "کاهش قند خون، ضد التهاب، آنتی‌اکسیدان" },
  "زعفران": { en: "Saffron", cat: "قلب", props: "ضد افسردگی، سلامت قلب، بهبود خلق" },
  "شنبلیله": { en: "Fenugreek", cat: "قلب", props: "کاهش قند خون، کاهش کلسترول، افزایش شیر مادران" },
  "زیتون": { en: "Olive", cat: "قلب", props: "سلامت قلب، کاهش التهاب، آنتی‌اکسیدان" },
  "کنگر فرنگی": { en: "Artichoke", cat: "قلب", props: "کاهش کلسترول، سلامت کبد" },
  "قره قاط": { en: "Bilberry", cat: "قلب", props: "سلامت قلب، بهبود گردش خون، سلامت چشم" },
  "برگ زیتون": { en: "Olive Leaf", cat: "قلب", props: "کاهش فشار خون، کاهش کلسترول، تقویت ایمنی" },
  "گل قند": { en: "Stevia", cat: "قلب", props: "شیرین‌کننده طبیعی، کاهش قند خون، کاهش فشار خون" },
  "کزاز": { en: "Lepidium", cat: "قلب", props: "کاهش فشار خون، تقویت قلب، آنتی‌اکسیدان" },
  "چای ترش": { en: "Hibiscus", cat: "قلب", props: "کاهش فشار خون، کاهش کلسترول، آنتی‌اکسیدان" },
  "عناب": { en: "Jujube", cat: "قلب", props: "سلامت قلب، آرام‌بخش، تقویت ایمنی" },
  "کنجد": { en: "Sesame", cat: "قلب", props: "سلامت استخوان، سلامت قلب، تقویت مو" },
  "تخم کتان": { en: "Flaxseed", cat: "قلب", props: "کاهش کلسترول، سلامت قلب، بهبود گوارش" },
  "اسطوخودوس": { en: "Lavender", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب" },
  "سنبل الطیب": { en: "Valerian", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، ضد اسپاسم" },
  "گل گاوزبان": { en: "Borage", cat: "اعصاب", props: "آرام‌بخش، ضد التهاب، سلامت کبد" },
  "رزماری": { en: "Rosemary", cat: "اعصاب", props: "تقویت حافظه، آنتی‌اکسیدان، بهبود گردش خون" },
  "مریم گلی": { en: "Sage", cat: "اعصاب", props: "آرام‌بخش، بهبود گوارش، سلامت دهان" },
  "جینسینگ": { en: "Ginseng", cat: "اعصاب", props: "تقویت انرژی، بهبود تمرکز، ضد خستگی" },
  "گل راعی": { en: "St John's Wort", cat: "اعصاب", props: "ضد افسردگی، آرام‌بخش، بهبود خلق" },
  "بهارنارنج": { en: "Orange Blossom", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب" },
  "علف لیمو": { en: "Lemongrass", cat: "اعصاب", props: "آرام‌بخش، بهبود گوارش، ضد التهاب" },
  "اسطوخودوس رومی": { en: "Roman Chamomile", cat: "اعصاب", props: "آرام‌بخش، بهبود خواب، ضد التهاب" },
  "زنبور عسل": { en: "Bee Pollen", cat: "اعصاب", props: "تقویت انرژی، تقویت ایمنی، بهبود خلق" },
  "گوارانا": { en: "Guarana", cat: "اعصاب", props: "افزایش انرژی، بهبود تمرکز، کاهش خستگی" },
  "چای سفید": { en: "White Tea", cat: "اعصاب", props: "آنتی‌اکسیدان، آرام‌بخش، تقویت ایمنی" },
  "مریم نخودی": { en: "Teucrium", cat: "اعصاب", props: "آرام‌بخش، کاهش اضطراب، بهبود خواب" },
  "بادرنجبویه کوهی": { en: "Melissa", cat: "اعصاب", props: "آرام‌بخش، ضد اضطراب، بهبود گوارش" },
  "آویشن": { en: "Thyme", cat: "تنفسی", props: "ضد باکتری، ضد سرفه، سلامت ریه" },
  "پونه": { en: "Oregano", cat: "تنفسی", props: "ضد باکتری، ضد ویروس، سلامت ریه" },
  "اکالیپتوس": { en: "Eucalyptus", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، ضد احتقان" },
  "پرسیاوشان": { en: "Maidenhair", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، بهبود تنفس" },
  "ختمی": { en: "Althaea", cat: "تنفسی", props: "ضد سرفه، بهبود گلو، ضد التهاب" },
  "بنفشه": { en: "Violet", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، ضد التهاب" },
  "عنصل": { en: "Squill", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، تقویت قلب" },
  "زوفا تنفسی": { en: "Hyssop", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، بهبود تنفس" },
  "پرسیاوشان کوهی": { en: "Adiantum", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، بهبود تنفس" },
  "گل ختمی تنفسی": { en: "Marshmallow Root", cat: "تنفسی", props: "ضد سرفه، بهبود گلو، ضد التهاب" },
  "شیرین بیان تنفسی": { en: "Licorice Root", cat: "تنفسی", props: "ضد سرفه، خلط‌آور، تقویت ایمنی" },
  "آنغوزه": { en: "Asafoetida", cat: "تنفسی", props: "ضد سرفه، ضد نفخ، تقویت گوارش" },
  "گل محمدی": { en: "Rose", cat: "پوست", props: "آرام‌بخش، سلامت پوست، ضد التهاب" },
  "آلوئه ورا": { en: "Aloe Vera", cat: "پوست", props: "سلامت پوست، بهبود سوختگی، تقویت ایمنی" },
  "گزنه": { en: "Nettle", cat: "پوست", props: "سلامت پوست، تقویت مو، سلامت پروستات" },
  "جعفری": { en: "Parsley", cat: "پوست", props: "سم‌زدایی، سلامت کلیه، سلامت پوست" },
  "همیشه بهار": { en: "Calendula", cat: "پوست", props: "بهبود زخم، ضد التهاب پوستی، ضد قارچ" },
  "دم اسب": { en: "Horsetail", cat: "پوست", props: "تقویت مو، تقویت ناخن، سلامت استخوان" },
  "بابونه رومی": { en: "Roman Chamomile", cat: "پوست", props: "ضد التهاب پوستی، آرام‌بخش، سلامت پوست" },
  "اسطوخودوس فرانسوی": { en: "French Lavender", cat: "پوست", props: "سلامت پوست، آرام‌بخش، ضد التهاب" },
  "چای سبز": { en: "Green Tea", cat: "پوست", props: "آنتی‌اکسیدان قوی، سلامت پوست، کاهش وزن" },
  "روغن نارگیل": { en: "Coconut Oil", cat: "پوست", props: "سلامت پوست، سلامت مو، تقویت ایمنی" },
  "پنجه گربه": { en: "Cat's Claw", cat: "مفاصل", props: "ضد التهاب مفاصل، تقویت ایمنی" },
  "بید": { en: "Willow", cat: "مفاصل", props: "ضد درد، ضد التهاب، کاهش تب" },
  "آووکادو سویا": { en: "Avocado Soybean", cat: "مفاصل", props: "ضد التهاب مفاصل، سلامت غضروف" },
  "کندر": { en: "Frankincense", cat: "مفاصل", props: "ضد التهاب مفاصل، بهبود آرتریت" },
  "مریمی": { en: "Boswellia", cat: "مفاصل", props: "ضد التهاب مفاصل، سلامت غضروف" },
  "تخم گشنیز": { en: "Coriander Seed", cat: "مفاصل", props: "ضد التهاب، سلامت مفاصل" },
  "سیاه دانه": { en: "Black Seed", cat: "ایمنی", props: "تقویت ایمنی، ضد التهاب، ضد حساسیت" },
  "اکیناسه": { en: "Echinacea", cat: "ایمنی", props: "تقویت ایمنی، پیشگیری از سرماخوردگی" },
  "شیرین بیان کوهی": { en: "Wild Licorice", cat: "ایمنی", props: "تقویت ایمنی، ضد ویروس" },
  "پروپولیس": { en: "Propolis", cat: "ایمنی", props: "تقویت ایمنی، ضد باکتری، ضد ویروس" },
  "ژل رویال": { en: "Royal Jelly", cat: "ایمنی", props: "تقویت ایمنی، افزایش انرژی، سلامت پوست" },
  "ریشی": { en: "Reishi", cat: "ایمنی", props: "تقویت ایمنی، سلامت کبد، ضد سرطان" },
  "شیتاکه": { en: "Shiitake", cat: "ایمنی", props: "تقویت ایمنی، کاهش کلسترول، ضد سرطان" },
  "مای‌تاکه": { en: "Maitake", cat: "ایمنی", props: "تقویت ایمنی، کاهش قند خون" },
  "کوردیسپس": { en: "Cordyceps", cat: "ایمنی", props: "تقویت ایمنی، افزایش انرژی، سلامت کلیه" },
  "خار مریم": { en: "Milk Thistle", cat: "کبد", props: "سلامت کبد، سم‌زدایی، آنتی‌اکسیدان" },
  "قاصدک": { en: "Dandelion", cat: "کبد", props: "سم‌زدایی کبد، بهبود گوارش، سلامت کلیه" },
  "زرشک": { en: "Barberry", cat: "کبد", props: "سلامت کبد، کاهش قند خون، بهبود گوارش" },
  "شاه‌پسند": { en: "Vitex", cat: "کبد", props: "سلامت کبد، تعادل هورمونی، سلامت بانوان" },
  "کنگر وحشی": { en: "Wild Artichoke", cat: "کبد", props: "سلامت کبد، کاهش کلسترول، سم‌زدایی" },
  "چای کوهی": { en: "Mountain Tea", cat: "کبد", props: "سلامت کبد، آرام‌بخش، تقویت ایمنی" },
  "خارخاسک": { en: "Tribulus", cat: "کلیه", props: "سلامت کلیه، ضد سنگ کلیه، تقویت قوای جسمانی" },
  "دم اسب کوهی": { en: "Wild Horsetail", cat: "کلیه", props: "سلامت کلیه، ضد سنگ کلیه، مدر طبیعی" },
  "جعفری کوهی": { en: "Wild Parsley", cat: "کلیه", props: "سلامت کلیه، سم‌زدایی، تقویت ایمنی" },
  "کاکل ذرت": { en: "Corn Silk", cat: "کلیه", props: "سلامت کلیه، ضد سنگ کلیه، مدر طبیعی" },
  "گزنه کلیه": { en: "Nettle Kidney", cat: "کلیه", props: "سلامت کلیه، ضد التهاب، تقویت ایمنی" },
  "پنج انگشت": { en: "Chasteberry", cat: "زنان", props: "تعادل هورمونی، کاهش علائم PMS" },
  "رازیانه زنانه": { en: "Fennel Female", cat: "زنان", props: "تعادل هورمونی، افزایش شیر مادران" },
  "شنبلیله زنانه": { en: "Fenugreek Female", cat: "زنان", props: "افزایش شیر مادران، تعادل هورمونی" },
  "گل راعی زنانه": { en: "St John's Wort Female", cat: "زنان", props: "ضد افسردگی PMS، آرام‌بخش" },
  "اسطوخودوس زنانه": { en: "Lavender Female", cat: "زنان", props: "کاهش درد قاعدگی، آرام‌بخش" },
  "شنبلیله دیابتی": { en: "Fenugreek Diabetic", cat: "دیابت", props: "کاهش قند خون، بهبود حساسیت انسولین" },
  "دارچین دیابتی": { en: "Cinnamon Diabetic", cat: "دیابت", props: "کاهش قند خون، بهبود حساسیت انسولین" },
  "سیر دیابتی": { en: "Garlic Diabetic", cat: "دیابت", props: "کاهش قند خون، کاهش کلسترول" },
  "پیاز دیابتی": { en: "Onion Diabetic", cat: "دیابت", props: "کاهش قند خون، سلامت قلب" },
  "بلوبری چشمی": { en: "Blueberry Eye", cat: "چشم", props: "سلامت چشم، بهبود بینایی، آنتی‌اکسیدان" },
  "زعفران چشمی": { en: "Saffron Eye", cat: "چشم", props: "سلامت چشم، بهبود بینایی" },
  "همیشه بهار چشمی": { en: "Calendula Eye", cat: "چشم", props: "سلامت چشم، ضد التهاب" },
  "زغال‌اخته چشمی": { en: "Bilberry Eye", cat: "چشم", props: "سلامت چشم، بهبود گردش خون" },
  "چای سبز چشمی": { en: "Green Tea Eye", cat: "چشم", props: "سلامت چشم، آنتی‌اکسیدان" },
  "سیب": { en: "Apple", cat: "میوه", props: "تقویت ایمنی، سلامت قلب، پیشگیری از دیابت" },
  "موز": { en: "Banana", cat: "میوه", props: "تنظیم فشار خون، انرژی‌بخش، سلامت قلب" },
  "پرتقال": { en: "Orange", cat: "میوه", props: "پیشگیری از سرماخوردگی، سلامت پوست" },
  "انار": { en: "Pomegranate", cat: "میوه", props: "سلامت قلب، کاهش فشار خون، ضد التهاب" },
  "توت‌فرنگی": { en: "Strawberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، سلامت پوست" },
  "کیوی": { en: "Kiwi", cat: "میوه", props: "بهبود خواب، سلامت پوست، تقویت ایمنی" },
  "لیمو": { en: "Lemon", cat: "میوه", props: "کمک به هضم، سلامت پوست، تقویت ایمنی" },
  "انبه": { en: "Mango", cat: "میوه", props: "تقویت ایمنی، سلامت پوست، سلامت چشم" },
  "آناناس": { en: "Pineapple", cat: "میوه", props: "ضد التهاب، بهبود گوارش، تقویت ایمنی" },
  "هندوانه": { en: "Watermelon", cat: "میوه", props: "آبرسانی، سلامت قلب، سلامت کلیه" },
  "انگور": { en: "Grape", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، تقویت ایمنی" },
  "گیلاس": { en: "Cherry", cat: "میوه", props: "ضد التهاب، بهبود خواب، کاهش درد" },
  "هلو": { en: "Peach", cat: "میوه", props: "سلامت پوست، بهبود گوارش، تقویت ایمنی" },
  "زردآلو": { en: "Apricot", cat: "میوه", props: "سلامت چشم، سلامت پوست، آنتی‌اکسیدان" },
  "گلابی": { en: "Pear", cat: "میوه", props: "بهبود گوارش، سلامت قلب، تقویت ایمنی" },
  "آلو": { en: "Plum", cat: "میوه", props: "بهبود گوارش، آنتی‌اکسیدان، سلامت استخوان" },
  "انجیر": { en: "Fig", cat: "میوه", props: "بهبود گوارش، تقویت استخوان، سلامت قلب" },
  "خرما": { en: "Date", cat: "میوه", props: "انرژی‌بخش، تقویت گوارش، سلامت قلب" },
  "نارگیل": { en: "Coconut", cat: "میوه", props: "انرژی‌بخش، تقویت ایمنی، سلامت پوست" },
  "گریپ‌فروت": { en: "Grapefruit", cat: "میوه", props: "کاهش وزن، تقویت ایمنی، سلامت قلب" },
  "بلوبری": { en: "Blueberry", cat: "میوه", props: "آنتی‌اکسیدان قوی، سلامت مغز، سلامت قلب" },
  "تمشک": { en: "Raspberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، تقویت ایمنی" },
  "زغال‌اخته": { en: "Cranberry", cat: "میوه", props: "سلامت کلیه، تقویت ایمنی، سلامت قلب" },
  "خرمالو": { en: "Persimmon", cat: "میوه", props: "تقویت ایمنی، سلامت قلب، سلامت چشم" },
  "به": { en: "Quince", cat: "میوه", props: "بهبود گوارش، ضد التهاب، تقویت ایمنی" },
  "ازگیل": { en: "Medlar", cat: "میوه", props: "ضد التهاب، تقویت ایمنی، سلامت گوارش" },
  "کنار": { en: "Jujube Fruit", cat: "میوه", props: "تقویت ایمنی، سلامت کبد، بهبود خواب" },
  "طالبی": { en: "Cantaloupe", cat: "میوه", props: "سلامت پوست، تقویت ایمنی، سلامت چشم" },
  "خربزه": { en: "Melon", cat: "میوه", props: "آبرسانی، سلامت کلیه، سلامت پوست" },
  "شلیل": { en: "Nectarine", cat: "میوه", props: "سلامت پوست، تقویت ایمنی، آنتی‌اکسیدان" },
  "شاه‌توت": { en: "Blackberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، تقویت ایمنی" },
  "توت سفید": { en: "White Mulberry", cat: "میوه", props: "کاهش قند خون، تقویت ایمنی، سلامت کبد" },
  "توت سیاه": { en: "Black Mulberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، تقویت ایمنی" },
  "انگور فرنگی": { en: "Gooseberry", cat: "میوه", props: "آنتی‌اکسیدان، سلامت قلب، تقویت ایمنی" },
  "کیوی طلایی": { en: "Golden Kiwi", cat: "میوه", props: "تقویت ایمنی، سلامت پوست، بهبود خواب" },
  "پاپایا": { en: "Papaya", cat: "میوه", props: "بهبود گوارش، تقویت ایمنی، سلامت پوست" },
  "آووکادو": { en: "Avocado", cat: "میوه", props: "سلامت قلب، کاهش کلسترول، سلامت پوست" },
  "لیمو ترش": { en: "Lime", cat: "میوه", props: "تقویت ایمنی، کمک به هضم، سلامت پوست" },
  "پومِلو": { en: "Pomelo", cat: "میوه", props: "تقویت ایمنی، کاهش وزن، سلامت قلب" },
  "نارنگی": { en: "Tangerine", cat: "میوه", props: "تقویت ایمنی، سلامت پوست، بهبود گوارش" },
  "آناناس تازه": { en: "Fresh Pineapple", cat: "میوه", props: "ضد التهاب، بهبود گوارش، تقویت ایمنی" },
  "انجیر خشک": { en: "Dried Fig", cat: "میوه", props: "بهبود گوارش، تقویت استخوان، انرژی‌بخش" },
  "هویج": { en: "Carrot", cat: "سبزیجات", props: "تقویت بینایی، سلامت پوست، سلامت قلب" },
  "گوجه": { en: "Tomato", cat: "سبزیجات", props: "پیشگیری از سرطان پروستات، سلامت قلب" },
  "خیار": { en: "Cucumber", cat: "سبزیجات", props: "آبرسانی، کاهش فشار خون، سم‌زدایی" },
  "اسفناج": { en: "Spinach", cat: "سبزیجات", props: "سلامت چشم، پیشگیری از کم‌خونی" },
  "کلم": { en: "Cabbage", cat: "سبزیجات", props: "ضد سرطان، سلامت گوارش، تقویت ایمنی" },
  "کرفس": { en: "Celery", cat: "سبزیجات", props: "کاهش فشار خون، سم‌زدایی، سلامت کلیه" },
  "فلفل دلمه": { en: "Bell Pepper", cat: "سبزیجات", props: "تقویت ایمنی، سلامت چشم، سلامت پوست" },
  "بادمجان": { en: "Eggplant", cat: "سبزیجات", props: "سلامت قلب، کاهش کلسترول، آنتی‌اکسیدان" },
  "چغندر": { en: "Beet", cat: "سبزیجات", props: "کاهش فشار خون، سم‌زدایی کبد، تقویت ایمنی" },
  "کدو سبز": { en: "Zucchini", cat: "سبزیجات", props: "کم‌کالری، سلامت قلب، بهبود گوارش" },
  "کدو تنبل": { en: "Pumpkin", cat: "سبزیجات", props: "تقویت بینایی، تقویت ایمنی، بهبود خواب" },
  "بروکلی": { en: "Broccoli", cat: "سبزیجات", props: "ضد سرطان، تقویت ایمنی، سلامت استخوان" },
  "گل کلم": { en: "Cauliflower", cat: "سبزیجات", props: "ضد سرطان، سلامت قلب، تقویت ایمنی" },
  "کاهو": { en: "Lettuce", cat: "سبزیجات", props: "آبرسانی، بهبود خواب، آرام‌بخش" },
  "پیاز": { en: "Onion", cat: "سبزیجات", props: "ضد التهاب، ضد باکتری، سلامت قلب" },
  "سیب زمینی": { en: "Potato", cat: "سبزیجات", props: "انرژی‌بخش، سلامت گوارش، تقویت ایمنی" },
  "قارچ": { en: "Mushroom", cat: "سبزیجات", props: "تقویت ایمنی، سلامت استخوان، ضد سرطان" },
  "ذرت": { en: "Corn", cat: "سبزیجات", props: "انرژی‌بخش، سلامت چشم، سلامت قلب" },
  "تربچه": { en: "Radish", cat: "سبزیجات", props: "سلامت کبد، ضد التهاب، بهبود گوارش" },
  "شلغم": { en: "Turnip", cat: "سبزیجات", props: "تقویت ایمنی، سلامت ریه، سلامت استخوان" },
  "مارچوبه": { en: "Asparagus", cat: "سبزیجات", props: "سم‌زدایی، سلامت کلیه، سلامت قلب" },
  "بامیه": { en: "Okra", cat: "سبزیجات", props: "کاهش قند خون، بهبود گوارش، تقویت ایمنی" },
  "لوبیا سبز": { en: "Green Bean", cat: "سبزیجات", props: "سلامت قلب، تقویت ایمنی، سلامت استخوان" },
  "نخود فرنگی": { en: "Green Pea", cat: "سبزیجات", props: "انرژی‌بخش، سلامت گوارش، تقویت ایمنی" },
  "عدس": { en: "Lentil", cat: "سبزیجات", props: "انرژی‌بخش، سلامت قلب، تقویت ایمنی" },
  "لوبیا چیتی": { en: "Pinto Bean", cat: "سبزیجات", props: "انرژی‌بخش، سلامت قلب، تقویت ایمنی" },
  "سیر تازه": { en: "Fresh Garlic", cat: "سبزیجات", props: "ضد باکتری، سلامت قلب، تقویت ایمنی" },
  "تره": { en: "Leek", cat: "سبزیجات", props: "ضد التهاب، سلامت قلب، تقویت ایمنی" },
  "ریحان سبز": { en: "Green Basil", cat: "سبزیجات", props: "ضد التهاب، بهبود گوارش، تقویت ایمنی" },
  "جعفری تازه": { en: "Fresh Parsley", cat: "سبزیجات", props: "سم‌زدایی، تقویت ایمنی، سلامت کلیه" },
  "گشنیز تازه": { en: "Fresh Coriander", cat: "سبزیجات", props: "سم‌زدایی، بهبود گوارش، تقویت ایمنی" },
  "شوید تازه": { en: "Fresh Dill", cat: "سبزیجات", props: "بهبود گوارش، ضد نفخ، آرام‌بخش" },
  "نعنا تازه": { en: "Fresh Mint", cat: "سبزیجات", props: "بهبود هضم، رفع نفخ، آرام‌بخش" },
  "کلم بروکسل": { en: "Brussels Sprout", cat: "سبزیجات", props: "ضد سرطان، تقویت ایمنی، سلامت استخوان" },
  "کلم قرمز": { en: "Red Cabbage", cat: "سبزیجات", props: "ضد سرطان، سلامت قلب، تقویت ایمنی" },
  "کاهوی رومی": { en: "Romaine Lettuce", cat: "سبزیجات", props: "آبرسانی، سلامت چشم، آرام‌بخش" },
  "ریشه کاسنی": { en: "Chicory Root", cat: "سبزیجات", props: "سلامت کبد، بهبود گوارش، تقویت ایمنی" },
  "ریشه جعفری": { en: "Parsley Root", cat: "سبزیجات", props: "سلامت کلیه، سم‌زدایی، تقویت ایمنی" },
  "فلفل سیاه": { en: "Black Pepper", cat: "ادویه", props: "بهبود گوارش، ضد التهاب، تقویت ایمنی" },
  "فلفل قرمز": { en: "Red Pepper", cat: "ادویه", props: "افزایش متابولیسم، ضد درد، سلامت قلب" },
  "جوز هندی": { en: "Nutmeg", cat: "ادویه", props: "آرام‌بخش، بهبود گوارش، تقویت ایمنی" },
  "میخک": { en: "Clove Whole", cat: "ادویه", props: "ضد درد، ضد باکتری، بهبود گوارش" },
  "سماق": { en: "Sumac", cat: "ادویه", props: "آنتی‌اکسیدان، بهبود گوارش، کاهش قند خون" },
  "ریحان خشک": { en: "Dried Basil", cat: "ادویه", props: "ضد التهاب، بهبود گوارش" },
  "بادام": { en: "Almond", cat: "مغزها", props: "سلامت قلب، تقویت استخوان، کاهش کلسترول" },
  "گردو": { en: "Walnut", cat: "مغزها", props: "سلامت مغز، سلامت قلب، آنتی‌اکسیدان" },
  "پسته": { en: "Pistachio", cat: "مغزها", props: "سلامت قلب، کاهش کلسترول، تقویت ایمنی" },
  "فندق": { en: "Hazelnut", cat: "مغزها", props: "سلامت قلب، تقویت ایمنی، آنتی‌اکسیدان" },
  "بادام هندی": { en: "Cashew", cat: "مغزها", props: "سلامت قلب، تقویت استخوان، تقویت ایمنی" },
  "بادام زمینی": { en: "Peanut", cat: "مغزها", props: "انرژی‌بخش، سلامت قلب، تقویت ایمنی" },
  "تخم کدو": { en: "Pumpkin Seed", cat: "مغزها", props: "سلامت پروستات، تقویت ایمنی، سلامت قلب" },
  "تخم آفتابگردان": { en: "Sunflower Seed", cat: "مغزها", props: "سلامت قلب، تقویت ایمنی، سلامت پوست" },
  "تخم کنجد": { en: "Sesame Seed", cat: "مغزها", props: "سلامت استخوان، تقویت مو، سلامت قلب" },
  "تخم کتان مغز": { en: "Flax Seed", cat: "مغزها", props: "کاهش کلسترول، سلامت قلب، بهبود گوارش" },
  "تخم چیا": { en: "Chia Seed", cat: "مغزها", props: "سلامت قلب، بهبود گوارش، تقویت استخوان" },
  "تخم شربتی": { en: "Basil Seed", cat: "مغزها", props: "آبرسانی، بهبود گوارش، سلامت قلب" },
  "تخم خرفه": { en: "Purslane Seed", cat: "مغزها", props: "سلامت قلب، کاهش قند خون، تقویت ایمنی" },
  "تخم رازیانه": { en: "Fennel Seed", cat: "مغزها", props: "بهبود گوارش، ضد نفخ، تقویت ایمنی" }
};

const DISEASES = {
  "یبوست": ["بارهنگ", "سنا", "خاکشیر", "انجیر", "آلو"],
  "نفخ": ["نعنا", "رازیانه", "زیره", "هل", "انیسون", "شوید"],
  "اسهال": ["بارهنگ", "گل ختمی", "زغال‌اخته"],
  "زخم معده": ["گل ختمی", "شیرین بیان", "بابونه", "زردچوبه"],
  "سوزش سر دل": ["گل ختمی", "شیرین بیان", "بابونه"],
  "تهوع": ["زنجبیل", "نعنا", "بابونه", "رازیانه"],
  "سوء هاضمه": ["زنجبیل", "نعنا", "رازیانه", "زیره", "هل"],
  "کبد چرب": ["خار مریم", "قاصدک", "چای سبز", "زرشک", "زردچوبه"],
  "سنگ کلیه": ["خارخاسک", "دم اسب", "لیمو", "هندوانه"],
  "عفونت ادراری": ["زغال‌اخته", "جعفری", "کرفس"],
  "فشار خون بالا": ["سیر", "چغندر", "کرفس", "زالزالک", "هندوانه"],
  "کلسترول بالا": ["سیر", "شنبلیله", "کنگر فرنگی", "زیتون", "کنجد"],
  "ضعف قلب": ["زالزالک", "زعفران", "سیر", "زیتون"],
  "قند خون بالا": ["دارچین", "شنبلیله", "بامیه", "سیر", "چای سبز"],
  "دیابت": ["دارچین", "شنبلیله", "بامیه", "سیر", "پیاز", "چای سبز"],
  "بی‌خوابی": ["بابونه", "اسطوخودوس", "سنبل الطیب", "بادرنجبویه", "گیلاس"],
  "اضطراب": ["بابونه", "اسطوخودوس", "سنبل الطیب", "گل گاوزبان", "بادرنجبویه"],
  "افسردگی": ["زعفران", "گل راعی", "اسطوخودوس", "جینسینگ"],
  "سردرد": ["نعنا", "اسطوخودوس", "بابونه", "زنجبیل"],
  "میگرن": ["نعنا", "اسطوخودوس", "بابونه", "زنجبیل"],
  "فراموشی": ["رزماری", "جینسینگ", "بلوبری", "چای سبز"],
  "استرس": ["بابونه", "اسطوخودوس", "گل گاوزبان", "بادرنجبویه"],
  "سرماخوردگی": ["آویشن", "پونه", "پرتقال", "لیمو", "سیر", "زنجبیل"],
  "سرفه": ["آویشن", "پونه", "زوفا", "اکالیپتوس", "گل ختمی"],
  "آسم": ["آویشن", "پونه", "اکالیپتوس", "کیوی"],
  "برونشیت": ["آویشن", "پونه", "زوفا", "اکالیپتوس"],
  "گلودرد": ["آویشن", "پونه", "شیرین بیان", "زنجبیل"],
  "آبریزش بینی": ["آویشن", "پونه", "زنجبیل", "سیر"],
  "آلرژی": ["سیاه دانه", "گزنه", "شیرین بیان", "زردچوبه"],
  "آکنه": ["آلوئه ورا", "همیشه بهار", "گزنه", "زردچوبه"],
  "ریزش مو": ["گزنه", "دم اسب", "رزماری", "کنجد"],
  "سوختگی": ["آلوئه ورا", "همیشه بهار", "گل ختمی"],
  "اگزما": ["آلوئه ورا", "همیشه بهار", "گل ختمی", "زردچوبه"],
  "پیری پوست": ["چای سبز", "آلوئه ورا", "بلوبری", "انار"],
  "آرتریت": ["زردچوبه", "زنجبیل", "پنجه گربه", "بید"],
  "درد مفاصل": ["زردچوبه", "زنجبیل", "بید", "پنجه گربه"],
  "نقرس": ["گیلاس", "زردچوبه", "زنجبیل", "کرفس"],
  "پوکی استخوان": ["کنجد", "دم اسب", "اسفناج", "بروکلی", "انجیر"],
  "ضعف ایمنی": ["سیاه دانه", "اکیناسه", "شیرین بیان", "زنجبیل", "سیر"],
  "کم‌خونی": ["اسفناج", "جعفری", "چغندر", "خرما", "کنجد"],
  "PMS": ["پنج انگشت", "بابونه", "اسطوخودوس", "زعفران"],
  "یائسگی": ["پنج انگشت", "اسطوخودوس", "بابونه"],
  "درد قاعدگی": ["بابونه", "اسطوخودوس", "زنجبیل", "رازیانه"],
  "پروستات": ["گزنه", "کدو تنبل", "انار", "گوجه", "زردچوبه"],
  "ضعف بینایی": ["بلوبری", "هویج", "اسفناج", "زعفران"],
  "چاقی": ["چای سبز", "زنجبیل", "دارچین", "گریپ‌فروت", "لیمو"],
  "خستگی": ["جینسینگ", "چای سبز", "زنجبیل", "موز", "خرما"],
  "بواسیر": ["بارهنگ", "گل ختمی", "خاکشیر", "انجیر"],
  "بی‌اشتهایی": ["زنجبیل", "هل", "دارچین", "زیره"],
  "عفونت قارچی": ["سیر", "پونه", "آویشن", "همیشه بهار"],
  "زخم دهان": ["شیرین بیان", "بابونه", "مریم گلی", "آلوئه ورا"],
  "بوی بد دهان": ["نعنا", "جعفری", "مریم گلی", "میخک"],
  "درد دندان": ["میخک", "قرنفل", "نعنا", "بابونه"],
  "پف چشم": ["چای سبز", "خیار", "گل محمدی", "بابونه"],
  "سیاهی دور چشم": ["خیار", "گل محمدی", "چای سبز", "آلوئه ورا"]
};

const UNITS = { "G": "گرم", "MG": "میلی‌گرم", "UG": "میکروگرم", "KCAL": "کیلوکالری", "kJ": "کیلوژول", "IU": "واحد" };
const NUTRIENTS = {
  "Energy": "انرژی", "Protein": "پروتئین", "Total lipid (fat)": "چربی",
  "Carbohydrate, by difference": "کربوهیدرات", "Fiber, total dietary": "فیبر",
  "Potassium, K": "پتاسیم", "Calcium, Ca": "کلسیم", "Iron, Fe": "آهن",
  "Vitamin C, total ascorbic acid": "ویتامین C", "Vitamin A, RAE": "ویتامین A"
};

// ==========================================
// منوی اصلی جدید
// ==========================================
const MAIN_MENU = {
  keyboard: [
    [{ text: "📖 معرفی ابن‌سینا و قانون" }],
    [{ text: "📚 خلاصه رایگان قانون" }],
    [{ text: "📖 فروش کتاب قانون" }],
    [{ text: "🌿🍎 جستجوی گیاه و میوه" }],
    [{ text: "📂 دسته‌بندی‌ها" }, { text: "🩺 جستجوی بیماری" }],
    [{ text: "🧠 مزاج خودت را بشناس" }],
    [{ text: "📞 پشتیبانی" }, { text: "❓ راهنما" }]
  ],
  resize_keyboard: true
};

function normalize(text) {
  if (!text) return "";
  return text
    .replace(/[يﻯﻰ]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/[\u200c\u200f\u200e]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ==========================================
// جستجوی هوشمند
// ==========================================
function smartSearch(text) {
  const q = normalize(text);
  if (!q) return { type: "none" };

  // ۱. مطابقت دقیق اسم
  let exact = Object.keys(HERBS).find(k => normalize(k) === q);
  if (exact) return { type: "single", key: exact };

  // ۲. شروع با اسم
  const startsWith = Object.keys(HERBS).filter(k => normalize(k).startsWith(q));
  if (startsWith.length === 1) return { type: "single", key: startsWith[0] };
  if (startsWith.length > 1) return { type: "multi", keys: startsWith };

  // ۳. داخل اسم
  const containsName = Object.keys(HERBS).filter(k => normalize(k).includes(q));
  if (containsName.length === 1) return { type: "single", key: containsName[0] };
  if (containsName.length > 1) return { type: "multi", keys: containsName };

  // ۴. جستجو در props فقط برای کلمات کلیدی خاص
  const KEYWORDS = ["ضد التهاب", "ضد تهوع", "ضد سرفه", "ضد سرطان", "ضد باکتری",
                    "ضد ویروس", "ضد درد", "ضد نفخ", "ضد افسردگی", "ضد حساسیت",
                    "بهبود هضم", "بهبود خواب", "بهبود گوارش", "کاهش فشار خون",
                    "کاهش قند خون", "کاهش کلسترول", "تقویت ایمنی", "تقویت حافظه",
                    "آرام‌بخش", "آنتی‌اکسیدان", "سلامت قلب", "سلامت کبد",
                    "سلامت کلیه", "سلامت پوست", "سلامت چشم", "سم‌زدایی"];

  const matchedKeyword = KEYWORDS.find(kw =>
    normalize(q) === normalize(kw)
  );

  if (matchedKeyword) {
    const inProps = Object.keys(HERBS).filter(k =>
      normalize(HERBS[k].props).includes(normalize(matchedKeyword))
    );
    if (inProps.length > 0) {
      return { type: "props", keys: inProps, query: matchedKeyword };
    }
  }

  return { type: "none" };
}

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
  } catch { return null; }
}

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

function computeMizaj(wc, dm) {
  let mizaj, emoji, desc, advice;
  if (wc >= 0 && dm >= 0) {
    mizaj = "گرم و خشک (صفراوی)"; emoji = "🔥🌵";
    desc = "مزاج شما گرم و خشک است. بدنی لاغر و خوش‌اندام دارید، خوابتان کم و سبک است، زودرنج و عصبی هستید و انرژی زیادی دارید ولی زود خسته می‌شوید.";
    advice = "غذاهای خنک و مرطوب بخورید (کاهو، خیار، ماست، دوغ). از ادویه تند، قهوه و گوشت سرخ‌شده کمتر مصرف کنید. آب کافی بنوشید و خواب کافی داشته باشید.";
  } else if (wc >= 0 && dm < 0) {
    mizaj = "گرم و تر (دموی)"; emoji = "🔥💧";
    desc = "مزاج شما گرم و تر است. بدنی پرگوشت و خوش‌رنگ دارید، خوابتان زیاد و سنگین است، پرحرف و اجتماعی هستید و اشتهای زیادی دارید.";
    advice = "غذاهای خنک بخورید (سبزیجات خنک، میوه‌های ترش، حبوبات). از گوشت قرمز، شیرینیجات و چربی سنگین کمتر مصرف کنید. بیشتر تحرک داشته باشید.";
  } else if (wc < 0 && dm < 0) {
    mizaj = "سرد و تر (بلغمی)"; emoji = "❄️💧";
    desc = "مزاج شما سرد و تر است. بدنی نرم و پفکی دارید، خوابتان زیاد و سنگین است، کم‌تحرک و آرام هستید و دست و پایتان سرد می‌شود.";
    advice = "غذاهای گرم و خشک بخورید (زنجبیل، دارچین، خرما، انجیر، گوشت گرم، عسل). از لبنیات سرد، ترشیجات و هندوانه کمتر مصرف کنید. بیشتر تحرک کنید و کمتر بخوابید.";
  } else {
    mizaj = "سرد و خشک (سوداوی)"; emoji = "❄️🌵";
    desc = "مزاج شما سرد و خشک است. بدنی لاغر و استخوانی دارید، خوابتان کم و آشفته است، فکور و درون‌گرا هستید و زودشک و حساس می‌شوید.";
    advice = "غذاهای گرم و مرطوب بخورید (گوشت، تخم‌مرغ، میوه‌های شیرین، روغن زیتون، شیر گرم با عسل). از غذاهای سرد و خشک، ترشیجات و فست‌فود کمتر مصرف کنید. شاد باشید و معاشرت کنید.";
  }
  return { mizaj, emoji, desc, advice };
}

// ==========================================
// Webhook اصلی
// ==========================================
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(200).send("OK");

  try {
    const update = req.body;
    const message = update.message || update.edited_message;
    const callbackQuery = update.callback_query;

    // ---- PreCheckout ----
    if (update.pre_checkout_query) {
      const q = update.pre_checkout_query;
      console.log("💳 PreCheckout:", q.invoice_payload);
      await answerPreCheckoutQuery(q.id, true);
      return res.status(200).send("OK");
    }

    // ---- Successful Payment ----
    if (message && message.successful_payment) {
      const payment = message.successful_payment;
      const chatId = message.chat.id;
      const user = message.from;

      console.log("✅ Payment:", payment.invoice_payload);

      const book = booksConfig.books.find(b => b.id === payment.invoice_payload);

      if (book) {
        await sendDocument(chatId, book.fileUrl,
          `✅ از خرید شما سپاسگزاریم!\n\n` +
          `📖 ${book.title}\n\n` +
          `🔑 کد پیگیری: ${payment.provider_payment_charge_id}\n\n` +
          `📌 برای استفاده: فایل PDF بالا را دانلود کنید.`
        );

        if (ADMIN_CHAT_ID) {
          const amountToman = (payment.total_amount / 10).toLocaleString("fa-IR");
          await sendMessage(ADMIN_CHAT_ID,
            `🔔 فروش جدید!\n\n` +
            `👤 کاربر: ${user.first_name} ${user.last_name || ""}\n` +
            `🆔 آیدی: ${user.id}\n` +
            `💰 مبلغ: ${amountToman} تومان\n` +
            `📦 محصول: ${book.title}\n` +
            `🔑 کد پیگیری: ${payment.provider_payment_charge_id}`
          );
        }
      }
      return res.status(200).send("OK");
    }

    // ---- Callback Query ----
    if (callbackQuery) {
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      const callbackId = callbackQuery.id;
      const data = callbackQuery.data;

      if (data.startsWith("mz|")) {
        const parts = data.split("|");
        const nextQ = parseInt(parts[1]);
        const wc = parseInt(parts[2]);
        const dm = parseInt(parts[3]);

        await answerCallback(callbackId, "");

        if (nextQ >= MIZAJ_QUESTIONS.length) {
          const result = computeMizaj(wc, dm);
          await editMessage(chatId, messageId,
            `${result.emoji} مزاج شما: ${result.mizaj}\n\n` +
            `📋 ${result.desc}\n\n` +
            `💡 توصیه:\n${result.advice}\n\n` +
            `⚠️ این اطلاعات آموزشی است — جایگزین پزشک نیست.`
          );
          return res.status(200).send("OK");
        }

        const q = MIZAJ_QUESTIONS[nextQ];
        const keyboard = {
          inline_keyboard: q.options.map(opt => ([{
            text: opt.text,
            callback_data: `mz|${nextQ + 1}|${wc + opt.wc}|${dm + opt.dm}`
          }]))
        };
        await editMessage(chatId, messageId, q.q, keyboard);
        return res.status(200).send("OK");
      }

      return res.status(200).send("OK");
    }

    if (!message) return res.status(200).send("OK");

    const chatId = message.chat.id;
    const text = (message.text || "").trim();
    const firstName = message.from?.first_name || "دوست عزیز";

    // ---- /start ----
    if (text === "/start") {
      await sendMessage(chatId,
        `سلام ${firstName} 👋\n\n` +
        `🌿 به ربات دانشنامه ابن سینا خوش آمدی!\n\n` +
        `می‌تونی:\n` +
        `• با ابن‌سینا و قانون آشنا بشی\n` +
        `• خلاصه رایگان قانون رو بگیری\n` +
        `• کتاب کامل رو بخری\n` +
        `• گیاهان و میوه‌ها رو جستجو کنی\n` +
        `• مزاج خودت رو بشناسی\n` +
        `• با پشتیبانی در ارتباط باشی`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // ---- راهنما ----
    if (text === "❓ راهنما" || text === "/help") {
      await sendMessage(chatId,
        `📖 راهنما:\n\n` +
        `📖 معرفی ابن‌سینا و قانون — آشنایی با حکیم هزاره\n` +
        `📚 خلاصه رایگان قانون — دریافت خلاصه PDF\n` +
        `📖 فروش کتاب قانون — خرید کتاب کامل\n` +
        `🌿🍎 جستجوی گیاه و میوه — اسم گیاه یا میوه\n` +
        `📂 دسته‌بندی‌ها — گیاهان بر اساس حوزه\n` +
        `🩺 جستجوی بیماری — گیاهان مفید\n` +
        `🧠 مزاج خودت را بشناس — تست مزاج\n` +
        `📞 پشتیبانی — ارتباط با ادمین\n\n` +
        `⚠️ محتوای آموزشی — جایگزین پزشک نیست.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // ---- معرفی ابن‌سینا ----
    if (text === "📖 معرفی ابن‌سینا و قانون") {
      await sendMessage(chatId, booksConfig.avicennaIntro, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // ---- خلاصه رایگان ----
    if (text === "📚 خلاصه رایگان قانون") {
      await sendDocument(chatId, booksConfig.summaryUrl,
        `📚 خلاصه رایگان قانون ابن‌سینا\n\n` +
        `📖 کتاب اول: کلیات\n\n` +
        `📌 این خلاصه، رایگانه. برای دریافت کتاب کامل (۵۳ صفحه)، دکمه «📖 فروش کتاب قانون» رو بزنید.\n\n` +
        `🌿 سلامت و سبک زندگی — دانشنامه ابن‌سینا`
      );
      return res.status(200).send("OK");
    }

    // ---- دسته‌بندی‌ها ----
    if (text === "📂 دسته‌بندی‌ها" || text === "/cats") {
      const cats = Object.keys(CATEGORIES);
      let catText = `📂 دسته‌بندی‌ها:\n\n`;
      cats.forEach(c => { catText += `${CATEGORIES[c]}\n`; });
      catText += `\n💡 اسم دسته رو بنویس.`;
      await sendMessage(chatId, catText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    if (text === "🌿🍎 جستجوی گیاه و میوه") {
      await sendMessage(chatId, "🌿🍎 اسم گیاه یا میوه رو بنویس:", MAIN_MENU);
      return res.status(200).send("OK");
    }

    if (text === "🩺 جستجوی بیماری") {
      await sendMessage(chatId,
        `🩺 اسم بیماری یا مشکل رو بنویس:\n\nمثلاً: یبوست، بی‌خوابی، فشار خون، دیابت`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // ---- مزاج ----
    if (text === "🧠 مزاج خودت را بشناس") {
      const q = MIZAJ_QUESTIONS[0];
      const keyboard = {
        inline_keyboard: q.options.map(opt => ([{
          text: opt.text,
          callback_data: `mz|1|${opt.wc}|${opt.dm}`
        }]))
      };
      await sendMessageWithKeyboard(chatId, q.q, keyboard);
      return res.status(200).send("OK");
    }

    // ---- پشتیبانی ----
    if (text === "📞 پشتیبانی" || text === "/support") {
      await sendMessage(chatId,
        `📞 پشتیبانی\n\n` +
        `سلام ${firstName} 👋\n\n` +
        `پیامت رو همینجا بنویس.\n` +
        `ادمین در اولین فرصت پاسخ می‌ده.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // ---- فروش کتاب ----
    if (text === "📖 فروش کتاب قانون") {
      const book = booksConfig.books[0];
      if (!book) {
        await sendMessage(chatId, "⚠️ کتابی موجود نیست.", MAIN_MENU);
        return res.status(200).send("OK");
      }

      try {
        await sendInvoice(chatId,
          book.title,
          book.description,
          book.id,
          PROVIDER_TOKEN,
          "IRR",
          [{ label: "کتاب الکترونیکی", amount: book.price * 10 }]
        );
      } catch (e) {
        console.error("Invoice error:", e.message);
        await sendMessage(chatId, "⚠️ خطا در ساخت فاکتور.", MAIN_MENU);
      }
      return res.status(200).send("OK");
    }

    // ---- بیماری ----
    const diseaseKey = Object.keys(DISEASES).find(d =>
      normalize(text) === normalize(d) || normalize(text).includes(normalize(d)) || normalize(d).includes(normalize(text))
    );
    if (diseaseKey) {
      const herbs = DISEASES[diseaseKey];
      let dText = `🩺 گیاهان مفید برای «${diseaseKey}»:\n\n`;
      herbs.forEach(h => {
        if (HERBS[h]) {
          dText += `🌿 ${h}\n   ${HERBS[h].props.split("،")[0]}\n\n`;
        }
      });
      dText += `⚠️ محتوای آموزشی — جایگزین پزشک نیست.`;
      await sendMessage(chatId, dText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // ---- دسته ----
    const catMatch = Object.keys(CATEGORIES).find(c =>
      normalize(text) === normalize(c) || normalize(text).includes(normalize(c)) || normalize(c).includes(normalize(text))
    );
    if (catMatch) {
      const herbs = Object.entries(HERBS).filter(([k, v]) => v.cat === catMatch);
      let listText = `${CATEGORIES[catMatch]}:\n\n`;
      herbs.forEach(([name, data]) => {
        listText += `🌿 ${name} (${data.en})\n   ${data.props}\n\n`;
      });
      await sendMessage(chatId, listText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // ---- جستجوی هوشمند ----
    const result = smartSearch(text);

    if (result.type === "multi") {
      let optText = `🔍 چند مورد پیدا شد. کدوم رو می‌خوای؟\n\n`;
      result.keys.forEach((m) => { optText += `🌿 ${m} (${HERBS[m].en})\n`; });
      optText += `\n💡 اسم دقیق‌تر رو بنویس.`;
      await sendMessage(chatId, optText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    if (result.type === "props") {
      let pText = `🍃 گیاهان با خاصیت «${result.query}»:\n\n`;
      result.keys.slice(0, 20).forEach((m) => {
        pText += `🌿 ${m} (${HERBS[m].en})\n   ${HERBS[m].props}\n\n`;
      });
      if (result.keys.length > 20) pText += `💡 و ${result.keys.length - 20} مورد دیگه...\n\n`;
      pText += `⚠️ محتوای آموزشی — جایگزین پزشک نیست.`;
      await sendMessage(chatId, pText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // ---- نتیجه تکی ----
    if (result.type === "single") {
      const key = result.key;
      const herb = HERBS[key];
      await sendMessage(chatId, `🔎 در حال جستجوی «${key}»...`);
      const food = await searchUSDA(herb.en);
      const nutrients = formatNutrients(food);
      const msg =
        `🌿 ${key} (${herb.en})\n` +
        `📂 ${herb.cat} • ${CAT_EN[herb.cat] || herb.cat}\n\n` +
        `🍃 خواص:\n${herb.props}\n\n` +
        `📊 مواد مغذی (در ۱۰۰ گرم):\n${nutrients}\n` +
        `⚠️ محتوای آموزشی — جایگزین پزشک نیست.`;
      await sendMessage(chatId, msg, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // ---- هر پیام دیگه‌ای = پشتیبانی ----
    if (ADMIN_CHAT_ID) {
      await sendMessage(ADMIN_CHAT_ID,
        `📩 پیام از کاربر\n\n` +
        `👤 نام: ${firstName} ${message.from?.last_name || ""}\n` +
        `🆔 آیدی: ${chatId}\n` +
        `🔗 یوزرنیم: @${message.from?.username || "ندارد"}\n\n` +
        `💬 پیام:\n${text}`
      );

      await sendMessage(chatId,
        `✅ پیامت برای ادمین ارسال شد.\n\n` +
        `📌 در اولین فرصت پاسخ می‌ده.`,
        MAIN_MENU
      );
    } else {
      await sendMessage(chatId,
        `❌ «${text}» پیدا نشد.\n\n💡 از «📂 دسته‌بندی‌ها» یا «🩺 جستجوی بیماری» استفاده کن.`,
        MAIN_MENU
      );
    }

  } catch (e) {
    console.error("❌ Error:", e.message);
  }

  return res.status(200).send("OK");
};

// ==========================================
// توابع API بله
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
        signal: AbortSignal.timeout(30000)
      });
      const d = await r.json();
      if (d.ok) return true;
    } catch (e) { console.error(`❌ Send error:`, e.message); }
  }
  return false;
}

async function sendMessageWithKeyboard(chatId, text, inlineKeyboard) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/sendMessage`,
    `https://botapi.bale.ai/bot${TOKEN}/sendMessage`
  ];
  const body = { chat_id: chatId, text: text, reply_markup: inlineKeyboard };

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000)
      });
      const d = await r.json();
      if (d.ok) return true;
    } catch (e) { console.error(`❌ Send error:`, e.message); }
  }
  return false;
}

async function editMessage(chatId, messageId, text, inlineKeyboard) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/editMessageText`,
    `https://botapi.bale.ai/bot${TOKEN}/editMessageText`
  ];
  const body = { chat_id: chatId, message_id: messageId, text: text };
  if (inlineKeyboard) body.reply_markup = inlineKeyboard;

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000)
      });
      const d = await r.json();
      if (d.ok) return true;
    } catch (e) { console.error(`❌ Edit error:`, e.message); }
  }
  return false;
}

async function answerCallback(callbackId, text) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/answerCallbackQuery`,
    `https://botapi.bale.ai/bot${TOKEN}/answerCallbackQuery`
  ];
  const body = { callback_query_id: callbackId };
  if (text) body.text = text;

  for (const url of urls) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000)
      });
      return;
    } catch (e) { console.error(`❌ Callback error:`, e.message); }
  }
}

async function sendInvoice(chatId, title, description, payload, providerToken, currency, prices) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/sendInvoice`,
    `https://botapi.bale.ai/bot${TOKEN}/sendInvoice`
  ];
  const body = {
    chat_id: chatId, title, description, payload,
    provider_token: providerToken, currency, prices
  };

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000)
      });
      const d = await r.json();
      console.log(`📤 Invoice:`, JSON.stringify(d));
      return d;
    } catch (e) { console.error(`❌ Invoice error:`, e.message); }
  }
  return null;
}

async function answerPreCheckoutQuery(queryId, ok) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/answerPreCheckoutQuery`,
    `https://botapi.bale.ai/bot${TOKEN}/answerPreCheckoutQuery`
  ];
  const body = { pre_checkout_query_id: queryId, ok: ok };

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000)
      });
      const d = await r.json();
      console.log(`✅ PreCheckout:`, JSON.stringify(d));
      return;
    } catch (e) { console.error(`❌ PreCheckout error:`, e.message); }
  }
}

async function sendDocument(chatId, docUrl, caption) {
  const urls = [
    `https://tapi.bale.ai/bot${TOKEN}/sendDocument`,
    `https://botapi.bale.ai/bot${TOKEN}/sendDocument`
  ];
  const body = { chat_id: chatId, document: docUrl, caption: caption || "" };

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000)
      });
      const d = await r.json();
      console.log(`📄 Document:`, JSON.stringify(d));
      if (d.ok) return true;
    } catch (e) { console.error(`❌ Doc error:`, e.message); }
  }
  return false;
}
