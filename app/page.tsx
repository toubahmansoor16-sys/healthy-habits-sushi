"use client";
import { supabase } from "./lib/supabase";

import { useState } from "react";
import Image from "next/image";
export default function Home() {
 const [lang, setLang] = useState<"nl" | "en">("nl");
const [surveyChoice, setSurveyChoice] = useState<string | null>(null);
const [habitChoice, setHabitChoice] = useState<string | null>(null);
const [openSection, setOpenSection] = useState<string | null>(null);
const [habitTransformation, setHabitTransformation] = useState(false);
const [progress, setProgress] = useState<string[]>([]);
const [reservationMessage, setReservationMessage] = useState("");
const [surveyMessage, setSurveyMessage] = useState("");
const [reservationName, setReservationName] = useState("");
const [reservationEmail, setReservationEmail] = useState("");
const [reservationQuantity, setReservationQuantity] = useState("");

const [dietaryPreference, setDietaryPreference] = useState("");
const [allergies, setAllergies] = useState("");
const [specialRequests, setSpecialRequests] = useState("");

const [order, setOrder] = useState({
  futomaki: 0,
  california: 0,
  hosomakiSalmon: 0,
  philadelphiaClassic: 0,
  philadelphiaVeg: 0,
  hosomakiCucumber: 0,
});

const toggleProgress = (item: string) => {
  setProgress((prev) =>
    prev.includes(item)
      ? prev.filter((i) => i !== item)
      : [...prev, item]
  );
};

const updateItem = (item: keyof typeof order, change: number) => {
  setOrder((prev) => ({
    ...prev,
    [item]: Math.max(0, prev[item] + change),
  }));
};

const totalPrice =
  order.futomaki * 4 +
  order.california * 5 +
  order.hosomakiSalmon * 4 +
  order.philadelphiaClassic * 6 +
  order.philadelphiaVeg * 3 +
  order.hosomakiCucumber * 2; 

  const handleReservationSubmit = async () => {
  const orderSummary = `
Futomaki: ${order.futomaki}
California: ${order.california}
Hosomaki Salmon: ${order.hosomakiSalmon}
Philadelphia Classic: ${order.philadelphiaClassic}
Philadelphia Vegetarian: ${order.philadelphiaVeg}
Hosomaki Cucumber: ${order.hosomakiCucumber}
`;

  const { error } = await supabase
    .from("reservations")
    .insert([
      {
        name: reservationName,
        email: reservationEmail,
        quantity: reservationQuantity,
        meal_type: dietaryPreference,
        allergies: allergies,
        order_item: orderSummary,
        total_price: totalPrice,
        special_requests: specialRequests,
      },
    ]);

  if (error) {
  console.error(error);

  setReservationMessage(
    `${error.message}`
  );
  } else {
    setReservationMessage(
      lang === "nl"
        ? "Reservatie succesvol opgeslagen!"
        : "Reservation saved successfully!"
    );
  }
};

const handleSurveySubmit = async (response: string) => {
  const { error } = await supabase
    .from("survey_responses")
    .insert([
      {
        response,
        language: lang,
      },
    ]);

  if (error) {
    setSurveyMessage(error.message);
  } else {
    setSurveyChoice(response);

    setSurveyMessage(
      lang === "nl"
        ? "Bedankt voor uw antwoord!"
        : "Thank you for your response!"
    );
  }
};
  const challengePercent = Math.round(
  (progress.length / 7) * 100
);

const challengeBadge =
  challengePercent === 100
    ? "Habit Master"
    : challengePercent >= 70
    ? "Consistent"
    : challengePercent >= 30
    ? "Beginner"
    : "Getting Started";

  const t = {
    nl: {
      nav: {
        gallery: "Galerij",
        habits: "Gewoontes",
        psychology: "Psychologie",
        loop: "Gewoontecyclus",
        survey: "Enquête",
        reservation: "Reservatie",
      },

      hero: {
        title: "Gezond eten.\nGezonde gewoontes.",
        subtitle:
          "Leer hoe psychologie, gedrag en voeding samen gezonde keuzes vormen.",
      },

      sections: {
        gallery: "Sushi Galerij",
        habits: "Eetgewoontes",
        psychology: "De Psychologie van Gezond Eten",
        loop: "De Gewoontecyclus",
        survey: "Enquête",
        reservation: "Reservatie",
      },

      habitTriggers: {
        stress: "Stress",
        boredom: "Verveling",
        studying: "Studeren",
        social: "Sociale situaties",
      },

      habitResults: {
        stress: "Stress → emotioneel eten. Oplossing: wandelen of water drinken.",
        boredom: "Verveling → snacken. Oplossing: afleiding zoeken.",
        studying: "Studeren → focus snacks. Oplossing: pauzes nemen.",
        social: "Sociaal → groepsinvloed op eten.",
      },

      surveyQuestion: "Wat triggert ongezond eten het meest?",
      surveyOptions: {
        stress: "Stress",
        boredom: "Verveling",
        studying: "Studeren",
        social: "Sociale situaties",
      },

      surveySelected: "Geselecteerd:",

      reservationTitle: "Reservatie",
      submit: "Verzenden",

      name: "Naam",
      email: "E-mail",
      quantity: "Aantal",
    },

    en: {
      nav: {
        gallery: "Gallery",
        habits: "Habits",
        psychology: "Psychology",
        loop: "Habit Loop",
        survey: "Survey",
        reservation: "Reservation",
      },

      hero: {
        title: "Healthy Food.\nHealthy Habits.",
        subtitle:
          "Learn how psychology, behaviour and food create healthy choices.",
      },

      sections: {
        gallery: "Sushi Gallery",
        habits: "Eating Habits",
        psychology: "The Psychology of Healthy Eating",
        loop: "Habit Loop",
        survey: "Survey",
        reservation: "Reservation",
      },

      habitTriggers: {
        stress: "Stress",
        boredom: "Boredom",
        studying: "Studying",
        social: "Social situations",
      },

      habitResults: {
        stress: "Stress → emotional eating. Fix: walk or drink water.",
        boredom: "Boredom → snacking. Fix: distraction.",
        studying: "Studying → focus snacking. Fix: breaks.",
        social: "Social → group influence on eating.",
      },

      surveyQuestion: "What triggers unhealthy eating most?",
      surveyOptions: {
        stress: "Stress",
        boredom: "Boredom",
        studying: "Studying",
        social: "Social situations",
      },

      surveySelected: "Selected:",

      reservationTitle: "Reservation",
      submit: "Submit",

      name: "Name",
      email: "Email",
      quantity: "Quantity",
    },
  };

  return (
    <main className="font-sans bg-gray-50 text-gray-900">

      {/* NAV */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold">🍣 Healthy Habits Sushi</h1>

          <div className="flex gap-4 text-sm font-medium">
            <a href="#gallery">{t[lang].nav.gallery}</a>
            <a href="#habits">{t[lang].nav.habits}</a>
            <a href="#psychology">{t[lang].nav.psychology}</a>
            <a href="#loop">{t[lang].nav.loop}</a>
            <a href="#survey">{t[lang].nav.survey}</a>
            <a href="#reservation">{t[lang].nav.reservation}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
  className="relative py-32 text-center overflow-hidden"
  style={{
    backgroundImage: "url('/sushi - hero.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
<div className="absolute inset-0 bg-black/70"></div>

<div className="relative z-10 text-white"></div>

        <div className="flex justify-center gap-3 mb-6">
          <button onClick={() => setLang("nl")} className="px-4 py-2 bg-white border rounded-full">NL</button>
          <button onClick={() => setLang("en")} className="px-4 py-2 bg-white border rounded-full">EN</button>
        </div>

        <h1
  className="text-5xl md:text-7xl font-black whitespace-pre-line text-white"
  style={{
    textShadow: "0 4px 20px rgba(0,0,0,0.8)",
  }}
>
  {t[lang].hero.title}
</h1>

<p className="mt-6 text-white max-w-xl mx-auto">
  {t[lang].hero.subtitle}
</p>
      </section>

{/* RESERVATION */}
<section id="reservation" className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-4">
    {lang === "nl" ? "Reservatie" : "Reservation"}
  </h2>

  <p className="text-gray-600 mb-10">
    {lang === "nl"
      ? "Reserveer je tafel en stel je sushi bestelling samen."
      : "Reserve your table and build your sushi order."}
  </p>

  <div className="bg-white rounded-2xl shadow p-6 space-y-6">

    {/* CUSTOMER INFO */}

    <input
      className="w-full p-3 border rounded"
      placeholder={lang === "nl" ? "Naam" : "Name"}
      value={reservationName}
      onChange={(e) => setReservationName(e.target.value)}
    />

    <input
      className="w-full p-3 border rounded"
      placeholder={lang === "nl" ? "E-mail" : "Email"}
      value={reservationEmail}
      onChange={(e) => setReservationEmail(e.target.value)}
    />

    <input
      className="w-full p-3 border rounded"
      placeholder={lang === "nl" ? "Aantal Personen" : "Number of People"}
      value={reservationQuantity}
      onChange={(e) => setReservationQuantity(e.target.value)}
    />

    {/* CLASSIC MENU */}

    <div>
      <h3 className="text-2xl font-bold mb-4">
        {lang === "nl" ? "Sushi Classic" : "Sushi Classic"}
      </h3>

      <div className="space-y-4">

        {[
          {
            key: "futomaki",
            name:
              lang === "nl"
                ? "Futomaki Zalm + Avocado"
                : "Futomaki Salmon + Avocado",
            price: 4,
          },
          {
            key: "california",
            name: "California Classic",
            price: 5,
          },
          {
            key: "hosomakiSalmon",
            name:
              lang === "nl"
                ? "Hosomaki Zalm"
                : "Hosomaki Salmon",
            price: 4,
          },
          {
            key: "philadelphiaClassic",
            name: "Philadelphia Classic",
            price: 6,
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center border rounded-xl p-4"
          >
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p>€{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  updateItem(item.key as keyof typeof order, -1)
                }
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span className="font-bold">
                {order[item.key as keyof typeof order]}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateItem(item.key as keyof typeof order, 1)
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* VEGETARIAN MENU */}

    <div>
      <h3 className="text-2xl font-bold mb-4">
        {lang === "nl"
          ? "Sushi Vegetarisch"
          : "Vegetarian Sushi"}
      </h3>

      <div className="space-y-4">

        {[
          {
            key: "philadelphiaVeg",
            name:
              lang === "nl"
                ? "Philadelphia Vegetarisch"
                : "Philadelphia Vegetarian",
            price: 3,
          },
          {
            key: "hosomakiCucumber",
            name:
              lang === "nl"
                ? "Hosomaki Komkommer"
                : "Hosomaki Cucumber",
            price: 2,
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center border rounded-xl p-4"
          >
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p>€{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  updateItem(item.key as keyof typeof order, -1)
                }
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span className="font-bold">
                {order[item.key as keyof typeof order]}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateItem(item.key as keyof typeof order, 1)
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* TOTAL */}

    <div className="bg-green-50 p-5 rounded-xl">
      <h3 className="text-xl font-bold">
        {lang === "nl" ? "Totaal" : "Total"}: €{totalPrice}
      </h3>
    </div>

    {/* DIETARY PREFERENCE */}

    <div>
      <label className="block font-semibold mb-2">
        {lang === "nl"
          ? "Dieetvoorkeur"
          : "Dietary Preference"}
      </label>

      <select
        className="w-full p-3 border rounded"
        value={dietaryPreference}
        onChange={(e) => setDietaryPreference(e.target.value)}
      >
        <option value="">
          {lang === "nl"
            ? "Selecteer"
            : "Select"}
        </option>

        <option value="vegetarian">
          {lang === "nl"
            ? "Vegetarisch"
            : "Vegetarian"}
        </option>

        <option value="vegan">
          Vegan
        </option>

        <option value="fish">
          {lang === "nl"
            ? "Vis"
            : "Fish"}
        </option>
      </select>
    </div>

    {/* ALLERGIES */}

    <div>
      <label className="block font-semibold mb-2">
        {lang === "nl"
          ? "Allergieën"
          : "Allergies"}
      </label>

      <select
        className="w-full p-3 border rounded"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      >
        <option value="">
          {lang === "nl"
            ? "Geen"
            : "None"}
        </option>

        <option value="nuts">
          {lang === "nl"
            ? "Noten"
            : "Nuts"}
        </option>

        <option value="gluten">
          Gluten
        </option>

        <option value="lactose">
          Lactose
        </option>
      </select>
    </div>

    {/* SPECIAL REQUESTS */}

    <textarea
      className="w-full p-3 border rounded"
      rows={4}
      placeholder={
        lang === "nl"
          ? "Speciale verzoeken"
          : "Special requests"
      }
      value={specialRequests}
      onChange={(e) => setSpecialRequests(e.target.value)}
    />

    <button
  onClick={handleReservationSubmit}
  className="w-full bg-green-700 text-white p-4 rounded-xl font-bold"
  type="button"
>
  {reservationMessage && (
  <div className="mt-4 p-4 bg-green-100 rounded-xl">
    {reservationMessage}
  </div>
)}
      {lang === "nl"
        ? "Reserveer"
        : "Reserve"}
    </button>

  </div>
</section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black mb-10">{t[lang].sections.gallery}</h2>

        <div className="grid md:grid-cols-3 gap-6">

  <div className="bg-white rounded-2xl shadow overflow-hidden">
    <Image
      src="/sushi - hero.jpeg"
      alt="Sushi"
      width={600}
      height={400}
      className="w-full h-56 object-cover"
    />

    <div className="p-5">
      <h3 className="font-bold text-lg">
        {lang === "nl"
          ? "Futomaki Zalm & Avocado"
          : "Futomaki Salmon & Avocado"}
      </h3>

      <p className="text-gray-600 mt-2">
        {lang === "nl"
          ? "Verse zalm gecombineerd met romige avocado."
          : "Fresh salmon combined with creamy avocado."}
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow overflow-hidden">
    <Image
      src="/sushi gallery - 1.jpeg"
      alt="Sushi Platter"
      width={600}
      height={400}
      className="w-full h-56 object-cover"
    />

    <div className="p-5">
      <h3 className="font-bold text-lg">
        California Classic
      </h3>

      <p className="text-gray-600 mt-2">
        {lang === "nl"
          ? "Populaire sushi met surimi, komkommer en avocado."
          : "Popular sushi with surimi, cucumber and avocado."}
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow overflow-hidden">
    <Image
      src="/sushi gallery - 2.jpeg"
      alt="Vegetarian Sushi"
      width={600}
      height={400}
      className="w-full h-56 object-cover"
    />

    <div className="p-5">
      <h3 className="font-bold text-lg">
        {lang === "nl"
          ? "Philadelphia Vegetarisch"
          : "Philadelphia Vegetarian"}
      </h3>

      <p className="text-gray-600 mt-2">
        {lang === "nl"
          ? "Roomkaas, avocado en komkommer zonder vis."
          : "Cream cheese, avocado and cucumber without fish."}
      </p>
    </div>
  </div>

</div>
      </section>

 {/* ABOUT */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Over Sushi & Gezond Eten"
      : "About Sushi & Healthy Eating"}
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-3">
        {lang === "nl" ? "Waarom Sushi?" : "Why Sushi?"}
      </h3>

      <p>
        {lang === "nl"
          ? "Sushi wordt in dit project gebruikt als voorbeeld van een gezonde en aantrekkelijke maaltijd. Veel soorten sushi bevatten verse ingrediënten zoals vis, avocado, komkommer en rijst."
          : "Sushi is used in this project as an example of a healthy and appealing meal. Many sushi varieties contain fresh ingredients such as fish, avocado, cucumber and rice."}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-3">
        {lang === "nl"
          ? "Gezonde keuzes beginnen klein"
          : "Healthy choices start small"}
      </h3>

      <p>
        {lang === "nl"
          ? "Gezond eten betekent niet dat je perfect moet eten. Kleine dagelijkse keuzes maken op lange termijn een groot verschil."
          : "Healthy eating does not mean eating perfectly. Small daily choices can make a huge difference over time."}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-3">
        {lang === "nl"
          ? "Balans is belangrijk"
          : "Balance matters"}
      </h3>

      <p>
        {lang === "nl"
          ? "Een gezonde levensstijl draait om evenwicht en gewoontes die je kunt volhouden."
          : "A healthy lifestyle is about balance and habits that you can maintain consistently."}
      </p>
    </div>

  </div>

</section>

{/* EATING HABITS */}
<section id="habits" className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Wat zijn Eetgewoontes?"
      : "What Are Eating Habits?"}
  </h2>

  <div className="bg-white rounded-2xl shadow p-8">

    <p className="text-lg mb-6">
      {lang === "nl"
        ? "Eetgewoontes zijn automatische gedragingen die ons brein herhaalt om energie te besparen. Daardoor eten mensen vaak zonder er bewust over na te denken."
        : "Eating habits are automatic behaviours that the brain repeats to save energy. As a result, people often eat without consciously thinking about it."}
    </p>

    <div className="grid md:grid-cols-3 gap-4">

      <button
        onClick={() => setHabitChoice("studying")}
        className="bg-green-50 p-5 rounded-xl"
      >
        🍟 {lang === "nl"
          ? "Chips tijdens studeren"
          : "Chips while studying"}
      </button>

      <button
        onClick={() => setHabitChoice("lunch")}
        className="bg-green-50 p-5 rounded-xl"
      >
        🥤 {lang === "nl"
          ? "Frisdrank tijdens lunch"
          : "Soda at lunch"}
      </button>

      <button
        onClick={() => setHabitChoice("sport")}
        className="bg-green-50 p-5 rounded-xl"
      >
        🍎 {lang === "nl"
          ? "Fruit na sporten"
          : "Fruit after exercise"}
      </button>

    </div>

  </div>

</section>

{/* HABIT FORMATION */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Hoe Ontstaan Gewoontes?"
      : "How Habits Form"}
  </h2>

  <div className="bg-white rounded-2xl shadow p-8">

    <p className="text-lg mb-8">
      {lang === "nl"
        ? "Door herhaling worden gewoontes sterker en automatischer. Emoties spelen ook een belangrijke rol in eetgedrag."
        : "Through repetition, habits become stronger and more automatic. Emotions also play an important role in eating behaviour."}
    </p>

    <div className="grid md:grid-cols-3 gap-6 text-center">

      <div className="bg-green-100 p-8 rounded-xl">
        🧠
        <h3 className="font-bold mt-3">
          {lang === "nl" ? "Brein" : "Brain"}
        </h3>
      </div>

      <div className="bg-green-100 p-8 rounded-xl">
        🔁
        <h3 className="font-bold mt-3">
          {lang === "nl" ? "Herhaling" : "Repetition"}
        </h3>
      </div>

      <div className="bg-green-100 p-8 rounded-xl">
        ✅
        <h3 className="font-bold mt-3">
          {lang === "nl" ? "Gewoonte" : "Habit"}
        </h3>
      </div>

    </div>

    <div className="mt-8 grid md:grid-cols-3 gap-4">

      <div className="bg-gray-50 p-4 rounded-xl">
        {lang === "nl"
          ? "Altijd snacks kopen na school."
          : "Always buying snacks after school."}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        {lang === "nl"
          ? "Zin krijgen in suiker bij stress."
          : "Craving sugar during stress."}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        {lang === "nl"
          ? "Water drinken na het sporten."
          : "Drinking water after exercise."}
      </div>

    </div>

  </div>

</section>

{/* HABIT LOOP */}
<section id="loop" className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "De Gewoontecyclus"
      : "The Habit Loop"}
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-orange-100 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-3">
        {lang === "nl" ? "Trigger" : "Cue"}
      </h3>

      <ul className="space-y-2">
        <li> {lang === "nl" ? "Stress" : "Stress"}</li>
        <li> {lang === "nl" ? "Verveling" : "Boredom"}</li>
        <li> {lang === "nl" ? "Geur van eten" : "Smell of food"}</li>
        <li> {lang === "nl" ? "Sociale situaties" : "Social situations"}</li>
      </ul>
    </div>

    <div className="bg-green-100 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-3">
        {lang === "nl" ? "Routine" : "Routine"}
      </h3>

      <ul className="space-y-2">
        <li> Fast Food</li>
        <li> {lang === "nl" ? "Laat snacken" : "Late-night snacking"}</li>
        <li> {lang === "nl" ? "Emotioneel eten" : "Emotional eating"}</li>
        <li> Fruit</li>
        <li> Sushi</li>
      </ul>
    </div>

    <div className="bg-blue-100 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-3">
        {lang === "nl" ? "Beloning" : "Reward"}
      </h3>

      <ul className="space-y-2">
        <li> {lang === "nl" ? "Comfort" : "Comfort"}</li>
        <li> {lang === "nl" ? "Plezier" : "Pleasure"}</li>
        <li> {lang === "nl" ? "Energie" : "Energy"}</li>
        <li> {lang === "nl" ? "Stressvermindering" : "Stress relief"}</li>
      </ul>
    </div>

  </div>

</section>

{/* HOW HABITS STICK */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Hoe Gewoontes Blijven Plakken"
      : "How Habits Stick"}
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    <div className="bg-red-50 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4">
        {lang === "nl"
          ? "Ongezonde Omgeving"
          : "Unhealthy Environment"}
      </h3>

      <ul className="space-y-3">
        <li> {lang === "nl" ? "Snacks zichtbaar op bureau" : "Snacks visible on desk"}</li>
        <li> {lang === "nl" ? "Fastfood na school" : "Fast food after school"}</li>
        <li> {lang === "nl" ? "Laat studeren" : "Late-night studying"}</li>
      </ul>
    </div>

    <div className="bg-green-50 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4">
        {lang === "nl"
          ? "Gezonde Omgeving"
          : "Healthy Environment"}
      </h3>

      <ul className="space-y-3">
        <li>✅ {lang === "nl" ? "Fruit zichtbaar leggen" : "Keep fruit visible"}</li>
        <li>✅ {lang === "nl" ? "Gezonde snacks voorbereiden" : "Prepare healthy snacks"}</li>
        <li>✅ {lang === "nl" ? "Eerst water drinken" : "Drink water first"}</li>
      </ul>
    </div>

  </div>

</section>

{/* CHANGE HABITS */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Een Ongezonde Gewoonte Veranderen"
      : "Changing an Unhealthy Habit"}
  </h2>

  <div className="bg-white rounded-2xl shadow p-8">

    {!habitTransformation ? (
      <>
        <div className="text-center space-y-4 text-xl">
          <div> Stress</div>
          <div> </div>
          <div> Chocolate</div>
          <div> </div>
          <div> Relief</div>
        </div>

        <button
          onClick={() => setHabitTransformation(true)}
          className="mt-8 bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {lang === "nl"
            ? "Routine Vervangen"
            : "Replace Routine"}
        </button>
      </>
    ) : (
      <div className="text-center space-y-4 text-xl">
        <div> Stress</div>
        <div> </div>
        <div> {lang === "nl" ? "Wandeling" : "Walk"}</div>
        <div> </div>
        <div> {lang === "nl" ? "Gezonde Snack" : "Healthy Snack"}</div>
        <div> </div>
        <div> Relief</div>
      </div>
    )}

  </div>

</section>

{/* BUILD HEALTHY HABITS */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Een Gezonde Gewoonte Opbouwen"
      : "Building Healthy Habits"}
  </h2>

  <div className="grid md:grid-cols-5 gap-4">

    {[
      lang === "nl" ? "Begin klein" : "Start small",
      lang === "nl" ? "Maak gezond eten makkelijk" : "Make healthy eating easy",
      lang === "nl" ? "Bereid maaltijden vooraf" : "Prepare meals",
      lang === "nl" ? "Koppel aan bestaande routines" : "Habit stacking",
      lang === "nl" ? "Beloon consistent gedrag" : "Reward consistency",
    ].map((item) => (
      <div
        key={item}
        className="bg-green-100 rounded-xl p-5 text-center font-semibold"
      >
        {item}
      </div>
    ))}

  </div>

</section>

      {/* PSYCHOLOGY (FULL INTERACTIVE MODULE) */}
      <section id="psychology" className="max-w-6xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-black mb-10">
          {t[lang].sections.psychology}
        </h2>

        {/* CHALLENGE CENTER */}

<div className="mb-10 p-6 bg-green-50 rounded-2xl">

  <h3 className="text-2xl font-bold mb-4">
    {lang === "nl"
      ? "Challenge Center"
      : "Challenge Center"}
  </h3>

  <p className="mb-6 text-gray-700">
    {lang === "nl"
      ? "Voltooi dagelijkse gezonde gewoontes en bouw een sterke routine op."
      : "Complete daily healthy habits and build a strong routine."}
  </p>

  <div className="grid md:grid-cols-2 gap-3">

    {[
      {
        id: "drink_water",
        nl: "Drink meer water",
        en: "Drink more water",
      },
      {
        id: "eat_fruit",
        nl: "Eet fruit",
        en: "Eat fruit",
      },
      {
        id: "eat_vegetables",
        nl: "Eet groenten",
        en: "Eat vegetables",
      },
      {
        id: "replace_snack",
        nl: "Vervang een ongezonde snack",
        en: "Replace one unhealthy snack",
      },
      {
        id: "no_late_snacks",
        nl: "Geen late snacks",
        en: "No late-night snacks",
      },
      {
        id: "healthy_lunch",
        nl: "Gezonde lunch",
        en: "Healthy lunch",
      },
      {
        id: "mindful_eating",
        nl: "Bewust eten",
        en: "Mindful eating",
      },
    ].map((task) => (
      <button
        key={task.id}
        onClick={() => toggleProgress(task.id)}
        className={`p-4 rounded-xl border text-left ${
          progress.includes(task.id)
            ? "bg-green-200"
            : "bg-white"
        }`}
      >
        {progress.includes(task.id) ? "✅ " : "⬜ "}
        {lang === "nl" ? task.nl : task.en}
      </button>
    ))}

  </div>

  <div className="mt-8">

    <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

      <div
        className="bg-green-600 h-5"
        style={{
          width: `${challengePercent}%`,
        }}
      />

    </div>

    <p className="mt-3 font-semibold">
      {lang === "nl"
        ? `Voortgang: ${challengePercent}%`
        : `Progress: ${challengePercent}%`}
    </p>

    <p className="mt-2 text-lg font-bold">
      🏅 {challengeBadge}
    </p>

  </div>

</div>

        {/* INTERACTIVE LEARNING */}
        <div className="space-y-4">

          {[
            {
              id: "habits",
              title: lang === "nl" ? "Wat zijn eetgewoontes?" : "What are eating habits?",
              text:
                lang === "nl"
                  ? "Automatische gedragingen die je zonder nadenken uitvoert."
                  : "Automatic behaviours you perform without thinking.",
            },
            {
              id: "formation",
              title: lang === "nl" ? "Hoe ontstaan gewoontes?" : "How habits form",
              text:
                lang === "nl"
                  ? "Door herhaling en beloning worden ze sterker."
                  : "Through repetition and reward, habits strengthen.",
            },
            {
              id: "loop",
              title: lang === "nl" ? "De Habit Loop" : "The Habit Loop",
              text: "Cue → Routine → Reward",
            },
            {
              id: "change",
              title: lang === "nl" ? "Gewoontes veranderen" : "Changing habits",
              text:
                lang === "nl"
                  ? "Je vervangt de routine, niet de trigger."
                  : "You replace the routine, not the cue.",
            },
          ].map((s) => (
            <div key={s.id} className="border rounded-2xl bg-white">

              <button
                onClick={() =>
                  setOpenSection(openSection === s.id ? null : s.id)
                }
                className="w-full text-left p-4 font-bold"
              >
                {s.title}
              </button>

              {openSection === s.id && (
                <div className="p-4 border-t bg-gray-50">
                  {s.text}
                </div>
              )}

            </div>
          ))}

        </div>
      </section>

      {/* LOOP */}
      <section id="loop" className="bg-green-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-10">{t[lang].sections.loop}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-xl">Cue</div>
            <div className="bg-white/10 p-6 rounded-xl">Routine</div>
            <div className="bg-white/10 p-6 rounded-xl">Reward</div>
          </div>
        </div>
      </section>

      {/* SURVEY */}
      <section id="survey" className="bg-orange-50 py-20">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-4xl font-black mb-10">
            {t[lang].sections.survey}
          </h2>

          <p className="mb-6 font-semibold">{t[lang].surveyQuestion}</p>

          <div className="space-y-4">
            {Object.entries(t[lang].surveyOptions).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleSurveySubmit(key)}
                className={`w-full p-4 rounded-xl border text-left ${
                  surveyChoice === key ? "bg-green-200" : "bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
{surveyMessage && (
  <div className="mt-4 p-4 bg-green-100 rounded-xl">
    {surveyMessage}
  </div>
)}
          {surveyChoice && (
            <div className="mt-6 p-4 bg-green-100 rounded-xl">
              {t[lang].surveySelected}{" "}
              {t[lang].surveyOptions[surveyChoice as keyof typeof t["en"]["surveyOptions"]]}
            </div>
          )}

        </div>
      </section>

      <footer className="text-center py-10 text-gray-500">
        © 2026 Healthy Habits Sushi
      </footer>

    </main>
  );
}