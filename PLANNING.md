# PACE — Planning Document

## Component Hierarchy**

App (routing + shared workout state)
├── Navbar
├── Routes
│   ├── Home → AudioPlayer
│   ├── ExercisesPage
│   │   ├── SearchBar
│   │   ├── ExerciseFilter
│   │   └── ExerciseList → ExerciseCard → Card/Badge/Button
│   ├── ExerciseDetail → Badge/VideoPlayer/Button
│   ├── WorkoutPlannerPage → WorkoutPlanner → DayCard (x7)
│   ├── HistoryPage → WorkoutLog → LogEntry
│   ├── ProgressPage → ProgressChart
│   └── NotFound
└── Footer

The application uses multiple levels of component nesting. ExerciseCard and ExerciseDetail both provide exercise images with fallback placeholders, a Monday–Sunday day picker, and an Add to Workout Plan action.

## Data Flow

* Exercise data: exercisesData.js supplies the exercise library to ExercisesPage and ExerciseDetail.
* Shared state: workoutPlan and workoutHistory are managed by App and persisted with useLocalStorage.
* Callbacks: App provides onAddToWorkout, onRemoveExercise, onClearDay, onLogWorkout, and onDeleteEntry to child components.
* Day selection: ExerciseCard and ExerciseDetail maintain local selectedDay state and pass the selected weekday with the exercise, allowing exercises to be planned on multiple days.
* Sibling communication: Exercises and Workout Planner pages share data through App.
* Local state: Search, filtering, sorting, and form fields remain within their owning components.

## Components

Components	Purpose
Button, Card, SearchBar, Modal, Badge	Reusable UI elements
Loading, EmptyState, Footer	Shared feedback and layout
Navbar	Navigation, active routes, mobile menu
ExerciseCard/List/Detail/Filter	Exercise browsing and filtering
WorkoutPlanner, DayCard	Weekly workout planning
WorkoutLog, LogEntry, ProgressChart	Workout logging and statistics
VideoPlayer, AudioPlayer	Custom HTML5 media controls
Page components	Route-level screens

## Key Props

* ExerciseCard / ExerciseDetail: exercise data, plan status, selection and add callbacks.
* ExerciseList: exercises, loading/error state, planned exercise IDs, selection and add callbacks.
* WorkoutPlanner / DayCard: workout plan, exercises, remove and clear callbacks.
* WorkoutLog: exercises, history, log and delete callbacks.

## State Management

useState is used across multiple components for local UI state. useEffect handles exercise loading, document title updates, and localStorage synchronisation.

Complex state includes workoutPlan (weekday arrays), workoutHistory (logged workouts), and currentLog in WorkoutLog.

## Testing Strategy

* Utilities: helpers.js is tested directly without rendering.
* Custom hook: useLocalStorage uses renderHook and act to verify state and persistence.
* Presentational components: Tests verify rendering and callback arguments.
* Pages/containers: Tests cover loading, empty, error, and not-found states.
* Routing: Navbar and full-App tests cover navigation and 404 handling.
* Integration: The real App is tested without mocks through realistic flows including searching, planning across multiple days, removing/clearing workouts, and logging workouts that appear in History and Home statistics.