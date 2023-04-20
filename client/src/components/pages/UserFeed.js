// import PostForm from "./forms/PostForm"

export default function UserFeed() {
  return <>
   <div className="flex flex-col space-y-4">
      {/* Add your feed items here */}
      <div className="flex flex-col space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-medium text-lg">Feed Item Title</h2>
        <p className="text-gray-600">Feed item description goes here</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-medium text-lg">Another Feed Item Title</h2>
        <p className="text-gray-600">Another feed item description goes here</p>
      </div>
    </div>
    </div>
    </>
}
