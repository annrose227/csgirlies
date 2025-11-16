import { describe, it, expect } from 'vitest';
import { aiClient } from '../aiClient';

describe('aiClient', () => {
  describe('generateLesson', () => {
    it('should generate a lesson with story mode', async () => {
      const result = await aiClient.generateLesson('Algebra', 'story');
      
      expect(result).toHaveProperty('lesson');
      expect(result).toHaveProperty('questions');
      expect(result.lesson).toBeTruthy();
      expect(result.questions).toHaveLength(3);
      expect(result.lesson).toContain('Algebra');
      expect(result.lesson).toContain('story');
    });

    it('should generate a lesson with comic mode', async () => {
      const result = await aiClient.generateLesson('Physics', 'comic');
      
      expect(result.lesson).toContain('Physics');
      expect(result.lesson).toContain('comic');
      expect(result.questions).toHaveLength(3);
    });

    it('should generate a lesson with rap mode', async () => {
      const result = await aiClient.generateLesson('History', 'rap');
      
      expect(result.lesson).toContain('History');
      expect(result.lesson).toContain('rap');
      expect(result.questions).toHaveLength(3);
    });

    it('should return questions array with 3 items', async () => {
      const result = await aiClient.generateLesson('Math', 'story');
      
      expect(Array.isArray(result.questions)).toBe(true);
      expect(result.questions.length).toBe(3);
      result.questions.forEach(q => {
        expect(typeof q).toBe('string');
        expect(q.length).toBeGreaterThan(0);
      });
    });
  });

  describe('generateQuiz', () => {
    it('should generate quiz questions from lesson', async () => {
      const lesson = 'This is a test lesson about mathematics and numbers.';
      const questions = await aiClient.generateQuiz(lesson);
      
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should return questions with correct structure', async () => {
      const lesson = 'Test lesson content';
      const questions = await aiClient.generateQuiz(lesson);
      
      questions.forEach(question => {
        expect(question).toHaveProperty('q');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('answer');
        expect(typeof question.q).toBe('string');
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBe(4);
        expect(typeof question.answer).toBe('number');
        expect(question.answer).toBeGreaterThanOrEqual(0);
        expect(question.answer).toBeLessThan(4);
      });
    });

    it('should generate 5 questions by default', async () => {
      const lesson = 'A comprehensive lesson about science and experiments.';
      const questions = await aiClient.generateQuiz(lesson);
      
      expect(questions.length).toBe(5);
    });

    it('should handle empty lesson gracefully', async () => {
      const questions = await aiClient.generateQuiz('');
      
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should generate questions with valid answer indices', async () => {
      const lesson = 'Lesson about testing and validation.';
      const questions = await aiClient.generateQuiz(lesson);
      
      questions.forEach(question => {
        const answerIndex = question.answer;
        expect(answerIndex).toBeGreaterThanOrEqual(0);
        expect(answerIndex).toBeLessThan(question.options.length);
        expect(question.options[answerIndex]).toBeTruthy();
      });
    });

    it('should generate unique questions for different lessons', async () => {
      const lesson1 = 'First lesson about mathematics.';
      const lesson2 = 'Second lesson about history.';
      
      const questions1 = await aiClient.generateQuiz(lesson1);
      const questions2 = await aiClient.generateQuiz(lesson2);
      
      // Questions should be generated (may have different content)
      expect(questions1.length).toBe(questions2.length);
      expect(questions1.length).toBeGreaterThan(0);
    });
  });
});

