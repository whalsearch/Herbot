const TOKEN = process.env.BALE_BOT_TOKEN;
const USDA_KEY = process.env.USDA_API_KEY || "DEMO_KEY";

// ==========================================
// دیتابیس خواص گیاهان (محلی)
// ==========================================
const HERBS = {
  "زنجبیل": { en: "ginger", props: "ضد تهوع، ضد التهاب، بهبود هضم، تقویت ایمنی، کاهش درد مفاصل" },
  "زردچوبه": { en: "turmeric", props: "ضد التهاب قوی، آنتی‌اکسیدان، سلامت کبد، پیشگیری از آلزایمر" },
  "دارچین": { en: "cinnamon", props: "کاهش قند خون، ضد التهاب، آنتی‌اکسیدان، بهبود گوارش" },
  "سیر": { en: "garlic", props: "کاهش فشار خون، کاهش کلسترول، ضد سرطان، تقویت ایمنی" },
  "نعنا": { en: "mint", props: "بهبود هضم، تسکین سردرد، رفع نفخ، ضد تهوع" },
  "بابونه": { en: "chamomile", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب، درمان گوارشی" },
  "اسطوخودوس": { en: "lavender", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب، ضد التهاب" },
  "آویشن": { en: "thyme", props: "ضد باکتری، ضد سرفه، تقویت ایمنی، سلامت ریه" },
  "ریحان": { en: "basil", props: "ضد التهاب، آرام‌بخش، بهبود گوارش، تقویت ایمنی" },
  "جعفری": { en: "parsley", props: "سم‌زدایی، تقویت ایمنی، سلامت کلیه، سلامت استخوان" },
  "گشنیز": { en: "coriander", props: "سم‌زدایی، بهبود گوارش، ضد التهاب، کاهش قند خون" },
  "شوید": { en: "dill", props: "بهبود گوارش، آرام‌بخش، ضد نفخ، کاهش کلسترول" },
  "رزماری": { en: "rosemary", props: "تقویت حافظه، آنتی‌اکسیدان، ضد التهاب، بهبود گردش خون" },
  "مریم گلی": { en: "sage", props: "آرام‌بخش، بهبود گوارش، ضد التهاب، سلامت دهان" },
  "گل گاوزبان": { en: "borage", props: "آرام‌بخش، ضد التهاب، سلامت کبد، تقویت ایمنی" },
  "سنبل الطیب": { en: "valerian", props: "آرام‌بخش، بهبود خواب، کاهش اضطراب، ضد اسپاسم" },
  "خار مریم": { en: "milk thistle", props: "سلامت کبد، سم‌زدایی، آنتی‌اکسیدان، تقویت ایمنی" },
  "رازیانه": { en: "fennel", props: "بهبود گوارش، ضد نفخ، تقویت ایمنی، کاهش اشتها" },
  "شنبلیله": { en: "fenugreek", props: "کاهش قند خون، تقویت ایمنی، بهبود گوارش، افزایش شیر مادران" },
  "سیاه دانه": { en: "black seed", props: "تقویت ایمنی، ضد التهاب، سلامت کبد، ضد حساسیت" },
  "زعفران": { en: "saffron", props: "ضد افسردگی، تقویت ایمنی، سلامت قلب، بهبود خلق" },
  "گل محمدی": { en: "rose", props: "آرام‌بخش، سلامت پوست، بهبود گوارش، ضد التهاب" },
  "بالنگ": { en: "citron", props: "ضد نفخ، بهبود هضم، تقویت قلب و معده، آرام‌بخش، ضد سرفه" },
  "اسفناج": { en: "spinach", props: "پیشگیری از کم‌خونی، کاهش فشار خون، ضد سرطان، تقویت استخوان" },
  "هویج": { en: "carrot", props: "آنتی‌اکسیدان، پیشگیری از سرطان، سلامت قلب، تقویت بینایی" },
  "گوجه": { en: "tomato", props: "پیشگیری از سرطان پروستات، سلامت قلب، کاهش التهاب" },
  "خیار": { en: "cucumber", props: "ضد التهاب، کاهش فشار خون، سم‌زدایی، آبرسانی" },
  "کلم": { en: "cabbage", props: "ضد سرطان، سلامت گوارش، تقویت ایمنی، کاهش التهاب" },
  "کرفس": { en: "celery", props: "کاهش فشار خون، ضد التهاب، سم‌زدایی، سلامت کلیه" },
  "فلفل دلمه": { en: "bell pepper", props: "تقویت ایمنی، سلامت چشم، آنتی‌اکسیدان، سلامت پوست" },
  "بادمجان": { en: "eggplant", props: "سلامت قلب، کاهش کلسترول، آنتی‌اکسیدان، بهبود گوارش" },
  "چغندر": { en: "beet", props: "کاهش فشار خون، تقویت ورزشکاری، سم‌زدایی کبد، تقویت ایمنی" },
  "کدو سبز": { en: "zucchini", props: "کم‌کالری، سلامت قلب، بهبود گوارش، تقویت ایمنی" },
  "کدو تنبل": { en: "pumpkin", props: "تقویت بینایی، سلامت پوست، تقویت ایمنی، بهبود خواب" },
  "بروکلی": { en: "broccoli", props: "ضد سرطان، تقویت ایمنی، سلامت استخوان، سم‌زدایی" },
  "گل کلم": { en: "cauliflower", props: "ضد سرطان، سلامت قلب، تقویت ایمنی، کاهش التهاب" },
  "کاهو": { en: "lettuce", props: "آبرسانی، بهبود خواب، سلامت چشم، آرام‌بخش" },
  "پیاز": { en: "onion", props: "ضد التهاب، سلامت قلب، تقویت ایمنی، ضد باکتری" },
  "سیب زمینی": { en: "potato", props: "انرژی‌بخش، سلامت گوارش، تقویت ایمنی، سلامت پوست" },
  "قارچ": { en: "mushroom", props: "تقویت ایمنی، سلامت استخوان، آنتی‌اکسیدان، ضد سرطان" },
  "ذرت": { en: "corn", props: "انرژی‌بخش، سلامت چشم، تقویت ایمنی، سلامت قلب" },
  "سیب": { en: "apple", props: "تقویت ایمنی، کاهش التهاب، سلامت قلب، پیشگیری از دیابت نوع ۲" },
  "پرتقال": { en: "orange", props: "پیشگیری از سرماخوردگی، کاهش فشار خون، ضد التهاب، سلامت پوست" },
  "موز": { en: "banana", props: "تنظیم فشار خون، کاهش افسردگی، سلامت قلب، انرژی‌بخش" },
  "انار": { en: "pomegranate", props: "سلامت قلب، کاهش فشار خون، ضد التهاب، پیشگیری از سرطان" },
  "توت‌فرنگی": { en: "strawberry", props: "آنتی‌اکسیدان، سلامت قلب، تنظیم قند خون، سلامت پوست" },
  "کیوی": { en: "kiwi", props: "بهبود خواب، سلامت پوست، ضد آسم، تقویت ایمنی" },
  "لیمو": { en: "lemon", props: "کمک به هضم، ضد سنگ کلیه، سلامت پوست، تقویت ایمنی" },
  "انبه": { en: "mango", props: "تقویت ایمنی، سلامت پوست، بهبود گوارش، سلامت چشم" },
  "آناناس": { en: "pineapple", props: "ضد التهاب، بهبود گوارش، تقویت ایمنی، سلامت استخوان" },
  "هندوانه": { en: "watermelon", props: "آبرسانی، سلامت قلب، ضد التهاب، سلامت کلیه" },
  "انگور": { en: "grape", props: "آنتی‌اکسیدان، سلامت قلب، کاهش فشار خون، تقویت ایمنی" },
  "گیلاس": { en: "cherry", props: "ضد التهاب، بهبود خواب، کاهش درد عضلات، آنتی‌اکسیدان" },
  "هلو": { en: "peach", props: "سلامت پوست، بهبود گوارش، تقویت ایمنی، سلامت چشم" },
  "زردآلو": { en: "apricot", props: "سلامت چشم، سلامت پوست، آنتی‌اکسیدان، بهبود گوارش" },
  "گلابی": { en: "pear", props: "بهبود گوارش، کاهش التهاب، سلامت قلب، تقویت ایمنی" },
  "آلو": { en: "plum", props: "بهبود گوارش، آنتی‌اکسیدان، سلامت استخوان، تقویت ایمنی" },
  "انجیر": { en: "fig", props: "بهبود گوارش، تقویت استخوان، تنظیم قند خون، سلامت قلب" },
  "خرما": { en: "date", props: "انرژی‌بخش، تقویت گوارش، سلامت قلب، تقویت استخوان" },
  "نارگیل": { en: "coconut", props: "انرژی‌بخش، تقویت ایمنی، سلامت پوست، سلامت قلب" },
  "گریپ‌فروت": { en: "grapefruit", props: "کاهش وزن، تقویت ایمنی، سلامت قلب، تنظیم قند خون" },
  "بلوبری": { en: "blueberry", props: "آنتی‌اکسیدان قوی، سلامت مغز، بهبود حافظه، سلامت قلب" },
  "تمشک": { en: "raspberry", props: "آنتی‌اکسیدان، سلامت قلب، ضد التهاب، تقویت ایمنی" },
  "زغال‌اخته": { en: "cranberry", props: "سلامت کلیه، تقویت ایمنی، سلامت قلب، ضد التهاب" },
  "خرمالو": { en: "persimmon", props: "تقویت ایمنی، سلامت قلب، بهبود گوارش، سلامت چشم" },
  "به": { en: "quince", props: "بهبود گوارش، ضد التهاب، تقویت ایمنی، سلامت قلب" },
  "ازگیل": { en: "medlar", props: "ضد التهاب، تقویت ایمنی، سلامت گوارش، سلامت قلب" },
  "زالزالک": { en: "hawthorn", props: "سلامت قلب، کاهش فشار خون، آرام‌بخش، تقویت ایمنی" },
  "کنار": { en: "jujube", props: "تقویت ایمنی، سلامت کبد، ضد التهاب، بهبود خواب" }
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
    [{ text: "📋 لیست گیاهان" }, { text: "❓ راهنما" }]
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
    if (!r.ok) {
      console.log("USDA status:", r.status);
      return null;
    }
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
  } catch (e) {
    console.log("USDA error:", e.message);
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
        `تا خواص و مواد مغذی‌ش رو ببینی.\n\n` +
        `مثلاً: زنجبیل، بابونه، سیب`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // راهنما
    if (text === "❓ راهنما" || text === "/help") {
      await sendMessage(chatId,
        `📖 راهنما:\n\n` +
        `🌿 جستجوی گیاه — اسم گیاه یا میوه رو بزن\n` +
        `📋 لیست گیاهان — همه گیاهان موجود\n` +
        `❓ راهنما — همین پیام\n\n` +
        `💡 مثال: «زنجبیل»، «بابونه»، «سیب»\n\n` +
        `⚠️ این اطلاعات آموزشی است و جایگزین مشاوره پزشک نیست.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    // لیست گیاهان
    if (text === "📋 لیست گیاهان" || text === "/list") {
      const herbs = Object.keys(HERBS);
      let listText = `📋 گیاهان موجود (${herbs.length} مورد):\n\n`;
      for (let i = 0; i < herbs.length; i += 5) {
        listText += herbs.slice(i, i + 5).join(" • ") + "\n";
      }
      await sendMessage(chatId, listText, MAIN_MENU);
      return res.status(200).send("OK");
    }

    // جستجوی گیاه
    if (text === "🌿 جستجوی گیاه") {
      await sendMessage(chatId, "🌿 اسم گیاه یا میوه رو بنویس:", MAIN_MENU);
      return res.status(200).send("OK");
    }

    // جستجوی مستقیم
    const key = Object.keys(HERBS).find(k =>
      text === k || text.includes(k) || k.includes(text)
    );

    if (!key) {
      await sendMessage(chatId,
        `❌ «${text}» توی دیتابیس ما پیدا نشد.\n\n` +
        `📋 برای دیدن لیست گیاهان موجود، دکمه «لیست گیاهان» رو بزن.`,
        MAIN_MENU
      );
      return res.status(200).send("OK");
    }

    const herb = HERBS[key];

    await sendMessage(chatId, `🔎 در حال جستجوی «${key}»...`);

    const food = await searchUSDA(herb.en);
    const nutrients = formatNutrients(food);

    const result =
      `🌿 ${key}\n\n` +
      `💊 خواص:\n${herb.props}\n\n` +
      `📊 مواد مغذی (در ۱۰۰ گرم):\n${nutrients}\n` +
      `⚠️ این اطلاعات آموزشی است و جایگزین مشاوره پزشک نیست.`;

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
