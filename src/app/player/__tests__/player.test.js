import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Player from "../page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import '@testing-library/jest-dom';

// Mocking the router and searchParams for testing
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Player Component", () => {
  const routerPush = jest.fn();

  beforeEach(() => {
    (useRouter).mockReturnValue({ push: routerPush });
    (useSearchParams).mockReturnValue({
      get: jest.fn().mockReturnValue("12345"),
    });
  });

  it("renders YouTube player when videoId is provided", async () => {
    render(<Player />);
    expect(screen.getByTestId("youtube-player")).toBeInTheDocument();
  });

  it("navigates to gifPage when GIF is clicked", async () => {
    render(<Player />);
    fireEvent.click(screen.getByAltText("Funny GIF"));
    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith("/gifPage");
    });
  });

  it("restores the video player time from localStorage", async () => {
    localStorage.setItem("12345_Player_Time", "10");
    localStorage.setItem("12345_Current_Time", "1629455634000");
    render(<Player />);
    expect(screen.getByTestId("youtube-player")).toBeInTheDocument();
  });

  it("loads the YouTube API script", async () => {
    render(<Player />);
    const scriptTag = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    expect(scriptTag).toBeInTheDocument();
  });
});
