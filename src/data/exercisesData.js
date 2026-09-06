// exercisesData.js
// Static sample data set for the Fitness Tracker app.
// 25 exercises spanning 4 categories, 6 muscle groups, and 3 difficulty levels.
export const exercisesData = [
  {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    difficulty: 'beginner',
    duration: 10,
    sets: 3,
    reps: 15,
    equipment: 'none',
    caloriesBurn: 50,
    image: '/assets/images/pushups.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until your chest nearly touches the floor',
      'Push back up to the starting position',
      'Keep your core engaged throughout the movement'
    ]
  },
  {
    id: 2,
    name: 'Bodyweight Squats',
    category: 'strength',
    muscleGroups: ['legs', 'core'],
    difficulty: 'beginner',
    duration: 10,
    sets: 3,
    reps: 20,
    equipment: 'none',
    caloriesBurn: 60,
    image: '/assets/images/squats.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Bend knees and lower hips as if sitting into a chair',
      'Keep your chest up and knees behind your toes',
      'Drive through your heels back to standing'
    ]
  },
  {
    id: 3,
    name: 'Dumbbell Bench Press',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    difficulty: 'intermediate',
    duration: 15,
    sets: 4,
    reps: 10,
    equipment: 'dumbbells',
    caloriesBurn: 90,
    image: '/assets/images/bench-press.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Lie back on a flat bench holding a dumbbell in each hand',
      'Press the dumbbells up until arms are extended',
      'Lower with control to chest level',
      'Keep shoulder blades pressed into the bench'
    ]
  },
  {
    id: 4,
    name: 'Deadlifts',
    category: 'strength',
    muscleGroups: ['back', 'legs', 'core'],
    difficulty: 'advanced',
    duration: 20,
    sets: 5,
    reps: 5,
    equipment: 'barbell',
    caloriesBurn: 130,
    image: '/assets/images/deadlifts.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Hinge at the hips and grip the bar just outside your legs',
      'Keep your back flat and drive through your heels to stand',
      'Lower the bar back down under control'
    ]
  },
  {
    id: 5,
    name: 'Pull-ups',
    category: 'strength',
    muscleGroups: ['back', 'arms'],
    difficulty: 'advanced',
    duration: 12,
    sets: 4,
    reps: 8,
    equipment: 'pull-up bar',
    caloriesBurn: 100,
    image: '/assets/images/pullups.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Hang from the bar with an overhand grip, hands shoulder-width apart',
      'Pull your chest up toward the bar',
      'Squeeze your back at the top',
      'Lower yourself with control to a full hang'
    ]
  },
  {
    id: 6,
    name: 'Dumbbell Shoulder Press',
    category: 'strength',
    muscleGroups: ['shoulders', 'arms'],
    difficulty: 'intermediate',
    duration: 12,
    sets: 4,
    reps: 10,
    equipment: 'dumbbells',
    caloriesBurn: 80,
    image: '/assets/images/shoulder-press.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand or sit holding dumbbells at shoulder height',
      'Press overhead until arms are fully extended',
      'Lower back down with control to shoulder height',
      'Avoid arching your lower back'
    ]
  },
  {
    id: 7,
    name: 'Plank Hold',
    category: 'strength',
    muscleGroups: ['core'],
    difficulty: 'beginner',
    duration: 5,
    sets: 3,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 30,
    image: '/assets/images/plank.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Rest on your forearms and toes, body in a straight line',
      'Engage your core and glutes',
      'Keep hips level, avoid sagging or piking',
      'Hold for 30-60 seconds'
    ]
  },
  {
    id: 8,
    name: 'Barbell Back Squat',
    category: 'strength',
    muscleGroups: ['legs', 'core'],
    difficulty: 'advanced',
    duration: 20,
    sets: 5,
    reps: 5,
    equipment: 'barbell',
    caloriesBurn: 140,
    image: '/assets/images/back-squat.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Rest the bar across your upper back',
      'Brace your core and sit down between your hips',
      'Keep your chest tall and knees tracking over toes',
      'Drive up through your midfoot to stand'
    ]
  },
  {
    id: 9,
    name: 'Running (Steady State)',
    category: 'cardio',
    muscleGroups: ['legs', 'core'],
    difficulty: 'beginner',
    duration: 30,
    sets: 1,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 300,
    image: '/assets/images/running.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Warm up with a 5 minute brisk walk',
      'Settle into a conversational pace',
      'Keep your posture tall and relaxed',
      'Cool down with a slow walk for 5 minutes'
    ]
  },
  {
    id: 10,
    name: 'Jump Rope Intervals',
    category: 'cardio',
    muscleGroups: ['legs', 'core'],
    difficulty: 'intermediate',
    duration: 15,
    sets: 6,
    reps: 1,
    equipment: 'jump rope',
    caloriesBurn: 200,
    image: '/assets/images/jump-rope.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Jump rope at a steady pace for 45 seconds',
      'Rest for 15 seconds between rounds',
      'Keep jumps low and land softly on the balls of your feet',
      'Repeat for 6 rounds'
    ]
  },
  {
    id: 11,
    name: 'Burpees',
    category: 'cardio',
    muscleGroups: ['legs', 'chest', 'core'],
    difficulty: 'advanced',
    duration: 12,
    sets: 4,
    reps: 12,
    equipment: 'none',
    caloriesBurn: 160,
    image: '/assets/images/burpees.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Drop into a squat and place hands on the floor',
      'Kick feet back into a plank position',
      'Perform a push-up, then jump feet back to hands',
      'Explode up into a jump with arms overhead'
    ]
  },
  {
    id: 12,
    name: 'Cycling Intervals',
    category: 'cardio',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    duration: 25,
    sets: 8,
    reps: 1,
    equipment: 'bike',
    caloriesBurn: 250,
    image: '/assets/images/cycling.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Warm up spinning at an easy pace for 5 minutes',
      'Alternate 1 minute hard efforts with 2 minutes easy',
      'Keep cadence high on hard efforts',
      'Cool down with 5 minutes of easy spinning'
    ]
  },
  {
    id: 13,
    name: 'Rowing Machine Sprints',
    category: 'cardio',
    muscleGroups: ['back', 'legs', 'core'],
    difficulty: 'advanced',
    duration: 18,
    sets: 5,
    reps: 1,
    equipment: 'rowing machine',
    caloriesBurn: 220,
    image: '/assets/images/rowing.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Drive with your legs first, then lean back and pull with arms',
      'Return in the reverse order: arms, body, legs',
      'Sprint for 500m, then rest 90 seconds',
      'Repeat for 5 rounds'
    ]
  },
  {
    id: 14,
    name: 'Stair Climbing',
    category: 'cardio',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    duration: 15,
    sets: 1,
    reps: 1,
    equipment: 'stairs',
    caloriesBurn: 150,
    image: '/assets/images/stairs.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Climb at a brisk, steady pace',
      'Use the handrail only for balance, not support',
      'Keep your posture upright',
      'Alternate climbing and walking down for recovery'
    ]
  },
  {
    id: 15,
    name: 'Standing Hamstring Stretch',
    category: 'flexibility',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    duration: 5,
    sets: 2,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 10,
    image: '/assets/images/hamstring-stretch.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand tall and extend one leg forward, heel on the ground',
      'Hinge at the hips and reach toward your toes',
      'Keep your back as flat as possible',
      'Hold for 30 seconds, then switch legs'
    ]
  },
  {
    id: 16,
    name: 'Cat-Cow Stretch',
    category: 'flexibility',
    muscleGroups: ['back', 'core'],
    difficulty: 'beginner',
    duration: 5,
    sets: 2,
    reps: 10,
    equipment: 'mat',
    caloriesBurn: 10,
    image: '/assets/images/cat-cow.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Start on hands and knees in a tabletop position',
      'Inhale, drop belly, lift chest and tailbone (cow)',
      'Exhale, round your spine toward the ceiling (cat)',
      'Flow slowly between the two positions'
    ]
  },
  {
    id: 17,
    name: 'Shoulder & Chest Stretch',
    category: 'flexibility',
    muscleGroups: ['shoulders', 'chest'],
    difficulty: 'beginner',
    duration: 5,
    sets: 2,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 8,
    image: '/assets/images/shoulder-stretch.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Clasp your hands behind your back',
      'Straighten your arms and lift them gently',
      'Open your chest and squeeze shoulder blades together',
      'Hold for 20-30 seconds'
    ]
  },
  {
    id: 18,
    name: 'Deep Lunge with Twist',
    category: 'flexibility',
    muscleGroups: ['legs', 'core'],
    difficulty: 'intermediate',
    duration: 8,
    sets: 2,
    reps: 8,
    equipment: 'mat',
    caloriesBurn: 20,
    image: '/assets/images/lunge-twist.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Step into a deep lunge, back knee toward the floor',
      'Place opposite hand down and rotate your torso up',
      'Reach your other arm toward the ceiling',
      'Hold briefly, then switch sides'
    ]
  },
  {
    id: 19,
    name: 'Single-Leg Balance',
    category: 'balance',
    muscleGroups: ['legs', 'core'],
    difficulty: 'beginner',
    duration: 6,
    sets: 3,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 15,
    image: '/assets/images/single-leg-balance.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand tall and shift your weight onto one leg',
      'Lift the other foot slightly off the ground',
      'Engage your core to stay steady',
      'Hold for 30 seconds, then switch legs'
    ]
  },
  {
    id: 20,
    name: 'Bosu Ball Squats',
    category: 'balance',
    muscleGroups: ['legs', 'core'],
    difficulty: 'intermediate',
    duration: 10,
    sets: 3,
    reps: 12,
    equipment: 'bosu ball',
    caloriesBurn: 70,
    image: '/assets/images/bosu-squats.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand on the dome side of the bosu ball',
      'Lower into a squat while keeping your balance',
      'Drive through your heels back to standing',
      'Keep your core braced throughout'
    ]
  },
  {
    id: 21,
    name: 'Warrior III Pose',
    category: 'balance',
    muscleGroups: ['legs', 'core', 'back'],
    difficulty: 'advanced',
    duration: 8,
    sets: 3,
    reps: 1,
    equipment: 'mat',
    caloriesBurn: 25,
    image: '/assets/images/warrior-3.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Shift weight onto one leg and hinge forward at the hips',
      'Extend the back leg straight behind you',
      'Reach your arms forward, forming a straight line',
      'Hold for 20-30 seconds, then switch sides'
    ]
  },
  {
    id: 22,
    name: 'Incline Dumbbell Fly',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders'],
    difficulty: 'intermediate',
    duration: 12,
    sets: 3,
    reps: 12,
    equipment: 'dumbbells',
    caloriesBurn: 70,
    image: '/assets/images/incline-fly.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Lie on an incline bench holding a dumbbell in each hand',
      'Lower your arms out to the sides with a slight elbow bend',
      'Bring the dumbbells back together above your chest',
      'Squeeze your chest at the top of the movement'
    ]
  },
  {
    id: 23,
    name: "Farmer's Carry",
    category: 'strength',
    muscleGroups: ['back', 'arms', 'core'],
    difficulty: 'intermediate',
    duration: 10,
    sets: 4,
    reps: 1,
    equipment: 'dumbbells',
    caloriesBurn: 90,
    image: '/assets/images/farmers-carry.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Hold a heavy dumbbell in each hand at your sides',
      'Stand tall with shoulders back',
      'Walk a set distance while keeping your core braced',
      'Set the weights down with control'
    ]
  },
  {
    id: 24,
    name: 'High Knees',
    category: 'cardio',
    muscleGroups: ['legs', 'core'],
    difficulty: 'beginner',
    duration: 8,
    sets: 4,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 90,
    image: '/assets/images/high-knees.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand tall and jog in place',
      'Drive your knees up toward your chest',
      'Pump your arms in rhythm with your legs',
      'Maintain a quick pace for 30 seconds per round'
    ]
  },
  {
    id: 25,
    name: 'Standing Quad Stretch',
    category: 'flexibility',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    duration: 5,
    sets: 2,
    reps: 1,
    equipment: 'none',
    caloriesBurn: 8,
    image: '/assets/images/quad-stretch.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    instructions: [
      'Stand tall, holding onto something for balance if needed',
      'Bend one knee and grab your ankle behind you',
      'Pull your heel gently toward your glutes',
      'Hold for 30 seconds, then switch legs'
    ]
  }
];

// Convenience lists derived from the data set, used to populate filter dropdowns.
export const CATEGORIES = ['all', 'strength', 'cardio', 'flexibility', 'balance'];
export const MUSCLE_GROUPS = ['all', 'chest', 'back', 'shoulders', 'arms', 'core', 'legs'];
export const DIFFICULTIES = ['all', 'beginner', 'intermediate', 'advanced'];
export const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Motivational audio tracks used by the AudioPlayer on the Home page.
export const motivationTracks = [
  {
    id: 1,
    title: 'Morning Fire',
    description: 'An upbeat track to kickstart your morning workout.',
    audioUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'
  },
  {
    id: 2,
    title: 'Push Through',
    description: 'Keep going when it gets hard, you are stronger than you think.',
    audioUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'
  }
];
