import random


def generate_quiz(text):

    sentences = text.split(".")

    quiz = []

    for sentence in sentences[:5]:

        sentence = sentence.strip()

        if len(sentence.split()) > 5:

            words = sentence.split()

            answer = words[-1]

            question = sentence.replace(answer, "_____")

            options = [
                answer,
                "Python",
                "Database",
                "API"
            ]

            random.shuffle(options)

            quiz.append({
                "question": question,
                "options": options,
                "answer": answer
            })

    return quiz
