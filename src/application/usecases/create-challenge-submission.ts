import { Submission } from "../../domain/entities/submission";
import { StudentsRepository } from "../repositories/StudentsRepository";

type CreateChallengeSubmissionRequest = {
  studentId: string;
  challengeId: string;
};

export class CreateChallengeSubmission {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  execute = async ({
    studentId,
    challengeId,
  }: CreateChallengeSubmissionRequest) => {
    const student = await this.studentsRepository.findById(studentId);

    if (!student) {
      throw new Error("Students does not exists.");
    }

    const submission = Submission.create({
      studentId,
      challengeId,
    });

    return submission;
  };
}
