"use client";

import { useState, useMemo } from "react";
import { Calculator, ChevronLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

type CalculatorMode = "final" | "gpa";

export default function CalculatorPage() {
  const [mode, setMode] = useState<CalculatorMode>("final");

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-6">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-2">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Grade Calculator</h1>
            <p className="text-white/80 text-sm">Finals & GPA</p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-800 flex">
          <button
            onClick={() => setMode("final")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              mode === "final" ? "bg-[#9E1B32] text-white" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Final Exam
          </button>
          <button
            onClick={() => setMode("gpa")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              mode === "gpa" ? "bg-[#9E1B32] text-white" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            GPA Calculator
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        {mode === "final" ? <FinalExamCalculator /> : <GPACalculator />}
      </div>
    </div>
  );
}

// ─── Grade helpers ────────────────────────────────────────────────────────────

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

function scorToLetter(score: number): string {
  if (score >= 97) return "A+";
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 67) return "D+";
  if (score >= 63) return "D";
  if (score >= 60) return "D-";
  return "F";
}

function resultMessage(score: number): string {
  if (score <= 50) return "Very achievable — you've got this.";
  if (score <= 70) return "Definitely doable with some studying.";
  if (score <= 85) return "It'll take some work, but you can do it.";
  if (score <= 100) return "Tough, but still possible — give it everything.";
  return "You'd need over 100%. Consider adjusting your target grade.";
}

// ─── Input field ──────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none transition-colors ${
          error
            ? "border-red-400 dark:border-red-500"
            : "border-gray-200 dark:border-gray-700"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

// ─── Final Exam Calculator ────────────────────────────────────────────────────

function FinalExamCalculator() {
  const [currentGrade, setCurrentGrade] = useState("");
  const [desiredGrade, setDesiredGrade] = useState("");
  const [finalWeight, setFinalWeight] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (currentGrade !== "") {
      const v = parseFloat(currentGrade);
      if (isNaN(v) || v < 0 || v > 100) e.currentGrade = "Enter a number 0–100";
    }
    if (desiredGrade !== "") {
      const v = parseFloat(desiredGrade);
      if (isNaN(v) || v < 0 || v > 100) e.desiredGrade = "Enter a number 0–100";
    }
    if (finalWeight !== "") {
      const v = parseFloat(finalWeight);
      if (isNaN(v) || v <= 0 || v > 100) e.finalWeight = "Enter a number 1–100";
    }
    return e;
  }, [currentGrade, desiredGrade, finalWeight]);

  const result = useMemo(() => {
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight) / 100;
    if (
      isNaN(current) || isNaN(desired) || isNaN(weight) ||
      weight <= 0 || weight > 1 ||
      current < 0 || current > 100 ||
      desired < 0 || desired > 100 ||
      Object.keys(errors).length > 0
    ) return null;
    return Math.round(((desired - current * (1 - weight)) / weight) * 100) / 100;
  }, [currentGrade, desiredGrade, finalWeight, errors]);

  const reset = () => {
    setCurrentGrade("");
    setDesiredGrade("");
    setFinalWeight("");
  };

  const hasInput = currentGrade || desiredGrade || finalWeight;

  return (
    <div className="space-y-4 pb-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            What do I need on my final?
          </h2>
          {hasInput && (
            <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-4">
          <Field
            label="Current grade (%)"
            value={currentGrade}
            onChange={setCurrentGrade}
            placeholder="e.g. 85"
            error={errors.currentGrade}
          />
          <Field
            label="Desired final grade (%)"
            value={desiredGrade}
            onChange={setDesiredGrade}
            placeholder="e.g. 90"
            error={errors.desiredGrade}
          />
          <Field
            label="Final exam weight (%)"
            value={finalWeight}
            onChange={setFinalWeight}
            placeholder="e.g. 25"
            error={errors.finalWeight}
            hint="Check your syllabus for this number"
          />
        </div>
      </div>

      {result !== null && (
        <div
          className={`rounded-xl p-4 shadow-sm border ${
            result <= 100
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          }`}
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {result <= 100 ? "You need at least" : "Not possible"}
          </p>
          <div className="flex items-end gap-3">
            <p
              className={`text-4xl font-bold ${
                result <= 100
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {result <= 100 ? `${result}%` : ">100%"}
            </p>
            {result <= 100 && (
              <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-0.5">
                ({scorToLetter(result)})
              </p>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {resultMessage(result)}
          </p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-1">How it works</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Formula: (desired − current × (1 − weight)) ÷ weight. Enter all three fields and the result updates live.
        </p>
      </div>
    </div>
  );
}

// ─── GPA Calculator ───────────────────────────────────────────────────────────

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
}

function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", grade: "A", credits: "3" },
  ]);
  const [cumGPA, setCumGPA] = useState("");
  const [cumCredits, setCumCredits] = useState("");

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: "", grade: "A", credits: "3" }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const reset = () => {
    setCourses([{ id: "1", name: "", grade: "A", credits: "3" }]);
    setCumGPA("");
    setCumCredits("");
  };

  const { termGPA, newCumGPA } = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    for (const course of courses) {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade];
      if (!isNaN(credits) && credits > 0 && points !== undefined) {
        totalPoints += credits * points;
        totalCredits += credits;
      }
    }
    const term = totalCredits > 0 ? totalPoints / totalCredits : null;

    const prevGPA = parseFloat(cumGPA);
    const prevCredits = parseFloat(cumCredits);
    let cumulative: number | null = null;
    if (
      term !== null &&
      !isNaN(prevGPA) && prevGPA >= 0 && prevGPA <= 4 &&
      !isNaN(prevCredits) && prevCredits > 0
    ) {
      cumulative = (prevGPA * prevCredits + totalPoints) / (prevCredits + totalCredits);
    }

    return {
      termGPA: term !== null ? term.toFixed(2) : "—",
      newCumGPA: cumulative !== null ? cumulative.toFixed(2) : null,
    };
  }, [courses, cumGPA, cumCredits]);

  const cumErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (cumGPA !== "") {
      const v = parseFloat(cumGPA);
      if (isNaN(v) || v < 0 || v > 4) e.cumGPA = "Enter a GPA between 0.0 and 4.0";
    }
    if (cumCredits !== "") {
      const v = parseFloat(cumCredits);
      if (isNaN(v) || v <= 0) e.cumCredits = "Enter a positive number";
    }
    return e;
  }, [cumGPA, cumCredits]);

  return (
    <div className="space-y-4 pb-8">
      {/* Term courses */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">This term&apos;s courses</h2>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 mb-2">
          <p className="text-xs text-gray-400 px-1">Course</p>
          <p className="text-xs text-gray-400 px-1">Grade</p>
          <p className="text-xs text-gray-400 px-1">Credits</p>
        </div>

        <div className="space-y-2">
          {courses.map((course, index) => (
            <div key={course.id} className="flex gap-2 items-center">
              <div className="flex-1 grid grid-cols-3 gap-1">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  placeholder={`Course ${index + 1}`}
                  className="px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none"
                />
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                  className="px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none"
                >
                  {Object.keys(gradePoints).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                  placeholder="Cr."
                  min="0"
                  max="10"
                  className="px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={() => removeCourse(course.id)}
                disabled={courses.length === 1}
                className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 disabled:opacity-0 text-lg leading-none w-6 text-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addCourse}
          className="mt-3 w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-[#9E1B32] hover:text-[#9E1B32] transition-colors text-sm font-medium"
        >
          + Add course
        </button>
      </div>

      {/* Term GPA result */}
      <div className="bg-[#9E1B32] rounded-xl p-4 shadow-sm text-white">
        <p className="text-sm text-white/70 mb-1">Term GPA</p>
        <p className="text-4xl font-bold">{termGPA}</p>
        <p className="text-xs text-white/50 mt-1">
          {courses.length} course{courses.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Cumulative GPA */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          Calculate new cumulative GPA
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Optional — enter your existing GPA to see the updated cumulative.</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Current GPA
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={cumGPA}
              onChange={(e) => setCumGPA(e.target.value)}
              placeholder="e.g. 3.45"
              step="0.01"
              min="0"
              max="4"
              className={`w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none ${
                cumErrors.cumGPA ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {cumErrors.cumGPA && (
              <p className="text-xs text-red-500 mt-1">{cumErrors.cumGPA}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Credits earned
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={cumCredits}
              onChange={(e) => setCumCredits(e.target.value)}
              placeholder="e.g. 60"
              min="0"
              className={`w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none ${
                cumErrors.cumCredits ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {cumErrors.cumCredits && (
              <p className="text-xs text-red-500 mt-1">{cumErrors.cumCredits}</p>
            )}
          </div>
        </div>

        {newCumGPA && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">New cumulative GPA</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{newCumGPA}</p>
          </div>
        )}
      </div>

      {/* Grade scale reference */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Grade scale</h3>
        <div className="grid grid-cols-4 gap-x-4 gap-y-1.5">
          {Object.entries(gradePoints).map(([grade, points]) => (
            <div key={grade} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{grade}</span>
              <span>{points.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
