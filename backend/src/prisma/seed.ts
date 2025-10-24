import { prisma } from "../prisma";

const main = async () => {
  console.log("🌱 Starting database seeding...");

  console.log("🧹 Cleaning existing data...");
  await prisma.personalBest.deleteMany();
  await prisma.exerciseLog.deleteMany();
  await prisma.workoutExercise.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.exercise.deleteMany();

  const exerciseNames = [
    "Hip Abductor",
    "Hip Adductor",
    "Romanian Deadlift (RDL)",
    "Elevated Goblet Squat",
    "Glute Drive (Hip Thrust)",
    "Barbell Squat",
    "Split Squat",
    "Single Leg Press",
    "Tricep Cable Extension",
    "Shoulder Press",
    "Neutral Grip Pulldown",
    "Barbell Bent-Over Row",
    "Barbell Seated Overhead Extension",
    "Bicep Curl",
    "Seated row",
  ];
  console.log("💪 Seeding exercises...");
  for (const name of exerciseNames) {
    await prisma.exercise.upsert({
      where: { name: name },
      update: {
        muscleGroup: "placeholder",
        description: "placeholder",
      },
      create: {
        name: name,
        muscleGroup: "placeholder",
        description: "placeholder",
      },
    });
  }

  // Check exercises exist in db before creating workouts
  const foundExercises = await prisma.exercise.findMany({
    where: { name: { in: exerciseNames } },
  });

  if (foundExercises.length !== exerciseNames.length) {
    throw new Error(
      "Some exercises are missing — make sure you’ve seeded exercises first.",
    );
  }
  // create a lookup object
  const exercisesMap = Object.fromEntries(
    foundExercises.map((e) => [e.name, e]),
  );

  const workouts = [
    {
      name: "Full Body Strength",
      description:
        "A balanced routine targeting all major muscle groups for overall strength and stability.",
      exercises: {
        create: [
          {
            exerciseId: exercisesMap["Romanian Deadlift (RDL)"].id,
            order: 1,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Elevated Goblet Squat"].id,
            order: 2,
            recommendedSets: 3,
            recommendedReps: "10-12",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Neutral Grip Pulldown"].id,
            order: 3,
            recommendedSets: 3,
            recommendedReps: "10-12",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Tricep Cable Extension"].id,
            order: 4,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Hip Adductor"].id,
            order: 5,
            recommendedSets: 3,
            recommendedReps: "10-12",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Hip Abductor"].id,
            order: 6,
            recommendedSets: 3,
            recommendedReps: "10-12",
            restPeriodSeconds: 90,
          },
        ],
      },
    },
    {
      name: "Upper Body Strength",
      description:
        "Focuses on building pushing and pulling strength across the shoulders, chest, and arms.",
      exercises: {
        create: [
          {
            exerciseId: exercisesMap["Shoulder Press"].id,
            order: 1,
            recommendedSets: 3,
            recommendedReps: "6-8",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Shoulder Press"].id,
            order: 2,
            recommendedSets: 1,
            recommendedReps: "failure",
          },
          {
            exerciseId: exercisesMap["Barbell Seated Overhead Extension"].id,
            order: 3,
            recommendedSets: 3,
            recommendedReps: "10-12",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Bicep Curl"].id,
            order: 4,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Neutral Grip Pulldown"].id,
            order: 5,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Barbell Bent-Over Row"].id,
            order: 6,
            recommendedSets: 3,
            recommendedReps: "6-8",
            restPeriodSeconds: 90,
          },
        ],
      },
    },
    {
      name: "Lower Body Strength",
      description:
        "Targets the glutes, quads, and hamstrings to build strong, stable lower-body strength.",
      exercises: {
        create: [
          {
            exerciseId: exercisesMap["Glute Drive (Hip Thrust)"].id,
            order: 1,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Barbell Squat"].id,
            order: 2,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Single Leg Press"].id,
            order: 3,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
          {
            exerciseId: exercisesMap["Split Squat"].id,
            order: 4,
            recommendedSets: 3,
            recommendedReps: "8-10",
            restPeriodSeconds: 90,
          },
        ],
      },
    },
  ];
  console.log("🫡 Seeding workouts...");
  for (const workout of workouts) {
    await prisma.workout.create({ data: workout });
  }
  console.log("✅ Database seeded successfully!");
};

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
