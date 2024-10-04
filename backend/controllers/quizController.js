// controllers/quizController.js
const Question = require("../models/Question");
const User = require("../models/User");

exports.submitAnswer = async (req, res) => {
    const { questionId, answer } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        let isAttempted = user.questionsSolved.find(
            (question) => question.question == questionId
        );

        if (isAttempted) {
            return res.status(400).json({ msg: "Question already attempted" });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(400).json({ msg: "Question not found" });
        }

        if (
            question.answer.toLocaleLowerCase() !==
            answer.trim().toLocaleLowerCase()
        ) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    questionsSolved: {
                        question: questionId,
                        isCorrect: false,
                        OptionSelected: answer,
                    },
                },
                lastSubmitted: new Date(),
            });
            return res.json({ msg: "Incorrect answer", correct: false });
        }
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                questionsSolved: {
                    question: questionId,
                    isCorrect: true,
                    OptionSelected: answer,
                },
            },
            lastSubmitted: new Date(),
            score: user.score + 10,
        });

        res.json({ msg: "Answer submitted", correct: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const solvedQuestions = user.questionsSolved;
        console.log(solvedQuestions);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        let questions = await Question.find();
        let newquestions = questions.map((question) => {
            const isAttempted = solvedQuestions.find(
                (q) => q.question == question._id
            );
            const isCorrect = isAttempted ? isAttempted.isCorrect : false;
            const option = isAttempted ? isAttempted.optionSelected : "";
            if (!isCorrect) {
                question["answer"] = null;
            }
            return {
                ...question._doc,
                ["isSolved"]: isAttempted ? true : false,
                ["isCorrect"]: isCorrect,
                ["optionSelected"]: option,
            };
        });
        res.json({ questions: newquestions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
