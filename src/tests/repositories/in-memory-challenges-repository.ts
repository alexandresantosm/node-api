import { ChallengesRepository } from "../../application/repositories/ChallengesRepository";
import { Challenge } from "../../domain/entities/challenge";

export class InMemoryChallengesRepository implements ChallengesRepository {
  private items: Array<Challenge> = [];

  findById = async (id: string): Promise<Challenge | null> => {
    const challenge = this.items.find((challenge) => challenge.id === id);

    if (!challenge) {
      return null;
    }

    return challenge;
  };

  addNewChallenge = async (challenge: Challenge) => {
    return this.items.push(challenge);
  };
}
