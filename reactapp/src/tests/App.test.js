import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/Home";
import App from "../App";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import DisplayTutor from "../components/DisplayTutor";
import ApplyForm from "../components/ApplyForm";

test("renders_home_component_with_title_and_description", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to the Tutor Application")).toBeInTheDocument();
  expect(screen.getByText(/Join our community of skilled tutors and help students achieve their academic goals!/)).toBeInTheDocument();
});
test("home_component_renders_become_a_tutor_button_with_link_to_apply", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check if the "Apply Now" button is rendered with the correct link
  const applyButton = screen.getByText("Become a Tutor");

  expect(applyButton).toBeInTheDocument();
  expect(applyButton).toHaveAttribute("href", "/apply");
});

test("renders_navbar_component_with_links", () => {
  render(<App />);

  // Check if the component renders the title and links
  const titleElement = screen.getByText("Tutor Application");
  const homeLink = screen.getByText("Home");
  const tutorDetailsLink = screen.getByText("Tutor Details");

  expect(titleElement).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(tutorDetailsLink).toBeInTheDocument();
});

test("checks_link_destinations", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Check if the links have the correct destinations
  const homeLink = screen.getByText("Home");
  const tutorDetailsLink = screen.getByText("Tutor Details");

  expect(homeLink).toHaveAttribute("href", "/");
  expect(tutorDetailsLink).toHaveAttribute("href", "/getAllTutors");
});

test("renders_footer_component_with_copyright_text", () => {
  render(<Footer />);

  // Check if the copyright text is rendered
  const copyrightText = screen.getByText(
    /2023 Tutor Application. All rights reserved./i
  );

  expect(copyrightText).toBeInTheDocument();
});

test("fetching_and_displaying_tutor_applications", async () => {
  // Mocked data to simulate the response from the API
  const MOCK_DATA = [
    {
      name: "John Doe",
      qualification: "PhD",
      subject: "Math",
      experience: 5,
      phoneNumber: "1234567890",
    },
    {
      name: "Jane Smith",
      qualification: "MSc",
      subject: "Science",
      experience: 3,
      phoneNumber: "0987654321",
    },
  ];

  // Mock the fetch function to return the mocked data
  const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  });

  render(<DisplayTutor />);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if each tutor is displayed in the table
  await waitFor(() => {
    MOCK_DATA.forEach((application) => {
      expect(screen.getByText(application.name)).toBeInTheDocument();
      expect(screen.getByText(application.qualification)).toBeInTheDocument();
      expect(screen.getByText(application.subject)).toBeInTheDocument();
      expect(screen.getByText(application.experience)).toBeInTheDocument();
      expect(screen.getByText(application.phoneNumber)).toBeInTheDocument();
    });
  });

  // Validate the fetch function call
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("/getAllTutors"),
    expect.objectContaining({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  fetchMock.mockRestore();
});

test('submits_valid_application_form', async () => {
  render(
      <MemoryRouter>
          <ApplyForm />
      </MemoryRouter>
  );

  // Fill in the form
  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Qualification:'), { target: { value: 'PhD' } });
  fireEvent.change(screen.getByLabelText('Subject:'), { target: { value: 'Math' } });
  fireEvent.change(screen.getByLabelText('Experience (in years):'), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

  // Submit the form
  fireEvent.click(screen.getByText('Submit Application'));

  // Wait for the success modal to appear
  await waitFor(() => {
      expect(screen.getByText('Application submitted successfully!')).toBeInTheDocument();
  });

  fetchMock.mockRestore();
});


test('submits_invalid_application_form', () => {
  render(
    <MemoryRouter>
      <ApplyForm />
    </MemoryRouter>
  );

  // Attempt to submit without filling in the form
  const submitButton = screen.getByText('Submit Application');
  fireEvent.click(submitButton);

  // Check for validation error messages
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Qualification is required')).toBeInTheDocument();
  expect(screen.getByText('Subject is required')).toBeInTheDocument();
  expect(screen.getByText('Experience is required')).toBeInTheDocument();
  expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
});

test('checks_all_components_and_routes', () => {
  render(<App />);
  
  const homeLink = screen.getByText(/Home/i);
  fireEvent.click(homeLink);
  expect(screen.getByText('Welcome to the Tutor Application')).toBeInTheDocument();
  
  const applyLink = screen.getByText('Become a Tutor');
  fireEvent.click(applyLink);
  expect(screen.getByText('Apply to Become a Tutor')).toBeInTheDocument(); // Updated to match title

  const tutorDetailsLink = screen.getByText('Tutor Details');
  fireEvent.click(tutorDetailsLink);
  expect(screen.getByText('Submitted Tutor Applications')).toBeInTheDocument();
});
