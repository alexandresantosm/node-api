import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { InMemoryChallengesRepository } from "../../tests/repositories/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../tests/repositories/in-memory-students-repository";
import { CreateChallengeSubmission } from "./create-challenge-submission";

describe("CreateChallengeSubmission use case", () => {
  it("Should be able to create a new challenge submission", async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: "fake-student-name",
      email: "fake-student@email.com",
    });

    const challenge = Challenge.create({
      title: "fake-challenge-title",
      instructionsUrl: "fake-challenge-instructions-url",
    });

    await studentsRepository.addNewStudent(student);
    await challengesRepository.addNewChallenge(challenge);

    const sut = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const data = {
      studentId: student.id,
      challengeId: challenge.id,
    };

    const response = await sut.execute(data);

    expect(response).toHaveProperty("_id");
    expect(response.props).toHaveProperty("createdAt");
  });

  it("Should be able to trhow error if student ID is incorrect", async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: "fake-student-name",
      email: "fake-student@email.com",
    });

    const challenge = Challenge.create({
      title: "fake-challenge-title",
      instructionsUrl: "fake-challenge-instructions-url",
    });

    await studentsRepository.addNewStudent(student);
    await challengesRepository.addNewChallenge(challenge);

    const sut = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const data = {
      studentId: "fake-invalid-student-id",
      challengeId: challenge.id,
    };

    //const response = await sut.execute(data);

    expect(sut.execute(data)).rejects.toEqual(
      new Error("Student does not exists.")
    );
  });

  it("Should be able to trhow error if challenge ID is incorrect", async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: "fake-student-name",
      email: "fake-student@email.com",
    });

    const challenge = Challenge.create({
      title: "fake-challenge-title",
      instructionsUrl: "fake-challenge-instructions-url",
    });

    await studentsRepository.addNewStudent(student);
    await challengesRepository.addNewChallenge(challenge);

    const sut = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const data = {
      studentId: student.id,
      challengeId: "fake-invalid-challenge-id",
    };

    //const response = await sut.execute(data);

    expect(sut.execute(data)).rejects.toEqual(
      new Error("Challenge does not exists.")
    );
  });
});
