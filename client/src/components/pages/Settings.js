import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Settings() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <select data-choose-theme>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="retro">Retro</option>
        <option value="bumblebee">Bumblebee</option>
        <option value="synthwave">Synthwave</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="valentine">Valentine</option>
        <option value="garden">Garden</option>
        <option value="pastel">Pastel</option>
        <option value="luxury">Luxury</option>
        <option value="autumn">Autumn</option>
      </select>
    </>
  );
}
