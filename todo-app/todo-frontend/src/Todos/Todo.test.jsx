import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Todo from "./Todo"

describe('Todo component', () => {

  const todo = {
    text: 'This is a sample todo text',
    done: false
  }

  test('renders todo.text', () => {
    render(<Todo todo={todo} deleteTodo={undefined} completeTodo={undefined} />)
    const item = screen.getByText(todo.text)
    expect(item).toBeDefined()
  })

  test('renders not done status correctly', () => {
    render(<Todo todo={todo} deleteTodo={undefined} completeTodo={undefined} />)
    const notDone = screen.getByText('This todo is not done')
    expect(notDone).toBeDefined()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  test('renders done status correctly', () => {
    render(<Todo todo={{...todo, done: true}} deleteTodo={undefined} completeTodo={undefined} />)
    const done = screen.getByText('This todo is done')
    expect(done).toBeDefined()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1)
  })

  test('calls its buttons event handlers correctly', async () => {
    const user = userEvent.setup()
    const deleteFn = vi.fn()
    const completeFn = vi.fn()
    render(<Todo todo={todo} deleteTodo={deleteFn} completeTodo={completeFn} />)
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    const completeButton = screen.getByRole('button', { name: /set as done/i })
    await user.click(deleteButton)
    await user.click(completeButton)
    expect(deleteFn.mock.calls).toHaveLength(1)
    expect(completeFn.mock.calls).toHaveLength(1)
  })
})