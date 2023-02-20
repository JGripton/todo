import { taskStub } from "../stubs/task.stubs";

export const TaskService = jest.fn().mockReturnValue({
    createTask: jest.fn().mockResolvedValue(taskStub()),
    findAllTasksByUserID: jest.fn().mockResolvedValue([taskStub()]),
    updateTask: jest.fn().mockResolvedValue(taskStub()),
    updateTaskStatus: jest.fn().mockResolvedValue(taskStub())
})