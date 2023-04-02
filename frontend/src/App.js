import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState(null);

  const handleDownload = async () => {
    const data = await axios.get(
      `http://localhost:4000/download?url=${urlValue}`
    );
    setData(data);
    setUrlValue("");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-row justify-center items-center">
        <div className="text-4xl font-bold">
          <h1 className="main-text">
            Youtube Video Downloader
          </h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div>
          <input
            type="text"
            placeholder="Enter video link..."
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            className="black outline-none p-2 border-2 border-gray-500 rounded-md md:mr-4"
          />
        </div>
        <div className=" bg-black py-2 px-6 rounded-md cursor-pointer">
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>

      <div>
        {data !== null ? (
          <div>
            <div className="my-4">
              <iframe
                width="auto"
                height="auto"
                src={`${data.data.url}`}
                title="video"
              />
            </div>
            <div>
              {data?.data.info.map((formatName, index) => (
                <div key={index}>
                  <a
                    href={formatName.url}
                    target="_blank"
                    download
                    className=" outline-none italic underline"
                  >
                    {formatName.mimeType.split(";")[0] + "  "}
                    {formatName.hasVideo ? formatName.height + "p" : ""}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="font-bold mt-10">No download yet</div>
        )}
      </div>
    </div>
  );
};

export default App;
