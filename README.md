# PACE — Fitness Tracker & Workout Planner

## Project Overview

PACE is a React single-page app for a fitness center chain: browse an
exercise library, watch demo videos, plan a Monday–Sunday workout week,
log workouts, and track progress. Fully tested with Jest and RTL.

## Features List

- Browse, search, filter (category / muscle group / difficulty) and sort a
  25-exercise library, each with a thumbnail (local placeholder on error)
- Exercise detail pages with instructions, a demo video, and Previous/Next
  navigation between exercises
- Motivational audio tracks on the Home page
- A genuine weekly planner: every "Add to Workout Plan" button includes a
  Monday–Sunday day picker (defaults to today), so an exercise can be
  planned for any day, including multiple days at once
- Remove a single planned exercise or clear an entire day
- A workout log form (sets / reps / weight / date) with history and delete
- A progress page with streak, total workouts, calories, and a bar chart
  of workouts logged per weekday
- Responsive: mobile (<768px), tablet (768–1024px), desktop (>1024px)
  breakpoints, plus a hamburger nav on small screens
- Plan and history persist via `localStorage`; custom 404 page

## Technologies Used

React 18, React Router DOM 6, PropTypes, Jest, RTL, CSS Modules,
`identity-obj-proxy`.

## Installation Instructions

```bash
npm install
npm start
npm test
npm test -- --coverage
```

## Project Structure

```
src/
  components/
    UI/            Button, Card, SearchBar, Modal, Badge
    common/        Loading, EmptyState, Footer
    Navigation/    Navbar
    Exercise/      ExerciseCard, ExerciseList, ExerciseDetail, ExerciseFilter
    WorkoutPlanner/  WorkoutPlanner, DayCard
    WorkoutLog/    WorkoutLog, LogEntry, ProgressChart
    Media/         VideoPlayer, AudioPlayer
  pages/           Home, ExercisesPage, WorkoutPlannerPage, HistoryPage,
                   ProgressPage, NotFound
  data/            exercisesData.js
  utils/           helpers.js
  hooks/           useLocalStorage.js
  __tests__/integration/  WorkoutFlow.test.js, Navigation.test.js
  App.jsx, App.css, index.js, setupTests.js
public/assets/images/  SVG image-fallback placeholders
screenshots/     screenshots for this README
```

## Component Descriptions

**UI:** `Button`, `Card`, `SearchBar`, `Modal`, `Badge` — reusable
primitives (`Card`/`Modal` use `children`). **Common:** `Loading`,
`EmptyState`, `Footer`. **Navigation:** `Navbar` (active-route styling,
mobile menu). **Exercise:** `ExerciseCard` (image, day picker, add
button), `ExerciseList` (loading/empty/error), `ExerciseDetail` (detail
+ video + day picker), `ExerciseFilter` (category/muscle/difficulty
dropdowns). **WorkoutPlanner:** `WorkoutPlanner` (7 `DayCard`s),
`DayCard` (one weekday's exercises). **WorkoutLog:** `WorkoutLog` (form +
history), `LogEntry`, `ProgressChart` (bar chart per weekday). **Media:**
`VideoPlayer`/`AudioPlayer` (custom controls, fallback text). **Pages:**
thin wrappers supplying page-specific state to the above.

## State Management

`workoutPlan` and `workoutHistory` are lifted to `App.jsx`, persisted via
`useLocalStorage`, and passed down to every page that reads or writes
them. Callbacks (`onAddToWorkout`, `onRemoveExercise`, `onClearDay`,
`onLogWorkout`, `onDeleteEntry`) live in `App` and pass to the components
that trigger them. `ExercisesPage` and `WorkoutPlannerPage` communicate as
siblings only through this shared state. Everything else is local
`useState` owned by the component that needs it.

## Testing Strategy

Pure functions in `helpers.js` get direct unit tests. Presentational
components are tested for rendering and for firing callback props
correctly. Container/page components are tested for conditional rendering
(loading/empty/error/not-found), including tests confirming the loading
indicator clears once data resolves. Routing is tested in isolation
(`Navbar`) and end-to-end through `App`. Integration tests render the
real `App` with no mocks, driven through full flows — search, planning
on a chosen day (and multiple days), removing/clearing a day, and
logging a workout reflected on History and the Home scoreboard.

## Routing

| Path | Page |
|---|---|
| `/` | Home |
| `/exercises` | ExercisesPage |
| `/exercises/:id` | ExerciseDetail |
| `/workout-planner` | WorkoutPlannerPage |
| `/history` | HistoryPage |
| `/progress` | ProgressPage |
| `*` | NotFound (404) |

## Test Coverage Report

25 test suites / 142 tests, all passing:

```
File                      | % Stmts | % Branch | % Funcs | % Lines
--------------------------|---------|----------|---------|--------
All files                 |   95.49 |    90.41 |   85.91 |   96.01
 App.jsx                  |     100 |       75 |     100 |     100
 components/Exercise      |   98.48 |      100 |   83.33 |   98.43
 components/Media         |   81.25 |    83.33 |      50 |   86.66
 components/Navigation    |    92.3 |      100 |   85.71 |   91.66
 components/UI            |   93.54 |       80 |      75 |   93.54
 components/WorkoutLog    |     100 |      100 |   94.73 |     100
 components/WorkoutPlanner|     100 |      100 |     100 |     100
 components/common        |     100 |      100 |     100 |     100
 data                     |     100 |      100 |     100 |     100
 hooks                    |   88.88 |      100 |     100 |   88.88
 pages                    |   91.66 |      100 |   73.68 |   92.98
 utils                    |     100 |       86 |     100 |     100
```

Lines and branches clear the required 70% threshold across every file.

## Future Enhancements

- Real backend + auth so plans/history sync across devices
- Real exercise photography/GIFs, editable custom exercises, and rest
  timers in the workout log

## Screenshots

1. Home page — `screenshots/01-home.png`
2. Exercises page with filters — `screenshots/02-exercises.png`
3. Exercise detail with video — `screenshots/03-exercise-detail.png`
4. Workout planner — `screenshots/04-planner.png`
5. Workout history — `screenshots/05-history.png`
6. Progress tracking — `screenshots/06-progress.png`
7. Mobile responsive view — `screenshots/07-mobile.png`
8. Test coverage report — `screenshots/08-coverage.png`
