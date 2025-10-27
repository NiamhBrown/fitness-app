# 🏋🏼‍♀️ Fitness Tracker MVP 🏋🏼‍♀️

A minimal fitness tracking app built as an MVP to log exercises and track progress.

⭐️ Please note: this app is intended to be viewed on mobile devices ⭐️

## Tech Stack

### **Frontend**

- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### **Backend**

- Node.js
- Express
- Prisma ORM
- Supabase — used for both database and authentication

## Project Motivation ✨

My end goal for this app is to help users build consistency in their training by making it **simple** and **enjoyable** to log workouts.

This is also an app I want for myself, so I’ve really enjoyed developing it as I understand the pain points of trying to track workouts effectively and get to design features I’d personally find useful.

I want the app to look beautiful and to create a seamless user experience. By achieving this I hope to create an app that makes users excited to work out and feel inspired to stay consistent and achieve their fitness goals.

### Features I’m working towards next:

- 🏋️ **Workout Library:** Log exercises under a complete structured workout
- ⏱️ **Timer:** Track rest periods and total workout duration
- 📊 **Training Insights:** View frequency and consistency of sessions

## Current Features

- 🔐 **Authentication:** Create an account and log in securely via Supabase.
- 💪🏼 **Exercise Logging:** Add exercise logs, recording reps and weight for each set.
- 🎯 **Personal Best Banner:** Banner updates when new PRs are reached for each exercise

## Demo

https://github.com/user-attachments/assets/daaa2f47-8202-4123-9b9b-1460acd6da80

## Setup Instructions

### **Frontend**

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend

   ```

2. Create a .env file in the frontend folder with the following:
   ```bash
   VITE_SUPABASE_URL="your_supabase_url"
   VITE_SUPABASE_ANON_KEY="your_supabase_anon_key"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### **Backend**

1. Navigate to the `backend` folder:

   ```bash
   cd backend

   ```

2. Create a .env file in the backend folder with the following:
   ```bash
   DIRECT_URL="your_database_direct_url"
   SUPABASE_URL="your_supabase_url"
   SUPABASE_ANON_KEY="your_supabase_anon_key"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
