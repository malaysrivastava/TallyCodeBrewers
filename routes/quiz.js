const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const auth = require('../middleware/auth')
const Quiz = require("../models/quiz")

router.post('/addQ',auth, async (req,res)=>{
    const newQuiz = new Quiz(req.body)
   try {
        const savedQuiz = await newQuiz.save();
        let q_id = savedQuiz._id.valueOf();
        let data = {
            _id:q_id,
            sTime:savedQuiz.start,
            eTime:savedQuiz.end
        }
        const token = jwt.sign(data, 'my-32-character-ultra-secure-and-ultra-long-secret',{expiresIn:'365d'});
        await Quiz.findByIdAndUpdate(q_id, {
            $set: { token: token },
        });
        res.status(200).json(token);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/check', async (req,res)=>{
    const data = req.body;
    let Pdate = new Date().getTime();
    try {
        Quiz.find({token:data.token},async (err,quiz)=>{
            if(quiz && quiz.length > 0){
                var Sdate = new Date(quiz[0].start).getTime();
                var Edate = new Date(quiz[0].end).getTime();
                if(Sdate <= Pdate){
                      if(Edate >= Pdate){
                        if(!quiz[0].userAttempted.some(usr=>data.email==usr.user)){
                           
                            const quizdata={
                                Qname:quiz[0].Qname,
                                text:quiz[0].text.map(p =>
                                    p.ans !== ''
                                      ? { ...p, ans: '' }
                                      : p
                                  ),
                                  MCQ:quiz[0].MCQ.map(p =>
                                    p.ans !== ''
                                      ? { ...p, ans: '' }
                                      : p
                                  ),
                                Qid:quiz[0]._id,
                                byName:quiz[0].byName
                            }

                            return res.status(200).json({message:"Quiz has started",data:quizdata});
                        } else{
                            return res.status(201).json({message:"User has already attempted the quiz"});
                        }
                           
                      } else{
                        return res.status(202).json({message:"Quiz is no more taking responses"});
                      }
                } else{
                    return res.status(203).send("Quiz hasn't started yet!");
                }
            } else {
                return res.status(401).json(err);
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

router.post('/submit', async (req,res)=>{
    const data = req.body;
    console.log(data)
    let score={
        user:data.email,
        scored:0,
        totalScore:0,
        correct:0,
        incorrect:0
    }
    let Pdate = new Date().getTime();
    try {
        Quiz.find({token:data.token},async (err,quiz)=>{
            if(quiz && quiz?.length > 0){
                
                var Edate = new Date(quiz[0].end).getTime();

                if(Edate <= Pdate){
                    return res.status(202).json({message:"Quiz is no more taking responses"});
                }

                for (let index = 0; index < quiz[0]?.text?.length; index++) {
                    let org = quiz[0]?.text[index]?.ans;
                    let resp = data?.text[index]?.ans;
                    if(org===resp){
                        score.correct=score?.correct+1;
                        score.scored = score?.scored + quiz[0]?.text[index]?.pts;
                    } else{
                        score.incorrect = score?.incorrect+1;
                    }
                    score.totalScore = score?.totalScore+quiz[0]?.text[index]?.pts;
                }

                for (let index = 0; index < quiz[0]?.MCQ?.length; index++) {
                    let org = quiz[0]?.MCQ[index]?.ans;
                    let resp = data?.MCQ[index]?.ans;
                    if(org===resp){
                        score.correct=score?.correct+1;
                        score.scored = score?.scored + quiz[0]?.text[index]?.pts;
                    } else{
                        score.incorrect = score?.incorrect+1;
                    }
                    score.totalScore = score?.totalScore+quiz[0]?.MCQ[index]?.pts;
                }
                await Quiz.findByIdAndUpdate(quiz[0]?._id, {
                    $push: {userAttempted: score}
                });

                res.status(200).json(score);
            } else {
                return res.status(401).json(err);
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})
router.post("/id",auth, async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        let quiz;
        quiz = await Quiz.find({
            byId: data.userId,
        });
        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).send({message:"No quiz found"});
    }
});

router.put("/end",auth, async (req, res) => {
    try {
        const {id} = req.body;

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            {
                $set: { end: 0 }
            },
            { new: true }
        );
        return res.status(200).json(updatedQuiz);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;