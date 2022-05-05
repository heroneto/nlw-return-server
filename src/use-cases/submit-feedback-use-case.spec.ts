import { SubmitFeedbackUsecase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUsecase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)



describe('Submit feedback', () => {
  it('Should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base65,auiosdiuoasdjosiadjio',
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })
  it('Should be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base65,auiosdiuoasdjosiadjio',
    })).rejects.toThrow()
  })
  it('Should be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'sadassdsada',
    })).rejects.toThrow()
  })
})