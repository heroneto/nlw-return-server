import express from 'express'
import nodemailer from 'nodemailer'
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUsecase } from './use-cases/submit-feedback-use-case';
export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdatper = new NodeMailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUsecase(
    prismaFeedbacksRepository,
    nodemailerMailAdatper
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })


  return res.status(201).send()
})