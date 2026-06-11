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
const [surveyMessage, setSurveyMessage] = useState("");
const [otherTrigger, setOtherTrigger] = useState("");


const toggleProgress = (item: string) => {
  setProgress((prev) =>
    prev.includes(item)
      ? prev.filter((i) => i !== item)
      : [...prev, item]
  );
};

const handleSurveySubmit = async (response: string) => {
  const finalResponse =
    response === "other"
      ? otherTrigger
      : response;

  const { error } = await supabase
    .from("survey_responses")
    .insert([
      {
        response: finalResponse,
        language: lang,
      },
    ]);

  if (!error) {
    setSurveyMessage(
      lang === "nl"
        ? "Bedankt voor je antwoord!"
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
        habits: "Gewoontes",
        psychology: "Psychologie",
        loop: "Gewoontecyclus",
        survey: "Enquête",
      },

      hero: {
      },

      sections: {
        habits: "Gewoontes",
        psychology: "De Psychologie van Gezond Eten",
        loop: "De Gewoontecyclus",
        survey: "Enquête",
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

      surveyQuestion: "Wat triggert bij jou het meest ongezond eten?",
    surveyOptions: {
  stress: "Stress",
  boredom: "Verveling",
  studying: "Studeren",
  social: "Sociale situaties",
  other: "Anders...",
},

      surveySelected: "Geselecteerd:",

      name: "Naam",
      email: "E-mail",
      quantity: "Aantal",
    },

    en: {
      nav: {
        habits: "Habits",
        psychology: "Psychology",
        loop: "Habit Loop",
        survey: "Survey",
      },


      sections: {
        habits: "Habits",
        psychology: "The Psychology of Healthy Eating",
        loop: "Habit Loop",
        survey: "Survey",
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
    },
  };

  return (
    <main className="font-sans bg-gray-50 text-gray-900">

      {/* NAV */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold">Healthy Habits </h1>

          <div className="flex gap-4 text-sm font-medium">
            <a href="#habits">{t[lang].nav.habits}</a>
            <a href="#psychology">{t[lang].nav.psychology}</a>
            <a href="#loop">{t[lang].nav.loop}</a>
            <a href="#survey">{t[lang].nav.survey}</a>
          </div>
        </div>
      </nav>

      <div className="flex justify-end px-8 py-3 bg-white">
  <div className="flex gap-3">
    <button
      onClick={() => setLang("nl")}
      className={`px-4 py-2 border rounded-full ${
        lang === "nl" ? "bg-blue-100 text-white" : "bg-white"
      }`}
    >
      NL
    </button>

    <button
      onClick={() => setLang("en")}
      className={`px-4 py-2 border rounded-full ${
        lang === "en" ? "bg-blue-100 text-white" : "bg-white"
      }`}
    >
      EN
    </button>
  </div>
</div>

    {/* HERO */}
<section
  className="relative min-h-[70vh] overflow-hidden"
  style={{
    backgroundImage: "url('/Habit+Loop.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 bg-black/10"></div>
</section>

{/* ABOUT */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-black mb-10">
    {lang === "nl"
      ? "Over Gezond Eten"
      : "About Healthy Eating"}
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

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
        className="bg-blue-50 p-5 rounded-xl"
      >
         {lang === "nl"
          ? "Chips tijdens studeren"
          : "Chips while studying"}
      </button>

      <button
        onClick={() => setHabitChoice("lunch")}
        className="bg-blue-50 p-5 rounded-xl"
      >
         {lang === "nl"
          ? "Frisdrank tijdens lunch"
          : "Soda at lunch"}
      </button>

      <button
        onClick={() => setHabitChoice("sport")}
        className="bg-blue-50 p-5 rounded-xl"
      >
         {lang === "nl"
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

      <div className="bg-blue-100 p-8 rounded-xl">
        <h3 className="font-bold mt-3">
          {lang === "nl" ? "Brein" : "Brain"}
        </h3>
      </div>

      <div className="bg-blue-100 p-8 rounded-xl">
        <h3 className="font-bold mt-3">
          {lang === "nl" ? "Herhaling" : "Repetition"}
        </h3>
      </div>

      <div className="bg-blue-100 p-8 rounded-xl">
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

    <div className="bg-blue-50 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4">
        {lang === "nl"
          ? "Gezonde Omgeving"
          : "Healthy Environment"}
      </h3>

      <ul className="space-y-3">
        <li>{lang === "nl" ? "Fruit zichtbaar leggen" : "Keep fruit visible"}</li>
        <li>{lang === "nl" ? "Gezonde snacks voorbereiden" : "Prepare healthy snacks"}</li>
        <li>{lang === "nl" ? "Eerst water drinken" : "Drink water first"}</li>
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

  <div className="bg-white rounded-2xl shadow p-8 text-center">

    {!habitTransformation ? (
      <>
        <div className="space-y-4 text-xl font-medium">
          <div>Stress</div>
          <div>↓</div>
          <div>Chocolate</div>
          <div>↓</div>
          <div>Relief</div>
        </div>

        <button
          onClick={() => setHabitTransformation(true)}
          className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition"
        >
          {lang === "nl"
            ? "Routine Vervangen"
            : "Replace Routine"}
        </button>
      </>
    ) : (
      <>
        <div className="space-y-4 text-xl font-medium">
          <div>Stress</div>
          <div>↓</div>
          <div>{lang === "nl" ? "Wandeling" : "Walk"}</div>
          <div>↓</div>
          <div>{lang === "nl" ? "Gezonde Snack" : "Healthy Snack"}</div>
          <div>↓</div>
          <div>Relief</div>
        </div>

        <button
          onClick={() => setHabitTransformation(false)}
          className="mt-8 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition"
        >
          {lang === "nl"
            ? "Opnieuw Bekijken"
            : "View Original"}
        </button>
      </>
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
        className="bg-blue-100 rounded-xl p-5 text-center font-semibold"
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

<div className="mb-10 p-6 bg-blue-50 rounded-2xl">

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
            ? "bg-blue-200"
            : "bg-white"
        }`}
      >
        {progress.includes(task.id) ? "✔️ " : "⬜ "}
        {lang === "nl" ? task.nl : task.en}
      </button>
    ))}

  </div>

  <div className="mt-8">

    <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

      <div
        className="bg-blue-600 h-5"
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

      {/* SURVEY */}
      <section id="survey" className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-4xl font-black mb-10">
            {t[lang].sections.survey}
          </h2>

          <p className="mb-6 font-semibold">{t[lang].surveyQuestion}</p>

          <div className="space-y-4">
            {Object.entries(t[lang].surveyOptions).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setSurveyChoice(key);

      if (key !== "other") {
        handleSurveySubmit(key);
      }
    }}
    className={`w-full p-4 rounded-xl border text-left ${
      surveyChoice === key ? "bg-blue-200" : "bg-white"
    }`}
  >
    {label}
  </button>
))}

{surveyChoice === "other" && (
  <input
    type="text"
    value={otherTrigger}
    onChange={(e) => setOtherTrigger(e.target.value)}
    placeholder={
      lang === "nl"
        ? "Beschrijf jouw situatie..."
        : "Describe your situation..."
    }
    className="w-full p-3 border rounded-xl mt-4"
  />
)}
{surveyMessage && (
  <div className="mt-4 p-4 bg-blue-100 rounded-xl">
    {surveyMessage}
  </div>
)}
          {surveyChoice && (
            <div className="mt-6 p-4 bg-blue-100 rounded-xl">
              {t[lang].surveySelected}{" "}
              {t[lang].surveyOptions[surveyChoice as keyof typeof t["en"]["surveyOptions"]]}
            </div>
          )}
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-gray-500">
        © 2026 Healthy Habits. All rights reserved.
      </footer>

    </main>
  );
}