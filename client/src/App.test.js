import { screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "./components/Card/Card";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Card
          id={1}
          order={1}
          name={"Argentina"}
          flagImg={"https://flagcdn.com/w320/ar.png"}
          continent={"South America"}
          continentColor={"#1b861b"}
        />
      </BrowserRouter>,
      container
    );
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("Card should render h1 tittle with the country's name", () => {
  const title = screen.getByText("Argentina");
  expect(title).toBeInTheDocument();
  expect(title.tagName).toBe("H1");
});
test("Card should render h4 subtitle with the country's continent", () => {
  const subTitle = screen.getByText("South America");
  expect(subTitle).toBeInTheDocument();
  expect(subTitle.tagName).toBe("H4");
});
test("Card should render image with the country's flag with alt <Country name>'s flag", () => {
  const flag = screen.getByAltText("Argentina's flag");
  expect(flag).toBeInTheDocument();
  expect(flag.tagName).toBe("IMG");
});
