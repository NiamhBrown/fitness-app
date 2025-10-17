import { prisma } from "../prisma";

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
        firstName: "niamh",
      },
      create: {
        id: "1",
        email: "niamh@me.com",
        firstName: "niamh",
        lastName: "brown",
      },
    }),
    prisma.user.upsert({
      where: { id: "2" },
      update: {
        email: "ida@me.com",
        firstName: "ida",
      },
      create: {
        id: "2",
        email: "ida@me.com",
        firstName: "ida",
      },
    }),
  ]);

  console.log("💪 Seeding exercises...");
  const exercises = [
    { name: "Hip Abductor" },
    { name: "Hip Adductor" },
    { name: "Romanian Deadlift (RDL)" },
    { name: "Elevated Goblet Squat" },
    { name: "Assisted Pull-Up" },
    { name: "Glute Drive (Hip Thrust Machine)" },
    { name: "Barbell Squat" },
    { name: "Smith Machine Split Squat" },
    { name: "Single Leg Press" },
    { name: "Tricep Cable Extension" },
    { name: "Shoulder Press" },
    { name: "Neutral Grip Pulldown" },
    { name: "Barbell Bent-Over Row" },
    { name: "Barbell Seated Overhead Extension" },
    { name: "Bicep Curl" },
    { name: "Bench Press" },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {
        muscleGroup: "placeholder",
        description: "placeholder",
      },
      create: {
        name: exercise.name,
        muscleGroup: "placeholder",
        description: "placeholder",
      },
    });
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
