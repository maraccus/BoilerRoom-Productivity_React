// src/components/MoodCheck.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoodCheck from "../features/mood/MoodCheck";
import { MoodContext } from "@/features/mood/MoodContext";

// Mocka SVG-imports för att undvika importfel
jest.mock("@/assets/MoodCheckEmoji/exhausted.svg?react", () => () => (
  <svg data-mock="exhausted" />
));
jest.mock("@/assets/MoodCheckEmoji/tired.svg?react", () => () => (
  <svg data-mock="tired" />
));
jest.mock("@/assets/MoodCheckEmoji/okay.svg?react", () => () => (
  <svg data-mock="okay" />
));
jest.mock("@/assets/MoodCheckEmoji/energetic.svg?react", () => () => (
  <svg data-mock="energetic" />
));
jest.mock("@/assets/MoodCheckEmoji/thriving.svg?react", () => () => (
  <svg data-mock="thriving" />
));

// Mocka react-router-dom för useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mocka ENDAST hooken useMoodContext (vi behåller den riktiga MoodContext)
jest.mock("@/contexts/MoodContext", () => ({
  ...jest.requireActual("@/contexts/MoodContext"),
  useMoodContext: jest.fn(),
}));

// Rensa state mellan tester
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test("renderar MoodCheck korrekt med headings, select, mood-knappar och disabled log-knapp", () => {
  // Mocka useMoodContext så att den returnerar en tom/no-op funktion
  (
    require("@/contexts/MoodContext").useMoodContext as jest.Mock
  ).mockReturnValue({
    onMoodSelected: jest.fn(),
  });

  render(
    <MemoryRouter>
      <MoodCheck />
    </MemoryRouter>,
  );

  // Kontrollera headings
  expect(screen.getByText("Ange kategori:")).toBeInTheDocument();
  expect(screen.getByText("Ange humör:")).toBeInTheDocument();

  // Kontrollera select med options
  const select = screen.getByLabelText("Välj kategori") as HTMLSelectElement;
  expect(select).toBeInTheDocument();
  expect(select.options[0].text).toBe("Välj en kategori");
  expect(select.options[1].text).toBe("Deep work");

  // Kontrollera mood-knappar (5 st, med aria-label)
  const moodButtons = screen.getAllByRole("button", {
    name: /Utmattad|Trött|Okej|Energisk|Sprudlande/,
  });
  expect(moodButtons).toHaveLength(5);

  // Log-knapp disabled initialt
  const logButton = screen.getByRole("button", { name: "Logga" });
  expect(logButton).toBeDisabled();
});

test("väljer kategori och mood, klickar logga, kallar onMoodSelected och navigerar", () => {
  const mockNavigate = require("react-router-dom").useNavigate;
  const mockNavigateFn = jest.fn();
  mockNavigate.mockReturnValue(mockNavigateFn);

  const mockOnMoodSelected = jest.fn();

  // Mocka useMoodContext för detta test
  (
    require("@/contexts/MoodContext").useMoodContext as jest.Mock
  ).mockReturnValue({
    onMoodSelected: mockOnMoodSelected,
  });

  render(
    <MemoryRouter>
      <MoodCheck />
    </MemoryRouter>,
  );

  // Välj kategori
  const select = screen.getByLabelText("Välj kategori");
  fireEvent.change(select, { target: { value: "meeting" } });

  // Välj mood (t.ex. "Okej" = 3)
  const moodButton = screen.getByRole("button", { name: "Okej" });
  fireEvent.click(moodButton);

  // Log-knapp nu enabled
  const logButton = screen.getByRole("button", { name: "Logga" });
  expect(logButton).not.toBeDisabled();

  // Klicka logga
  fireEvent.click(logButton);

  // Verifiera beteende
  expect(mockOnMoodSelected).toHaveBeenCalledWith(3);
  expect(mockNavigateFn).toHaveBeenCalledWith("/");

  // Kontrollera localStorage (från hooken)
  const stored = JSON.parse(localStorage.getItem("latestMoodLog") || "{}");
  expect(stored.mood).toBe(3);
  expect(stored.category).toBe("meeting");
});
