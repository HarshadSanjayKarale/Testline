export async function fetchQuizData() {
  try {
    const response = await fetch('/api/Uw5CrX');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    return data.questions.map(question => ({
      question: question.description,
      answers: question.options.map(option => option.description),
      correctAnswerIndex: question.options.findIndex(option => option.is_correct)
    }));
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
}