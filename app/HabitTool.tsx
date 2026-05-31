"use client";

import { useState } from "react";

export default function HabitTool() {
  const [selected, setSelected] = useState("");

  const habits = {
    stress:
      "Stress can trigger emotional eating. Try walking, water or healthy snacks instead.",

    boredom:
      "Boredom eating often happens automatically. Replace it with activity or fruit.",

    studying:
      "Studying can create automatic snack habits because the brain wants quick dopamine.",

    social:
      "Social situations strongly influence eating choices and routines.",
  };

  return (
    <section className="space-y-8">

      <div className="text-center max-w-3xl mx-auto">

        <p className="text-green-700 uppercase tracking-widest font-semibold">
          Interactive Psychology Tool
        </p>

        <h2 className="mt-4 text-4xl font-black">
          Understand Your Eating Habits
        </h2>

        <p className="mt-6 text-lg text-gray-600">
          Click a trigger to learn how eating habits form.
        </p>

      </div>

      {/* BUTTONS */}
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">

<button
  onClick={() => setSelected("stress")}
  className="p-5 rounded-2xl border bg-red-50 hover:bg-red-200 hover:scale-[1.02] transition text-left"
>
  😓 Stress
</button>

<button
  onClick={() => setSelected("boredom")}
  className="p-5 rounded-2xl border bg-yellow-50 hover:bg-yellow-200 hover:scale-[1.02] transition text-left"
>
  😴 Boredom
</button>

<button
  onClick={() => setSelected("studying")}
  className="p-5 rounded-2xl border bg-blue-50 hover:bg-blue-200 hover:scale-[1.02] transition text-left"
>
  📚 Studying
</button>

<button
  onClick={() => setSelected("social")}
  className="p-5 rounded-2xl border bg-green-50 hover:bg-green-200 hover:scale-[1.02] transition text-left"
>
  👥 Social Situations
</button>

      </div>

      {/* RESULT */}
      {selected && (
        <div className="max-w-3xl mx-auto p-8 rounded-[32px] bg-white shadow-xl border border-gray-100">

          <h3 className="text-2xl font-bold capitalize">
            {selected}
          </h3>

          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            {habits[selected as keyof typeof habits]}
          </p>

        </div>
      )}

    </section>
  );
}