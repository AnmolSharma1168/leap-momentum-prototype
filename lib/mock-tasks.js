export const MOCK_TASKS = [
  {
    title: "2-Minute Speaking Prompt",
    description: "Describe a place you visited recently. Speak for 2 minutes without stopping.",
    skill: "Speaking",
    duration: 2,
  },
  {
    title: "Paragraph Writing",
    description: "Write a short paragraph about the advantages of public transport.",
    skill: "Writing",
    duration: 8,
  },
  {
    title: "Listening Comprehension",
    description: "Listen to a short academic lecture and answer 5 questions.",
    skill: "Listening",
    duration: 6,
  },
  {
    title: "Reading Scan Practice",
    description: "Scan a passage about climate change and locate 3 key facts.",
    skill: "Reading",
    duration: 5,
  },
  {
    title: "Vocabulary Builder",
    description: "Learn and practice 10 academic words commonly used in IELTS.",
    skill: "Vocabulary",
    duration: 4,
  },
  {
    title: "Opinion Speaking",
    description: "Give your opinion on whether technology improves education. Speak for 2 minutes.",
    skill: "Speaking",
    duration: 3,
  },
  {
    title: "Essay Outline",
    description: "Create an outline for a Task 2 essay: 'Should governments invest more in public health?'",
    skill: "Writing",
    duration: 7,
  },
  {
    title: "Dictation Exercise",
    description: "Listen to 5 sentences and write them down accurately.",
    skill: "Listening",
    duration: 5,
  },
  {
    title: "True/False/Not Given",
    description: "Read a short passage and identify 5 statements as True, False, or Not Given.",
    skill: "Reading",
    duration: 6,
  },
  {
    title: "Collocations Practice",
    description: "Match 10 common IELTS collocations with their correct pairs.",
    skill: "Vocabulary",
    duration: 3,
  },
]

export function getTaskForDay(day) {
  const idx = (day - 1) % MOCK_TASKS.length
  return {
    ...MOCK_TASKS[idx],
    id: day,
    completed: false,
  }
}
