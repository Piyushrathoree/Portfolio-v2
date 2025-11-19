import { GitHubCalendar } from "react-github-calendar";

export default function Graph() {
  return (
    <div className="flex justify-center items-center p-6 border border-dashed rounded-lg w-fit">
      <GitHubCalendar
        username="Piyushrathoree"
        // You can customize the color scheme
        colorScheme="light"
        // specific block customization
        blockSize={10}
        blockMargin={5}
        fontSize={12}
      />
    </div>
  );
}
