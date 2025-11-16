export interface LessonResult {
  lesson: string;
  questions: string[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export const aiClient = {
  async generateLesson(topic: string, mode: "story" | "comic" | "rap"): Promise<LessonResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const modeDescriptions = {
      story: "Once upon a time, in a magical land of knowledge...",
      comic: "🎭 In a world where learning comes to life...",
      rap: "🎤 Yo! Listen up, here's the knowledge flow..."
    };

    const lesson = `${modeDescriptions[mode]}

Welcome to the amazing world of ${topic}! 🌟

${topic} is one of the most fascinating concepts you'll ever learn. Imagine it like a beautiful puzzle where every piece fits perfectly together. 

In this ${mode}, we'll explore:
✨ The fundamentals of ${topic}
✨ Why it matters in everyday life
✨ How to master it step by step

Remember, learning is a journey, not a destination. Every expert was once a beginner, just like you! So let's dive in and discover the magic of ${topic} together. 💫

The key to understanding ${topic} is to see it from different angles. Think of it as looking at a beautiful gemstone - each side reveals something new and exciting!`;

    const questions = [
      `What is the main idea behind ${topic}?`,
      `Why does ${topic} matter in real life?`,
      `Can you give an example of how ${topic} is used?`
    ];

    return {
      lesson,
      questions
    };
  },

  async generateQuiz(lesson: string): Promise<QuizQuestion[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Extract topic from lesson (simple extraction)
    const topicMatch = lesson.match(/world of (\w+)/i) || lesson.match(/concept of (\w+)/i);
    const topic = topicMatch ? topicMatch[1] : "this concept";

    return [
      {
        q: `What is the primary focus of ${topic}?`,
        options: [
          "Understanding complex theories",
          "Practical application in daily life",
          "Memorizing facts and figures",
          "Avoiding difficult concepts"
        ],
        answer: 1
      },
      {
        q: `Why is ${topic} important?`,
        options: [
          "It's required for exams",
          "It helps solve real-world problems",
          "It's easy to learn",
          "It's popular among students"
        ],
        answer: 1
      },
      {
        q: `Which approach works best for learning ${topic}?`,
        options: [
          "Reading once and moving on",
          "Understanding from different angles",
          "Avoiding practice",
          "Focusing only on theory"
        ],
        answer: 1
      },
      {
        q: `What makes ${topic} fascinating?`,
        options: [
          "Its complexity",
          "How every piece fits together",
          "Its difficulty level",
          "Its length"
        ],
        answer: 1
      },
      {
        q: `How should you approach learning ${topic}?`,
        options: [
          "As a destination to reach quickly",
          "As a journey of discovery",
          "As something to avoid",
          "As an optional topic"
        ],
        answer: 1
      }
    ];
  }
};

