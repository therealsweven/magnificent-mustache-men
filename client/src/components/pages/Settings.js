import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Settings() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
    <h1 className="text-5xl m-4">Settings</h1>
    <div className="divider"></div> 
   <div className="flex w-full my-7">
  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
    <h3 className="text-2xl">Set Theme:</h3>
  <select className="rounded text-xl" data-choose-theme>
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

  </div>
  <div className="divider divider-horizontal"></div>
  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
  <label htmlFor="my-modal" className="btn">DELETE PROFILE</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure you would like to Delete your Profile? </h3>
    <p className="py-4">You will loose all data and connections. As Well as any active applications will be removed!</p>
    <p className="py-4">And we will miss you :(</p>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn">No!</label>
      <label htmlFor="my-modal" className="btn">Yes!</label>
    </div>
  </div>
</div>
  </div>
</div>
    </>
  );
}
