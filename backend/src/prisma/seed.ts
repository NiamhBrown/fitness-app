import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("🌱 Starting database seeding...");

  console.log("🧹 Cleaning existing data...");
  await prisma.personalBest.deleteMany();
  await prisma.exerciseLog.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  console.log("👥 Seeding users...");
  const users = await Promise.all([
    prisma.user.upsert({
      where: { id: "1" },
      update: {
        email: "niamh@me.com",
        name: "niamh",
      },
      create: {
        id: "1",
        email: "niamh@me.com",
        name: "niamh",
      },
    }),
    prisma.user.upsert({
      where: { id: "2" },
      update: {
        email: "ida@me.com",
        name: "ida",
      },
      create: {
        id: "2",
        email: "ida@me.com",
        name: "ida",
      },
    }),
    prisma.user.upsert({
      where: { id: "3" },
      update: {
        email: "grass@me.com",
        name: "grass",
      },
      create: {
        id: "3",
        email: "grass@me.com",
        name: "grass",
      },
    }),
  ]);

  console.log("💪 Seeding exercises...");
  const benchPress = await prisma.exercise.upsert({
    where: { name: "Bench Press" },
    update: {
      muscleGroup: "Upper",
      description: "A compound chest exercise.",
    },
    create: {
      name: "Bench Press",
      muscleGroup: "Upper",
      description: "A compound chest exercise.",
    },
  });

  const squat = await prisma.exercise.upsert({
    where: { name: "Squat" },
    update: {
      muscleGroup: "Lower",
      description: "A compound lower-body exercise.",
    },
    create: {
      name: "Squat",
      muscleGroup: "Lower",
      description: "A compound lower-body exercise.",
    },
  });

  const deadlift = await prisma.exercise.upsert({
    where: { name: "Deadlift" },
    update: {
      muscleGroup: "Lower",
      description: "A compound posterior chain exercise.",
    },
    create: {
      name: "Deadlift",
      muscleGroup: "Lower",
      description: "A compound posterior chain exercise.",
    },
  });

  // Seed PBs
  console.log("🏆 Seeding PBs...");
  await prisma.personalBest.createMany({
    data: [
      {
        userId: "1",
        exerciseId: benchPress.id,
        date: new Date("2025-08-22"),
        reps: 8,
        weight: 60,
      },
      {
        userId: "2",
        exerciseId: benchPress.id,
        date: new Date("2025-08-22"),
        reps: 8,
        weight: 60,
      },
    ],
  });
  // Seed exercise logs
  console.log("📊 Seeding exercise logs...");
  await prisma.exerciseLog.createMany({
    data: [
      // Bench Press logs
      {
        userId: "1",
        exerciseId: benchPress.id,
        date: new Date("2025-08-22"),
        setNumber: 1,
        reps: 8,
        weight: 60,
      },
      {
        userId: "1",
        exerciseId: benchPress.id,
        date: new Date("2025-08-22"),
        setNumber: 2,
        reps: 6,
        weight: 60,
      },
      {
        userId: "1",
        exerciseId: benchPress.id,
        date: new Date("2025-08-25"),
        setNumber: 1,
        reps: 8,
        weight: 65,
      },
      {
        userId: "2",
        exerciseId: benchPress.id,
        date: new Date("2025-08-25"),
        setNumber: 1,
        reps: 8,
        weight: 60,
      },

      // Squat logs
      {
        userId: "1",
        exerciseId: squat.id,
        date: new Date("2025-08-26"),
        setNumber: 1,
        reps: 10,
        weight: 80,
      },
      {
        userId: "1",
        exerciseId: squat.id,
        date: new Date("2025-08-26"),
        setNumber: 2,
        reps: 8,
        weight: 80,
      },
      {
        userId: "2",
        exerciseId: squat.id,
        date: new Date("2025-08-25"),
        setNumber: 1,
        reps: 8,
        weight: 60,
      },

      // Deadlift logs
      {
        userId: "1",
        exerciseId: deadlift.id,
        date: new Date("2025-08-24"),
        setNumber: 1,
        reps: 5,
        weight: 100,
      },
      {
        userId: "2",
        exerciseId: deadlift.id,
        date: new Date("2025-08-24"),
        setNumber: 1,
        reps: 3,
        weight: 80,
      },
    ],
  });

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
