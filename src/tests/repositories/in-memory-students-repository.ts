import { StudentsRepository } from "../../application/repositories/StudentsRepository";
import { Student } from "../../domain/entities/student";

export class InMemoryStudentsRepository implements StudentsRepository {
  private items: Array<Student> = [];

  findById = async (id: string): Promise<Student | null> => {
    const student = this.items.find((student) => student.id === id);

    if (!student) {
      return null;
    }

    return student;
  };

  addNewStudent = async (student: Student) => {
    return this.items.push(student);
  };
}
