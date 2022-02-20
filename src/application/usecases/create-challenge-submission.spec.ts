import { CreateChallengeSubmission } from "./create-challenge-submission";

describe("CreateChallengeSubmission use case", () => {
  it("Should be able to create a new challenge submission", async () => {
    const sut = new CreateChallengeSubmission();
    const data = {
      studentId: "fake-student-id",
      challengeId: "fake-challenge-id",
    };
    const response = await sut.execute(data);

    expect(response).toHaveProperty("_id");
    expect(response.props).toHaveProperty("createdAt");
  });
});
