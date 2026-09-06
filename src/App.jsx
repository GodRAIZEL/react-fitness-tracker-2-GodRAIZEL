import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetail from './components/Exercise/ExerciseDetail';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import useLocalStorage from './hooks/useLocalStorage';
import { getTodayDayKey } from './utils/helpers';
import { exercisesData, DAYS_OF_WEEK } from './data/exercisesData';

const EMPTY_PLAN = DAYS_OF_WEEK.reduce((acc, day) => ({ ...acc, [day]: [] }), {});

/**
 * App - the application root. Owns the two pieces of state shared across
 * multiple pages (workoutPlan and workoutHistory), persists them to
 * localStorage via the useLocalStorage hook, and wires up all routes.
 * This is where "lifting state up" and sibling communication (planner
 * page and exercises page both read/write workoutPlan) live.
 */
function App() {
  const [workoutPlan, setWorkoutPlan] = useLocalStorage('workoutPlan', EMPTY_PLAN);
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', []);

  // Keeps the browser tab title in sync with the app - a small but
  // genuinely useful side effect (rather than logging to the console).
  useEffect(() => {
    document.title = 'PACE — Fitness Tracker & Workout Planner';
  }, []);

  const planExerciseIds = DAYS_OF_WEEK.reduce(
    (ids, day) => [...ids, ...workoutPlan[day].map((ex) => ex.id)],
    []
  );
  const totalPlannedExercises = planExerciseIds.length;

  // Adds an exercise to the chosen day of the plan (child-to-parent
  // callback). Falls back to today if no day was specified. Duplicate
  // checking is per-day, so the same exercise can be planned on
  // multiple different days, just not added twice to the same day.
  const handleAddToWorkout = (exercise, day) => {
    const targetDay = day || getTodayDayKey();
    const alreadyPlanned = workoutPlan[targetDay].some((ex) => ex.id === exercise.id);
    if (alreadyPlanned) return;

    setWorkoutPlan({
      ...workoutPlan,
      [targetDay]: [...workoutPlan[targetDay], exercise]
    });
  };

  // Removes a single exercise from a specific day.
  const handleRemoveExercise = (day, exerciseId) => {
    setWorkoutPlan({
      ...workoutPlan,
      [day]: workoutPlan[day].filter((ex) => ex.id !== exerciseId)
    });
  };

  // Clears every exercise from a single day.
  const handleClearDay = (day) => {
    setWorkoutPlan({ ...workoutPlan, [day]: [] });
  };

  // Appends a completed workout log entry to history.
  const handleLogWorkout = (entry) => {
    setWorkoutHistory([...workoutHistory, entry]);
  };

  // Removes a single log entry from history.
  const handleDeleteEntry = (entryId) => {
    setWorkoutHistory(workoutHistory.filter((entry) => entry.id !== entryId));
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={<Home workoutHistory={workoutHistory} totalPlannedExercises={totalPlannedExercises} />}
            />
            <Route
              path="/exercises"
              element={<ExercisesPage planExerciseIds={planExerciseIds} onAddToWorkout={handleAddToWorkout} />}
            />
            <Route
              path="/exercises/:id"
              element={
                <ExerciseDetail
                  exercises={exercisesData}
                  onAddToWorkout={handleAddToWorkout}
                  planExerciseIds={planExerciseIds}
                />
              }
            />
            <Route
              path="/workout-planner"
              element={
                <WorkoutPlannerPage
                  workoutPlan={workoutPlan}
                  onRemoveExercise={handleRemoveExercise}
                  onClearDay={handleClearDay}
                />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryPage
                  workoutHistory={workoutHistory}
                  onLogWorkout={handleLogWorkout}
                  onDeleteEntry={handleDeleteEntry}
                />
              }
            />
            <Route
              path="/progress"
              element={<ProgressPage workoutHistory={workoutHistory} workoutPlan={workoutPlan} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
