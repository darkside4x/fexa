const analyzeSentiment = (feedback) => {
  const positiveWords = ['amazing', 'great', 'good', 'satisfied'];
  const negativeWords = ['bad', 'terrible', 'disappointed', 'poor'];

  let score = 0;

  positiveWords.forEach((word) => {
    if (feedback.includes(word)) score += 1;
  });

  negativeWords.forEach((word) => {
    if (feedback.includes(word)) score -= 1;
  });

  return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
};

module.exports = { analyzeSentiment };
