// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import LoginPage from './LoginPage'; // Path to your LoginPage
// import useLogin from '../hooks/use-login';
// import useCreateUser from '../hooks/use-create-user';

// jest.mock('../hooks/use-login');
// jest.mock('../hooks/use-create-user');

// const mockSetUserId = jest.fn();

// describe('LoginPage', () => {
//   const mockLogin = jest.fn();
//   const mockCreateUser = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useLogin as jest.Mock).mockReturnValue({ login: mockLogin, isLoading: false });
//     (useCreateUser as jest.Mock).mockReturnValue({ createUser: mockCreateUser });
//   });

//   it('renders the login page', () => {
//     render(<LoginPage setUserId={mockSetUserId} />);
//     expect(screen.getByText(/Welcome to Chat App Demo/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByText(/LOGIN/i)).toBeInTheDocument();
//   });

//   it('validates email on login click', async () => {
//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.click(screen.getByText(/LOGIN/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
//     });
//   });

//   it('calls login function with valid email', async () => {
//     const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
//     mockLogin.mockResolvedValueOnce({ data: mockUser, error: null });

//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.change(screen.getByPlaceholderText(/Email/i), {
//       target: { value: 'john@example.com' },
//     });
//     fireEvent.click(screen.getByText(/LOGIN/i));

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith('john@example.com');
//       expect(mockSetUserId).toHaveBeenCalledWith('123');
//     });
//   });

//   it('shows error toaster on login failure', async () => {
//     mockLogin.mockResolvedValueOnce({ data: null, error: 'Invalid email' });

//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.change(screen.getByPlaceholderText(/Email/i), {
//       target: { value: 'invalid@example.com' },
//     });
//     fireEvent.click(screen.getByText(/LOGIN/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Network error/i)).toBeInTheDocument();
//     });
//   });

//   it('toggles to registration form', () => {
//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.click(screen.getByText(/REGISTER NEW USER/i));

//     expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
//     expect(screen.getByText(/REGISTER/i)).toBeInTheDocument();
//     expect(screen.getByText(/BACK TO LOGIN/i)).toBeInTheDocument();
//   });

//   it('validates email and name on registration', async () => {
//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.click(screen.getByText(/REGISTER NEW USER/i));
//     fireEvent.click(screen.getByText(/REGISTER/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
//     });
//   });

//   it('calls createUser with valid data', async () => {
//     const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
//     mockCreateUser.mockResolvedValueOnce({ user: mockUser, error: null });

//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.click(screen.getByText(/REGISTER NEW USER/i));
//     fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
//       target: { value: 'John Doe' },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/Email/i), {
//       target: { value: 'john@example.com' },
//     });
//     fireEvent.click(screen.getByText(/REGISTER/i));

//     await waitFor(() => {
//       expect(mockCreateUser).toHaveBeenCalledWith({
//         name: 'John Doe',
//         email: 'john@example.com',
//       });
//       expect(screen.getByText(/User created, John Doe/i)).toBeInTheDocument();
//     });
//   });

//   it('shows error toaster on registration failure', async () => {
//     mockCreateUser.mockResolvedValueOnce({ user: null, error: 'Email already exists' });

//     render(<LoginPage setUserId={mockSetUserId} />);
//     fireEvent.click(screen.getByText(/REGISTER NEW USER/i));
//     fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
//       target: { value: 'John Doe' },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/Email/i), {
//       target: { value: 'john@example.com' },
//     });
//     fireEvent.click(screen.getByText(/REGISTER/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Error/i)).toBeInTheDocument();
//       expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
//     });
//   });
// });
